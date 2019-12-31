import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger } from '@ngrx/data';

import { ADS_SETTINGS } from '../ads.tokens';
import { Ad, AdsSettings } from '../models/ads.models';

@Injectable({
  providedIn: 'root'
})
export class AdDataService extends DefaultDataService<Ad> {
  constructor(@Inject(ADS_SETTINGS) adsettings: AdsSettings,http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('Ad', http, httpUrlGenerator);
    this.entityUrl = this.entitiesUrl = `${adsettings.endpointUrl}/ads/`;
  }
}
