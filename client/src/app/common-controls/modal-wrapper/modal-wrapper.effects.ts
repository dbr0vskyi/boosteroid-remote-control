import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, toPayload, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as modalWrapper from './modal-wrapper.actions';
import { UnsafeAction } from '../../shared/utils';

@Injectable()
export class ModalWrapperEffects {

  constructor(
    private store: Store<any>,
    private actions$: Actions,
  ) {}

  @Effect() throwModalWasOpened$: Observable<UnsafeAction> = this.actions$
    .ofType(modalWrapper.ActionTypes.SHOW_MODAL)
    .map(toPayload)
    .filter((payload) => payload && payload.modalData)
    .map(() => {
      return new modalWrapper.ModalWasOpenedAction();
    });

  @Effect() throwModalWasHided$: Observable<UnsafeAction> = this.actions$
    .ofType(modalWrapper.ActionTypes.HIDE_MODAL)
    .map(() => {
      return new modalWrapper.ModalWasHidedAction();
    });

}
