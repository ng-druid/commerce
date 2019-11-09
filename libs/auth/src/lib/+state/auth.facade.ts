import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { AuthPartialState } from './auth.reducer';
import { authQuery } from './auth.selectors';
import { CompleteAuthentication, Login } from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  getUser$ = this.store.pipe(select(authQuery.getUser));

  constructor(private store: Store<AuthPartialState>) {}

  login() {
    this.store.dispatch(new Login());
  }

  completeAuthentication() {
    this.store.dispatch(new CompleteAuthentication());
  }

}
