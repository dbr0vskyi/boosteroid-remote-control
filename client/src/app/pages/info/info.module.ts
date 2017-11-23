import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { InfoComponent } from './info.component';
import { routes } from './info.routes';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  exports: [InfoComponent],
  declarations: [InfoComponent],
})
export class InfoModule {}
