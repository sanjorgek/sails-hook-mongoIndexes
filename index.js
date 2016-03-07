var mongo = require('mongodb').MongoClient;
var reg = new RegExp(/[Mm]ongo[Dd][Bb]/);

module.exports = function indexes(sails) {
  return {
    //defaults: {mongoindexes: {url: 'mongodb://localhost:27017/test'}},
    configure: function () {
      var name = this.configKey;
      sails.config.globals.async = true;
      if(sails.config['connections']){
        var keys = Object.keys(sails.config['connections']);
        keys.forEach(function(item) {
          var connections = sails.config['connections'][item];
          if(reg.test(item)){
            var host = 'localhost';
            var port = 27017;
            var database = 'test';
            if(connections.host!='localhost') host= connections.host;
            if(connections.port!=27017) port=connections.port;
            if(connections.database!='test') database=connections.database;
            sails.config[name] = {
              url : 'mongodb://'+host+':'+port+'/'+database
            };
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
        collection.createIndex(item.ind,item.ops,next);
      }
    });
  }, cb);
};