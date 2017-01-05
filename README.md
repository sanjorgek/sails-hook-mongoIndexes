# sails-hook-mongoindexes

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![Build Status][build-image]][build-url]
  [![Code Climate][climate-image]][climate-url]
  [![Issue Count][issue-image]][issue-url]
  [![bitHound Overall Score][score-image]][score-url]
  [![bitHound Dependencies][dep-image]][dep-url]
  [![bitHound Dev Dependencies][devdep-image]][devdep-url]
  [![bitHound Code][code-image]][code-url]

## About
This hook allows us to write indexes for mongoDB 

  [![NPM][downloads-chart]][chart-url]

## Use
Install

```
npm install sails-hook-mongoindexes
```
In `config/connections.js`

```js
module.exports.connections = {
  somethingMongodbServer:{
    //You need sails-mongo adapter to work
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
```

In `config/models.js`

```js
module.exports.models = {
  connection: 'somethingMongodbServer',
  migrate: 'safe'
};
```
In models, example `User.js`

```js
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
```
Thats all!

[npm-image]: https://img.shields.io/npm/v/sails-hook-mongoindexes.svg
[npm-url]: https://npmjs.org/package/sails-hook-mongoindexes
[downloads-image]: https://img.shields.io/npm/dm/sails-hook-mongoindexes.svg
[downloads-url]: https://npmjs.org/package/sails-hook-mongoindexes
[downloads-chart]: https://nodei.co/npm-dl/sails-hook-mongoindexes.png?months=6&height=1
[chart-url]: https://nodei.co/npm/sails-hook-mongoindexes/
[build-image]: https://travis-ci.org/sanjorgek/sails-hook-mongoIndexes.svg
[build-url]: https://travis-ci.org/sanjorgek/sails-hook-mongoIndexes
[code-image]: https://www.bithound.io/github/sanjorgek/sails-hook-mongoindexes/badges/code.svg
[code-url]: https://www.bithound.io/github/sanjorgek/sails-hook-mongoindexes
[dep-image]: https://www.bithound.io/github/sanjorgek/sails-hook-mongoindexes/badges/dependencies.svg
[dep-url]: https://www.bithound.io/github/sanjorgek/sails-hook-mongoindexes/bithound/dependencies/npm
[devdep-image]: https://www.bithound.io/github/sanjorgek/sails-hook-mongoindexes/badges/devDependencies.svg
[devdep-url]: https://www.bithound.io/github/sanjorgek/sails-hook-mongoindexes/bithound/dependencies/npm
[score-image]: https://www.bithound.io/github/sanjorgek/sails-hook-mongoindexes/badges/score.svg
[score-url]: https://www.bithound.io/github/sanjorgek/sails-hook-mongoindexes
[issue-image]: https://codeclimate.com/github/sanjorgek/sails-hook-mongoIndexes/badges/issue_count.svg
[issue-url]: https://codeclimate.com/github/sanjorgek/sails-hook-mongoIndexes
[climate-image]: https://codeclimate.com/github/sanjorgek/sails-hook-mongoIndexes/badges/gpa.svg
[climate-url]: https://codeclimate.com/github/sanjorgek/sails-hook-mongoIndexes