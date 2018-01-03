const path = require('path');
const sinon = require('sinon');
const IndexRouter = require(path.join(srcDir, '/services/api/routers/index') );

describe('Router: index', () => {
  let sandbox = null;

  beforeEach(async () => {

    sandbox = sinon.sandbox.create();

  });

  afterEach(() => {

    sandbox && sandbox.restore();

  });

  it('Should get main router', async () => {

    expect(typeof IndexRouter).to.eq('function');

  });

});
