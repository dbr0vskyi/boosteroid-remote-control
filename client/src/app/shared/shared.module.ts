import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  ModalModule,
  NotificationModule,
  PageHeaderModule,
  WaitingModule,
} from '../common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ModalModule,
    NotificationModule,
    PageHeaderModule,
    WaitingModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ModalModule,
    NotificationModule,
    PageHeaderModule,
    WaitingModule,
  ]
})
export class SharedModule {
}
