/*Mongoose model for metadata about a Twitter search.

  Authors: Alec Custer and Jack Taylor
*/

var mongoose = require('mongoose');
require('mongoose-long')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;

var SearchSchema = new Schema({
  _id: Number,
  maxID: SchemaTypes.Long,
  minID: SchemaTypes.Long
});

module.exports = {
  getModel: function getModel(connection) {
    return connection.model("Search", SearchSchema);
  }
};
