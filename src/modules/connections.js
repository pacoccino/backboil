const Redis = require('./redis');
const MongoDB = require('./mongodb');
const logger = require('../modules/logger');
const Utils = require('../helpers/utils');

const Connections = {
  openedConnections: [],

  open(needConnections) {

    return Promise.all(
      needConnections.map(connection => {
        if(!connection || Connections.openedConnections.find(c => c === connection)) return Promise.resolve();

        Connections.openedConnections.push(connection);

        switch(connection) {
          case 'mongodb': {
            return MongoDB.connect();
          }
          case 'redis': {
            return Redis.connect();
          }
          default: {
            Connections.openedConnections.pop();
            return Promise.reject('Unknown service to connect to');
          }
        }

      }))
      .then(() => {
        logger.verbose('Connections open');
      })
      .catch(error => {
        logger.error('Unable to open connections', { error });
        throw error;
      });

  },

  close() {

    return Promise.all(
      Connections.openedConnections.map(connection => {
        switch(connection) {
          case 'mongodb': {
            return MongoDB.disconnect();
          }
          case 'redis': {
            return Redis.disconnect();
          }
          default: {
            return Promise.reject('Unknown service to disconnect from');
          }
        }
      }))
      .then(() => {
        Connections.openedConnections = [];
        logger.verbose('Connections closed');
        logger.purge();
        return Utils.wait(500);
      })
      .catch(error => {
        logger.error('Unable to close connections', { error });
        throw err;
      });

  },

};

module.exports = Connections;
