import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { StorageService } from '../core/storage.service';
import { HttpUtilsService } from '../core/http-utils.service';

@Injectable()
export class AuthService {

  constructor(
    private storageService: StorageService,
    private httpUtilsService: HttpUtilsService,
  ) {
  }

  public isUserExist(userID): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.httpUtilsService.checkUserAccessToSite(userID)
        .catch((response): any => resolve(false))
        .subscribe((response) => resolve(true));
    });
  }

  public getUser() {
    return this.storageService.get('user');
  }

  public saveUser(user) {
    this.storageService.set('user', user);
  }

}
