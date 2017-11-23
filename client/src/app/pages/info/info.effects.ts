import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { UnsafeAction } from '../../shared/utils';
import * as info from './info.actions';

@Injectable()
export class InfoEffects {

  constructor(
    private store: Store<any>,
    private actions$: Actions,
  ) {}

}
