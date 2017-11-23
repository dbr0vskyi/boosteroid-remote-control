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
  }

}

module.exports = FirebaseProvider;
