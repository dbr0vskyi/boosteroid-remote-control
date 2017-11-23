const { emailService } = require('../../services');
const { emails } = require('../../mocks');
const { UsersModel } = require('../../models');

module.exports = (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { email } = req.body;
  if (!email) res.status(400).json({
    error: 'Email must be defined'
  });

  const userID = UsersModel.getUserID(email);
  emailService.sendEmail({
    to: email,
    subject: emails['request-access'].subject,
    viewName: emails['request-access'].viewName,
    data: {
      title: emails['request-access'].title,
      linkHref: `${ emails['request-access'].linkHref }/${ userID }`,
    }
  }).then((response) => {
    return res.status(200).json({ message: response.message });
  }).catch((err) => {
    console.log('[EMAIL FAILED]');
    console.dir(err);
  });
};
