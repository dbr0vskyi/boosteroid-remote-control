const express = require('express');

// TODO: Require mocks

const router = express.Router();

router.get('/keymap', (req, res) => {
  setTimeout(() => {
    res.status(200)
      .json(ipListMock);
  }, 2000);

  res.status(200)
    .json(keymapMock);
});

module.exports = router;
