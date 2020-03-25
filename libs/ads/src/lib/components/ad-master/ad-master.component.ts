import { ChangeDetectionStrategy, Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MediaObserver } from '@angular/flex-layout';
import { select, Store } from '@ngrx/store';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { Observable, combineLatest } from 'rxjs';
import { filter, debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

import { AdSearchBarForm } from '../../models/form.models';
import { AdsDataSourceService } from '../../services/ads-data-source.service';
import { AdListItemService } from '../../services/ad-list-item.service';

@Component({
  selector: 'classifieds-ui-ad-master',
  templateUrl: './ad-master.component.html',
  styleUrls: ['./ad-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ AdsDataSourceService ]
})
export class AdMasterComponent implements OnInit, OnChanges {
  @ViewChild(CdkVirtualScrollViewport, { static: true })
  viewport: CdkVirtualScrollViewport;
  @Input()
  searchForm: AdSearchBarForm;
  @Input()
  adType: string;
  loading$: Observable<boolean>;
  constructor(private router: Router, private mo: MediaObserver, private store: Store<RouterReducerState>, private adListItemService: AdListItemService, public adsDataSource: AdsDataSourceService) { }
  ngOnInit() {
    this.loading$ = this.adListItemService.loading$;
    const { selectCurrentRoute } = getSelectors((state: any) => state.router);
    combineLatest(
      this.mo.asObservable().pipe(map(v => v.length !== 0 && v[0].mqAlias.indexOf('sm') === -1 && v[0].mqAlias.indexOf('xs') === -1)),
      this.store.pipe(select(selectCurrentRoute))
    ).pipe(
      distinctUntilChanged(),
      debounceTime(250)
    ).subscribe(() => {
      this.viewport.checkViewportSize();
    });


    this.mo.asObservable().pipe(filter(() => !!this.viewport), debounceTime(500)).subscribe(() => {
      this.viewport.checkViewportSize();
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    // Safe guard against duplicate requests.
    if(changes.searchForm.previousValue !== changes.searchForm.currentValue && JSON.stringify(changes.searchForm.previousValue) !== JSON.stringify(changes.searchForm.currentValue)) {
      this.adsDataSource.searchForm = changes.searchForm.currentValue;
    }
  }
  viewAd(id: string) {
    this.router.navigateByUrl(`/ads/${this.adType}/ad/${id}`);
  }
}
