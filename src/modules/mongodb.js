const mongoose = require('mongoose');

const config = require('../../config');
const logger = require('./logger');

const {
  MONGODB_URI,
} = config;

const options = {
  useMongoClient: true,
  promiseLibrary: Promise,
};

const MongoDB = {

  db: null,

  async connect() {

    await mongoose.connect(MONGODB_URI, options);

    MongoDB.db = mongoose.connection;

    MongoDB.db.on('error', error => {
      logger.warn('[MongoDB] error', { error });
    });

  },

  async disconnect() {

    await mongoose.disconnect();
    logger.warn('[MongoDB] is disconnected');

  },

};

module.exports = MongoDB;