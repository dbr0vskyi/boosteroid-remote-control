import { Store } from '@ngrx/store';

import { UnsubscribeOnDestroy } from './unsubscribe-on-destroy';

export abstract class DispatchOnDestroy extends UnsubscribeOnDestroy {
  protected storePageName: string;
  protected store: Store<any>;

  constructor() {
    super();

    this.ngUnsubscribe.subscribe(() => {
      if (this.storePageName === undefined) {
        throw new Error('storePageName must be defined when using DispatchOnDestroy abstract class!');
      }

      this.store.dispatch({
        type: `[${ this.storePageName }] Page Was Destroyed`,
      });
    });
  }
}
