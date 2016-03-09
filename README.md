# sails-hook-mongoindexes
Hook for [sails](http://sailsjs.org/) and mongoDB

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]

## About
This hook allows us to write indexes for mongoDB 

## Use
Install
~~~
npm install sails-hook-mongoindexes
~~~
In `config/connections.js`
~~~js
module.exports.connections = {
  //It is important that the field contains the word "mongodb"
  somethingMongodbServer:{
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    // user: 'username',
    // password: 'password',
    database: 'test'
  },
  //You can configure multiple databases with the same format
  othermongoDBServer:{}
}
~~~
In models, example `User.js`
~~~js
module.exports = {
  //Put names on your fields
  atributes:{
    name: 'string',
    lastName: 'string',
    userName: 'string',
    password: 'string',    
  },
  //And here your indexes for that fields
  index: [
    {
      //Now you can index unique fields
      ind:{userName:1},
      ops: {
        unique: true,
        required: true,
      }
    },
    {
      //Agruop fields
      ind:{name:1, lastName:1},
      ops: {
        unique: true,
        w:1
      }
    },
    {
      //Or simply required
      ind:{password:1},
      ops: {
        required: true,
        w:1
      }
    }
  ]
};
~~~
Thats all!

## Info
This app set true async in sails.config.globals when configures this hook.


[npm-image]: https://img.shields.io/npm/v/sails-hook-mongoindexes.svg
[npm-url]: https://npmjs.org/package/sails-hook-mongoindexes
[downloads-image]: https://img.shields.io/npm/dm/sails-hook-mongoindexes.svg
[downloads-url]: https://npmjs.org/package/sails-hook-mongoindexes