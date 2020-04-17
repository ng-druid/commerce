import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
//import { OktaAuthService } from '@okta/okta-angular';
import { Observable } from 'rxjs';
import { User } from 'oidc-client';

import { AuthFacade } from '@classifieds-ui/auth';

@Component({
  selector: 'classifieds-ui-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  // user$: Observable<User>;
  isAuthenticated: boolean;
  @Output()
  menuClicked = new EventEmitter();
  constructor(private authFacade: AuthFacade, private router: Router) {
    /*this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );*/
  }
  ngOnInit() {
    this.authFacade.getUser$.subscribe(u => {
      this.isAuthenticated = !!u;
    });
    /*this.oktaAuth.isAuthenticated().then((value) => {
      this.isAuthenticated = value;
    });*/
  }
  login() {
    this.authFacade.login();
    // this.oktaAuth.loginRedirect();
  }

  menuClick() {
    this.menuClicked.emit();
  }
}
