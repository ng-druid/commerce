import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChatMessage } from '../../models/chat.models';

@Component({
  selector: 'classifieds-ui-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent {
  @Input()
  userId: string;
  @Input()
  userLabel: string;
  @Input()
  recipientId: string;
  @Input()
  recipientLabel: string;
  @Input()
  messages: Array<ChatMessage> = [];
  @Input()
  enableSend = false;
  @Output()
  newMessage = new EventEmitter<ChatMessage>();
  constructor() { }
  sendMessage(event) {
    this.newMessage.emit((new ChatMessage({ message: event.message, senderId: undefined, recipientId: this.recipientId, createdAt: new Date() })));
  }
}
