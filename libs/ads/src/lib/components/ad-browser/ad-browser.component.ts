import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { select, Store } from '@ngrx/store';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { filter, map, withLatestFrom } from 'rxjs/operators';

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
  constructor(private mo: MediaObserver, private store: Store<RouterReducerState> ) { }
  ngOnInit() {
    const { selectCurrentRoute } = getSelectors((state: any) => state.router);
    // @todo: Implement logic to handle response layout
    /*this.store.pipe(
      select(selectCurrentRoute),
      filter(v => v && v.routeConfig),
      withLatestFrom(this.mo.asObservable().pipe(map(v => v.length !== 0 && v[0].mqAlias.indexOf('sm') === -1 && v[0].mqAlias.indexOf('xs') === -1)))
    ).subscribe(([r, desktop]) => {
      if(desktop) {
        this.hideMasterComponent = false;
        this.hideRouterOutlet = false;
      } else if(r.routeConfig.path === 'ad/:adId') {
        this.hideMasterComponent = true;
        this.hideRouterOutlet = false;
      } else {
        this.hideMasterComponent = false;
        this.hideRouterOutlet = true;
      }
    });*/
  }
  onFormSubmit(searchForm: AdSearchBarForm) {
    this.searchForm = searchForm;
  }
}
