import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { UnsafeAction } from '../../shared/utils';
import * as login from './login.actions';

@Injectable()
export class LoginEffects {

  constructor(
    private store: Store<any>,
    private actions$: Actions,
  ) {}

}
