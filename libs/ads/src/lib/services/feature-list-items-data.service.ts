import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';

import { FeatureListItem } from '../models/ads.models';

@Injectable({
  providedIn: 'root'
})
export class FeatureListItemsDataService extends DefaultDataService<FeatureListItem> {
  constructor(config: DefaultDataServiceConfig, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('FeatureListItem', http, httpUrlGenerator, config);
    this.entityUrl = this.entitiesUrl = `${config.root}/ads/featurelistitems/`;
  }
}
