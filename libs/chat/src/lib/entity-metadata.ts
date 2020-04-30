import { EntityMetadataMap } from '@ngrx/data';
import { ChatConversation } from './models/chat.models';

export const entityMetadata: EntityMetadataMap = {
  ChatConversation: {
    selectId: (c: ChatConversation) => c.recipientId,
    entityName: 'ChatConversation'
  },
  ChatMessage: {
    entityName: 'ChatMessage'
  }
};
