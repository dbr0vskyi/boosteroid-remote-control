const express = require('express');
const bodyParser = require('body-parser');
const { machineControllers } = require('../controllers');

const router = express.Router();
const jsonParser = bodyParser.json();

module.exports = router;
