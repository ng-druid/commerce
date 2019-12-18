import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat.models';

@Component({
  selector: 'classifieds-ui-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit, OnDestroy {
  @Input()
  recipientId = "c3ef274c-b900-45dc-8755-52a4fb378f07";
  // userId = "c3ef274c-b900-45dc-8755-52a4fb378f07";
  messages: Array<ChatMessage> = [];
  private componentDestroyed$ = new Subject();
  constructor(private chatService: ChatService) { }
  sendMessage(event) {
    this.chatService.send(new ChatMessage({ id: undefined, message: event.message, senderId: undefined, recipientId: "c3ef274c-b900-45dc-8755-52a4fb378f07", createdAt: new Date() }));
  }
  ngOnInit() {
    this.chatService.started$.pipe(
      switchMap(() => this.chatService.connect(this.recipientId)),
      takeUntil(this.componentDestroyed$)
    ).subscribe((chatMessages: Array<ChatMessage>) => {
      this.messages = this.messages.concat(chatMessages);
    });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
