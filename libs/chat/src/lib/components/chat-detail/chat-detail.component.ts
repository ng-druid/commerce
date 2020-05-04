import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map, filter, takeUntil } from 'rxjs/operators';
import { ChatMessage } from '../../models/chat.models';
import { Store, select } from '@ngrx/store';
import { State } from '../../features/chat/chat.reducer';
import { selectChatConversation, selectRecievedChatMessage } from '../../features/chat/chat.selectors';
import * as fromActions from '../../features/chat/chat.actions';

@Component({
  selector: 'classifieds-ui-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit, OnDestroy {
  recipientId: string;
  recipientLabel: string;
  userId: string;
  userLabel: string;
  messages: Array<ChatMessage>;
  private componentDestroyed$ = new Subject();
  constructor(private route: ActivatedRoute, private store: Store<State>) {}
  ngOnInit() {
    this.store.dispatch(fromActions.establishSocketConnection());
    this.route.paramMap.pipe(
      map(p => p.get('recipientId')),
      filter(recipientId => typeof(recipientId) === 'string')
    ).subscribe(recipientId => {
      this.store.dispatch(fromActions.loadChatConversation({ recipientId }));
    });
    this.store.pipe(
      select(selectChatConversation),
      filter(info => info !== undefined),
      takeUntil(this.componentDestroyed$)
    ).subscribe(conversation => {
      this.userId =  conversation.userId;
      this.userLabel = conversation.userLabel;
      this.recipientId = conversation.recipientId;
      this.recipientLabel = conversation.recipientLabel;
      this.messages = conversation.messages;
    });
    this.store.pipe(
      select(selectRecievedChatMessage),
      filter(message => message !== undefined),
      takeUntil(this.componentDestroyed$)
    ).subscribe(message => {
      this.messages = this.messages.concat(message);
    })
  }
  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
  onMessage(chatMessage: ChatMessage) {
    this.store.dispatch(fromActions.sendChatMessage({ data: new ChatMessage({ ...chatMessage, createdAt: new Date() }) }));
  }
}
