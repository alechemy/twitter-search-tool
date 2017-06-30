/*A micro-library for searching Twitter and saving results to MongoDB databases.

  Authors: Alec Custer and Jack Taylor
*/

//Import promise library
var Promise = require('bluebird');

//Import configured Twitter search object
var client = require('../server/twitterKeys');

/*Helper function for decrementing a 64-bit integer by 1. This is a workaround
  for the fact that Javascript does not currently support 64-bit integers.

  Author: MogsDad
  From: http://stackoverflow.com/questions/14347441/add-or-subtract-from-64bit-integer-in-javascript
*/
function decrInt64(int64) {
  var result = "";
  var midpt = Math.floor(int64.length/2);
  var upper = int64.substring(0,midpt);
  var lower = int64.substring(midpt);
  var upperVal = new Number(upper);
  var lowerVal = new Number(lower);

  if (lowerVal == 0) {
    if (upperVal == 0) {
      // We don't support negative numbers
      result = "*ERROR*"
    }
    else {
      // borrow 1
      result =    pad((--upperVal).toString(),upper.length) +
               (new Number("1"+lower) - 1).toString();
    }
  }
  else {
    var newLower = (lowerVal - 1).toString();
    result = upper + pad(newLower,lower.length);
  }
  return result;
}

/*Helper function to the above decrInt64() function that prepends zeroes
 zeros to expand a given string to given length

  Author: MogsDad
  From: http://stackoverflow.com/questions/14347441/add-or-subtract-from-64bit-integer-in-javascript
*/
function pad(str, len) {
  var pre = '0';
  len = len - str.length;
  while (len > 0) {
    if (len & 1) str = pre + str;
    len >>= 1;
    pre += pre;
  }
  return str;
}

/*Parses an array of JSON objects returned by the Twitter API into Tweet
  objects defined by our Mongoose model in /models/tweet.js.

  Parameters:
    tweets - The array of JSON-formatted tweets to insert
    Tweet - Mongoose model for a single Tweet
    tweetCB - Callback function used to signal to the core search function
              that this batch of tweets has finished inserting, so the next
              search can begin.
*/
function insertTweets(tweets, Tweet, tweetCB) {
  //Parse the data returned by Twitter's API and push new Tweet objects into
  //an array
  var tweetObjects = [];

  for (let i of tweets) {
    var tweet = new Tweet({
      _id: i.id_str,
      authorID: i.user.id,
      author: i.user.screen_name,
      content: i.text,
      tweetLanguage: i.lang,
      retweetCount: i.retweet_count,
      favoriteCount: i.favorite_count
    });

    tweetObjects.push(tweet);
  }

  //Insert all of the parsed tweets and call the callback function to signal
  //the results (either error or success)
  Tweet.insertMany(tweetObjects, function(err, docs) {
    if (err) {
      tweetCB("Error");
      return;
    }
    else {
      console.log(tweetObjects.length + " tweets saved");
      tweetCB(null, "Done");
      return;
    }
  });
}

