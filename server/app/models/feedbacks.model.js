const { dbService } = require('../services');

module.exports = {
  PATH: ['feedbacks'],

  getPathArray(userID) {
    return this.PATH.concat(userID);
  },

  setFeedback(userID, feedbackForm) {
    return dbService.setData(this.getPathArray(userID), {
      form: feedbackForm,
      creationDate: new Date().toString(),
    });
  },

};
