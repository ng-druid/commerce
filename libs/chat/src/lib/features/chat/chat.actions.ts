import { createAction, props } from '@ngrx/store';
import { ChatConversation, ChatMessage } from '../../models/chat.models';

export const loadChatConversation = createAction(
  '[Chat] Load Chat Conversation',
  props<{ recipientId: string }>()
);

export const loadChatConversationSuccess = createAction(
  '[Chat] Load Chat Conversation Success',
  props<{ data: ChatConversation }>()
);

export const loadChatConversationFailure = createAction(
  '[Chat] Load Chat Conversation Failure'
);

export const sendChatMessage = createAction(
  '[Chat] Send Chat Message',
  props<{ data: ChatMessage }>()
);

export const sendChatMessageSuccess = createAction(
  '[Chat] Send Chat Message Success'
);

export const sendChatMessageFailure = createAction(
  '[Chat] Send Chat Message Failure'
);

export const establishSocketConnection = createAction(
  '[Chat] Establish socket connection'
);

export const establishSocketConnectionSuccess = createAction(
  '[Chat] Establish socket connection Success'
);

export const establishSocketConnectionFailure = createAction(
  '[Chat] Establish socket connection Failure'
);

export const recieveChatMessage = createAction(
  '[Chat] Recieve Chat Message',
  props<{ data: ChatMessage }>()
);

export const recieveChatMessageSuccess = createAction(
  '[Chat] Recieve Chat Message Success',
  props<{ data: ChatMessage }>()
);

export const recieveChatMessageFailure = createAction(
  '[Chat] Recieve Chat Message Failure'
);




