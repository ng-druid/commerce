import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, Logger, DefaultDataServiceConfig } from '@ngrx/data';
import { ProfileSettings, Profile } from '../models/profiles.model';
import { PROFILE_SETTINGS } from '../profile.tokens';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilesDataService extends DefaultDataService<Profile> {
  constructor(
    config: DefaultDataServiceConfig,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    logger: Logger,
    @Inject(PROFILE_SETTINGS) private adSettings: ProfileSettings
  ) {
    super('Profile', http, httpUrlGenerator, config);
    this.entityUrl = this.entitiesUrl = `${config.root}/profiles/profile/`;
  }
  // Override to fetch from cloud front.
  getById(key: number | string): Observable<Profile> {
    let err: Error | undefined;
    if (key == null) {
      err = new Error(`No "${this.entityName}" key to get`);
    }
    return this.execute('GET', `${this.adSettings.profileUrl}/${key}.json.gz`, err);
  }
}
