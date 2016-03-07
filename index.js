var mongo = require('mongodb').MongoClient;
var reg = new RegExp(/[Mm]ongo[Dd][Bb]/);

module.exports = function indexes(sails) {
  return {
    defaults: {
      indexes: {
        host: 'localhost',
        port: 27017,
        database: 'test'
      }
    },
    configure: function () {
      var name = this.configKey;
      if(sails.config['connections']){
        var keys = Object.keys(sails.config['connections']);
        keys.forEach(function(item) {
          if(reg.test(item)){
            sails.config[name] = sails.config['connections'].item;
          }
        }, this);
      }
    },
    initialize: function (cb) {
      if(sails.models){
        cb();
      }else cb();
    }
    //routes: {}
  }
}