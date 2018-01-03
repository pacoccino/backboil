const path = require('path');
const sinon = require('sinon');
const moment = require('moment');

const logger = require(path.join(srcDir, '/modules/logger') );
const Utils = require(path.join(srcDir, '/helpers/utils') );

describe('Helpers: Utils', () => {

  let sandbox = null;

  beforeEach( async () => {

    sandbox = sinon.sandbox.create();

  });

  afterEach( async () => {

    sandbox && sandbox.restore();

  });

  it('Should wait', (done) => {

    let end = false;

    Utils.wait(500).then(() => {
      end = true;
    });

    setTimeout(() => {
      if(end) {
        done('too early');
      }
    }, 300);
    setTimeout(() => {
      if(end) {
        done();
      } else {
        done('too late')
      }
    }, 600);

  });

  it('enum to object', () => {

    const en = ['a', 'b', 'c'];

    const obj = Utils.enumToObject(en);

    expect(Object.keys(obj).length).to.eq(3);
    expect(obj['a']).to.eq('a');
    expect(obj['b']).to.eq('b');
    expect(obj['c']).to.eq('c');

  });


});
