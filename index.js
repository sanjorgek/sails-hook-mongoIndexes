var mongo = require('mongodb').MongoClient;

module.exports = function indexes(sails) {
  return {
    defaults: {
      indexes: {
        host: 'localhost',
        port: 27017,
        database: 'test'
      }
    },
    //configure: function () {},
    //initialize: function (cb) {},
    //routes: {}
  }
}