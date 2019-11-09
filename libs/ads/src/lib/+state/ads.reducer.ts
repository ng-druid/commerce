import { AdsAction, AdsActionTypes } from './ads.actions';
import { Ad, AdDetail } from '../models/ads.models';

export const ADS_FEATURE_KEY = 'ads';

/**
 * Interface for the 'Ads' data used in
 *  - AdsState, and the reducer function
 *
 *  Note: replace if already defined in another module
 */

export interface AdsState {
  list: Ad[]; // list of Ads; analogous to a sql normalized table
  detail: AdDetail;
  selectedId?: string | number; // which Ads record has been selected
  loaded: boolean; // has the Ads list been loaded
  error?: any; // last none error (if any)
}

export interface AdsPartialState {
  readonly [ADS_FEATURE_KEY]: AdsState;
}

export const initialState: AdsState = {
  list: [],
  detail: undefined,
  loaded: false
};

export function reducer(
  state: AdsState = initialState,
  action: AdsAction
): AdsState {
  switch (action.type) {
    case AdsActionTypes.AdsLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
    case AdsActionTypes.AdLoaded: {
      state = {
        ...state,
        detail: action.payload,
      };
      break;
    }
  }
  return state;
}
