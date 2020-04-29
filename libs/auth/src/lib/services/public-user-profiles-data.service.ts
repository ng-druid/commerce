import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';

import { PublicUserProfile } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class PublicUserProfilesService extends DefaultDataService<PublicUserProfile> {
  constructor(config: DefaultDataServiceConfig, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('PublicUserProfile', http, httpUrlGenerator, { ...config, root: `${config.root}/users` });
  }
}
