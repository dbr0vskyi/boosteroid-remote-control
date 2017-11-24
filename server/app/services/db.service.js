class DBService {

  constructor(DBProvider, options) {
    this._provider = new DBProvider(options);
  }

  getData(pathArray) {
    return this._provider.getData(pathArray);
  }

  setData(pathArray, data) {
    return this._provider.setData(pathArray, data);
  }

  pushData(pathArray, data) {
    return this._provider.pushData(pathArray, data);
  }

  updateData(pathArray, data) {
    return this._provider.updateData(pathArray, data);
  }

  transactionData(pathArray, callback) {
    return this._provider.transactionData(pathArray, callback);
  }

  removeData(pathArray) {
    return this._provider.removeData(pathArray);
  }

}

module.exports = DBService;
