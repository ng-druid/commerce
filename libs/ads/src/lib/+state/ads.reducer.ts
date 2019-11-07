import { AdsAction, AdsActionTypes } from './ads.actions';

export const ADS_FEATURE_KEY = 'ads';

/**
 * Interface for the 'Ads' data used in
 *  - AdsState, and the reducer function
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface AdsState {
  list: Entity[]; // list of Ads; analogous to a sql normalized table
  selectedId?: string | number; // which Ads record has been selected
  loaded: boolean; // has the Ads list been loaded
  error?: any; // last none error (if any)
}

export interface AdsPartialState {
  readonly [ADS_FEATURE_KEY]: AdsState;
}

export const initialState: AdsState = {
  list: [],
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
  }
  return state;
}
