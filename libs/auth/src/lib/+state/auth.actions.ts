import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  CompleteAuthentication = '[Auth] CompleteAuthentication'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
}

export class CompleteAuthentication implements Action {
  readonly type = AuthActionTypes.CompleteAuthentication;
}

export type AuthAction = Login | CompleteAuthentication;

export const fromAuthActions = {
  Login,
  CompleteAuthentication
};
