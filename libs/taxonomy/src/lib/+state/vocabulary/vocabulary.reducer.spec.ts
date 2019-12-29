import { VocabularyEntity } from './vocabulary.models';
import * as VocabularyActions from './vocabulary.actions';
import { State, initialState, reducer } from './vocabulary.reducer';

describe('Vocabulary Reducer', () => {
  const createVocabularyEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as VocabularyEntity);

  beforeEach(() => {});

  describe('valid Vocabulary actions', () => {
    it('loadVocabularySuccess should return set the list of known Vocabulary', () => {
      const vocabulary = [
        createVocabularyEntity('PRODUCT-AAA'),
        createVocabularyEntity('PRODUCT-zzz')
      ];
      const action = VocabularyActions.loadVocabularySuccess({ vocabulary });

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
