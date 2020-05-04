import { createAction, props } from '@ngrx/store';
import { ChatMessage, ChatInfo } from '../../models/chat.models';

export const loadChatConversation = createAction(
  '[Chat] Load Chat Conversation',
  props<{ recipientId: string }>()
);

export const loadChatConversationSuccess = createAction(
  '[Chat] Load Chat Conversation Success',
  props<{ data: Array<ChatMessage>, info: ChatInfo }>()
);

export const loadChatConversationFailure = createAction(
  '[Chat] Load Chat Conversation Failure'
);




