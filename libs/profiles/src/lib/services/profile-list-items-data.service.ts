import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';
import { ProfileListItem } from '../models/profiles.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileListItemsDataService extends DefaultDataService<ProfileListItem> {
  private goApi = 'https://p1vgub4jtb.execute-api.us-east-1.amazonaws.com';
  constructor(
    config: DefaultDataServiceConfig,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    logger: Logger
  ) {
    super('ProfileListItem', http, httpUrlGenerator, config);
    this.entityUrl = this.entitiesUrl = `${this.goApi}/profiles`;
  }
}
