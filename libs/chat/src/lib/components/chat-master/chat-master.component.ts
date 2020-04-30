import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntityServices, EntityCollectionService } from '@ngrx/data';

import { ChatConversation } from '../../models/chat.models';

@Component({
  selector: 'classifieds-ui-chat-master',
  templateUrl: './chat-master.component.html',
  styleUrls: ['./chat-master.component.scss']
})
export class ChatMasterComponent implements OnInit {
  chats: Array<ChatConversation> = [];
  private chatConversationsService: EntityCollectionService<ChatConversation>;
  constructor(private router: Router, es: EntityServices) {
    this.chatConversationsService = es.getEntityCollectionService('ChatConversation');
  }

  ngOnInit() {
    this.chatConversationsService.getAll().subscribe(chats => {
      this.chats = chats;
    });
  }

  viewChat(recipientId: string) {
    this.router.navigateByUrl(`/chat/${recipientId}`);
  }

}
