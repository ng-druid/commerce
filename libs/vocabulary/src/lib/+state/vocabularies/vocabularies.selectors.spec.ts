import { Vocabulary } from '@classifieds-ui/taxonomy';
import {
  State,
  vocabulariesAdapter,
  initialState
} from './vocabularies.reducer';
import * as VocabulariesSelectors from './vocabularies.selectors';

describe('Vocabularies Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getVocabulariesId = it => it['id'];
  const createVocabulariesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as Vocabulary);

  let state;

  beforeEach(() => {
    state = {
      vocabularies: vocabulariesAdapter.addAll(
        [
          createVocabulariesEntity('PRODUCT-AAA'),
          createVocabulariesEntity('PRODUCT-BBB'),
          createVocabulariesEntity('PRODUCT-CCC')
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

  describe('Vocabularies Selectors', () => {
    it('getAllVocabularies() should return the list of Vocabularies', () => {
      const results = VocabulariesSelectors.getAllVocabularies(state);
      const selId = getVocabulariesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = VocabulariesSelectors.getSelected(state);
      const selId = getVocabulariesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getVocabulariesLoaded() should return the current 'loaded' status", () => {
      const result = VocabulariesSelectors.getVocabulariesLoaded(state);

      expect(result).toBe(true);
    });

    it("getVocabulariesError() should return the current 'error' state", () => {
      const result = VocabulariesSelectors.getVocabulariesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
