import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { UtilsService } from '../core/utils.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService,
    private router: Router,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url: string = state.url;

    return this.checkAccess(url);
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url: string = state.url;

    return this.checkAccess(url);
  }

  private checkAccess(url: string) {
    // TODO: Write access checking implementation

    return true;
  }

}
