import { Inject, Component, Input, Output, OnDestroy, OnChanges, SimpleChanges, PLATFORM_ID, EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
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
  recipientLabel: string;
  @Input()
  messages: Array<ChatMessage> = [];
  @Output()
  newMessage = new EventEmitter<ChatMessage>();
  private subscription$: Subscription;
  private componentDestroyed$ = new Subject();
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  sendMessage(event) {
    this.newMessage.emit((new ChatMessage({ id: undefined, message: event.message, senderId: undefined, recipientId: this.recipientId, createdAt: new Date() })));
  }
  ngOnChanges(changes: SimpleChanges) {
    //if(changes.recipientId.previousValue !== changes.recipientId.currentValue) {
      // this.disconnect();
      // this.connect();
    //}
  }
  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  private connect() {
    if (this.isBrowser) {
      /*this.subscription$ = this.chatService.started$.pipe(
        switchMap(() => this.chatService.connect(this.recipientId)),
        takeUntil(this.componentDestroyed$)
      ).subscribe((chatMessages: Array<ChatMessage>) => {
        this.messages = this.messages.concat(chatMessages);
      });*/
    }
  }

  private disconnect() {
    if(this.isBrowser && this.subscription$) {
      // this.subscription$.unsubscribe();
    }
  }

}
