import { VocabulariesEntity } from './vocabularies.models';
import * as VocabulariesActions from './vocabularies.actions';
import { State, initialState, reducer } from './vocabularies.reducer';

describe('Vocabularies Reducer', () => {
  const createVocabulariesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as VocabulariesEntity);

  beforeEach(() => {});

  describe('valid Vocabularies actions', () => {
    it('loadVocabulariesSuccess should return set the list of known Vocabularies', () => {
      const vocabularies = [
        createVocabulariesEntity('PRODUCT-AAA'),
        createVocabulariesEntity('PRODUCT-zzz')
      ];
      const action = VocabulariesActions.loadVocabulariesSuccess({
        vocabularies
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
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
