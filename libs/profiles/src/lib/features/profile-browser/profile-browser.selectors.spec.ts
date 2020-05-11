import * as fromProfileBrowser from './profile-browser.reducer';
import { selectProfileBrowserState } from './profile-browser.selectors';

describe('ProfileBrowser Selectors', () => {
  it('should select the feature state', () => {
    const result = selectProfileBrowserState({
      [fromProfileBrowser.profileBrowserFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
