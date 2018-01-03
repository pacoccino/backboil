const config = require('../../../../config');

module.exports = {

  info: async () => {

    const info = {
      status: 'healthy',
      environment: config.ENVIRONMENT,
      time: Date.now(),
    };

    return info;

  },


};