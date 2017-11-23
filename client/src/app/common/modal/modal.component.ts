import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output('onClose') close = new EventEmitter<void>();

  constructor() {}

  public onCloseButtonClick() {
    this.close.emit();
  }
}
