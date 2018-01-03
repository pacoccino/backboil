require('dotenv').config();

const CONFIG = {

  ENVIRONMENT: process.env.ENVIRONMENT || 'development',
  NODE_ENV: process.env.NODE_ENV || 'development',
  REMOTE_EXECUTION: process.env.REMOTE_EXECUTION === 'true',
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'pouetpouetpouet',

  MONGODB_URI: process.env.JWT_SECRET || 'mongodb://localhost:27017/backboil',

  RAVEN_KEY: process.env.RAVEN_KEY || null,
  LOGZIO_KEY: process.env.LOGZIO_KEY || null,

  ETH_NETWORK: process.env.ETH_NETWORK || 'kovan',

};

module.exports = CONFIG;
