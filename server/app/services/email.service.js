class EmailService {
  _provider = null;

  constructor(EmailProvider, options) {
    this._provider = new EmailProvider(options);
  }

  sendEmail(options) {
    this._provider.sendEmail();
  }

}

module.exports = EmailService;
