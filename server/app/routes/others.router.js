const express = require('express');
const bodyParser = require('body-parser');
const { othersControllers } = require('../controllers');
const { userGuard } = require('../guards');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post(
  '/save-feedback',
  jsonParser,
  userGuard(['site'], { next: true }),
  othersControllers.saveFeedbackController
);

module.exports = router;
