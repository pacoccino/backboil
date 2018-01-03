const path = require('path');
const sinon = require('sinon');
const Router = require('koa-router');
const MainRouter = require(path.join(srcDir, '/services/api/routers/main') );

describe('Router: Main', () => {
  let sandbox = null;

  beforeEach(async () => {

    sandbox = sinon.sandbox.create();

  });

  afterEach(() => {

    sandbox && sandbox.restore();

  });

  it('Should get main router', async () => {

    expect(MainRouter instanceof Router).to.be.true;

  });

});
