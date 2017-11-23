import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { SettingsComponent } from './settings.component';
import { routes } from './settings.routes';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  exports: [SettingsComponent],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
