const winston = require("winston");

const CONFIG = require('../../../config');
const ExternalLogger = require('./external');
const Formats = require('./formats');

const format = winston.format.combine(...[
  Formats.formatError(),
  winston.format.timestamp(),
  Formats.formatMachine(),
]);

const consoleFormat = winston.format.combine(...[
  CONFIG.REMOTE_EXECUTION ? null : winston.format.colorize(),
  Formats.consoleFormat({ showDetails: true }),
].filter(f => f !== null));

const transports = [
  new winston.transports.Console({
    name: 'console',
    format: consoleFormat,
    // handleExceptions: true,
    // humanReadableUnhandledException: true,
  }),
  new ExternalLogger({}),
];

const logger = new winston.createLogger({
  level: 'debug',
  exitOnError: true,
  format,
  transports,
});

logger.purge = () => {
  transports[1].purge();
};

module.exports = logger;
