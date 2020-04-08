import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';

import { AdType } from '../models/ads.models';

@Injectable({
  providedIn: 'root'
})
export class AdTypesDataService extends DefaultDataService<AdType> {
  constructor(config: DefaultDataServiceConfig, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('AdType', http, httpUrlGenerator, config);
    this.entityUrl = this.entitiesUrl = `${config.root}/ads/adtypes/`;
  }
}
