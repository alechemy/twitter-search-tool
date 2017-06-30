/*A NodeJS/Express server configuration for a Twitter search tool.

  Authors: Alec Custer and Jack Taylor
*/

//Import various project dependencies
var mongoose = require ("mongoose"), Admin = mongoose.mongo.Admin;
var express = require("express");
var path = require('path');
var http = require('http');
var bodyParser = require("body-parser");

//Import Mongoose models/schemas
var TweetModel = require("./models/tweet");
var SearchModel = require("./models/search");

//Server-side code for searching twitter
var getTweetsSearch = require("./server/twitterSearch");

//Initialize Express app
var app = express();

//Parsers for POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Point static path to dist folder, which contains front-end app
app.use(express.static(path.join(__dirname, 'dist')));

// Default database URL, used to poll the names of local DBs
var defaultDB = 'mongodb://localhost/DefaultConnection';

// The http server will listen to an appropriate port, or default to
// port 3000.
var port = process.env.PORT || '3000';
app.set('port', port);

//Create http server and listen on provided port
var server = http.createServer(app);
server.listen(port, () => console.log(`App running on localhost:${port}`));

//Generic error handler that logs errors and sends an http response to the
//client
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"message": reason});
}

//Global variable containing the list of all local databases; used to
//populate the 'searches' page and check if a newly created search
//already exists.
var allDatabases;

/*
  GET route for retrieving all local Mongo databases with the "TWITTER_" prefix
*/
app.get('/api/searches', function(req, res) {
  var connection = mongoose.createConnection(defaultDB);

  connection.on('open', function() {
    // connection established
    new Admin(connection.db).listDatabases(function(err, result) {
      //close the connection
      connection.close();

      allDatabases = result.databases;
      twitterDBs = [];

      //Filter list of databases to include only those created by the tool
      for (db of allDatabases) {
        if (db.name.includes("TWITTER_")) {
          twitterDBs.push(db);
        }
      }

      //Send list of databases to the client
      res.status(200).json(twitterDBs);
    });
  });
});

/*
  GET route for retrieving data about an existing search.

  Returns the min ID and max ID of the search, the number of tweets currently
  stored, and a maximum of 100 tweets in the tweets collection.
*/
app.get('/api/searches/:name', function(req, res) {
  console.log("Connecting to " + req.params.name);
  var uristring = 'mongodb://localhost/' + req.params.name;

  var conn = mongoose.createConnection(uristring);

  //Mongoose requires assigning  models to new connections
  var Search = SearchModel.getModel(conn);
  var Tweet = TweetModel.getModel(conn);

  conn.on('open', function() {
    //Find the document containing search metadata
    Search.findOne({_id: 1}, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to get search data");
        conn.close();
      }
      else {
        //Create empty object that will eventually be returned to the client
        var searchData = {};

        //Assign minID and maxID
        if (doc.minID) {
          searchData.minID = doc.minID;
        }
        if (doc.maxID) {
          searchData.maxID = doc.maxID;
        }

        //Next, get the number of tweets in the database
        Tweet.count({}, function(err, count) {
          if (err) {
            conn.close();
            handleError(res, err.message, "Failed to get tweet count");
          }
          else {
            //Include count in searchData
            searchData.count = count;

            //Build query for a maximum of 100 tweets
            var query = Tweet.find({})
            query.limit(100);

            //Execute query
            query.exec(function(err, docs) {
              //Ready to close the connection
              conn.close();

              if (err) {
                handleError(res, err.message, "Failed to get tweets");
              } else {
                //Finally, assign tweets data and send to the client.
                searchData.tweets = docs;
                res.status(200).json(searchData);
              }
            });

          }
        });
      }
    });

  });
});

/*
  DELETE request for dropping an existing search database
*/
app.delete('/api/searches/:name', function(req, res) {
  var uristring = 'mongodb://localhost/' + req.params.name;

  var conn = mongoose.createConnection(uristring);

  conn.on('open', function() {
    conn.db.dropDatabase(function(err) {
      conn.close();

      if (err) {
        handleError(res, err.message, "Failed to drop database");
      } else {
        console.log("Dropped " + req.params.name);
        res.status(200).json({message: "Dropped " + req.params.name});
      }
    })
  });
});

/*
  POST request for creating a new search

  Formats the search term into a valid MongoDB database name, then conducts
  a Twitter search (using functions in /server/twitterSearch.js) and saves
  the results into a new database.
*/
app.post('/api/tweets', function(req, res) {
  var searchterm = req.body.query;

  //Prepend TWITTER_ prefix and remove characters that MongoDB disallows
  //in database names
  var filteredString = "TWITTER_" + searchterm.replace(/[/\. "$*<>:|?]/g, "_");

  //Check to see if the requested query is already present. If so, throw an
  //error.
  function findDB(db) {
    return db.name === filteredString;
  }

  if (allDatabases.find(findDB)) {
    handleError(res, "Database '"+ filteredString + "' already exists.");
  }
  else {
    var uristring = 'mongodb://localhost/' + filteredString;

    var conn = mongoose.createConnection(uristring);

    var Search = SearchModel.getModel(conn);
    var Tweet = TweetModel.getModel(conn);

    conn.on("open", function() {
      //Pass response object, twitter configuration object, query, quantity,
      //models, and a callback function to getTweetsSearch()!
      getTweetsSearch(searchterm, req.body.quantity, Tweet, Search, function(err, tweets) {
        conn.close();

        if (err) {
          handleError(res, err, err);
        }
        else {
          //If all went well, send a positive response to the client.
          res.status(201).json({message: "Tweets successfully added!" });
        }
      });
    })

  }

});

//All unrecognized routes redirect to the homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Close db connection when the app is closed
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('\nMongoose default connection disconnected by app termination');
    process.exit(0);
  });
});
