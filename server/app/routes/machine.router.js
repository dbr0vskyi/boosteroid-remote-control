const express = require('express');
const bodyParser = require('body-parser');
const { machineControllers } = require('../controllers');
const { userGuard } = require('../guards');

const router = express.Router();
const jsonParser = bodyParser.json();

// TODO: Use userGuard here case of sensaive info

module.exports = router;
