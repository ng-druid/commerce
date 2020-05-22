import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';
import { AdSettings } from '../models/ads.models';
import { AD_SETTINGS } from '../ad.tokens';
import { Observable } from 'rxjs';

import { Ad } from '../models/ads.models';

@Injectable({
  providedIn: 'root'
})
export class AdsDataService extends DefaultDataService<Ad> {
  private goApi = 'https://p1vgub4jtb.execute-api.us-east-1.amazonaws.com';
  constructor(
    config: DefaultDataServiceConfig,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    logger: Logger,
    @Inject(AD_SETTINGS) private adSettings: AdSettings
  ) {
    super('Ad', http, httpUrlGenerator, config);
    //this.entityUrl = this.entitiesUrl = `${config.root}/ads/ad/`;
    this.entityUrl = this.entitiesUrl = `${this.goApi}/ads/ad`;
  }
  // Override to fetch from cloud front.
  getById(key: number | string): Observable<Ad> {
    let err: Error | undefined;
    if (key == null) {
      err = new Error(`No "${this.entityName}" key to get`);
    }
    return this.execute('GET', `${this.adSettings.adUrl}/${key}.json.gz`, err);
  }
}
