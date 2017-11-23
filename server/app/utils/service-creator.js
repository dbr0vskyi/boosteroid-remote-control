const createService = require('./create-service');

module.exports = (services) => {
  const SERVICES_KEY = Symbol.for('App.Services');

  if (!global[SERVICES_KEY]) global[SERVICES_KEY] = {};

  const serviceStorage = global[SERVICES_KEY];

  return Object
    .keys(services)
    .reduce((servicesAcc, serviceKey) => {
      if (!serviceStorage[serviceKey]) {
        serviceStorage[serviceKey] = createService(serviceKey, services[serviceKey]);
      }
      servicesAcc[serviceKey + 'Service'] = serviceStorage[serviceKey];

      return servicesAcc;
    }, {});
};
