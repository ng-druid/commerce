import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, filter, take, switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthFacade, IdentityService, PublicUserProfile } from '@classifieds-ui/auth';

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
  constructor(private route: ActivatedRoute, private identityService: IdentityService, private authFacade: AuthFacade) { }
  ngOnInit() {
    this.route.paramMap.pipe(
      map(p => p.get('recipientId')),
      filter(recipientId => typeof(recipientId) === 'string'),
      switchMap(recipientId => this.identityService.getPublicUserProfile(recipientId)),
      withLatestFrom(this.authFacade.getUser$.pipe(
        filter(u => u !== undefined),
        map(u => u.profile.sub),
        switchMap(sub => this.identityService.getPublicUserProfile(sub)),
        take(1)
      ))
    ).subscribe(([recipient, user]) => {
      this.userId =  user.id;
      this.userLabel = user.userName;
      this.recipientId = recipient.id;
      this.recipientLabel = recipient.userName;
    });
  }

}
