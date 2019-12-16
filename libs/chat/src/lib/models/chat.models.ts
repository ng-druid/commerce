export enum ChatTypes {
  TEXT = 'text',
  FILE = 'file',
  MAP = 'map',
  QUOTE = 'quote'
}

export class ChatMessage {
  date: Date;
  files: Array<ChatFile>;
  latitude: number;
  longitude: number;
  message: string;
  quote: string;
  sender: string;
  type: ChatTypes;
  avatar: string;
  reply: boolean;
  constructor(data?: ChatMessage) {
    if(data) {
      this.date = data.date;
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.message = data.message;
      this.quote = data.quote;
      this.sender = data.sender;
      this.type = data.type;
      this.avatar = data.avatar;
      this.reply = data.reply;
      if(data.files) {
        this.files = data.files.map(f => new ChatFile(f));
      }
    }
  }
}

export class ChatFile {
  url: string;
  icon: string;
  constructor(data?: ChatFile) {
    if(data) {
      this.url = data.url;
      this.icon = data.icon;
    }
  }
}
