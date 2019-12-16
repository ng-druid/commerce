import { createAction, props } from '@ngrx/store';
import { ChatEntity } from './chat.models';

export const loadChat = createAction('[Chat] Load Chat');

export const loadChatSuccess = createAction(
  '[Chat] Load Chat Success',
  props<{ chat: ChatEntity }>()
);

export const loadChatFailure = createAction(
  '[Chat] Load Chat Failure',
  props<{ error: any }>()
);
