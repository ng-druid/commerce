import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { OktaAuthService, UserClaims } from '@okta/okta-angular';
import { forkJoin, Observable } from 'rxjs';
import { map, filter, take, switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthFacade, PublicUserProfile } from '@classifieds-ui/auth';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { ChatMessage } from '../../models/chat.models';

@Component({
  selector: 'classifieds-ui-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit {
  recipientId: string;
  recipientLabel: string;
  userId: string;
  userLabel: string;
  messages: Array<ChatMessage>;
  private publicUserProfilesService: EntityCollectionService<PublicUserProfile>;
  private chatMessagesService: EntityCollectionService<ChatMessage>;
  constructor(private route: ActivatedRoute, private authFacade: AuthFacade, es: EntityServices) {
    this.publicUserProfilesService = es.getEntityCollectionService('PublicUserProfile');
    this.chatMessagesService = es.getEntityCollectionService('ChatMessage');
  }
  ngOnInit() {
    this.route.paramMap.pipe(
      map(p => p.get('recipientId')),
      filter(recipientId => typeof(recipientId) === 'string'),
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
            this.chatMessagesService.getWithQuery({ recipientId }).subscribe(messages => {
              obs.next(messages);
              obs.complete();
            });
          })
          /*new Observable<PublicUserProfile>(observer => {
            this.oktaService.getUser().then((claims: UserClaims) => {
              this.publicUserProfilesService.getByKey(claims.sub).subscribe(p => {
                observer.next(p);
                observer.complete();
              });
            });
          })*/
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

}
