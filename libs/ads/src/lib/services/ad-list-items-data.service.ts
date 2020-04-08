import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';

import { AdListItem } from '../models/ads.models';

@Injectable({
  providedIn: 'root'
})
export class AdListItemsDataService extends DefaultDataService<AdListItem> {
  constructor(config: DefaultDataServiceConfig, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('AdListItem', http, httpUrlGenerator, config);
    this.entityUrl = this.entitiesUrl = `${config.root}/ads/adlistitems/`;
  }
}
