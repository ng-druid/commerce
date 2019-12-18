import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, filter, take, withLatestFrom } from 'rxjs/operators';
import { AuthFacade } from '@classifieds-ui/auth';

@Component({
  selector: 'classifieds-ui-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit {
  recipientId: string;
  userId: string;
  constructor(private route: ActivatedRoute, private authFacade: AuthFacade) { }
  ngOnInit() {
    this.route.paramMap.pipe(
      map(p => p.get('recipientId')),
      filter(recipientId => typeof(recipientId) === 'string'),
      withLatestFrom<string, string>(this.authFacade.getUser$.pipe(filter(u => u !== undefined), map(u => u.profile.sub), take(1)))
    ).subscribe(([recipientId, userId]) => {
      this.userId = userId;
      this.recipientId = recipientId;
    });
  }

}
