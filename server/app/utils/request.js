const http = require('http');

module.exports = (options, timeout) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, resolve)
      .on('error', reject);

    req.end();
    timeout && setTimeout(reject, timeout);
  })
};
