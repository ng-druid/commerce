import { ChatEntity } from './chat.models';
import { State, chatAdapter, initialState } from './chat.reducer';
import * as ChatSelectors from './chat.selectors';

describe('Chat Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getChatId = it => it['id'];
  const createChatEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ChatEntity);

  let state;

  beforeEach(() => {
    state = {
      chat: chatAdapter.addAll(
        [
          createChatEntity('PRODUCT-AAA'),
          createChatEntity('PRODUCT-BBB'),
          createChatEntity('PRODUCT-CCC')
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

  describe('Chat Selectors', () => {
    it('getAllChat() should return the list of Chat', () => {
      const results = ChatSelectors.getAllChat(state);
      const selId = getChatId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ChatSelectors.getSelected(state);
      const selId = getChatId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getChatLoaded() should return the current 'loaded' status", () => {
      const result = ChatSelectors.getChatLoaded(state);

      expect(result).toBe(true);
    });

    it("getChatError() should return the current 'error' state", () => {
      const result = ChatSelectors.getChatError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
