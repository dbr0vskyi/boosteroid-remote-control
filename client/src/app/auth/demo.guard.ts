import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { HttpUtilsService } from '../core/http-utils.service';
import { UtilsService } from '../core/utils.service';
import * as modalWrapper from '../common-controls/modal-wrapper/modal-wrapper.actions';

@Injectable()
export class DemoGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private httpUtilsService: HttpUtilsService,
    private utilsService: UtilsService,
    private router: Router,
    private store: Store<any>,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const machineType = route.queryParams['machine-type'];

    return this.checkAccess(machineType);
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const machineType = route.queryParams['user-id'];

    return this.checkAccess(machineType);
  }

  private checkAccess(machineType: string) {
    const userID = this.authService.getUser().userID;

    return this.httpUtilsService.checkAvailableMachinesByType(userID, machineType)
      .toPromise()
      .then((res: any) => {
        if (!res.available) {
          res.modal && this.utilsService
            .timout(500)
            .then(() => {
              this.store.dispatch(new modalWrapper.ShowModalAction({
                modalData: res.modal,
                target: 'machines-not-available',
              }));
            });

          this.router.navigate(['/settings']);
          return false;
        }

        return true;
      })
      .catch(() => {
        this.router.navigate(['/settings']);
        return false;
      });
  }

}
