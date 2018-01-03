const Joi = require('joi');
const { throwExposableError } = require('./errors');

module.exports = {

  joiUuid: Joi.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/),

  joiPassword: Joi.string().min(6).max(100),

  joiShop: Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    country: Joi.string().required(),
    iso: Joi.string().length(3).required(),
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required(),
    postcode: Joi.number().required(),
    phone: Joi.string().required(),
    ads1: Joi.string(),
    ads2: Joi.string(),
  }),

  validateParams(params, schema){

    const result = Joi.validate(params, schema, { presence: 'required' });

    if(result.error !== null) {

      const errors = result.error.details.map(detail => detail.message);

      throwExposableError('bad_params', null, null, {
        errors,
      });

    }
  },

};
