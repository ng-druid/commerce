import { Action } from '@ngrx/store';
import { Entity } from './ads.reducer';

export enum AdsActionTypes {
  LoadAds = '[Ads] Load Ads',
  AdsLoaded = '[Ads] Ads Loaded',
  AdsLoadError = '[Ads] Ads Load Error'
}

export class LoadAds implements Action {
  readonly type = AdsActionTypes.LoadAds;
}

export class AdsLoadError implements Action {
  readonly type = AdsActionTypes.AdsLoadError;
  constructor(public payload: any) {}
}

export class AdsLoaded implements Action {
  readonly type = AdsActionTypes.AdsLoaded;
  constructor(public payload: Entity[]) {}
}

export type AdsAction = LoadAds | AdsLoaded | AdsLoadError;

export const fromAdsActions = {
  LoadAds,
  AdsLoaded,
  AdsLoadError
};
