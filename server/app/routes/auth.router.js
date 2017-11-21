const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();
//
// router.post('/request-access', (req, res) => {
//   if (!req.body) return res.sendStatus(400);
//
//   const { email } = req.body;
//
//   // TODO: Send email here
//
//   res.status(200)
//     .json(message); // TODO: Respond understandable message
// });

module.exports = router;
