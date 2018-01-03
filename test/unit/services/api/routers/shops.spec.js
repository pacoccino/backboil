const path = require('path');
const sinon = require('sinon');
const Router = require('koa-router');

const ShopsRouter = require(path.join(srcDir, '/services/api/routers/shops') );
const ShopsCtrl = require(path.join(srcDir, '/services/api/controllers/shops') );

describe('Router: Shops', () => {
  let sandbox = null;

  beforeEach(async () => {

    sandbox = sinon.sandbox.create();
    this.get = sandbox.stub(Router.prototype, 'get');
    this.post = sandbox.stub(Router.prototype, 'post');

  });

  afterEach(() => {

    sandbox && sandbox.restore();

  });

  it('Should get router', async () => {

    const router = await ShopsRouter.router();

    expect(router instanceof Router).to.be.true;
    expect(this.get.calledWith('/', ShopsRouter.getAllShops) ).to.be.true;
    expect(this.post.calledWith('/', ShopsRouter.addNewShop) ).to.be.true;

  });

  it('Should get all shops', async () => {

    const getAll = sandbox.stub(ShopsCtrl, 'getAllShops').resolves('data');

    const ctx = {};
    await ShopsRouter.getAllShops(ctx);

    expect(ctx.body).to.eq('data');
    expect(getAll.calledOnce).to.be.true;

  });

  it('Should add new shop', async () => {

    const fakeShop = 'shop';

    const addNewShop = sandbox.stub(ShopsCtrl, 'addNewShop').resolves(fakeShop);

    const rawShop = {
      name: 'hey',
      address: 'hey',
      country: 'hey',
      iso: 'hey',
      lat: 1.12,
      lng: 3.23,
      postcode: 33000,
      phone: 'hey',
      ads1: 'hey',
      ads2: 'hey',
    };
    const ctx = {
      request: {
        body: rawShop,
      }
    };

    await ShopsRouter.addNewShop(ctx);

    expect(ctx.body).to.eq(fakeShop);

    expect(addNewShop.calledWith(rawShop)).to.be.true;

  });

  it('Should createUser: invalid', async () => {
    const s = sandbox.stub(ShopsCtrl, 'addNewShop').resolves('data');

    function modifiedCtx(key, value) {
      const rawUser = {
        name: 'hey',
        address: 'hey',
        country: 'hey',
        iso: 'hey',
        lat: 1.12,
        lng: 3.23,
        postcode: 'hey',
        phone: 'hey',
        ads1: 'hey',
        ads2: 'hey',
      };

      return {
        request: {
          body: Object.assign({}, rawUser, {
            [key]: value,
          }),
        },
      };
    }

    const ctxs = [
      modifiedCtx('name', null),
      modifiedCtx('address', null),
      modifiedCtx('country', null),
      modifiedCtx('iso', null),
      modifiedCtx('lat', null),
      modifiedCtx('lat', 'fezf'),
      modifiedCtx('lng', null),
      modifiedCtx('lng', 'fezf'),
      modifiedCtx('postcode', null),
      modifiedCtx('phone', null),
      modifiedCtx('ads1', null),
      modifiedCtx('ads2', null),
    ];

    await Promise.all(ctxs.map(ctx => expect(ShopsRouter.addNewShop(ctx)).to.be.rejectedWith(Error, 'bad_params')));
    expect(s.calledOnce).to.be.false;

  });

});
