import { type, UnsafeAction } from '../../shared/utils';

export const ActionTypes = {
  PAGE_WAS_DESTROYED: type('[Login] Page Was Destroyed'),
};

export class PageWasDestroyedAction implements UnsafeAction {
  public type = ActionTypes.PAGE_WAS_DESTROYED;
}

export type Action
  = PageWasDestroyedAction;
