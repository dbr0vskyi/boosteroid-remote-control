const { dbService } = require('../services');

module.exports = {
  PATH: ['queue'],

  getPathArray(...parts) {
    return this.PATH.concat(parts);
  },

  getQueueByType(machineType) {
    return dbService.getData(this.getPathArray(machineType));
  },

  addUserToQueue(machineType, userID) {
    return dbService.setData(this.getPathArray(machineType, userID), userID);
  },

  removeQueueByType(machineType) {
    return dbService.removeData(this.getPathArray(machineType));
  }
};
