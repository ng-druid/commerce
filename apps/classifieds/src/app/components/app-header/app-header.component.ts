import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'oidc-client';

import { AuthFacade } from '@classifieds-ui/auth';

@Component({
  selector: 'classifieds-ui-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  user$: Observable<User>;
  constructor(private authFacade: AuthFacade) {}
  ngOnInit() {
    this.user$ = this.authFacade.getUser$;
  }
  login() {
    this.authFacade.login();
  }
}
