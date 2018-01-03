const path = require('path');
const sinon = require('sinon');

const AuthMiddleWare = require(path.join(srcDir, '/services/api/middlewares/auth') );

describe('Middleware: Auth', () => {
  let sandbox = null;

  beforeEach(async () => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox && sandbox.restore();
  });

  it('readJWT', async () => {

    const next = sinon.stub();
    const ctx = {
      state: {},
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoiYW1vbi11c2VyIiwiYWdlbnQiOiIiLCJ1c2VySWQiOiIyNmEwNTUwNy0wMzk1LTQ0N2EtYmJiYi0wMDAwMDAwMDAwMDEiLCJlbWFpbCI6ImpvbkBhbW9uLnRlY2giLCJpYXQiOjE1MTIzMzIyNzR9.rFyMFPhq42edZqLThIrOAI5kQiUO57LzwGBz3WA279w',
      }
    };
    await AuthMiddleWare.readJWT()(ctx, next);

    expect(next.calledWith()).to.be.true;

  });

  it('readJWT if not set', async () => {

    const next = sinon.stub();
    const ctx = {
      state: {},
      headers: {},
    };
    await AuthMiddleWare.readJWT()(ctx, next);

    expect(next.calledWith()).to.be.true;

  });

  it('authAssert', async () => {

    const next = sinon.stub();
    const ctx = {
      state: {
        jwt: {
          userId: 'userId',
        },
      },
      requestInfo: {},
    };
    await AuthMiddleWare.authAssert()(ctx, next);

    expect(next.calledOnce).to.be.true;
    expect(ctx.state.userId).to.eq('userId');
  });

  it('authAssert fail no token', async () => {

    const next = sinon.stub();
    const ctx = {
      state: {},
    };
    expect(next.calledOnce).to.be.false;
    await expect(AuthMiddleWare.authAssert()(ctx, next)).to.be.rejectedWith(Error, 'access_denied')

  });


});
