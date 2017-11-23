class DBService {

  constructor(DBProvider, options) {
    this._provider = new DBProvider(options);
  }

}

module.exports = DBService;
