/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/**
 * App Component
 * Top Level Component
 */
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
  public name = 'Boosteroid Demo Service';

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
