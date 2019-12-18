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
    this.chatService.send(new ChatMessage({ id: undefined, message: event.message, senderId: undefined, recipientId: "c3ef274c-b900-45dc-8755-52a4fb378f07", createdAt: new Date() }));
  }
  ngOnInit() {
    this.chatService.started$.subscribe(() => {
      this.chatService.connect("c3ef274c-b900-45dc-8755-52a4fb378f07");
    });
    this.chatService.connected$.subscribe(chatMessages => {
      this.messages = chatMessages;
    });
    this.chatService.broadcasted$.subscribe(chatMessage => {
      this.messages.push(chatMessage);
    });
  }

}
