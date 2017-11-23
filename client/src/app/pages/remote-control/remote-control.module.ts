import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { RemoteControlComponent } from './remote-control.component';
import { routes } from './remote-control.routes';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  exports: [RemoteControlComponent],
  declarations: [RemoteControlComponent],
})
export class RemoteControlModule {}
