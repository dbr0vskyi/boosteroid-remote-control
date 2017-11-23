import { RouterStateSerializer } from '@ngrx/router-store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { Action } from '@ngrx/store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params
}

export interface UnsafeAction extends Action {
  payload?: any;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl> {
  public rawParamTest:any;

  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    this.rawParamTest={};
    this.utilsDeepSearchParam(routerState.root.firstChild);

    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    return {
      url,
      queryParams,
      params:this.rawParamTest,
    };
  }

  utilsDeepSearchParam(currentRoute) {
    if (Object.keys(currentRoute.params).length) {
      this.rawParamTest = Object.assign(this.rawParamTest,currentRoute.params);

      if (currentRoute.firstChild === null){
        return currentRoute;
      } else {
        this.utilsDeepSearchParam(currentRoute.firstChild);
      }
    }
    else if(currentRoute.firstChild === null){

      return currentRoute;
    }
    else {
      return this.utilsDeepSearchParam(currentRoute.firstChild);
    }
  }
}

let typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}
