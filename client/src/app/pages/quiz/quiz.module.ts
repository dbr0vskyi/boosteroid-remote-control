import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { QuizComponent } from './quiz.component';
import { routes } from './quiz.routes';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  exports: [QuizComponent],
  declarations: [QuizComponent],
})
export class QuizModule {}
