import { ChangeDetectionStrategy, Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { MediaObserver } from '@angular/flex-layout';
import { select, Store } from '@ngrx/store';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { Observable, combineLatest } from 'rxjs';
import { filter, debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

import { AdSearchBarForm } from '../../models/form.models';
import { AdListItem, AdTypePlugin } from '../../models/ads.models';
import { AdsDataSourceService } from '../../services/ads-data-source.service';
import { mapAdType, createAdTypePlugin } from '../../ad.helpers';
import { AdTypePluginsService } from '../../services/ad-type-plugins.service';

@Component({
  selector: 'classifieds-ui-ad-master',
  templateUrl: './ad-master.component.html',
  styleUrls: ['./ad-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ AdsDataSourceService, AdTypePluginsService ]
})
export class AdMasterComponent implements OnInit, OnChanges {
  @ViewChild(CdkVirtualScrollViewport, { static: true })
  viewport: CdkVirtualScrollViewport;
  @Input()
  searchForm: AdSearchBarForm;
  @Input()
  adType: string;
  loading$: Observable<boolean>;
  plugin: AdTypePlugin;
  private adListItemsService: EntityCollectionService<AdListItem>;
  constructor(
    private router: Router,
    private mo: MediaObserver,
    private store: Store<RouterReducerState>,
    public adsDataSource: AdsDataSourceService,
    private adTypePlugins: AdTypePluginsService,
    es: EntityServices
  ) {
    this.adListItemsService = es.getEntityCollectionService('AdListItem');
  }
  ngOnInit() {
    this.loading$ = this.adListItemsService.loading$;
    const { selectCurrentRoute } = getSelectors((state: any) => state.router);
    this.plugin = this.adTypePlugins.get(mapAdType(this.adType)) ?? createAdTypePlugin(mapAdType(this.adType));
    combineLatest([
      this.mo.asObservable().pipe(map(v => v.length !== 0 && v[0].mqAlias.indexOf('sm') === -1 && v[0].mqAlias.indexOf('xs') === -1)),
      this.store.pipe(select(selectCurrentRoute))
    ]).pipe(
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
  trackById(index: number, ad: AdListItem): string {
    return ad.id;
  }
}
