import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private authFacade: AuthFacade, private router: Router) {}
  ngOnInit() {
    this.user$ = this.authFacade.getUser$;
  }
  login() {
    this.authFacade.login();
  }
  createAd() {
    this.router.navigateByUrl('/create-ad');
  }
  browseAds() {
    this.router.navigateByUrl('/');
  }
}
