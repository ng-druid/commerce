import * as fromProfileBrowser from './profile-browser.actions';

describe('loadProfileBrowsers', () => {
  it('should return an action', () => {
    expect(fromProfileBrowser.loadProfileBrowsers().type).toBe('[ProfileBrowser] Load ProfileBrowsers');
  });
});
