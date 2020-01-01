import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Store, select } from '@ngrx/store';
import { RouterReducerState, getSelectors } from '@ngrx/router-store';

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
  constructor(private mo: MediaObserver, private store: Store<any>) { }
  ngOnInit() {
    const { selectCurrentRoute } = getSelectors((state: RouterReducerState) => state);
    this.store.pipe(select(selectCurrentRoute)).subscribe(v => console.log(v));;
    this.mo.asObservable().subscribe((v) => console.log(v));
  }
  onFormSubmit(searchForm: AdSearchBarForm) {
    this.searchForm = searchForm;
  }
}
