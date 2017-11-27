const express = require('express');
const bodyParser = require('body-parser');
const { machinesControllers } = require('../controllers');
const { userGuard } = require('../guards');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post(
  '/check-available',
  jsonParser,
  userGuard(['site', 'demo'], { next: true }),
  machinesControllers.checkAvailableController
);

module.exports = router;
