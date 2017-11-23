const Immutable = require('seamless-immutable');

import * as quiz from './quiz.actions';

export const initialState = Immutable({

});

export function quizReducer(state = initialState, { type, payload }) {
  switch (type) {

    case quiz.ActionTypes.PAGE_WAS_DESTROYED: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
