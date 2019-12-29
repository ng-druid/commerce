import { VocabularyEntity } from './vocabulary.models';
import { State, vocabularyAdapter, initialState } from './vocabulary.reducer';
import * as VocabularySelectors from './vocabulary.selectors';

describe('Vocabulary Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getVocabularyId = it => it['id'];
  const createVocabularyEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as VocabularyEntity);

  let state;

  beforeEach(() => {
    state = {
      vocabulary: vocabularyAdapter.addAll(
        [
          createVocabularyEntity('PRODUCT-AAA'),
          createVocabularyEntity('PRODUCT-BBB'),
          createVocabularyEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Vocabulary Selectors', () => {
    it('getAllVocabulary() should return the list of Vocabulary', () => {
      const results = VocabularySelectors.getAllVocabulary(state);
      const selId = getVocabularyId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = VocabularySelectors.getSelected(state);
      const selId = getVocabularyId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getVocabularyLoaded() should return the current 'loaded' status", () => {
      const result = VocabularySelectors.getVocabularyLoaded(state);

      expect(result).toBe(true);
    });

    it("getVocabularyError() should return the current 'error' state", () => {
      const result = VocabularySelectors.getVocabularyError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
