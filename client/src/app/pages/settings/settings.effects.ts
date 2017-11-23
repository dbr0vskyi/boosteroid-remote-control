import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { UnsafeAction } from '../../shared/utils';
import * as settings from './settings.actions';

@Injectable()
export class SettingsEffects {

  constructor(
    private store: Store<any>,
    private actions$: Actions,
  ) {}

}
