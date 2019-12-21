import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxModule } from '@nrwl/angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule, AuthInterceptor, CLIENT_SETTINGS, ClientSettings } from '@classifieds-ui/auth';
import { AdsSettings, ADS_SETTINGS } from '@classifieds-ui/ads';
import { MediaModule, MediaSettings, MEDIA_SETTINGS } from '@classifieds-ui/media';
import { UtilsModule, CorrelationInterceptor } from '@classifieds-ui/utils';
import { MaterialModule } from '@classifieds-ui/material';
import { LOGGING_SETTINGS, LoggingSettings, LoggingModule, HttpErrorInterceptor, GlobalErrorHandler } from '@classifieds-ui/logging';
import { CITIES_SETTINGS, CitiesSettings } from '@classifieds-ui/cities';
import { CHAT_SETTINGS, ChatSettings } from '@classifieds-ui/chat';
import { TAXONOMY_SETTINGS, TaxonomySettings } from '@classifieds-ui/taxonomy';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';

// import { AuthService } from './services/auth.service';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AccountDashboardComponent } from './components/account-dashboard/account-dashboard.component';
import { HomeComponent } from './components/home/home.component';

// @todo: for now
const localStorageSyncReducer = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return localStorageSync({keys: ['auth'], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

const routes = [
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: 'account', component: AccountDashboardComponent },
  { path: 'chat', loadChildren: () => import('@classifieds-ui/chat').then(m => m.ChatModule) },
  { path: 'ads', loadChildren: () => import('@classifieds-ui/ads').then(m => m.AdsModule) },
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [AppComponent, AuthCallbackComponent, AppHeaderComponent, AppFooterComponent, AccountDashboardComponent, HomeComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(
      {},
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
    AuthModule,
    MediaModule,
    NxModule.forRoot()
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: CLIENT_SETTINGS, useValue: new ClientSettings(environment.clientSettings) },
    { provide: ADS_SETTINGS, useValue: new AdsSettings(environment.adsSettings) },
    { provide: MEDIA_SETTINGS, useValue: new MediaSettings(environment.mediaSettings) },
    { provide: LOGGING_SETTINGS, useValue: new LoggingSettings(environment.loggingSettings) },
    { provide: CITIES_SETTINGS, useValue: new CitiesSettings(environment.citiesSettings) },
    { provide: CHAT_SETTINGS, useValue: new ChatSettings(environment.chatSettings) },
    { provide: TAXONOMY_SETTINGS, useValue: new TaxonomySettings(environment.taxonomySettings) },
    { provide: HTTP_INTERCEPTORS, useClass: CorrelationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
