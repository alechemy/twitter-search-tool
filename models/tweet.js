/*Mongoose model for a single tweet.

  Authors: Alec Custer and Jack Taylor
*/
var mongoose = require('mongoose');
require('mongoose-long')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;

var TweetSchema = new Schema({
  _id: SchemaTypes.Long,
  authorID: SchemaTypes.Long,
  content: String,
  author: String,
  tweetLanguage: String,
  retweetCount: Number,
  favoriteCount: Number
});

module.exports = {
  getModel: function getModel(connection) {
    return connection.model("Tweet", TweetSchema);
  }
};
