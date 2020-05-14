import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';

import { AdProfileItem } from '../models/ads.models';

@Injectable({
  providedIn: 'root'
})
export class AdProfileItemsDataService extends DefaultDataService<AdProfileItem> {
  constructor(config: DefaultDataServiceConfig, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('AdProfileItem', http, httpUrlGenerator, config);
    this.entityUrl = this.entitiesUrl = `${config.root}/profiles/profilenavitems/`;
  }
}
