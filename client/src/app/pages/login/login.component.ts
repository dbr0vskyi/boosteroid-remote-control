import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { LoginService } from './login.service';
import * as login from './login.actions';
import * as modalWrapper from '../../common-controls/modal-wrapper/modal-wrapper.actions';
import { DispatchOnDestroy } from '../../abstract';
import { HttpUtilsService } from '../../core/http-utils.service';
import { ModalModel } from '../../common/modal/modal.model';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent extends DispatchOnDestroy {
  public formIsValid: boolean = null;

  private modalData: ModalModel = null;

  protected storePageName: string = 'Login';

  constructor(
    protected store: Store<any>,
    private loginService: LoginService,
    private httpUtilsService: HttpUtilsService,
  ) {
    super();

    this.httpUtilsService.getModalsData().subscribe((modalsData: { [key: string]: ModalModel }) => {
      this.modalData = modalsData['auth-success'];
    });
  }

  public onFormSubmit(event) {
    event.preventDefault();

    this.formIsValid = this.loginService.isFormValid(event.target);
    if (!this.formIsValid) return;

    // TODO: Move code below to effects
    this.httpUtilsService.postRequestAccess(event.target.elements.email.value.trim()).subscribe((res) => {
      console.log(res);
    });

    this.store.dispatch(new modalWrapper.ShowModalAction({
      modalData: this.modalData,
      target: 'email-was-sent'
    }));
  }

  public isValidInput(element) {
    return this.loginService.isValidInput(element);
  }
}
