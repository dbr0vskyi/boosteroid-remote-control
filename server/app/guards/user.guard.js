const { UsersModel } = require('../models');

module.exports = (requiredGroups, config) => {
  const nextFlag = config.next;

  return (req, res, next) => {
    if (!req.body) return res.status(400).json({
      message: 'There is no data'
    });

    const {userID} = req.body;
    if (!userID) res.status(400).json({
      error: 'userID must be defined'
    });

    UsersModel.getUserByID(userID)
      .then((user) => {
        const accessByGroups = user && requiredGroups
          .map((requiredGroup) => user.groups && user.groups[requiredGroup])
          .every((flag) => flag);

        if (accessByGroups) {
          if (nextFlag) return next();

          return res.status(200).json({message: 'Access granted'});
        }

        return res.status(401).json({message: 'Access denied'});
      })
  }
};
