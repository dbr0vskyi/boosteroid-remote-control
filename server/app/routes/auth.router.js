const express = require('express');
const bodyParser = require('body-parser');
const { emailService, templateService } = require('../services');
const { emails } = require('../mocks');
const { createHash } = require('../utils');

const router = express.Router();
const jsonParser = bodyParser.json();

emailService.setTemplateService(templateService);

router.post('/request-access', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { email } = req.body;
  if (!email) res.status(400).json({
    error: 'Email must be defined'
  });

  const hash = createHash(email);
  emailService.sendEmail({
    to: email,
    subject: emails['request-access'].subject,
    viewName: emails['request-access'].viewName,
    data: {
      title: emails['request-access'].title,
      linkHref: `${ emails['request-access'].linkHref }/${ hash }`,
    }
  }).then((response) => {
    return res.status(200).json({ message: response.message });
  }).catch((err) => {
    console.log('[EMAIL FAILED]');
    console.dir(err);
  });
});

module.exports = router;
