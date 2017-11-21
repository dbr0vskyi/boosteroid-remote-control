import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule, ApplicationRef,
} from '@angular/core';
import {
  removeNgStyles, createNewHosts, createInputTransfer,
} from '@angularclass/hmr';
import {
  RouterModule, PreloadAllModules,
} from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngx/effects';

import { metaReducers, reducers } from './reducers';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { NoContentComponent } from './no-content';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CustomRouterStateSerializer } from './shared/utils';

import { ActivePageEffects } from './common-controls/active-page/active-page.effects';
import { ModalWrapperEffects } from './common-controls/modal-wrapper/modal-wrapper.effects';
import { NotificationEffects } from './common-controls/notification/notification.effects';

import '../styles/styles.scss';

import { RouterEffects } from './common-controls/router/router.effects';

const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS, AppState,
];

type StoreType = {
  state: InternalStateType, restoreInputValues: () => void, disposeOldHosts: () => void
};

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      ROUTES,
      {
        useHash: Boolean(history.pushState) === false,
        preloadingStrategy: PreloadAllModules,
      },
    ),
    CoreModule.forRoot(),
    SharedModule,
    StoreModule.forRoot(
      reducers,
      { metaReducers },
    ),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 55,
    }),
    EffectsModule.forRoot({
      ActivePageEffects,
      NotificationEffects,
      ModalWrapperEffects,
      RouterEffects,
    }),
  ],
  declarations: [
    AppComponent, NoContentComponent,
  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer,
    }
  ],
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState,
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log(
      'HMR store',
      JSON.stringify(store,
        null,
        2,
      ),
    );
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
