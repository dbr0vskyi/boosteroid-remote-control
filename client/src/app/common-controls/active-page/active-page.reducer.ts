import { Action } from '@ngrx/store';
import * as activePage from './active-page.actions';
const Immutable = require('seamless-immutable');

const initialState = Immutable({
  pageName: '',
  path: [],
  rootPageName: '',
  params:[]
});

export function activePageReducer(state = initialState, { type, payload },) {
  switch (type) {
    case activePage.ActionTypes.SET_ACTIVE_PAGE: {
      return state.merge(payload, { deep: true });
    }
    default: {
      return state;
    }
  }
}
