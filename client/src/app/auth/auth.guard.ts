import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userID = route.queryParams['user-id'];

    return this.checkAccess(userID);
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userID = route.queryParams['user-id'];

    return this.checkAccess(userID);
  }

  private checkAccess(urlUserID: string) {
    const storageUser = this.authService.getUser();
    const userID = urlUserID ?
      urlUserID :
      storageUser && storageUser.userID;

    if (!userID) {
      this.router.navigate(['/login']);

      return false;
    }

    return this.authService.isUserExist(userID)
      .then((flag) => {
        if (flag && !storageUser) this.authService.saveUser({ userID });
        if (!flag) this.router.navigate(['/login']);

        return flag;
      });
  }

}
