const Router = require('koa-router');

const shopsController = require('../controllers/shops');
const { joiShop, validateParams } = require('../../../helpers/validation');

const ShopsRouter = {

  async getAllShops(ctx) {

    ctx.body = await shopsController.getAllShops();

  },

  async addNewShop(ctx) {

    const params = ctx.request.body;

    validateParams(params, joiShop);

    ctx.body = await shopsController.addNewShop(params);

  },

  router() {
    const router = Router();

    /**
     * @api {post} /shop Get all shops
     * @apiName shop_add_new
     * @apiGroup Shops
     * @apiDescription Add new shop
     *
     * @apiSampleRequest /shop
     *
     * @apiParam {object}  shop
     * @apiParam {string}  shop.firstName
     * @apiParam {string}  shop.lastName
     * @apiParam {string}  shop.email
     * @apiParam {string}  shop.password
     * @apiParam {boolean} shop.terms
     */
    router.post('/', ShopsRouter.addNewShop);

    /**
     * @api {get} /shop Get all shops
     * @apiName shop_get_all
     * @apiGroup Shops
     * @apiDescription Get all shops
     *
     * @apiSampleRequest /shop
     *
     */
    router.get('/', ShopsRouter.getAllShops);

    return router;
  },

};

module.exports = ShopsRouter;