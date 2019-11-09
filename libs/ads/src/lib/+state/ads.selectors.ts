import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ADS_FEATURE_KEY, AdsState } from './ads.reducer';

// Lookup the 'Ads' feature state managed by NgRx
const getAdsState = createFeatureSelector<AdsState>(ADS_FEATURE_KEY);

const getLoaded = createSelector(
  getAdsState,
  (state: AdsState) => state.loaded
);
const getError = createSelector(
  getAdsState,
  (state: AdsState) => state.error
);

const getAllAds = createSelector(
  getAdsState,
  getLoaded,
  (state: AdsState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getAdsState,
  (state: AdsState) => state.selectedId
);
const getSelectedAds = createSelector(
  getAllAds,
  getSelectedId,
  (ads, id) => {
    const result = ads.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);
const getAdDetail = createSelector(
  getAdsState,
  (state: AdsState) => state.detail
);

export const adsQuery = {
  getLoaded,
  getError,
  getAllAds,
  getSelectedAds,
  getAdDetail
};
