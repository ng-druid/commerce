import { Action, createReducer, on } from '@ngrx/store';
import * as ProfileBrowserActions from './profile-browser.actions';
import { Profile } from '../../models/profiles.model';

export const profileBrowserFeatureKey = 'profileBrowser';

export interface State {
  profile: Profile;
}

export interface ProfileBrowserPartialState {
  readonly [profileBrowserFeatureKey]: State;
}

export const initialState: State = {
  profile: undefined
};

const profileBrowserReducer = createReducer(
  initialState,
  on(ProfileBrowserActions.setProfile, (state, action) => ({ ...state, profile: action.profile })),
);

export function reducer(state: State | undefined, action: Action) {
  return profileBrowserReducer(state, action);
}
