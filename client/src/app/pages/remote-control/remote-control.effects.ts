import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { UnsafeAction } from '../../shared/utils';
import * as remoteControl from './remote-control.actions';

@Injectable()
export class RemoteControlEffects {

  constructor(
    private store: Store<any>,
    private actions$: Actions,
  ) {}

}
