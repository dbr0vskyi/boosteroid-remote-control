const { keymap } = require('../../mocks');

module.exports = (req, res) => {
  res.status(200)
    .json(keymap);
};
