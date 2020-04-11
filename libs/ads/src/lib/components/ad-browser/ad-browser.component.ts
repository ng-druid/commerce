import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';
import { select, Store } from '@ngrx/store';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { combineLatest } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';

import { AdSearchBarForm } from '../../models/form.models';

@Component({
  selector: 'classifieds-ui-ad-browser',
  templateUrl: './ad-browser.component.html',
  styleUrls: ['./ad-browser.component.scss']
})
export class AdBrowserComponent implements OnInit {
  searchForm: AdSearchBarForm = new AdSearchBarForm({ searchString: '', location: [], features: [], adType: this.route.snapshot.data.adType, attributes: {} });
  hideMasterComponent = false;
  hideRouterOutlet = false;
  hideSearchBar = false;
  refreshViewport = true;
  spacerGap = '2em';
  adType = this.route.snapshot.data.adType;
  constructor(private mo: MediaObserver, private store: Store<RouterReducerState>, private route: ActivatedRoute) { }
  ngOnInit() {
    const { selectCurrentRoute } = getSelectors((state: any) => state.router);
    combineLatest([
      this.mo.asObservable().pipe(map(v => v.length !== 0 && v[0].mqAlias.indexOf('sm') === -1 && v[0].mqAlias.indexOf('xs') === -1)),
      this.store.pipe(select(selectCurrentRoute))
    ]).pipe(
      distinctUntilChanged(),
      debounceTime(250)
    ).subscribe(([desktop, r]) => {
      if(desktop) {
        this.hideMasterComponent = false;
        this.hideRouterOutlet = false;
        this.hideSearchBar = false;
        this.spacerGap = '2em';
      } else if(r.routeConfig.path === 'ad/:adId' || r.routeConfig.path === 'create-ad') {
        this.hideMasterComponent = true;
        this.hideRouterOutlet = false;
        this.hideSearchBar = r.routeConfig.path === 'create-ad';
        this.spacerGap = '1em';
      } else {
        this.hideMasterComponent = false;
        this.hideRouterOutlet = true;
        this.hideSearchBar = false;
        this.spacerGap = '1em';
      }
    });
    this.route.paramMap.pipe(
      map(p => p.get('adType')),
      filter(adType => adType && adType !== this.adType),
      distinctUntilChanged()
    ).subscribe(adType => {
      this.adType = adType;
      this.searchForm = new AdSearchBarForm({ searchString: '', location: [], features: [], adType, attributes: {} });
    });
  }
}
