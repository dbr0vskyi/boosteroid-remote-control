const { dbService } = require('../services');

module.exports = {
  PATH: ['queue'],

  getPathArray(machineType) {
    return this.PATH.concat(machineType);
  },

  getQueueByType(machineType) {
    return dbService.getData(this.getPathArray(machineType));
  },

  addUserToQueue(machineType, userID) {
    return dbService.pushData(this.getQueueByType(machineType), userID);
  }
};
