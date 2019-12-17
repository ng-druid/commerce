import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat.models';

@Component({
  selector: 'classifieds-ui-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  messages: Array<ChatMessage> = [];
  constructor(private chatService: ChatService) { }
  sendMessage(event) {
    this.chatService.send(new ChatMessage({ id: undefined, message: event.message, senderId: '123', recipientId: '456', createdAt: new Date() }));
  }
  ngOnInit() {
  }

}
