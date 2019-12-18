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
  recipientId: string;
  messages: Array<ChatMessage> = [];
  private componentDestroyed$ = new Subject();
  constructor(private chatService: ChatService) { }
  sendMessage(event) {
    this.chatService.send(new ChatMessage({ id: undefined, message: event.message, senderId: undefined, recipientId: this.recipientId, createdAt: new Date() }));
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
