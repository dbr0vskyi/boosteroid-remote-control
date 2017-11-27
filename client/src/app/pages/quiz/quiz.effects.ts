import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { UnsafeAction } from '../../shared/utils';
import * as quiz from './quiz.actions';
import { HttpUtilsService } from '../../core/http-utils.service';
import * as router from '../../common-controls/router/router.actions';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class QuizEffects {

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private httpUtilsService: HttpUtilsService,
    private authService: AuthService,
  ) {}

  @Effect() saveFeedback$: Observable<UnsafeAction> = this.actions$
    .ofType(quiz.ActionTypes.SEND_FORM)
    .withLatestFrom(
      this.store.select('quiz', 'form'),
    )
    .do(([action, form]) => {
      const { userID } = this.authService.getUser();
      this.httpUtilsService.saveFeedback(userID, form).subscribe(() => {});
    })
    .map(() => {
      return new router.Go({ path: ['/info'] });
    })

}
