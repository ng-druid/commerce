import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProfileBrowser from './profile-browser.reducer';

export const selectProfileBrowserState = createFeatureSelector<fromProfileBrowser.State>(
  fromProfileBrowser.profileBrowserFeatureKey
);

export const selectProfile = createSelector(selectProfileBrowserState, state => state.profile);
