import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';

import { Ad } from '../models/ads.models';

@Injectable({
  providedIn: 'root'
})
export class AdsDataService extends DefaultDataService<Ad> {
  constructor(config: DefaultDataServiceConfig, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('Ad', http, httpUrlGenerator, config);
    this.entityUrl = this.entitiesUrl = `${config.root}/ads/ad/`;
  }
}
