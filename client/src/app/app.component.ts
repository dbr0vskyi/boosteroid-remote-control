import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from './app.service';

declare const window: any;

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  template: `
    <div class="app-wrapper">
      <waiting class="app-waiting"></waiting>
      <router-outlet></router-outlet>
    </div>
    <modal-wrapper></modal-wrapper>
    <notification-wrapper></notification-wrapper>
  `
})
export class AppComponent implements OnInit {

  constructor(
    public appState: AppState,
    private store: Store<any>,
  ) {
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);

    window.appComponentInit && window.appComponentInit();
  }

}
