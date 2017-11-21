import { Injectable, Optional } from '@angular/core';

export class UtilsServiceConfig {
}

@Injectable()
export class UtilsService {
  public config: any;

  consturctor(
    @Optional() config: UtilsServiceConfig
  ) {
    if (config) {
      this.config = config;
    }
  }
}
