import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { AdsPartialState } from './ads.reducer';
import { adsQuery } from './ads.selectors';
import { LoadAds } from './ads.actions';

@Injectable({
  providedIn: 'root'
})
export class AdsFacade {
  loaded$ = this.store.pipe(select(adsQuery.getLoaded));
  allAds$ = this.store.pipe(select(adsQuery.getAllAds));
  selectedAds$ = this.store.pipe(select(adsQuery.getSelectedAds));

  constructor(private store: Store<AdsPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadAds());
  }
}
