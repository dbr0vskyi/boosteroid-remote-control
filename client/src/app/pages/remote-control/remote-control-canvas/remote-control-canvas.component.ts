import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

import { RemoteControlCanvasService } from './remote-control-canvas.service';
import { SocketService } from '../../../core/socket.service';

@Component({
  selector: 'remote-control-canvas',
  templateUrl: 'remote-control-canvas.component.html',
})
export class RemoteControlCanvasComponent implements OnInit {
  private ctx: CanvasRenderingContext2D;
  private activeSession: boolean = false;

  @Input() height: number;
  @Input() width: number;
  @Input() machineType: string;
  @Input('keymap') keymap: any;

  @ViewChild('rdpCanvas') canvasRef: ElementRef;

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.activeSession) return;

    this.socketService.emit('scancode', this.remoteControlCanvasService.scancode(event, this.keymap), true);

    event.preventDefault();
    return false;
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (!this.activeSession) return;

    this.socketService.emit('scancode', this.remoteControlCanvasService.scancode(event, this.keymap), false);

    event.preventDefault();
    return false;
  }

  constructor(
    private socketService: SocketService,
    private remoteControlCanvasService: RemoteControlCanvasService
  ) {
  }

  public ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');

    this.bindRDPEvents()
      .then((data) => {
        console.log('[mstsc.js] close');
        this.activeSession = false;
      })
      .catch((err) => {
        console.log('[mstsc.js] error : ' + err.code + '(' + err.message + ')');
        this.activeSession = false;
      });

    this.initializeRDPConnection();
  }

  private initializeRDPConnection() {
    this.socketService.emit('infos', {
      screen : {
        width : this.width,
        height : this.height
      },
      machineType: this.machineType,
      locale : this.remoteControlCanvasService.locale()
    });
  }

  private bindRDPEvents(): Promise<any> {
    return new Promise((resolve, reject) => {

      this.socketService
        .on('rdp-connect', () => {
          // this event can be occured twice (RDP protocol stack artefact)
          console.log('[mstsc.js] connected');
          this.activeSession = true;
        })
        .on('rdp-bitmap', (bitmap) => {
          // console.log('[mstsc.js] bitmap update bpp : ' + bitmap.bitsPerPixel);
          this.updateCanvas(bitmap);
        })
        .on('rdp-close', () => {
          resolve(null);
        })
        .on('rdp-error', (err) => {
          reject(err);
        });

    });
  }

  private updateCanvas(bitmap) {
    let output = null;

    if (bitmap.isCompress) {
      output = this.remoteControlCanvasService.decompress(bitmap);
    }
    else {
      output = this.remoteControlCanvasService.reverse(bitmap);
    }

    // use image data to use asm.js
    const imageData = this.ctx.createImageData(output.width, output.height);
    imageData.data.set(output.data);

    this.ctx.putImageData(imageData, bitmap.destLeft, bitmap.destTop);
  }

  public onCanvasMouseMove(event) {
    if (!this.activeSession) return;

    const offset = this.remoteControlCanvasService.elementOffset(this.canvasRef.nativeElement);
    this.socketService.emit(
      'mouse',
      event.clientX - offset.left,
      event.clientY - offset.top,
      0,
      false
    );

    event.preventDefault();
    return false;
  }

  public onCanvasMouseDown(event) {
    if (!this.activeSession) return;

    const offset = this.remoteControlCanvasService.elementOffset(this.canvasRef.nativeElement);
    this.socketService.emit(
      'mouse',
      event.clientX - offset.left,
      event.clientY - offset.top,
      this.remoteControlCanvasService.mouseButtonMap(event.button),
      true
    );

    event.preventDefault();
    return false;
  }

  public onCanvasMouseUp(event) {
    if (!this.activeSession) return;

    const offset = this.remoteControlCanvasService.elementOffset(this.canvasRef.nativeElement);
    this.socketService.emit(
      'mouse',
      event.clientX - offset.left,
      event.clientY - offset.top,
      this.remoteControlCanvasService.mouseButtonMap(event.button),
      false
    );

    event.preventDefault();
    return false;
  }

  public onCanvasContextMenu(event) {
    if (!this.activeSession) return;

    const offset = this.remoteControlCanvasService.elementOffset(this.canvasRef.nativeElement);
    this.socketService.emit(
      'mouse',
      event.clientX - offset.left,
      event.clientY - offset.top,
      this.remoteControlCanvasService.mouseButtonMap(event.button),
      false
    );

    event.preventDefault();
    return false;
  }

  public onCanvasWheel(event) {
    if (!this.activeSession) return;

    const isHorizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    const delta = isHorizontal ? event.deltaX : event.deltaY;
    const step = Math.round(Math.abs(delta) * 15 / 8);

    const offset = this.remoteControlCanvasService.elementOffset(this.canvasRef.nativeElement);
    this.socketService.emit(
      'wheel',
      event.clientX - offset.left,
      event.clientY - offset.top,
      step,
      delta > 0,
      isHorizontal
    );

    event.preventDefault();
    return false;
  }

}
