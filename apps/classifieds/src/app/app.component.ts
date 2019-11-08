import { Component } from '@angular/core';

import { AuthFacade } from '@classifieds-ui/auth';

@Component({
  selector: 'classifieds-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'classifieds';
  constructor(private authFacade: AuthFacade) {}
  login() {
    this.authFacade.login();
  }
}
