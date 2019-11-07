import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'classifieds-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'classifieds';
  authenticated$: Observable<boolean>;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authenticated$ = this.authService.authNavStatus$;
  }
  login() {
    this.authService.login();
  }
}
