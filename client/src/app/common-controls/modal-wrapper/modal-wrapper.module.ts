import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ModalWrapperComponent } from './modal-wrapper.component';

@NgModule({
  imports: [SharedModule],
  exports: [ModalWrapperComponent],
  declarations: [ModalWrapperComponent],
})
export class ModalWrapperModule {}
