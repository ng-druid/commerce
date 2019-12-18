import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take, filter, map, switchMap } from 'rxjs/operators'

import { ChatConversation } from '../../models/chat.models';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'classifieds-ui-chat-master',
  templateUrl: './chat-master.component.html',
  styleUrls: ['./chat-master.component.scss']
})
export class ChatMasterComponent implements OnInit {
  chats: Array<ChatConversation> = [];
  constructor(private router: Router, private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.started$.pipe(
      filter(started => started),
      switchMap(() => this.chatService.getConversations())
    ).subscribe((chats: Array<ChatConversation>) => {
      this.chats = chats;
    });
  }

  viewChat(recipientId: string) {
    this.router.navigateByUrl(`/chat/${recipientId}`);
  }

}
