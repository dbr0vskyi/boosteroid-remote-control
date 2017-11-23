const Mailgun = require('mailgun-js');

class MailgunProvider {

  constructor(options) {
    this.options = options;
  }

  createMailgunInstance() {
    return new Mailgun({
      apiKey: this.options.apiKey,
      domain: this.options.domain,
    });
  }

  sendEmail({ to, subject, html }) {
    const mailgun = this.createMailgunInstance();
    const data = {
      to,
      from: this.options.from,
      subject,
      html
    };

    return new Promise((resolve, reject) => {
      mailgun.messages().send(data, (err, body) => {
        if (err) return reject(err);

        resolve(body);
      })
    });
  }
}

module.exports = MailgunProvider;
