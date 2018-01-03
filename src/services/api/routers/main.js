const Router = require('koa-router');

const statusCtrl = require('../controllers/status');
const shopsRouter = require('./shops').router();

const mainRouter = Router();

mainRouter.get('/', async ctx => {

  ctx.body = 'Api is working fine !';

});

mainRouter.get('/info', async ctx => {

  ctx.body = await statusCtrl.info();

});

mainRouter.use('/shop', shopsRouter.routes(), shopsRouter.allowedMethods() );

module.exports = mainRouter;