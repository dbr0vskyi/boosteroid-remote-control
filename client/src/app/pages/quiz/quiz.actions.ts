import { type, UnsafeAction } from '../../shared/utils';

export const ActionTypes = {
  SET_FORM: type('[Quiz] Set Form'),

  SEND_FORM: type('[Quiz] Send Form'),

  PAGE_WAS_DESTROYED: type('[Quiz] Page Was Destroyed'),
};

export class SetFormAction implements UnsafeAction {
  public type = ActionTypes.SET_FORM;

  constructor(public payload: any) {
  }
}

export class SendFormAction implements UnsafeAction {
  public type = ActionTypes.SEND_FORM;
}

export class PageWasDestroyedAction implements UnsafeAction {
  public type = ActionTypes.PAGE_WAS_DESTROYED;
}

export type Action
  = PageWasDestroyedAction
  | SetFormAction
  | SendFormAction;
