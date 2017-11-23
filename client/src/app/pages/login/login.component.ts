import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { LoginService } from './login.service';
import * as login from './login.actions';
import * as modalWrapper from '../../common-controls/modal-wrapper/modal-wrapper.actions';
import { DispatchOnDestroy } from '../../abstract';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent extends DispatchOnDestroy {
  public formIsValid: boolean = null;

  protected storePageName: string = 'Login';

  constructor(
    protected store: Store<any>,
    private loginService: LoginService,
  ) {
    super();
  }

  public onFormSubmit(event) {
    event.preventDefault();

    this.formIsValid = this.loginService.isFormValid(event.target);
    if (!this.formIsValid) return;

    this.store.dispatch(new modalWrapper.ShowModalAction({
      modalData: 'test',
      target: 'test target'
    }));
  }

  public isValidInput(element) {
    return this.loginService.isValidInput(element);
  }
}
