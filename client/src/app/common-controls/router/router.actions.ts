import { NavigationExtras } from '@angular/router';

import { UnsafeAction, type } from '../../shared/utils';

export const GO = type('[Router] Go');
export const BACK = type('[Router] Back');
export const FORWARD = type('[Router] Forward');

interface GoActionModel {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}

export class Go implements UnsafeAction {
  readonly type = GO;

  constructor(public payload: GoActionModel) {
  }
}

export class Back implements UnsafeAction {
  readonly type = BACK;
}

export class Forward implements UnsafeAction {
  readonly type = FORWARD;
}

export type Actions
  = Go
  | Back
  | Forward;
