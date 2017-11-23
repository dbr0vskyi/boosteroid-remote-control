import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as remoteControl from './remote-control.actions';
import { DispatchOnDestroy } from '../../abstract';

@Component({
  selector: 'remote-control',
  templateUrl: 'remote-control.component.html',
  styleUrls: ['remote-control.component.scss'],
})
export class RemoteControlComponent extends DispatchOnDestroy {

  protected storePageName: string = 'Remote Control';

  constructor(
    protected store: Store<any>,
  ) {
    super();
  }
}
