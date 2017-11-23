const Immutable = require('seamless-immutable');

import * as settings from './settings.actions';

export const initialState = Immutable({

});

export function settingsReducer(state = initialState, { type, payload }) {
  switch (type) {

    case settings.ActionTypes.PAGE_WAS_DESTROYED: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
