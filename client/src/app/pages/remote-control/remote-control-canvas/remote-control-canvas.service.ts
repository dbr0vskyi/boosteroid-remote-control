import { Injectable } from '@angular/core';

declare const InstallTrigger;
declare const window: any;
declare const document: any;
declare const Module: any;

/**
 * decompress bitmap from RLE algorithm
 * @param	bitmap	{object} bitmap object of bitmap event of node-rdpjs
 */
function decompress (bitmap) {
  var fName = null;
  switch (bitmap.bitsPerPixel) {
    case 15:
      fName = 'bitmap_decompress_15';
      break;
    case 16:
      fName = 'bitmap_decompress_16';
      break;
    case 24:
      fName = 'bitmap_decompress_24';
      break;
    case 32:
      fName = 'bitmap_decompress_32';
      break;
    default:
      throw 'invalid bitmap data format';
  }

  var input = new Uint8Array(bitmap.data);
  var inputPtr = Module._malloc(input.length);
  var inputHeap = new Uint8Array(Module.HEAPU8.buffer, inputPtr, input.length);
  inputHeap.set(input);

  var output_width = bitmap.destRight - bitmap.destLeft + 1;
  var output_height = bitmap.destBottom - bitmap.destTop + 1;
  var ouputSize = output_width * output_height * 4;
  var outputPtr = Module._malloc(ouputSize);

  var outputHeap = new Uint8Array(Module.HEAPU8.buffer, outputPtr, ouputSize);

  var res = Module.ccall(fName,
    'number',
    ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'],
    [outputHeap.byteOffset, output_width, output_height, bitmap.width, bitmap.height, inputHeap.byteOffset, input.length]
  );

  var output = new Uint8ClampedArray(outputHeap.buffer, outputHeap.byteOffset, ouputSize);

  Module._free(inputPtr);
  Module._free(outputPtr);

  return { width : output_width, height : output_height, data : output };
}

/**
 * Un compress bitmap are reverse in y axis
 */
function reverse (bitmap) {
  return { width : bitmap.width, height : bitmap.height, data : new Uint8ClampedArray(bitmap.data) };
}

@Injectable()
export class RemoteControlCanvasService {

  constructor() { }

  public elementOffset(el) {
    let x = 0;
    let y = 0;

    while (el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop )) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  public browser() {
    if (typeof InstallTrigger !== 'undefined') {
      return 'firefox';
    }

    if (!!window.chrome) {
      return 'chrome';
    }

    if (!!document.documentMode) {
      return 'ie';
    }

    return null;
  }

  public locale() {
    return window.navigator.userLanguage || window.navigator.language;
  }

  public decompress(bitmap) {
    return decompress(bitmap);
  }

  public reverse(bitmap) {
    return reverse(bitmap);
  }

  public mouseButtonMap(button) {
    switch(button) {
      case 0:
        return 1;
      case 2:
        return 2;
      default:
        return 0;
    }
  }

  public scancode(event, { KeyMap, UnicodeToCode}) {
    let locale = this.locale();

    locale = (['fr', 'en'].indexOf(locale) > 0 && locale) || 'en';

    return KeyMap[event.code || UnicodeToCode[this.browser() || 'firefox'][locale][event.keyCode]];
  }
}
