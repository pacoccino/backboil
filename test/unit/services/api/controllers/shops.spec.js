const path = require('path');
const sinon = require('sinon');

const Models = require(path.join(srcDir, '/models') );
const ShopsCtrl = require(path.join(srcDir, '/services/api/controllers/shops') );

describe('Controller: Shop', function(){
  let sandbox = null;

  beforeEach( (done) => {
    sandbox = sinon.sandbox.create();
    mockgoose.helper.reset().then(() => {
      done()
    });
  });

  afterEach( () => {
    sandbox && sandbox.restore();
  });

  it('Should add new shop and get user', async () => {

    const rawShop = {
      name: 'hey',
      address: 'hey',
      country: 'hey',
      iso: 'AZE',
      lat: 1.12,
      lng: 3.23,
      postcode: 3423,
      phone: 'hey',
      ads1: 'hey',
      ads2: 'hey',
    };

    const res = await ShopsCtrl.addNewShop(rawShop);

    const shop = await Models.Shop.findOne({ _id: res._id });

    expect(res._id.toString()).to.eq(shop._id.toString());
    expect(res.name).to.eq(shop.name);
    expect(res.address).to.eq(shop.address);
    expect(res.country).to.eq(shop.country);
    expect(res.iso).to.eq(shop.iso);
    expect(res.lat).to.eq(shop.lat);
    expect(res.lng).to.eq(shop.lng);
    expect(res.postcode).to.eq(shop.postcode);
    expect(res.phone).to.eq(shop.phone);
    expect(res.ads1).to.eq(shop.ads1);
    expect(res.ads2).to.eq(shop.ads2);

    expect(typeof res.save).not.to.eq('function');

  });

  it('Should get all shops', async () => {

    // expect(false).to.be.true;
    const rawShop = {
      name: 'hey',
      address: 'hey',
      country: 'hey',
      iso: 'AZE',
      lat: 1.12,
      lng: 3.23,
      postcode: 3423,
      phone: 'hey',
      ads1: 'hey',
      ads2: 'hey',
    };
    const rawShop2 = {
      name: 'hey121',
      address: 'hey121',
      country: 'hey121',
      iso: 'AZE',
      lat: 1.11212,
      lng: 3.21213,
      postcode: 123,
      phone: 'hey121',
      ads1: 'hey121',
      ads2: 'hey121',
    };

    const res = await ShopsCtrl.addNewShop(rawShop);
    const res2 = await ShopsCtrl.addNewShop(rawShop2);

    const shops = await ShopsCtrl.getAllShops();

    expect(shops.length).eq(2);
    expect(shops[0]._id.toString()).eq(res._id.toString());
    expect(shops[1]._id.toString()).eq(res2._id.toString());

  });
});
