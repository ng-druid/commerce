export enum ChatTypes {
  TEXT = 'text',
  FILE = 'file',
  MAP = 'map',
  QUOTE = 'quote'
}

export class ChatSettings {
  endpointUrl: string;
  constructor(data?: ChatSettings) {
    if(data) {
      this.endpointUrl = data.endpointUrl;
    }
  }
}

export class ChatMessage {
  id: string;
  senderId: string;
  message: string;
  recipientId: string;
  createdAt: Date;
  constructor(data?: ChatMessage) {
    if(data) {
      this.id = data.id;
      this.senderId = data.senderId;
      this.message = data.message;
      this.recipientId = data.recipientId;
      this.createdAt = data.createdAt;
    }
  }
}

export class ChatConversation {
  recipientId: string;
  recipientLabel: string;
  constructor(data?: ChatConversation) {
    if(data) {
      this.recipientId = data.recipientId;
      this.recipientLabel = data.recipientLabel;
    }
  }
}
