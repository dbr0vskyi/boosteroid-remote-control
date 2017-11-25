import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

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
    private router: Router,
  ) {
    super();

    this.keymap$ = this.store.select('remoteControl', 'keymap');

    setTimeout(() => {
      Observable.of('remote-control')
        .withLatestFrom(
          this.store.select('activePage', 'pageName')
        )
        .filter(([thisPageName, pageName]) => thisPageName === pageName)
        .subscribe(() => {
          this.router.navigate(['/quiz']);
        });
    }, 1000 * 60 * 15);
  }

  public ngOnInit() {
    this.canvasHeight = window.innerHeight;
    this.canvasWidth = window.innerWidth;
  }

}
