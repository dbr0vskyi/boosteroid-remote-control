const Immutable = require('seamless-immutable');

import * as quiz from './quiz.actions';

export const initialState = Immutable({
  form: {
    useful: false,
    wouldLikeToTest: false,
    appForTests: '',
    suggestions: '',
  },
});

export function quizReducer(state = initialState, { type, payload }) {
  switch (type) {

    case quiz.ActionTypes.SET_FORM: {
      return state.set(
        'form',
        state.form.merge(payload)
      );
    }

    case quiz.ActionTypes.PAGE_WAS_DESTROYED: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
