import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './+state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserManager } from 'oidc-client';
import { AuthEffects } from './+state/auth.effects';
import { AuthFacade } from './+state/auth.facade';
import { userManagerFactory } from './auth.factories';
import { CLIENT_SETTINGS } from './auth.tokens';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer)
  ],
  providers: [
    AuthFacade,
    { provide: UserManager, useFactory: userManagerFactory, deps: [CLIENT_SETTINGS] }
  ]
})
export class AuthModule {}
