import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaitingComponent } from './waiting.component';

@NgModule({
  imports: [CommonModule],
  exports: [WaitingComponent],
  declarations: [WaitingComponent],
})
export class WaitingModule {}
