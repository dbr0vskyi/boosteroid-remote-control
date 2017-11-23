import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class RemoteControlResolveService implements Resolve<any> {

  constructor() {}

  resolve() {
    return true;
  }

}
