const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("path/to/serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://boosteroid-demo-cloud.firebaseio.com"
});
