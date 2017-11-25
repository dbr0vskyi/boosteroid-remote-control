const { FeedbacksModel } = require('../../models');

module.exports = (req, res) => {
  if (!req.body) return res.status(400).json({
    message: 'There is no data'
  });

  const { userID, form } = req.body;
  if (!userID || !form) res.status(400).json({
    error: 'userID and form must be defined'
  });

  FeedbacksModel.setFeedback(userID, form)
    .then(() => {
      return res.status(200).json({ message: 'Feedback was saved' })
    })
    .catch((err) => {
      return res.status(500).json(err);
    })
};
