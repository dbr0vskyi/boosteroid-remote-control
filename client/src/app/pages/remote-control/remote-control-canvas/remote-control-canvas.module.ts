import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoteControlCanvasComponent } from './remote-control-canvas.component';
import { RemoteControlCanvasService } from './remote-control-canvas.service';
import { MouseWheelDirective } from './mousewheel.directive';

@NgModule({
  imports: [CommonModule],
  exports: [RemoteControlCanvasComponent],
  declarations: [RemoteControlCanvasComponent, MouseWheelDirective],
  providers: [RemoteControlCanvasService],
})
export class RemoteControlCanvasModule {}
