const compose = require('koa-compose');

const mainRouter = require('./main');

module.exports = compose([

  mainRouter.routes(),
  mainRouter.allowedMethods(),

]);