/*
  Searches Twitter for a given query, updates the searches collection to
  contain metadata about the search, and passes the received tweets to
  insertTweets().

  Parameters:
    query - The string query to search for
    max - Integer that indicates the highest tweet ID we want to include
          in our search. If set to -1, we want to begin our search with
          the most recent tweets.
    quantity - The total number of tweets the user is requesting
    Search - Mongoose model that represents metadata about the search

  Returns: A Promise object that is resolved when the search is complete.
*/
function search(query, max, quantity, Search) {
  //Create options object for the search. We always ask for the maximum
  //number of tweets (100).
  options = {};
  options.q = query;
  options.count = 100;

  //If max is not set to -1, set max_id to its value
  if (max != -1) {
    options.max_id = max;
  }

  console.log("Searching Twitter for tweets about " + query);

  return new Promise (function(resolve, reject) {
    //Perform the search using configured Twitter search client
    client.get('search/tweets', options, function(error, tweets, response) {
      console.log("Found " + tweets.statuses.length + " tweets.");

      //If we found at least one tweet, begin looking for the min and max IDs
      if (tweets.statuses.length > 0) {
        //If the requested quantity is smaller than what we got back,
        //find min ID of the first quantity tweets
        var end;
        if (quantity < tweets.statuses.length) {
          end = quantity;
        }
        //Otherwise find min ID of all tweets
        else {
          end = tweets.statuses.length;
        }

        //Locate the smallest ID
        var minID = tweets.statuses[0].id_str;
        for (let i of tweets.statuses.slice(1, end)) {
          if (i.id_str < minID) {
            minID = i.id_str;
          }
        }

        //If this is the intitial search, we want to store min and max IDs
        //in a new Search object
        if (max == -1) {
          //Find the maxID
          var maxID = tweets.statuses[0].id_str;
          for (let i of tweets.statuses.slice(1, end)) {
            if (i.id_str > maxID) {
              maxID = i.id_str;
            }
          }

          //Manually set _id to 1 because there will only be 1 Search metadata
          //document per database.
          var search = new Search({
            _id: 1,
            minID: minID,
            maxID: maxID
          });

          //Save to searches collection
          search.save(function(err) {
            if (err) {
              console.log(err);
            }
          });
        }
        //If this is not the initial search, update min ID to reflect
        //the new oldest tweet
        else {
          Search.findOneAndUpdate({_id: 1}, {minID: minID}, function(err, doc) {
            console.log("Saved new min ID!");
          });
        }
      }

      //Resolve the promise to indicate that we're done searching
      resolve(tweets.statuses);
    });
  });
}

/*
  Function for searching Twitter and saving results to a MongoDB database.
  Exported as a Javascript module and imported in ../server.js.

  Parameters:
    term - The string query to search for
    quantity - The total number of tweets the user is requesting
    Tweet - Mongoose model that represents a single tweet
    Search - Mongoose model that represents metadata about the search
    cb - Callback function used to signal to the caller that the search either
         completed successfully or encountered an error.
*/
module.exports = function(term, quantity, Tweet, Search, cb) {
  //Keeps track of the total number of tweets we've saved.
  var total = 0;

  //Check Twitter's API rate limit to ensure that the user's search
  //can be completed
  var tweetsRemaining;
  client.get('application/rate_limit_status.json', function(error, response) {
    tweetsRemaining = response.resources.search['/search/tweets'].limit;

    if (quantity > (tweetsRemaining*100)) {
      cb("You asked for too many tweets. Try lowering the quantity.");
      return;
    }
    else {
      //Conduct first search and pass results to continueSearch
      search(term, -1, quantity, Search).then(continueSearch);
    }
  });

  function continueSearch(data) {
    //Base case 1: no results
    if (data.length == 0) {
      cb(null, total);
      return;
    }

    console.log("Total: " + total);
    //Base case 2: total results is greater than the quantity we want, so
    //we're done searching.
    if ((total+data.length) >= quantity) {
      var toInsert = data.slice(0, (quantity - total));
      console.log("Inserting " + toInsert.length + " tweets");

      //Insert the newest batch of tweets.
      insertTweets(toInsert, Tweet, function(err, searchCB) {
        if (err) {
          cb("Failed to insert tweets.");
        }
        else {
          total += (quantity-total);

          console.log("Completely done; total = " + total);

          //Signal to the caller that we're done and return.
          cb(null, total);
          return;
        }
      });
    }
    //Recursive case: insert all results and keep searching
    else {
      console.log("Inserting " + data.length + " tweets")
      insertTweets(data, Tweet, function(err, searchCB) {
        if (err) {
          cb("Failed to insert tweets.");
        }
        else {
          total += data.length;

          //Find the minimum ID of the results of this search,
          //which will be used as the max ID for the next search.
          var minID = data[0].id_str;

          for (let i of data.slice(1, data.length)) {
            if (i.id_str < minID) {
              minID = i.id_str;
            }
          }

          //Search again using the minID-1 as the max ID. When the Promise is
          //resolved, recursively call continueSearch again.
          search(term, decrInt64(minID), quantity-total, Search).then(continueSearch);
        }
      });
    }
  }
}
