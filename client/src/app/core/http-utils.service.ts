import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ModalModel } from '../common/modal/modal.model';

@Injectable()
export class HttpUtilsService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public checkUserAccessToSite(userID) {
    return this.http.post('/api/auth/check-user-site', { userID });
  }

  public checkUserAccessToDemo(userID) {
    return this.http.post('/api/auth/check-user-demo', { userID });
  }

  public getModalsData() {
    return this.http.get<{ [key: string]: ModalModel }>('/api/mocks/modals');
  }

  public checkAvailableMachinesByType(userID, machineType) {
    return this.http.post('/api/machines/check-available', { userID, machineType });
  }

  public getKeymap() {
    return this.http.get('/api/mocks/keymap');
  }

  public postRequestAccess(email) {
    return this.http.post('/api/auth/request-access', { email });
  }

  public saveFeedback(userID, form) {
    return this.http.post('/api/others/save-feedback', {
      form,
      userID
    });
  }

}
