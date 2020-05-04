import { EntityMetadataMap } from '@ngrx/data';
import { ChatConversation, ChatMessage } from './models/chat.models';

export const entityMetadata: EntityMetadataMap = {
  ChatConversation: {
    selectId: (c: ChatConversation) => c.recipientId,
    entityName: 'ChatConversation'
  },
  ChatMessage: {
    selectId: (m: ChatMessage) => `${m.senderId}__${m.recipientId}__${m.createdAt}`,
    entityName: 'ChatMessage'
  }
};
