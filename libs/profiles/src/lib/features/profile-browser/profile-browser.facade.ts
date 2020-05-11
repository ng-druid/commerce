import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { ProfileBrowserPartialState } from './profile-browser.reducer';
import { selectProfile } from './profile-browser.selectors';
import * as profileBrowserActions from './profile-browser.actions';
import { Profile } from '../../models/profiles.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileBrowserFacade {
  getProfile$ = this.store.pipe(select(selectProfile));
  constructor(private store: Store<ProfileBrowserPartialState>) {}
  setProfile(profile: Profile) {
    this.store.dispatch(profileBrowserActions.setProfile({ profile }));
  }
}
