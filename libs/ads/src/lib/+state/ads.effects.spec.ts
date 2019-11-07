import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { AdsEffects } from './ads.effects';
import { LoadAds, AdsLoaded } from './ads.actions';

describe('AdsEffects', () => {
  let actions: Observable<any>;
  let effects: AdsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        AdsEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(AdsEffects);
  });

  describe('loadAds$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadAds() });
      expect(effects.loadAds$).toBeObservable(
        hot('-a-|', { a: new AdsLoaded([]) })
      );
    });
  });
});
