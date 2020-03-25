import * as fromAdBrowser from './ad-browser.reducer';
import { selectAdBrowserState } from './ad-browser.selectors';

describe('AdBrowser Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAdBrowserState({
      [fromAdBrowser.adBrowserFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
