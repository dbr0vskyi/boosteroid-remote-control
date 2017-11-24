import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ModalModel } from '../common/modal/modal.model';

@Injectable()
export class HttpUtilsService {
  private PREFIX: string = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
  ) {}

  getModalsData() {
    return this.http.get<{ [key: string]: ModalModel }>(this.PREFIX + '/mocks/modals');
  }

  postRequestAccess(email) {
    return this.http.post(this.PREFIX + '/auth/request-access', { email });
  }

}
