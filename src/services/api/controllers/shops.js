const { Shop } = require('../../../models');

module.exports = {

  async getAllShops() {

    const shops = await Shop.find({});

    return shops.map(shop => shop.toObject());

  },

  async addNewShop (rawShop) {

    const shop = new Shop(rawShop);

    await shop.save();

    return shop.toObject();

  },

};
