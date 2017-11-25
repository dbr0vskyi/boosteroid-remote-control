import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import * as info from './info.actions';
import { DispatchOnDestroy } from '../../abstract';

@Component({
  selector: 'info',
  templateUrl: 'info.component.html',
  styleUrls: ['info.component.scss'],
})
export class InfoComponent extends DispatchOnDestroy {

  protected storePageName: string = 'Info';

  constructor(
    protected store: Store<any>,
    private router: Router,
  ) {
    super();
  }

  public redirectTo(event, path) {
    event.preventDefault();

    this.router.navigate([ path ]);
  }
}
