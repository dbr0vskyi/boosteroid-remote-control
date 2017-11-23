const Immutable = require('seamless-immutable');

import * as info from './info.actions';

export const initialState = Immutable({

});

export function infoReducer(state = initialState, { type, payload }) {
  switch (type) {

    case info.ActionTypes.PAGE_WAS_DESTROYED: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
