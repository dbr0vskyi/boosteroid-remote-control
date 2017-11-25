import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private host: string;
  private socket: any;

  constructor() {
    const parts = document.location.pathname.split('/');
    const base = parts.slice(0, parts.length - 1).join('/') + '/';
    const path = base + 'socket.io';

    this.host = window.location.protocol + "//" + window.location.host;

    this.socket = io(this.host, { path });
    this.socket.on("connect", () => this.connected());
    this.socket.on("disconnect", () => this.disconnected());
    this.socket.on("error", (error: string) => {
      console.log(`ERROR: "${error}" (${this.host})`);
    });
  }

  private connected() {}

  private disconnected() {}

  public on(chanel: string, callback: Function) {
    return this.socket.on(chanel, callback);
  }

  public emit(chanel: string, ...data: any[]) {
    return this.socket.emit(chanel, ...data);
  }

  public connect() {
    return this.socket.connect();
  }
  public disconnect() {
    return this.socket.disconnect();
  }

}
