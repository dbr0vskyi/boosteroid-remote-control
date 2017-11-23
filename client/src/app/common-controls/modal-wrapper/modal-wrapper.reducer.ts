import { init } from 'protractor/built/launcher';

const Immutable = require('seamless-immutable');

import * as modalWrapper from './modal-wrapper.actions';
import { UnsafeAction } from '../../shared/utils';

export const initialState = Immutable({
  modalData: null,
  target: '',
  opened: false,
});

export function modalWrapperReducer(state = initialState, { type, payload }: UnsafeAction) {
  switch (type) {

    case modalWrapper.ActionTypes.SHOW_MODAL: {
      return state
        .set('modalData', payload.modalData)
        .set('target', payload.target);
    }

    case modalWrapper.ActionTypes.MODAL_WAS_OPENED: {
      return state.set('opened', true);
    }

    case modalWrapper.ActionTypes.MODAL_WAS_HIDED: {
      return state.set('opened', false);
    }

    case modalWrapper.ActionTypes.HIDE_MODAL: {
      return state
        .set('modalData', initialState.modalData)
        .set('target', initialState.target);
    }

    default: {
      return state;
    }
  }
}
