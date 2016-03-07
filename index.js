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
      sails.config.globals.async = true;
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
        var nameModels = Object.keys(sails.models);
        nameModels.forEach(function(item) {
          console.log(item);
        }, this);
        mapModels(nameModels,cb);
      }else cb();
    }
    //routes: {}
  }
};

function mapModels(names,cb) {
  async.mapLimit(names, 1, iterCollection, cb);
};

function iterCollection(name,cb){
  async.mapLimit(sails.models[name].index,1,function iterIndex(item, next) {
    next();
  }, cb)
};