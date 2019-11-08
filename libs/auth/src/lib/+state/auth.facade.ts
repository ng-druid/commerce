import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { AuthPartialState } from './auth.reducer';
import { authQuery } from './auth.selectors';
import { CompleteAuthentication, Login } from './auth.actions';

@Injectable()
export class AuthFacade {
  loaded$ = this.store.pipe(select(authQuery.getLoaded));
  allAuth$ = this.store.pipe(select(authQuery.getAllAuth));
  selectedAuth$ = this.store.pipe(select(authQuery.getSelectedAuth));

  constructor(private store: Store<AuthPartialState>) {}

  login() {
    this.store.dispatch(new Login());
  }

  completeAuthentication() {
    this.store.dispatch(new CompleteAuthentication());
  }
}
