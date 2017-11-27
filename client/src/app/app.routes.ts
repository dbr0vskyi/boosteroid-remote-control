import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

import {
  AuthGuard,
  DemoGuard,
} from './auth';

import {
  LoginComponent,
  LoginResolveService,
  InfoResolveService,
  QuizResolveService,
  RemoteControlResolveService,
  SettingsResolveService,
} from './pages';

export const ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    resolve: {
      item: LoginResolveService,
    },
  },
  {
    path: 'info',
    loadChildren: './pages/info#InfoModule',
    resolve: {
      item: InfoResolveService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'quiz',
    loadChildren: './pages/quiz#QuizModule',
    resolve: {
      item: QuizResolveService,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'remote-control',
    loadChildren: './pages/remote-control#RemoteControlModule',
    resolve: {
      item: RemoteControlResolveService,
    },
    canActivate: [
      AuthGuard,
      DemoGuard
    ],
  },
  {
    path: 'settings',
    loadChildren: './pages/settings#SettingsModule',
    resolve: {
      item: SettingsResolveService,
    },
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NoContentComponent,
  }
];
