const config = require('../../config');
const jwt = require('jsonwebtoken');

// TODO: invalidate
// TODO: validate using devideID

module.exports = {

  async generateToken (user) {

    const jwtData = {
      auth: 'backend-user',
      userId: user._id,
      email: user.email
    };
    const token = jwt.sign(jwtData, config.JWT_SECRET);
    return token;
  },

};