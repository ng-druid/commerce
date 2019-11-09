import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';

import { AuthPartialState } from './auth.reducer';
import { authQuery } from './auth.selectors';
import { CompleteAuthentication, Login } from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  getUser$ = this.store.pipe(select(authQuery.getUser));
  token$ = this.store.pipe(select(authQuery.getUser), map(u => u ? `${u.token_type} ${u.access_token}` : undefined));

  constructor(private store: Store<AuthPartialState>) {}

  login() {
    this.store.dispatch(new Login());
  }

  completeAuthentication() {
    this.store.dispatch(new CompleteAuthentication());
  }

}
