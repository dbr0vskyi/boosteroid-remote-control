import { ActivePageModel } from './active-page.model';

import { UnsafeAction, type } from '../../shared/utils';

export const ActionTypes = {
  SET_ACTIVE_PAGE: type('[Active Page] Set active page'),

  MOCK_ACTIVE_PAGE: type('[Active Page] Mock active page'),

  SET_PARAM_ACTIVE_PAGE: type('[Active Page] Set Param Active page'),

};

export class SetActivePageAction implements UnsafeAction {
  type = ActionTypes.SET_ACTIVE_PAGE;

  constructor(public payload: ActivePageModel) {
  }
}

export class MockActivePageAction implements UnsafeAction {
  type = ActionTypes.MOCK_ACTIVE_PAGE;

  constructor(public payload: any) {
  }
}

export class SetParamActivePageAction implements UnsafeAction {
  type = ActionTypes.SET_PARAM_ACTIVE_PAGE;

  constructor(public payload: any) {
  }
}

export type Actions
  = SetActivePageAction
  | SetParamActivePageAction;
