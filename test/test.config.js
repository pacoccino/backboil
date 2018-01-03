const path = require('path');
const chaiAsPromised = require('chai-as-promised');
const logger = require('../src/modules/logger');

logger.transports[0].level = 'warn';

global.srcDir = path.resolve(path.join(__dirname, '../src') );

global.chai = require('chai');
global.expect = global.chai.expect;
global.chai.use(chaiAsPromised);

process.on('unhandledRejection', (reason, p) => {

  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason)
  debugger;

  throw reason;

});

const mongoose = require('mongoose');
const {Mockgoose} = require('mockgoose-fix');
const mockgoose = new Mockgoose(mongoose);
global.mockgoose = mockgoose;
mockgoose.helper.setDbVersion('3.4.3');

before(async () => {

  await mockgoose.prepareStorage();
  await mongoose.connect('mongodb://foox/bar');

});

after(async ()=> {

  const connections = mongoose.connections;
  const childProcess = mockgoose.mongodHelper.mongoBin.childProcess;

  await Promise.all(connections.map((con) => con.close()));
  childProcess.kill();

});