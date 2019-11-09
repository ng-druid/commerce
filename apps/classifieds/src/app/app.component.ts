import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'oidc-client';

import { AuthFacade } from '@classifieds-ui/auth';

@Component({
  selector: 'classifieds-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'classifieds';
  user$: Observable<User>;
  constructor(private authFacade: AuthFacade) {}
  ngOnInit() {
    this.user$ = this.authFacade.getUser$;
  }
  login() {
    this.authFacade.login();
  }
}
