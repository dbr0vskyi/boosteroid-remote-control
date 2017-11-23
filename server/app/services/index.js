const { serviceCreator } = require('../utils');

const EmailService = require('./email.service');
const DBService = require('./db.service');
const TemplateService = require('./templates.service');

module.exports = serviceCreator({
  db: DBService,
  email: EmailService,
  template: TemplateService
});
