import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AdBrowserEffects } from './ad-browser.effects';

describe('AdBrowserEffects', () => {
  let actions$: Observable<any>;
  let effects: AdBrowserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdBrowserEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<AdBrowserEffects>(AdBrowserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
