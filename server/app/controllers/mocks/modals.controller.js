const { modals } = require('../../mocks');

module.exports = (req, res) => {
  res.status(200)
    .json(modals);
};
