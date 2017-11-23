class EmailService {

  constructor(EmailProvider, options) {
    this._provider = new EmailProvider(options);
  }

  setTemplateService(service) {
    if (!this.templateService) this.templateService = service;
  }

  sendEmail({ to, subject, viewName, data }) {
    if (!this.setTemplateService) throw new Error('Template service must be configurated');

    const compiledView = this.templateService.getCompiledView(viewName);

    return this._provider.sendEmail({
      to,
      subject,
      html: compiledView(data),
    });
  }

}

module.exports = EmailService;
