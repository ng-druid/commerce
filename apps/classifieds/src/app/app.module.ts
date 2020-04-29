import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxModule } from '@nrwl/angular';
import { FlexLayoutModule } from '@angular/flex-layout';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { AD_SETTINGS, AdSettings } from '@classifieds-ui/ads';
import { AuthModule, AuthInterceptor, LogoutInterceptor, CLIENT_SETTINGS, ClientSettings } from '@classifieds-ui/auth';
import { MediaModule, MediaSettings, MEDIA_SETTINGS } from '@classifieds-ui/media';
import { UtilsModule, CorrelationInterceptor } from '@classifieds-ui/utils';
import { MaterialModule } from '@classifieds-ui/material';
import { LOGGING_SETTINGS, LoggingSettings, LoggingModule, HttpErrorInterceptor, GlobalErrorHandler } from '@classifieds-ui/logging';
//import { CHAT_SETTINGS, ChatSettings } from '@classifieds-ui/chat';
// import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG } from '@okta/okta-angular';
import { UserManager } from 'oidc-client';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule, MinimalRouterStateSerializer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { EntityDataModule, DefaultDataServiceConfig } from '@ngrx/data';
import { reducers, metaReducers } from './reducers';

const routes = [
  { path: 'auth-callback', component: AuthCallbackComponent },
  // { path: 'implicit/callback', component: OktaCallbackComponent },
  // { path: 'chat', loadChildren: () => import('@classifieds-ui/chat').then(m => m.ChatModule) },
  { path: 'ads', loadChildren: () => import('@classifieds-ui/ads').then(m => m.AdsModule) },
  { path: 'vocabularies', loadChildren: () => import('@classifieds-ui/vocabulary').then(m => m.VocabularyModule) },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];

// @todo: just get this to work for now deal with actual endpoints later.
const defaultDataServiceConfig: DefaultDataServiceConfig = {
  // root: 'https://localhost:44340', // hard coded to taxonomy for now -- api gateway will prevent the need for custom code to change this per entity.
  // root: 'https://classifieds-dev.azurewebsites.net',
  root: environment.apiGatewaySettings.endpointUrl,
  timeout: 10000, // request timeout
}

const oktaConfig = {
  issuer: 'https://dev-585865.okta.com/oauth2/default',
  redirectUri: environment.oktaSettings.redirectUri,
  clientId: environment.oktaSettings.clientId,
  pkce: true,
  scopes: ['openid', 'profile', 'ads_api', 'chat', 'taxonomy_api', 'api_gateway']
}

@NgModule({
  declarations: [AppComponent, AuthCallbackComponent, AppHeaderComponent, AppFooterComponent, HomeComponent, NotFoundComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserTransferStateModule ,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: MinimalRouterStateSerializer
    }),
    StoreModule.forRoot(
      reducers,
      {
        metaReducers: metaReducers,
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    MaterialModule,
    UtilsModule,
    LoggingModule,
    AuthModule.forRoot(),
    MediaModule,
    NxModule.forRoot(),
    EntityDataModule.forRoot({}),
    // OktaAuthModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },

    // okta auth
    //{ provide: OKTA_CONFIG, useValue: oktaConfig },

    { provide: CLIENT_SETTINGS, useValue: new ClientSettings(environment.clientSettings) },
    { provide: MEDIA_SETTINGS, useValue: new MediaSettings(environment.mediaSettings) },
    { provide: LOGGING_SETTINGS, useValue: new LoggingSettings(environment.loggingSettings) },
    { provide: AD_SETTINGS, useValue: new AdSettings(environment.adSettings) },
    // { provide: CHAT_SETTINGS, useValue: new ChatSettings(environment.chatSettings) },

    // There is no way to prioritize interceptors so order can be important.
    // { provide: HTTP_INTERCEPTORS, useClass: CorrelationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogoutInterceptor, multi: true },

    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
