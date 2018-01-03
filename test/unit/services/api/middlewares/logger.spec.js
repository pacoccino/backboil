const path = require('path');
const sinon = require('sinon');

const logger = require(path.join(srcDir, '/modules/logger') );
const LoggerMiddleware = require(path.join(srcDir, '/services/api/middlewares/logger') )();

describe('Middleware: Error', () => {
  let sandbox = null;


  beforeEach(async () => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox && sandbox.restore();
  });

  it('run', async () => {

    const loginfo = sandbox.stub(logger, 'verbose');
    const next = sinon.stub();
    const ctx = {
      request: {
        path: 'path',
        method: 'method',
        query: 'query',
        ip: 'ip',
        route: 'route',
        url: 'url',
        host: 'host',
        protocol: 'protocol',
        get: sandbox.stub().returns('deviceid'),
      },
      response: {
        set: sandbox.stub(),
      },
      status: 100,
    };

    await LoggerMiddleware(ctx, next);

    expect(ctx.requestInfo.start).to.exist;
    expect(ctx.requestInfo.time).to.exist;
    expect(ctx.requestInfo.correlationId).to.exist;
    expect(ctx.requestInfo.status).to.eq(100);
    expect(ctx.requestInfo.DeviceId).to.eq('deviceid');
    expect(ctx.requestInfo.path).to.eq('path');
    expect(ctx.requestInfo.method).to.eq('method');
    expect(ctx.requestInfo.query).to.eq('query');
    expect(ctx.requestInfo.ip).to.eq('ip');
    expect(ctx.requestInfo.route).to.eq('route');
    expect(ctx.requestInfo.url).to.eq('url');
    expect(ctx.requestInfo.host).to.eq('host');
    expect(ctx.requestInfo.protocol).to.eq('protocol');
    expect(ctx.requestInfo.status).to.eq(100);

    expect(next.calledWith()).to.be.true;
    expect(ctx.request.get.calledWith('DeviceId')).to.be.true;
    expect(ctx.response.set.calledWith('X-Correlation-Id', ctx.requestInfo.correlationId)).to.be.true;
    expect(loginfo.args[0][0]).to.eq('API request');
    expect(loginfo.args[0][1]).to.eq(ctx.requestInfo);

  });

  it('log error', async () => {

    const loginfo = sandbox.stub(logger, 'error');
    const ctx = {
      request: {
        path: 'path',
        method: 'method',
        query: 'query',
        ip: 'ip',
        route: 'route',
        url: 'url',
        host: 'host',
        protocol: 'protocol',
        get: sandbox.stub().returns('deviceid'),
      },
      response: {
        set: sandbox.stub(),
      },
      status: 100,
    };
    const next = async () => (ctx.requestInfo.error = new Error('e'));

    await LoggerMiddleware(ctx, next);

    expect(loginfo.args[0][0]).to.eq('API request');
    expect(loginfo.args[0][1].error.message).to.eq('e');

  });

});
