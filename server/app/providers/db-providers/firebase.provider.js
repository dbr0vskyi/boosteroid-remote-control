const path = require('path');
const process = require('process');
const firebaseAdmin = require("firebase-admin");

class FirebaseProvider {

  constructor(options) {
    this.options = options;

    const serviceAccount = require(path.join(process.cwd(), this.options.pathToServiceAccountKey));
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
      databaseURL: this.options.databaseURL,
    });

    this.db = firebaseAdmin.database();
  }

  getRef(pathArray) {
    return this.db.ref(`${ this.options.rootNode }/${ pathArray.join('/') }`);
  }

  getData(pathArray) {
    return new Promise((resolve, reject) => {
      this.getRef(pathArray).once('value', (data) => resolve(data.val()));
    });
  }

  setData(pathArray, data) {
    return this.getRef(pathArray).set(data);
  }

  updateData(pathArray, data) {
    return this.getRef(pathArray).update(data);
  }

  pushData(pathArray, data) {
    return this.getRef(pathArray).push(data);
  }

  transactionData(pathArray, callback) {
    return this.getRef(pathArray).transaction(callback);
  }

  removeData(pathArray) {
    return this.getRef(pathArray).remove();
  }

}

module.exports = FirebaseProvider;
