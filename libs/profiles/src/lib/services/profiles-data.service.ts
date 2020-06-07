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
  private goApi = 'https://p1vgub4jtb.execute-api.us-east-1.amazonaws.com';
  constructor(
    config: DefaultDataServiceConfig,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    logger: Logger,
    @Inject(PROFILE_SETTINGS) private profileSettings: ProfileSettings
  ) {
    super('Profile', http, httpUrlGenerator, config);
    this.entityUrl = `${this.goApi}/profile/`;
    this.entitiesUrl = `${this.goApi}/profiles`;
  }
  // Override to fetch from cloud front.
  /*getById(key: number | string): Observable<Profile> {
    let err: Error | undefined;
    if (key == null) {
      err = new Error(`No "${this.entityName}" key to get`);
    }
    return this.execute('GET', `${this.profileSettings.profileUrl}/${key}.json.gz`, err);
  }*/
}
