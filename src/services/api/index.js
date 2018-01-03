const app = require('./app');
const Utils = require('../../helpers/utils');

const APIService = {
  NEED_CONNECTIONS: ['mongodb'],

  start() {
    return app();
  },

  stop: Utils.noop,

};

module.exports = APIService;