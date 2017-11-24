import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  constructor() {}

  public isFormValid(form: any): boolean {
    return Array.prototype.slice.call(form)
      .filter((element) => element.required)
      .every((element) => {
        return this.isValidInput(element);
      });
  }

  public isValidInput(element: any): boolean {
    const validations = {
      text(element) {
        if (!element.value) return false;
        if (element.pattern && !new RegExp(element.pattern).test(element.value)) return false;

        return true;
      },
      checkbox(element) {
        return element.checked;
      },
    };

    if (validations[element.type]) return validations[element.type](element);

    return true;
  }

}
