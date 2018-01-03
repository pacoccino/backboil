const Transport = require('winston-transport');
const logzioNodejs = require('logzio-nodejs');
const Formats = require('./formats');
const CONFIG = require('../../../config');

module.exports = class ExternalLogger extends Transport {
  constructor(opts) {
    super(opts);

    if(CONFIG.LOGZIO_KEY) {
      this.logzioLogger = logzioNodejs.createLogger({
        token: CONFIG.LOGZIO_KEY,
        host: 'listener.logz.io',
        type: 'backend',
        protocol: 'https',
      });
    }

    if(CONFIG.RAVEN_KEY) {
      this.Raven = require('raven');
      this.Raven.config(
        CONFIG.RAVEN_KEY,
        {
          environment: CONFIG.ENVIRONMENT,
          tags:{
            service: 'backend',
          },
        }
      ).install();
    }
  }

  log(info, callback) {

    const msg = Formats.formatMetaPure(info);

    if(this.logzioLogger) {
      this.logzioLogger.log(msg);
    }
    if(this.Raven && info.error instanceof Error && !info.error.exposeCustom_) {
      this.Raven.captureException(info.error,
        {
          tags: info.tags,
          level: info.level,
          user: { userId: info.meta.userId },
        }
      );
    }

    callback();

  }

  purge() {

    if(this.logzioLogger) {
      this.logzioLogger.sendAndClose();
      console.log('purged')
    }

  }

};