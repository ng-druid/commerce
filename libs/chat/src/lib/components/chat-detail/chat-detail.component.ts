import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { OktaAuthService, UserClaims } from '@okta/okta-angular';
import { forkJoin, Observable } from 'rxjs';
import { map, filter, take, switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthFacade, PublicUserProfile } from '@classifieds-ui/auth';
import { EntityServices, EntityCollectionService } from '@ngrx/data';

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
  private publicUserProfilesService: EntityCollectionService<PublicUserProfile>;
  constructor(private route: ActivatedRoute, private authFacade: AuthFacade, es: EntityServices) {
    this.publicUserProfilesService = es.getEntityCollectionService('PublicUserProfile');
  }
  ngOnInit() {
    this.route.paramMap.pipe(
      map(p => p.get('recipientId')),
      filter(recipientId => typeof(recipientId) === 'string'),
      switchMap(recipientId => {
        return forkJoin([
          this.publicUserProfilesService.getByKey(recipientId),
          this.authFacade.getUser$.pipe(
            switchMap(user => this.publicUserProfilesService.getByKey(user.profile.sub))
          )
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
    ).subscribe(([recipient, user]) => {
      this.userId =  user.id;
      this.userLabel = user.userName;
      this.recipientId = recipient.id;
      this.recipientLabel = recipient.userName;
    });
  }

}
