import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';

import * as remoteControl from './remote-control.actions';
import { HttpUtilsService } from '../../core/http-utils.service';

@Injectable()
export class RemoteControlResolveService implements Resolve<any> {

  constructor(
    private http: HttpUtilsService,
    private store: Store<any>,
  ) {}

  resolve() {
    return this.http.getKeymap().subscribe((keymap) => {
      this.store.dispatch(new remoteControl.SetKeymapAction(keymap));
    });

    // return true;
  }

}
