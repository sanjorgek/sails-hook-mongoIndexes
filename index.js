var mongo = require('mongodb').MongoClient;
var reg = new RegExp(/[Mm]ongo[Dd][Bb]/);

module.exports = function indexes(sails) {
  return {
    //Default config
    //defaults: {mongoindexes: {urls: ['mongodb://localhost:27017/test']}},
    //Hook config
    configure: function () {
      sails.log.info('Config monngoindexes');
      var name = this.configKey;
      var host = 'localhost';
      var port = 27017;
      var database = 'test';
      sails.config[name] = {
        urls: []
      };
      sails.log.warn('async is active as global');
      sails.config.globals.async = true;
      if(sails.config['connections']){
        var keys = Object.keys(sails.config['connections']);
        keys.forEach(function(item) {
          var connections = sails.config['connections'][item];
          if(reg.test(item)){
            sails.log.info('Add base: %s', item);
            if(connections.host!=host) host= connections.host;
            if(connections.port!=port) port=connections.port;
            if(connections.database!=database) database=connections.database;
            sails.config[name].urls.push(
              'mongodb://'+host+':'+port+'/'+database
            );            
          }
        }, this);
      }else sails.config[name].urls.push(
        'mongodb://'+host+':'+port+'/'+database
      );
    },
    //Start hook
    initialize: function (cb) {
      async.mapLimit(
        sails.config.mongoindexes.urls,
        1,
        function (item, next) {
          if(sails.models){
            var nameModels = Object.keys(sails.models);
            mapModels(nameModels,next);
          }else next();
        },
        cb
      );
    }
    //No routes for this hook
    //routes: {}
  }
};

function mapModels(names,cb) {
  async.mapLimit(names, 1, iterCollection, cb);
};

function iterCollection(name,cb){
  async.map(sails.models[name].index,function iterIndex(item, next) {
    mongo.connect(sails.config.mongoindexes.url, function (err, db) {
      if(err) next(err);
      else{
        var collection = db.collection(name);
        collection.createIndex(item.ind,item.ops,next);
      }
    });
  }, cb);
};