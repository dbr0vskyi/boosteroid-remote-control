import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { UnsafeAction } from '../../shared/utils';
import * as quiz from './quiz.actions';

@Injectable()
export class QuizEffects {

  constructor(
    private store: Store<any>,
    private actions$: Actions,
  ) {}

}
