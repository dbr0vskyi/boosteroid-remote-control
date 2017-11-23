import { type, UnsafeAction } from '../../shared/utils';

export const ActionTypes = {
  PAGE_WAS_DESTROYED: type('[Remote Control] Page Was Destroyed'),
};

export class PageWasDestroyedAction implements UnsafeAction {
  public type = ActionTypes.PAGE_WAS_DESTROYED;
}

export type Action
  = PageWasDestroyedAction;
