import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';
import { routes } from './login.routes';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [LoginComponent],
  declarations: [LoginComponent],
})
export class LoginModule {}
