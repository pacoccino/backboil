const uuid = require('uuid/v4');
const logger = require('../../../modules/logger');

module.exports = () => async (ctx, next) => {

  if(ctx.request.method === 'OPTIONS') {
    return next();
  }

  const correlationId = uuid();
  ctx.requestInfo = {
    start: Date.now(),
    correlationId,
    DeviceId: ctx.request.get('DeviceId'),
    path: ctx.request.path,
    method: ctx.request.method,
    query: ctx.request.query,
    ip: ctx.request.ip,
    route: ctx.request.route,
    url: ctx.request.url,
    host: ctx.request.host,
    protocol: ctx.request.protocol,
  };

  ctx.response.set('X-Correlation-Id', correlationId);
  // TODO use cls to send correlationID to microservices

  await next();

  ctx.requestInfo.status = ctx.status;
  ctx.requestInfo.time = Date.now() - ctx.requestInfo.start;

  let level = 'verbose';

  if(ctx.requestInfo.error) {
    level = 'error';
  }
  logger[level]('API request', ctx.requestInfo);

};