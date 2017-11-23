const { createHash } = require('../utils');
const { dbService } = require('../services');

module.exports = {
  getUserID(email) {
    return createHash(email);
  }
};
