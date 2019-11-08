import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NxModule } from '@nrwl/angular';
import { AuthModule, CLIENT_SETTINGS, ClientSettings } from '@classifieds-ui/auth';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// import { AuthService } from './services/auth.service';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';

const routes = [
  { path: 'auth-callback', component: AuthCallbackComponent }
];

@NgModule({
  declarations: [AppComponent, AuthCallbackComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AuthModule,
    NxModule.forRoot()
  ],
  providers: [
    { provide: CLIENT_SETTINGS, useValue: new ClientSettings(environment.clientSettings) }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
