const compose = require('koa-compose');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const authMiddleware = require('./auth');
const loggerMiddleware = require('./logger');
const errorMiddleware = require('./error');

module.exports = compose([

  loggerMiddleware(),
  errorMiddleware(),

  authMiddleware.readJWT(),

  bodyParser(),
  cors(),

]);
