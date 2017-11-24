const express = require('express');
const bodyParser = require('body-parser');
const { authControllers } = require('../controllers');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/request-access', jsonParser, authControllers.requestAccessController);
router.post('/check-user', jsonParser, authControllers.checkUserController);

module.exports = router;
