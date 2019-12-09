import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClientSettings, UserInfo } from '../models/auth.models';

import { CLIENT_SETTINGS } from '../auth.tokens';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  constructor(@Inject(CLIENT_SETTINGS) private clientSettings: ClientSettings, private http: HttpClient) { }
  getUserInfo(): Observable<UserInfo> {
    return this.http.get(`${this.clientSettings.authority}/connect/userinfo`).pipe(map(r => {
      return new UserInfo(r as UserInfo);
    }));
  }
}
