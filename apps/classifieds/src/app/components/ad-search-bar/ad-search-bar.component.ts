import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'oidc-client';

import { AuthFacade } from '@classifieds-ui/auth';

@Component({
  selector: 'classifieds-ui-ad-search-bar',
  templateUrl: './ad-search-bar.component.html',
  styleUrls: ['./ad-search-bar.component.scss']
})
export class AdSearchBarComponent implements OnInit, AfterViewInit {
  searchString = '';
  user$: Observable<User>;

  @Output()
  searchChange = new EventEmitter<string>();

  @ViewChild('searchField', { static: true })
  private searchField: ElementRef<HTMLInputElement>;

  private keyupSubscription: Subscription;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {
    this.user$ = this.authFacade.getUser$;
  }

  ngAfterViewInit() {
    this.keyupSubscription = fromEvent(this.searchField.nativeElement, 'keyup').pipe(
      debounceTime(1000)
    ).subscribe(() => this.onSubmit());
  }

  login() {
    this.authFacade.login();
  }

  onSubmit() {
    this.searchChange.emit(this.searchString);
  }
}
