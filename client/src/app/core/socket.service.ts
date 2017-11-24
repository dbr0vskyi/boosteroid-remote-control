import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private host: string = 'http://localhost:8080';
  private socket: any;

  constructor() {
    this.socket = io(this.host);
    this.socket.on("connect", () => this.connected());
    this.socket.on("disconnect", () => this.disconnected());
    this.socket.on("error", (error: string) => {
      console.log(`ERROR: "${error}" (${this.host})`);
    });
  }

  public emit(chanel:string, message:any) {
    return new Observable<any>(observer => {
      this.socket.emit(chanel, message, function (data) {
        if (data.success) {
          observer.next(data.msg);
        } else {
          observer.error(data.msg);
        }

        observer.complete();
      });
    });
  }

  public connect() {
    this.socket.connect();
  }
  public disconnect() {
    this.socket.disconnect();
  }

}
