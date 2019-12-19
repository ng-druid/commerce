import { Component, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat.models';

@Component({
  selector: 'classifieds-ui-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnDestroy, OnChanges {
  @Input()
  userId: string;
  @Input()
  userLabel: string;
  @Input()
  recipientId: string;
  @Input()
  recipientLabel;
  messages: Array<ChatMessage> = [];
  private subscription$: Subscription;
  private componentDestroyed$ = new Subject();
  constructor(private chatService: ChatService) { }
  sendMessage(event) {
    this.chatService.send(new ChatMessage({ id: undefined, message: event.message, senderId: undefined, recipientId: this.recipientId, createdAt: new Date() }));
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.recipientId.previousValue !== changes.recipientId.currentValue) {
      this.disconnect();
      this.connect();
    }
  }
  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  private connect() {
    this.subscription$ = this.chatService.started$.pipe(
      switchMap(() => this.chatService.connect(this.recipientId)),
      takeUntil(this.componentDestroyed$)
    ).subscribe((chatMessages: Array<ChatMessage>) => {
      this.messages = this.messages.concat(chatMessages);
    });
  }

  private disconnect() {
    if(this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
