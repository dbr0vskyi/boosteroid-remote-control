const express = require('express');
const bodyParser = require('body-parser');
const { authControllers } = require('../controllers');
const { userGuard } = require('../guards');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/request-access', jsonParser, authControllers.requestAccessController);
router.post('/check-user-site', jsonParser, userGuard(['site'], { next: false }));
router.post('/check-user-demo', jsonParser, userGuard(['demo'], { next: false }));

module.exports = router;
