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
  public form$: Observable<any>;

  protected storePageName: string = 'Quiz';

  constructor(
    protected store: Store<any>,
  ) {
    super();

    this.form$ = this.store.select('quiz', 'form');
  }

  public changeInput(inputName, newValue) {
    this.store.dispatch(new quiz.SetFormAction({ [inputName]: newValue }));
  }

  public sendFeedback() {
    this.store.dispatch(new quiz.SendFormAction());
  }

}
