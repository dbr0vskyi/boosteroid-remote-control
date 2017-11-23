import { ActionReducer, combineReducers, MetaReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { environment } from '../environments/environment';
import { RouterStateUrl } from '../shared/utils';
import * as fromInfo from '../pages/info/info.reducer';
import * as fromLogin from '../pages/login/login.reducer';
import * as fromQuiz from '../pages/quiz/quiz.reducer';
import * as fromRemoteControl from '../pages/remote-control/remote-control.reducer';
import * as fromSettings from '../pages/settings/settings.reducer';
import * as fromActivePage from '../common-controls/active-page/active-page.reducer';
import * as fromModalWrapper from '../common-controls/modal-wrapper/modal-wrapper.reducer';
import * as fromNotificationWrapper from '../common-controls/notification-wrapper/notification-wrapper.reducer';

export const reducers = {
  activePage: fromActivePage.activePageReducer,
  notificationWrapper: fromNotificationWrapper.notificationWrapperReducer,
  modalWrapper: fromModalWrapper.modalWrapperReducer,
  settings: fromSettings.settingsReducer,
  info: fromInfo.infoReducer,
  login: fromLogin.loginReducer,
  quiz: fromQuiz.quizReducer,
  remoteControl: fromRemoteControl.remoteControlReducer,
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: any, action: any): any {
    console.info('ACTION', action);
    console.dir('STATE', state);
    console.log('');

    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<any>[] = !environment.production ?
  [logger] :
  [];
