import { type, UnsafeAction } from '../../shared/utils';
import { ModalModel } from '../../common/modal';

export const ActionTypes = {
  SHOW_MODAL: type('Set Modal Data'),
  HIDE_MODAL: type('Hide Modal'),

  MODAL_WAS_OPENED: type('Modal Was Opened'),
  MODAL_WAS_HIDED: type('Modal Was Hided'),
};

export class ModalWasHidedAction implements UnsafeAction {
  public type = ActionTypes.MODAL_WAS_HIDED;
}

export class ShowModalAction implements UnsafeAction {
  public type = ActionTypes.SHOW_MODAL;

  constructor(public payload: { modalData: ModalModel, target: string }) {
  }
}

export class ModalWasOpenedAction implements UnsafeAction {
  public type = ActionTypes.MODAL_WAS_OPENED;
}

export class HideModalAction implements UnsafeAction {
  public type = ActionTypes.HIDE_MODAL;
}

export type Actions
  = ShowModalAction
  | ModalWasOpenedAction
  | ModalWasHidedAction
  | HideModalAction;
