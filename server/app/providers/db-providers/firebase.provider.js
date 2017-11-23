const path = require('path');
const process = require('process');
const firebaseAdmin = require("firebase-admin");

class FirebaseProvider {

  constructor(options) {
    const serviceAccount = require(path.join(process.cwd(), options.pathToServiceAccountKey));

    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
      databaseURL: options.databaseURL,
    });

    this.db = firebaseAdmin.database();
  }

  getRef(pathArray) {
    return this.db.ref(`${ this.options.rootNode }/${ pathArray.join('/') }`);
  }

  getData(pathArray) {
    return new Promise((resolve, reject) => {
      this.getRef(pathArray).once('value', resolve);
    });
  }

  setData(pathArray, data) {
    return this.getRef(pathArray).set(data);
  }

  pushData(pathArray, data) {
    return this.getRef(pathArray).push(data);
  }

  removeData(pathArray) {
    return this.getRef(pathArray).remove();
  }

}

module.exports = FirebaseProvider;
