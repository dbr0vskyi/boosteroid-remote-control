const { createHash } = require('../utils');
const { dbService } = require('../services');

module.exports = {
  PATH: ['users'],

  getUserID(email) {
    return createHash(email);
  },

  getPathArray(userID) {
    return this.PATH.concat(userID);
  },

  getUserByID(userID) {
    return dbService.getData(this.getPathArray(userID));
  },

  getUserByEmail(email) {
    const userID = this.getUserID(email);

    return dbService.getData(this.getPathArray(userID));
  },

  addUser(email, data) {
    const userID = this.getUserID(email);

    return dbService.setData(this.getPathArray(userID), Object.assign(data, {
      sessionsCount: 0,
      groups: { demo: true },
      creationDate: new Date().toString(),
    }));
  },

  updateUser(email, data) {
    const userID = this.getUserID(email);

    return dbService.updateData(this.getPathArray(userID), Object.assign(data, {
      lastUpdate: new Date().toString(),
    }));
  },
};
