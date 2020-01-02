import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { select, Store } from '@ngrx/store';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { combineLatest } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

import { AdSearchBarForm } from '../../models/form.models';

@Component({
  selector: 'classifieds-ui-ad-browser',
  templateUrl: './ad-browser.component.html',
  styleUrls: ['./ad-browser.component.scss']
})
export class AdBrowserComponent implements OnInit {
  searchForm: AdSearchBarForm;
  hideMasterComponent = false;
  hideRouterOutlet = false;
  hideSearchBar = false;
  refreshViewport = true;
  constructor(private mo: MediaObserver, private store: Store<RouterReducerState> ) { }
  ngOnInit() {
    const { selectCurrentRoute } = getSelectors((state: any) => state.router);
    combineLatest(
      this.mo.asObservable().pipe(map(v => v.length !== 0 && v[0].mqAlias.indexOf('sm') === -1 && v[0].mqAlias.indexOf('xs') === -1)),
      this.store.pipe(select(selectCurrentRoute))
    ).pipe(
      distinctUntilChanged(),
      debounceTime(250)
    ).subscribe(([desktop, r]) => {
      if(desktop) {
        this.hideMasterComponent = false;
        this.hideRouterOutlet = false;
        this.hideSearchBar = false;
      } else if(r.routeConfig.path === 'ad/:adId' || r.routeConfig.path === 'create-ad') {
        this.hideMasterComponent = true;
        this.hideRouterOutlet = false;
        this.hideSearchBar = r.routeConfig.path === 'create-ad';
      } else {
        this.hideMasterComponent = false;
        this.hideRouterOutlet = true;
        this.hideSearchBar = false;
      }
    });
  }
  onFormSubmit(searchForm: AdSearchBarForm) {
    this.searchForm = searchForm;
  }
}
