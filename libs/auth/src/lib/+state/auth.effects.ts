import { Injectable } from '@angular/core';
import { createEffect, Effect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { UserManager } from 'oidc-client';
import { tap } from 'rxjs/operators';

import { AuthPartialState } from './auth.reducer';
import {
  Login,
  CompleteAuthentication,
  AuthActionTypes
} from './auth.actions';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Login),
      tap(() => {
        this.userManager.signinRedirect();
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<AuthPartialState>,
    private userManager: UserManager
  ) {}
}
