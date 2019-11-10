import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import { AdsPartialState } from './ads.reducer';
import {
  LoadAds,
  AdsLoaded,
  AdsLoadError,
  LoadAd,
  AdLoaded,
  AdLoadError,
  AdsActionTypes
} from './ads.actions';

import { AdsService } from '../services/ads.service';

@Injectable()
export class AdsEffects {
  @Effect() loadAds$ = this.dataPersistence.fetch(AdsActionTypes.LoadAds, {
    run: (action: LoadAds, state: AdsPartialState) => {
      // Your custom REST 'load' logic goes here. For now just return an empty list...
      if(action.payload) {
        return this.adsService.searchAds(action.payload).pipe(map(ads => new AdsLoaded(ads)));
      } else {
        return this.adsService.getAds().pipe(map(ads => new AdsLoaded(ads)));
      }
    },

    onError: (action: LoadAds, error) => {
      console.error('Error', error);
      return new AdsLoadError(error);
    }
  });

  @Effect() loadAd$ = this.dataPersistence.fetch(AdsActionTypes.LoadAd, {
    run: (action: LoadAd, state: AdsPartialState) => {
      // Your custom REST 'load' logic goes here. For now just return an empty list...
      return this.adsService.getAd(action.payload).pipe(map(ad => new AdLoaded(ad)));
    },

    onError: (action: LoadAd, error) => {
      console.error('Error', error);
      return new AdLoadError(error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<AdsPartialState>,
    private adsService: AdsService
  ) {}
}
