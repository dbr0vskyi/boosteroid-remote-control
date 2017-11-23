const pug = require('pug');

class PugProvider {

  constructor(options) {
    this.options = options;
  }

  compileView(pathToView) {
    return pug.compileFile(pathToView);
  }

}

module.exports = PugProvider;
