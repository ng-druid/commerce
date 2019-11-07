import { Entity, AdsState } from './ads.reducer';
import { adsQuery } from './ads.selectors';

describe('Ads Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAdsId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createAds = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      ads: {
        list: [
          createAds('PRODUCT-AAA'),
          createAds('PRODUCT-BBB'),
          createAds('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Ads Selectors', () => {
    it('getAllAds() should return the list of Ads', () => {
      const results = adsQuery.getAllAds(storeState);
      const selId = getAdsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedAds() should return the selected Entity', () => {
      const result = adsQuery.getSelectedAds(storeState);
      const selId = getAdsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = adsQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = adsQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
