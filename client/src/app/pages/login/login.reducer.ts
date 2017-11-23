const Immutable = require('seamless-immutable');

import * as login from './login.actions';

export const initialState = Immutable({

});

export function loginReducer(state = initialState, { type, payload }) {
  switch (type) {

    case login.ActionTypes.PAGE_WAS_DESTROYED: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
