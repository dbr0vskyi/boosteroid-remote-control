const { emailService } = require('../../services');
const { emails } = require('../../mocks');
const { UsersModel } = require('../../models');

module.exports = (req, res) => {
  if (!req.body) return res.status(400).json({
    message: 'There is no data'
  });

  const { email } = req.body;
  if (!email) res.status(400).json({
    error: 'Email must be defined'
  });

  const userID = UsersModel.getUserID(email);

  emailService
    .sendEmail({
      to: email,
      subject: emails['request-access'].subject,
      viewName: emails['request-access'].viewName,
      data: {
        title: emails['request-access'].title,
        linkHref: `${ emails['request-access'].linkHref }?user-id=${ userID }`,
      }
    })
    .then((response) => {
      res.status(200).json({ message: response.message });

      return UsersModel.getUserByEmail(email)
    }, (err) => {
      res.status(500).json(err);
    })
    .then((user) => {
      if (!user) return UsersModel.addUser(email, { email });
    });
};
