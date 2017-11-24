const path = require('path');

module.exports = {
  port: 8080,

  logs: {
    path: '../log',
    filename: 'app.log',
    type: 'combined'
  },

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
        apiKey: 'key-0a6b68eb83fd0da2caf3abd1d104278a',
        domain: 'cloud.boosteroid.com',
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
