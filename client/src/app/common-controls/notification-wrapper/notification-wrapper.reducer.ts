const Immutable = require('seamless-immutable');

import * as notificationWrapper from './notification-wrapper.actions';

export const initialState = Immutable({

});

export function notificationWrapperReducer(state = initialState, { type, payload }) {
  switch (type) {

    default: {
      return state;
    }
  }
}
