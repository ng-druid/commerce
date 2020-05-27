import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';

import { AdType } from '../models/ads.models';

@Injectable({
  providedIn: 'root'
})
export class AdTypesDataService extends DefaultDataService<AdType> {
  private goApi = `https://p1vgub4jtb.execute-api.us-east-1.amazonaws.com`;
  constructor(config: DefaultDataServiceConfig, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('AdType', http, httpUrlGenerator, config);
    this.entityUrl = `${this.goApi}/ad/types/`;
    this.entitiesUrl = this.entitiesUrl = `${this.goApi}/ad/adtype`;
  }
}
