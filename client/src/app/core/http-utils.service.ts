import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ModalModel } from '../common/modal/modal.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HttpUtilsService {
  private PREFIX: string = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getModalsData() {
    return this.http.get<{ [key: string]: ModalModel }>(this.PREFIX + '/mocks/modals');
  }

  getKeymap() {
    return this.http.get(this.PREFIX + '/mocks/keymap');
  }

  postRequestAccess(email) {
    return this.http.post(this.PREFIX + '/auth/request-access', {
      email
    });
  }

  saveFeedback(form) {
    return this.http.post(this.PREFIX + '/others/save-feedback', {
      form,
      // userID: this.authService.getUserID(),
      userID: '1aedb8d9dc4751e229a335e371db8058',
    });
  }

}
