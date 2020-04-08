import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { EntityDefinitionService } from '@ngrx/data';
import { initAuthFactory } from './auth.factories';

import { entityMetadata } from './entity-metadata';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    AuthFacade,
    { provide: UserManager, useFactory: userManagerFactory, deps: [CLIENT_SETTINGS] },
    { provide: APP_INITIALIZER, useFactory: initAuthFactory, multi: true, deps: [UserManager, AuthFacade] }
  ]
})
export class AuthModule {
  constructor(eds: EntityDefinitionService) {
    eds.registerMetadataMap(entityMetadata);
  }
}
