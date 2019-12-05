import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NxModule } from '@nrwl/angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule, AuthInterceptor, CLIENT_SETTINGS, ClientSettings } from '@classifieds-ui/auth';
import { AdsModule, AdsSettings, ADS_SETTINGS } from '@classifieds-ui/ads';
import { MediaModule, MediaSettings, MEDIA_SETTINGS } from '@classifieds-ui/media';
import { UtilsModule, CorrelationInterceptor } from '@classifieds-ui/utils';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';
import { NgxDropzoneModule } from 'ngx-dropzone';

// import { AuthService } from './services/auth.service';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AdBrowserComponent } from './components/ad-browser/ad-browser.component';
import { AdDetailComponent } from './components/ad-detail/ad-detail.component';
import { CreateAdComponent } from './components/create-ad/create-ad.component';
import { AdMasterComponent } from './components/ad-master/ad-master.component';
import { AdSearchBarComponent } from './components/ad-search-bar/ad-search-bar.component';

// @todo: for now
const localStorageSyncReducer = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return localStorageSync({keys: ['auth'], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

const routes = [
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: 'create-ad', component: CreateAdComponent },
  // { path: 'ad/:adId', component: AdDetailComponent },
  { path: 'ad/:adId', component: AdBrowserComponent },
  { path: '', component: AdBrowserComponent }
];

@NgModule({
  declarations: [AppComponent, AuthCallbackComponent, AdBrowserComponent, AdDetailComponent, CreateAdComponent, AdMasterComponent, AdSearchBarComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    NgxDropzoneModule,
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
    UtilsModule,
    AuthModule,
    AdsModule,
    MediaModule,
    NxModule.forRoot()
  ],
  providers: [
    { provide: CLIENT_SETTINGS, useValue: new ClientSettings(environment.clientSettings) },
    { provide: ADS_SETTINGS, useValue: new AdsSettings(environment.adsSettings) },
    { provide: MEDIA_SETTINGS, useValue: new MediaSettings(environment.mediaSettings) },
    { provide: HTTP_INTERCEPTORS, useClass: CorrelationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
