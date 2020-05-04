import { Inject, Component, OnInit, OnDestroy, OnChanges, SimpleChanges, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// import { OktaAuthService, UserClaims } from '@okta/okta-angular';
import { forkJoin, Observable, Subject, Subscription } from 'rxjs';
import { map, filter, takeUntil, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { AuthFacade, PublicUserProfile } from '@classifieds-ui/auth';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { ChatMessage } from '../../models/chat.models';
import { ChatService } from '../../services/chat.service';

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
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute, private authFacade: AuthFacade, private chatService: ChatService, es: EntityServices) {
    this.publicUserProfilesService = es.getEntityCollectionService('PublicUserProfile');
    this.chatMessagesService = es.getEntityCollectionService('ChatMessage');
  }
  ngOnInit() {
    this.route.paramMap.pipe(
      map(p => p.get('recipientId')),
      filter(recipientId => typeof(recipientId) === 'string'),
      tap(recipientId => {
        this.disconnect();
        this.connect(recipientId);
      }),
      switchMap(recipientId => {
        return forkJoin([
          this.publicUserProfilesService.getByKey(recipientId),
          new Observable<PublicUserProfile>(obs => {
            this.authFacade.getUser$.pipe(
              switchMap(user => this.publicUserProfilesService.getByKey(user.profile.sub))
            ).subscribe(user => {
              obs.next(user);
              obs.complete();
            });
          }),
          new Observable<Array<ChatMessage>>(obs => {
            this.chatMessagesService.getWithQuery({ recipientId }).pipe(
              map(messages => {
                const messagesCopy = messages.map(m => new ChatMessage(m));
                messagesCopy.sort((m1, m2) => {
                  const md1 = new Date(m1.createdAt);
                  const md2 = new Date(m2.createdAt);
                  if (md1 > md2)
                  return 1;
                  if (md1 < md2)
                  return -1;
                  return 0;
                });
                return messagesCopy;
              })
            ).subscribe(messages => {
              obs.next(messages);
              obs.complete();
            });
          })
        ]);
      })
    ).subscribe(([recipient, user, messages]) => {
      this.userId =  user.id;
      this.userLabel = user.userName;
      this.recipientId = recipient.id;
      this.recipientLabel = recipient.userName;
      this.messages = messages;
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
