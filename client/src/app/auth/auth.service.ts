import { Injectable } from '@angular/core';

import { StorageService } from '../core/storage.service';

@Injectable()
export class AuthService {

  constructor(
    private storageService: StorageService,
  ) {
  }

  public getUserID() {
  }

}
