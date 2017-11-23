import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as quiz from './quiz.actions';
import { DispatchOnDestroy } from '../../abstract';

@Component({
  selector: 'quiz',
  templateUrl: 'quiz.component.html',
  styleUrls: ['quiz.component.scss'],
})
export class QuizComponent extends DispatchOnDestroy {

  protected storePageName: string = 'Quiz';

  constructor(
    protected store: Store<any>,
  ) {
    super();
  }
}
