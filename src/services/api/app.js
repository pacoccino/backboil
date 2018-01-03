const Koa = require('koa');

const middlewares = require('./middlewares');
const routers = require('./routers');
const logger = require('../../modules/logger');

const CONFIG = require('../../../config');

const API = () => new Promise((resolve, reject) => {
  const app = new Koa();

  app.on('error', error => {

    logger.error('Unexpected API error', { error });

  });

  app.use(middlewares);
  app.use(routers);

  app.listen(CONFIG.PORT, (err) => {

    if(err) {
      return reject(err);
    }

    logger.info(`API listening on ${CONFIG.PORT}`);
    resolve(app);

  });
});

module.exports = API;