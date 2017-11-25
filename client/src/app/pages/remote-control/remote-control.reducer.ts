const Immutable = require('seamless-immutable');

import * as remoteControl from './remote-control.actions';

export const initialState = Immutable({
  keymap: null,
});

export function remoteControlReducer(state = initialState, { type, payload }) {
  switch (type) {

    case remoteControl.ActionTypes.SET_KEYMAP: {
      return state.set('keymap', payload);
    }

    case remoteControl.ActionTypes.PAGE_WAS_DESTROYED: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
