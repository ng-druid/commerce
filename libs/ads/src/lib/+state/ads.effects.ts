import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { AdsPartialState } from './ads.reducer';
import {
  LoadAds,
  AdsLoaded,
  AdsLoadError,
  AdsActionTypes
} from './ads.actions';

@Injectable()
export class AdsEffects {
  @Effect() loadAds$ = this.dataPersistence.fetch(AdsActionTypes.LoadAds, {
    run: (action: LoadAds, state: AdsPartialState) => {
      // Your custom REST 'load' logic goes here. For now just return an empty list...
      return new AdsLoaded([]);
    },

    onError: (action: LoadAds, error) => {
      console.error('Error', error);
      return new AdsLoadError(error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<AdsPartialState>
  ) {}
}
