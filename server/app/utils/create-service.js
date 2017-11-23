const config = require('config');
const getProvider = require('./get-provider');

module.exports = (serviceKey, Service) => {
  const providerName = config.get(`app.${ serviceKey }.provider`);
  const provider = getProvider(providerName, serviceKey);
  const options = config.get(`app.${ serviceKey }.options`);

  return new Service(provider, options);
};
