import { Injectable } from '@angular/core';

declare const InstallTrigger;
declare const window: any;

@Injectable()
export class RemoteControlService {
  
  constructor() { }

  elementOffset(el) {
    var x = 0;
    var y = 0;
    while (el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop )) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  browser() {
    if (typeof InstallTrigger !== 'undefined') {
      return 'firefox';
    }

    if (!!window.chrome) {
      return 'chrome';
    }

    if (!!document.docuemntMode) {
      return 'ie';
    }

    return null;
  }

  locale() {
    return window.navigator.userLanguage || window.navigator.language;
  }

}
