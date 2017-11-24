import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ModalModel } from './modal.model';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() data: ModalModel;
  @Output('onClose') close = new EventEmitter<void>();

  constructor() {}

  public onCloseButtonClick() {
    this.close.emit();
  }
}
