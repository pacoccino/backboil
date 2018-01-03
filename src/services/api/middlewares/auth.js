const errors = require('../../../helpers/errors');
const koaJWT = require('koa-jwt');

const CONFIG = require('../../../../config');

const JWT_KEY = 'jwt';

const AuthMiddleware = {

  readJWT: () => koaJWT({
    secret: CONFIG.JWT_SECRET,
    passthrough: true,
    key: JWT_KEY,
  }),

  authAssert: (opts = {}) => async (ctx, next) => {
    ctx.state.userId = ctx.state[JWT_KEY] ? ctx.state[JWT_KEY].userId : null;

    if(ctx.state.userId) {
      return next();
    }
    errors.throwExposableError('access_denied');
  },

};

module.exports = AuthMiddleware;