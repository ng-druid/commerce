import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'classifieds-ui-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  messages = [];
  constructor(private chatService: ChatService) { }
  sendMessage(event) {
    console.log(event);
  }
  ngOnInit() {
  }

}
