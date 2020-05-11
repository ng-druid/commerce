import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProfileBrowserEffects } from './profile-browser.effects';

describe('ProfileBrowserEffects', () => {
  let actions$: Observable<any>;
  let effects: ProfileBrowserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileBrowserEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ProfileBrowserEffects>(ProfileBrowserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
