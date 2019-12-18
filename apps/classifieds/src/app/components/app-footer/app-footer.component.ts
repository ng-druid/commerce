import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@classifieds-ui/auth';
import { filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'classifieds-ui-app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {
  recipientId: string;
  constructor(private authfacade: AuthFacade) {}
  ngOnInit(): void {
    this.authfacade.getUser$.pipe(filter(u => u !== undefined), map(u => u.profile.sub), take(1)).subscribe(id => {
      if(id === 'b2f2d5d2-42f9-4041-bd5e-24eebcc3beb9') {
        this.recipientId = "b88c40ad-7a6c-4dc3-a3a1-df6d94edfb36";
      } else {
        this.recipientId = "b2f2d5d2-42f9-4041-bd5e-24eebcc3beb9";
      }
    });
  }
}
