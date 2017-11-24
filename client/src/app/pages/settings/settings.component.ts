import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import * as settings from './settings.actions';
import { DispatchOnDestroy } from '../../abstract';

@Component({
  selector: 'settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss'],
})
export class SettingsComponent extends DispatchOnDestroy {

  protected storePageName: string = 'Settings';

  constructor(
    protected store: Store<any>,
    private router: Router,
  ) {
    super();
  }

  public onGamingClick() {
    this.router.navigate(['/remote-control'])
  }

  public onRenderingClick() {
    this.router.navigate(['/remote-control'])
  }
}
