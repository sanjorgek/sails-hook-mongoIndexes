var mongo = require('mongodb').MongoClient;
var reg = new RegExp(/[Mm]ongo[Dd][Bb]/);

module.exports = function indexes(sails) {
  return {
    defaults: {
      mongoindexes: {
        url: 'mongodb://localhost:27017/test'}
    },
    configure: function () {
      var name = this.configKey;
      sails.config.globals.async = true;
      if(sails.config['connections']){
        var keys = Object.keys(sails.config['connections']);
        keys.forEach(function(item) {
          if(reg.test(item) && sails.config['connections'][item].host!='localhost' && sails.config['connections'][item].port!=2717 && sails.config['connections'][item].database!='test'){
            sails.config[name].url = 'mongodb://'+sails.config['connections'][item].host+'/'+sails.config['connections'][item].port+'/'+sails.config['connections'][item]+'/'+sails.config['connections'][item].database;
          }
        }, this);
      }
    },
    initialize: function (cb) {
      if(sails.models){
        var nameModels = Object.keys(sails.models);
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
    mongo.connect(sails.config.mongoindexes.url, function (err, db) {
      if(err) next(err);
      else{
        var collection = db.collection(name);
        next();
				//collection.createIndex(item.ind,item.ops, cb);
      }
    });
  }, cb)
};