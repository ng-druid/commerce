import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { AdBrowserPartialState } from './ad-browser.reducer';
import { selectAdType } from './ad-browser.selectors';
import * as adBrowserActions from './ad-browser.actions';

@Injectable({
  providedIn: 'root'
})
export class AdBrowserFacade {
  getAdType$ = this.store.pipe(select(selectAdType));
  constructor(private store: Store<AdBrowserPartialState>) {}
  setAdType(adType: string) {
    this.store.dispatch(adBrowserActions.setAdType({ adType }));
  }
}
