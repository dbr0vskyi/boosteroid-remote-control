const path = require('path');

module.exports = {
  port: 8080,

  logs: {
    path: '../log',
    filename: 'app.log',
    type: 'combined'
  },

  availableSessionsCount: 3,

  app: {
    db: {
      provider: 'firebase',
      options: {
        rootNode: 'demo',
        pathToServiceAccountKey: path.join('config', 'boosteroid-demo-cloud-firebase-adminsdk-gpv4o-029d5c9b17.json'),
        databaseURL: 'https://boosteroid-demo-cloud.firebaseio.com',
      }
    },

    email: {
      provider: 'mail-gun',
      options: {
        apiKey: 'key-c5a71a885d4b97abc7eb09a734921a24',
        domain: 'sandbox610cdc764b3a4d1d8ab7cf5051168d58.mailgun.org',
        from: 'noreply@cloud.boosteroid.com',
      },
    },

    template: {
      provider: 'pug',
      options: {
        viewsPath: path.join('app', 'emails'),
        templateExt: 'pug'
      },
    },

  },
};
