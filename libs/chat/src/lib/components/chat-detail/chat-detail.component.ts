import { Inject, Component, OnInit, OnDestroy, OnChanges, SimpleChanges, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// import { OktaAuthService, UserClaims } from '@okta/okta-angular';
import { forkJoin, Observable, Subject, Subscription } from 'rxjs';
import { map, filter, switchMap, withLatestFrom, tap, takeUntil } from 'rxjs/operators';
import { AuthFacade, PublicUserProfile } from '@classifieds-ui/auth';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { ChatMessage } from '../../models/chat.models';
import { ChatService } from '../../services/chat.service';
import { Store, select } from '@ngrx/store';
import { State } from '../../features/chat/chat.reducer';
import { selectChatConversation } from '../../features/chat/chat.selectors';
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
  private subscription$: Subscription;
  private publicUserProfilesService: EntityCollectionService<PublicUserProfile>;
  private chatMessagesService: EntityCollectionService<ChatMessage>;
  private componentDestroyed$ = new Subject();
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute, private authFacade: AuthFacade, private chatService: ChatService, private store: Store<State>, es: EntityServices) {
    this.publicUserProfilesService = es.getEntityCollectionService('PublicUserProfile');
    this.chatMessagesService = es.getEntityCollectionService('ChatMessage');
  }
  ngOnInit() {
    this.route.paramMap.pipe(
      map(p => p.get('recipientId')),
      filter(recipientId => typeof(recipientId) === 'string')
    ).subscribe(recipientId => {
      this.store.dispatch(fromActions.loadChatConversation({ recipientId }));
      this.disconnect();
      this.connect(recipientId);
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
  }
  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
  onMessage(chatMessage: ChatMessage) {
    this.chatMessagesService.add(new ChatMessage({ ...chatMessage, createdAt: new Date() }));
  }
  connect(recipientId: string) {
    if (this.isBrowser) {
      this.subscription$ = this.chatService.started$.pipe(
        switchMap(() => this.chatService.connect(recipientId)),
        takeUntil(this.componentDestroyed$)
      ).subscribe((chatMessages: Array<ChatMessage>) => {
        if(chatMessages.length > 0) {
          this.messages = this.messages.concat(chatMessages);
        }
      });
    }
  }
  disconnect() {
    if(this.isBrowser && this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
