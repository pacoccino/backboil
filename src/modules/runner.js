const cluster = require('cluster');
const throng = require('throng');
const Connections = require('./connections');
const logger = require('../modules/logger');

let stopping = false;

function stopApps(apps, code) {
  setTimeout(() => {
    process.exit(code);
  }, 20 * 1000); // Force exit in any cases after timeout

  if(stopping) return;
  stopping = true;

  logger.info('Exiting...');

  Promise.all(apps.map(app => app.stop()))
    .then(() => Connections.close())
    .then(() => process.exit(code));
}

async function runApps(apps) {

  process.on('exit', stopApps.bind(null, apps));
  process.on('SIGINT', stopApps.bind(null, apps));
  process.on('SIGTERM', stopApps.bind(null, apps));

  process.on('unhandledRejection', error => {
    logger.error('Unhandled Promise Rejection', { error });
    stopApps(apps, -1);
  });

  process.on('uncaughtException', error => {
    logger.error('Uncaught Exception', { error });
    stopApps(apps, -1);
  });

  const neededConnections = apps.reduce((acc, app) => (app.NEED_CONNECTIONS ? acc.concat(app.NEED_CONNECTIONS) : acc), []);
  await Connections.open(neededConnections);

  await Promise.all(apps.map(app => app.start()));

  logger.info('Application successfully started');

  //setTimeout(() => {
  //  logger.error('bad weather', { error: new Error('raining is failing') });
  //  stop();
  //}, 1000);

}

function clusterApps(apps) {

  const WORKERS = process.env.WEB_CONCURRENCY || 1;

  function masterFunction() {
    console.log('Master started');

    let nbStops = 0;
    let startedAt = Date.now();
    cluster.on('exit', (worker) => {
      nbStops++;
      let uptime = startedAt - Date.now();
      if (nbStops > 3 && uptime < 10 * 1000) {
        logger.error('Too many worker died', { nbStops });
        process.exit(-1);
        return;
      }
      logger.warn('Worker died, relieving', { nbStops });
    });

  }

  function startFunction(id) {
    console.log(`Worker ${id} started`);
    runApps(apps).catch(console.error);
  }

  throng({
    workers: WORKERS,
    grace: 1000,
    lifetime: Infinity,
    master: masterFunction,
    start: startFunction
  });

}

function Runner(args) {
  if(!args) throw new Error('need app');

  let apps = args;
  if(!Array.isArray(args)) {
    apps = [args];
  }

  if(process.env.CLUSTERING) {
    clusterApps(apps);
  } else {
    runApps(apps).catch(console.error);
  }

}

module.exports = Runner;
