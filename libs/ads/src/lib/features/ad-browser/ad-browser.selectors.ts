import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAdBrowser from './ad-browser.reducer';

export const selectAdBrowserState = createFeatureSelector<fromAdBrowser.State>(
  fromAdBrowser.adBrowserFeatureKey
);

export const selectAdType = createSelector(selectAdBrowserState, state => state.adType);
