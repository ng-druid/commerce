import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { AdsPartialState } from './ads.reducer';
import { adsQuery } from './ads.selectors';
import { LoadAds, LoadAd } from './ads.actions';

import { SearchConfig } from '../models/ads.models';

@Injectable({
  providedIn: 'root'
})
export class AdsFacade {
  loaded$ = this.store.pipe(select(adsQuery.getLoaded));
  allAds$ = this.store.pipe(select(adsQuery.getAllAds));
  selectedAds$ = this.store.pipe(select(adsQuery.getSelectedAds));
  detail$ = this.store.pipe(select(adsQuery.getAdDetail));

  constructor(private store: Store<AdsPartialState>) {}

  loadAll(searchConfig?: SearchConfig) {
    this.store.dispatch(new LoadAds(searchConfig));
  }

  loadAd(id: string) {
    this.store.dispatch(new LoadAd(id));
  }

}
