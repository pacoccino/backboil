const path = require('path');
const Joi = require('joi');

const Validation = require(path.join(srcDir, '/helpers/validation') );

describe('Helpers: Validation', () => {

  it('Should validate uuid', async () => {
    const uuid = '26a05507-0395-447a-aaaa-000000000000';
    const result = Joi.validate(
      { uuid: uuid },
      { uuid: Validation.joiUuid },
    );

    expect(result.error).to.be.null;
  });

  it('Should not validate uuid', async () => {
    const uuid = '26a05507-0395-447a-aaaa-00000000000';
    const result = Joi.validate(
      { uuid: uuid },
      { uuid: Validation.joiUuid },
    );

    expect(result.error).to.exist;
  });

  it('Should validate password', async () => {
    function valPass(password) {
      const result = Joi.validate(
        { password },
        { password: Validation.joiPassword },
      );

      expect(result.error).to.be.null;
    }

    valPass('fizeifjiofjzeofijez');
    valPass('fizeifjiofj129312');
    valPass('fdIJdezij213');
  });

  it('Should not validate password', async () => {

    function valPass(password) {
      const result = Joi.validate(
        { password },
        { password: Validation.joiPassword },
      );

      expect(result.error).to.exist;
    }

    valPass('a');
    valPass('1');
    valPass('az');
    valPass('aze');

    let hundredplus = '0123456789';
    hundredplus += hundredplus;
    hundredplus += hundredplus;
    hundredplus += hundredplus;
    hundredplus += hundredplus;
    valPass(hundredplus);

  });

  it('Should not validate uuid', async () => {
    const uuid = '26a05507-0395-447a-aaaa-00000000000';
    const result = Joi.validate(
      { uuid: uuid },
      { uuid: Validation.joiUuid },
    );

    expect(result.error).to.exist;
  });

  it('Should validate params', async () => {
    const uuid = '26a05507-0395-447a-aaaa-000000000000';

    Validation.validateParams(
      { uuid: uuid },
      { uuid: Validation.joiUuid },
    );

  });

  it('Should not validate params', async () => {
    const uuid = 'gfdsgfds';

    expect(
      Validation.validateParams.bind(null,
        { uuid: uuid },
        { uuid: Validation.joiUuid },
      )
    ).to.throw();

  });

});
