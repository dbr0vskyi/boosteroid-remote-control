import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

import * as activePage from './active-page.actions';

@Injectable()
export class ActivePageEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
  ) {
  }

  @Effect() changePageName$: Observable<Action> = this.actions$
    .ofType(ROUTER_NAVIGATION)
    .map(toPayload)
    .withLatestFrom(this.store.select(
      'activePage',
      'params',
    ))
    .map(([{ routerState: {url, params} }]: any) => {
      const path = url;
      const regExp = /\/[0-9A-z-_%:\.]+/g;
      const matched = path.match(regExp);
      const paramsKeys = Object.keys(params);

      let mapped = matched.map((page) => page.slice(1));

      if (paramsKeys.length) {
        const paramsArray = Object.keys(params).map((key) => params[key]);

        mapped = mapped.filter((param) => {
          return paramsArray.indexOf(decodeURIComponent(param)) === -1;
        });
      }

      return new activePage.SetActivePageAction({
        pageName: mapped[mapped.length - 1],
        path: mapped,
        rootPageName: mapped[0],
      });
    });
}
