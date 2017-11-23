import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ModalModel } from '../../common/modal';
import * as modalWrapper from './modal-wrapper.actions';

@Component({
  selector: 'modal-wrapper',
  templateUrl: 'modal-wrapper.component.html',
})
export class ModalWrapperComponent {
  public modalData$: Observable<ModalModel>;
  public opened$: Observable<boolean>;

  constructor(
    private store: Store<any>
  ) {
    this.modalData$ = this.store.select('modalWrapper', 'modalData');
    this.opened$ = this.store.select('modalWrapper', 'opened');
  }

  public onCloseModal() {
    this.store.dispatch(new modalWrapper.HideModalAction());
  }

}
