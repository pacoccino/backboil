const Utils = {

  noop: () => 0,

  wait(ms){

    return new Promise(res => setTimeout(res, ms) );

  },

  enumToObject(en){

    return en.reduce((object, key) =>
        Object.assign(object, { [key]: key }),
      {});

  },

};

module.exports = Utils;
