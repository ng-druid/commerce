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
  senderId: string;
  message: string;
  recipientId: string;
  createdAt: Date;
  constructor(data?: ChatMessage) {
    if(data) {
      this.senderId = data.senderId;
      this.message = data.message;
      this.recipientId = data.recipientId;
      this.createdAt = data.createdAt;
    }
  }
}

export class ChatConversation {
  id: string;
  userId: string;
  userLabel: string;
  recipientId: string;
  recipientLabel: string;
  messages: Array<ChatMessage> = [];
  constructor(data?: ChatConversation) {
    if(data) {
      this.id= data.id;
      this.userLabel = data.userLabel;
      this.userId = data.userId;
      this.recipientId = data.recipientId;
      this.recipientLabel = data.recipientLabel;
      if(data.messages) {
        this.messages = data.messages.map(m => new ChatMessage(m));
      }
    }
  }
}
