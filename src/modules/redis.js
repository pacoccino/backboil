const redis = require('ioredis');
const config = require('../../config');
const logger = require('./logger');

const Redis = {

  mainClient: null,
  openedClients: [],

  connect() {
    return new Promise((resolve, reject) => {

      const options = {
        retryStrategy: function (attempt) {
          if (attempt > 1) {
            // End reconnecting with built in error
            return false;
          }
          // reconnect after
          return Math.min(attempt * 100, 2000);
        },
        reconnectOnError: function (err) {
          const targetError = 'ECONNREFUSED';
          if (err.message.slice(0, targetError.length) === targetError) {
            // Only reconnect when the error starts with "READONLY"
            return false; // or `return 1;`
          }
        }
      };

      const client = new redis(config.REDIS_URL, options);

      client.on('ready', function () {
        logger.verbose('Redis successfully connected');
        Redis.mainClient = client;
        resolve(client);
      });

      client.on('error', error => {
        if(error.code === 'ECONNREFUSED') {
          reject(error);
        } else {
          logger.error('redis error', { error });
        }
      })
    });
  },

  disconnect() {
    if(Redis.mainClient) {
      Redis.mainClient.disconnect();
      Redis.openedClients.forEach(c => c.disconnect());
      Redis.openedClients = [];
    }
    logger.verbose('Redis successfully disconnected');
  },

  getMainClient() {
    if(!Redis.mainClient) throw new Error('Redis not connected');
    return Redis.mainClient;
  },

  getNewClient() {
    if(!Redis.mainClient) throw new Error('Redis not connected');

    const newClient = Redis.mainClient.duplicate();
    Redis.openedClients.push(newClient);

    return newClient;
  }

};

module.exports = Redis;