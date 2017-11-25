import { type, UnsafeAction } from '../../shared/utils';

export const ActionTypes = {
  SET_KEYMAP: type('[Remote Control] Set Keymap'),

  PAGE_WAS_DESTROYED: type('[Remote Control] Page Was Destroyed'),
};

export class SetKeymapAction implements UnsafeAction {
  public type = ActionTypes.SET_KEYMAP;

  constructor(public payload: any) {
  }
}

export class PageWasDestroyedAction implements UnsafeAction {
  public type = ActionTypes.PAGE_WAS_DESTROYED;
}

export type Action
  = PageWasDestroyedAction
  | SetKeymapAction;
