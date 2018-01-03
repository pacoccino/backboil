(async() => {

  const mongoose = require('mongoose');
  const {Mockgoose} = require('mockgoose-fix');
  const mockgoose = new Mockgoose(mongoose);
  mockgoose.helper.setDbVersion('3.4.3');
  await mockgoose.prepareStorage();

  const childProcess = mockgoose.mongodHelper.mongoBin.childProcess;
  childProcess.kill();

})().catch(console.error);
