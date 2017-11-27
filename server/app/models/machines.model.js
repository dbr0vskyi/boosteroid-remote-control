const { dbService } = require('../services');

module.exports = {
  PATH: ['machines'],

  getPathArray(...parts) {
    return this.PATH.concat(parts);
  },

  pushMachine(machineType, data) {
    return dbService.pushData(this.getPathArray(machineType), Object.assign(data, {
      available: true,
      lastSession: new Date().toString(),
      lastUpdate: new Date().toString(),
      creationDate: new Date().toString(),
    }));
  },

  getAllMachinesByType(machineType) {
    return dbService.getData(this.getPathArray(machineType));
  },

  updateMachine(machineType, machineID, data) {
    return dbService.updateData(this.getPathArray(machineType, machineID), Object.assign(data, {
      lastUpdate: new Date().toString(),
    }))
  }
};
