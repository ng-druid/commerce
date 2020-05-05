import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map, filter, takeUntil, take } from 'rxjs/operators';
import { ChatMessage } from '../../models/chat.models';
import { Store, select } from '@ngrx/store';
import { State } from '../../features/chat/chat.reducer';
import { selectChatConversation, selectRecievedChatMessage, selectChatConnected } from '../../features/chat/chat.selectors';
import * as fromActions from '../../features/chat/chat.actions';
import { AuthFacade } from '@classifieds-ui/auth';

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
  enableSend = false;
  private componentDestroyed$ = new Subject();
  constructor(private route: ActivatedRoute, private store: Store<State>, private authFacade: AuthFacade) {}
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
      const last = this.messages.length - 1;
      // @todo: Just support one message at a time for now.
      this.messages[last] = new ChatMessage(message);
      /*for(let i = last; i >= 0; i--) {
        if(`${message.senderId}__${message.recipientId}__${message.createdAt}` === `${this.messages[i].senderId}__${this.messages[i].recipientId}__${this.messages[i].createdAt.toString()}`) {
          this.messages[i] = new ChatMessage(message);
          break;
        }
      }*/
    });
    this.store.pipe(
      select(selectChatConnected),
      filter(connected => connected !== undefined),
      takeUntil(this.componentDestroyed$)
    ).subscribe(connected => {
      this.enableSend = connected;
    });
  }
  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
  onMessage(chatMessage: ChatMessage) {
    this.authFacade.getUser$.pipe(
      filter(() => this.enableSend),
      take(1)
    ).subscribe(u => {
      const message = new ChatMessage({ ...chatMessage, senderId: u.profile.sub, createdAt: new Date() });
      this.messages = this.messages.concat(new ChatMessage({ ...message, message: 'sending...' }));
      this.store.dispatch(fromActions.sendChatMessage({ data: message }));
    })
  }
}
