import { Action } from '@ngrx/store';

import { Ad, AdDetail, SearchConfig } from '../models/ads.models';

export enum AdsActionTypes {
  LoadAds = '[Ads] Load Ads',
  AdsLoaded = '[Ads] Ads Loaded',
  AdsLoadError = '[Ads] Ads Load Error',
  LoadAd = '[Ads] Load Ad',
  AdLoaded = '[Ads] Ad Loaded',
  AdLoadError = '[Ads] Ad Load Error'
}

export class LoadAds implements Action {
  readonly type = AdsActionTypes.LoadAds;
  constructor(public payload: SearchConfig) {}
}

export class AdsLoadError implements Action {
  readonly type = AdsActionTypes.AdsLoadError;
  constructor(public payload: any) {}
}

export class AdsLoaded implements Action {
  readonly type = AdsActionTypes.AdsLoaded;
  constructor(public payload: Ad[]) {}
}

export class LoadAd implements Action {
  readonly type = AdsActionTypes.LoadAd;
  constructor(public payload: string) {}
}

export class AdLoadError implements Action {
  readonly type = AdsActionTypes.AdLoadError;
  constructor(public payload: any) {}
}

export class AdLoaded implements Action {
  readonly type = AdsActionTypes.AdLoaded;
  constructor(public payload: AdDetail) {}
}

export type AdsAction = LoadAds | AdsLoaded | AdsLoadError | LoadAd | AdLoaded | AdLoadError;

export const fromAdsActions = {
  LoadAds,
  AdsLoaded,
  AdsLoadError,
  LoadAd,
  AdLoaded,
  AdLoadError
};
