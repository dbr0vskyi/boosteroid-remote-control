import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as remoteControl from './remote-control.actions';
import { DispatchOnDestroy } from '../../abstract';

@Component({
  selector: 'remote-control',
  templateUrl: 'remote-control.component.html',
  styleUrls: ['remote-control.component.scss'],
})
export class RemoteControlComponent extends DispatchOnDestroy implements OnInit {
  public keymap$: Observable<any>;
  public canvasHeight: number = 0;
  public canvasWidth: number = 0;

  protected storePageName: string = 'Remote Control';

  constructor(
    protected store: Store<any>,
  ) {
    super();

    this.keymap$ = this.store.select('remoteControl', 'keymap');
  }

  public ngOnInit() {
    this.canvasHeight = window.innerHeight;
    this.canvasWidth = window.innerWidth;
  }

}
