import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { NotificationWrapperComponent } from './notification-wrapper.component';

@NgModule({
  imports: [SharedModule],
  exports: [NotificationWrapperComponent],
  declarations: [NotificationWrapperComponent],
})
export class NotificationWrapperModule {}
