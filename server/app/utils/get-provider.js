const process = require('process');
const path = require('path');

module.exports = (name, type) => {
  return require(path.join(
    process.cwd(),
    'app',
    'providers',
    `${ type }-providers`,
    `${ name }.provider.js`
  ));
};
