import { ChatEntity } from './chat.models';
import * as ChatActions from './chat.actions';
import { State, initialState, reducer } from './chat.reducer';

describe('Chat Reducer', () => {
  const createChatEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ChatEntity);

  beforeEach(() => {});

  describe('valid Chat actions', () => {
    it('loadChatSuccess should return set the list of known Chat', () => {
      const chat = [
        createChatEntity('PRODUCT-AAA'),
        createChatEntity('PRODUCT-zzz')
      ];
      const action = ChatActions.loadChatSuccess({ chat });

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
