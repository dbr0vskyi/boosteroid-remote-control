import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  public set(key: string, data: any): void {
    localStorage[key] = JSON.stringify(data);
  }

  public get(key: string): any {
    try {
      return JSON.parse(localStorage[key]);
    } catch (err) {
      return null
    }
  }

}
