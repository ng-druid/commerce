import { AdsLoaded } from './ads.actions';
import { AdsState, Entity, initialState, reducer } from './ads.reducer';

describe('Ads Reducer', () => {
  const getAdsId = it => it['id'];
  let createAds;

  beforeEach(() => {
    createAds = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Ads actions ', () => {
    it('should return set the list of known Ads', () => {
      const adss = [createAds('PRODUCT-AAA'), createAds('PRODUCT-zzz')];
      const action = new AdsLoaded(adss);
      const result: AdsState = reducer(initialState, action);
      const selId: string = getAdsId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
