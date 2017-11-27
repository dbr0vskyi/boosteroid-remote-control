const config = require('config');

const availableSessionsCount = config.get('availableSessionsCount');

module.exports = {

  'auth-success': {
    title: 'Completed',
    img: 'service_1_success.png',
    text: 'Message with the link has been sent to your email',
    button: 'Enter another email',
  },

  'overloaded': {
    title: 'Oops',
    img: 'service_2_error.png',
    text: 'The service is overloaded, please try again later',
    button: 'Ok',
  },

  'machines-are-busy': {
    title: 'Oops',
    img: 'service_2_error.png',
    text: [
      'Currently all remote computers of this type are unavailable. Try another type or wait untill remote computer become available and we will send you an email. You are ',
      ' in the line.'
    ],
    button: 'Ok',
  },

  'exceed-sessions': {
    title: 'Oops',
    img: 'service_2_error.png',
    text: `Unfortunately, you had already used ${availableSessionsCount}/${availableSessionsCount} attempts of using our service test mode.`
  }

};
