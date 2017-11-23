const process = require('process');
const path = require('path');

class TemplateService {

  constructor(TemplateProvider, options) {
    this._provider = new TemplateProvider(options);
    this.options = options;
    this.compiledViews = {};
  }

  getPathToView(viewName) {
    return path.join(
      process.cwd(),
      this.options.viewsPath,
      `${ viewName }.${ this.options.templateExt }`
    );
  }

  compileView(viewName, pathToView) {
    if (this.compiledViews[viewName]) return this.compiledViews[viewName];

    this.compiledViews[viewName] = this._provider.compileView(pathToView);

    return this.compiledViews[viewName];
  }

  getCompiledView(viewName) {
    return this.compileView(viewName, this.getPathToView(viewName));
  }

}

module.exports = TemplateService;
