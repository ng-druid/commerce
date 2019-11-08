import { Action } from '@ngrx/store';
import { User } from 'oidc-client';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  CompleteAuthentication = '[Auth] CompleteAuthentication',
  SetUser = '[Auth] SetUser'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
}

export class CompleteAuthentication implements Action {
  readonly type = AuthActionTypes.CompleteAuthentication;
}

export class SetUser implements Action {
  readonly type = AuthActionTypes.SetUser;
  constructor(public payload: User) {}
}

export type AuthAction = Login | CompleteAuthentication | SetUser;

export const fromAuthActions = {
  Login,
  CompleteAuthentication,
  SetUser
};
