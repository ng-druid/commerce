import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';
import { ProfileListItem } from '../models/profiles.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileListItemsDataService extends DefaultDataService<ProfileListItem> {
  constructor(
    config: DefaultDataServiceConfig,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    logger: Logger
  ) {
    super('ProfileListItem', http, httpUrlGenerator, config);
    this.entityUrl = this.entitiesUrl = `${config.root}/profiles/profilelistitems/`;
  }
}
