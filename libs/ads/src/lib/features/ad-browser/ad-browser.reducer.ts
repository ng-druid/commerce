import { Action, createReducer, on } from '@ngrx/store';
import * as AdBrowserActions from './ad-browser.actions';

export const adBrowserFeatureKey = 'adBrowser';

export interface State {
  adType: string;
  typeId: string;
}

export interface AdBrowserPartialState {
  readonly [adBrowserFeatureKey]: State;
}

export const initialState: State = {
  adType: undefined,
  typeId: undefined
};

const adBrowserReducer = createReducer(
  initialState,
  on(AdBrowserActions.setAdType, (state, action) => ({ ...state, adType: action.adType })),
);

export function reducer(state: State | undefined, action: Action) {
  return adBrowserReducer(state, action);
}
