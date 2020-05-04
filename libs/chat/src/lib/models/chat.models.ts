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
  recipientId: string;
  recipientLabel: string;
  constructor(data?: ChatConversation) {
    if(data) {
      this.id= data.id;
      this.userId = data.userId;
      this.recipientId = data.recipientId;
      this.recipientLabel = data.recipientLabel;
    }
  }
}

export class ChatInfo {
  userId: string;
  userLabel: string;
  recipientId: string;
  recipientLabel: string;
  constructor(data?: ChatInfo) {
    if(data) {
      this.userId = data.userId;
      this.userLabel = data.userLabel;
      this.recipientId = data.recipientId;
      this.recipientLabel = data.recipientLabel;
    }
  }
}
