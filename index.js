var mongo = require('mongodb').MongoClient;

module.exports = function indexes(sails) {
  return {
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
      if(sails.config.connections){
        var keys = Object.keys(sails.config.connections);
        keys.forEach(function(item) {
          var connections = sails.config.connections[item];
          if(connections.adapter==='sails-mongo'){
            sails.log.info('Add base: %s', item);
            if(connections.host!==host) host= connections.host;
            if(connections.port!==port) port=connections.port;
            if(connections.database!==database) database=connections.database;
            sails.config[name].urls.push(
              'mongodb://'+host+':'+port+'/'+database
            );            
          }
        }, this);
      }
    },
    //Start hook
    initialize: function (cb) {
      sails.log.info('Initialize indexes');
      async.mapLimit(
        sails.config.mongoindexes.urls,
        1,
        function (url, next) {
          if(sails.models){
            var nameModels = Object.keys(sails.models);
            return mapModels(url,nameModels,next);
          }else return next();
        },
        cb
      );
    }
  };
};

function mapModels(url, names,cb) {
  async.mapLimit(names, 1, iterCollection(url), cb);
}

function iterCollection(url){
  return function(name,cb){
    async.map(sails.models[name].index,function iterIndex(item, next) {
      mongo.connect(url, function (err, db) {
        if(err) return next(err);
        else{
          var collection = db.collection(name);
          return collection.createIndex(item.ind,item.ops,next);
        }
      });
    }, cb);
  };
}