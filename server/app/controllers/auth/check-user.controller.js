const { UsersModel } = require('../../models');

module.exports = (req, res) => {
  if (!req.body) return res.status(400).json({
    message: 'There is no data'
  });

  const { userID } = req.body;
  if (!userID) res.status(400).json({
    error: 'userID must be defined'
  });

  UsersModel.getUserByID(userID)
    .then((user) => {
      if (user) return res.status(200).json({ message: 'You are allowed to login' });

      return res.status(401).json({ message: 'You are not allowed to login' });
    })
};
