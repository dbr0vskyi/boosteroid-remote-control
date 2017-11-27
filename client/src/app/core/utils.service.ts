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

  public randomInteger(min, max): number {
    const rand = min - 0.5 + Math.random() * (max - min + 1)
    const roundedRand = Math.round(rand);

    return roundedRand;
  }

  public timout(ms): Promise<any> {
    return new Promise((resolve, reject) => {
     setTimeout(resolve, ms);
    });
  }

}
