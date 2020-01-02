import { ChangeDetectionStrategy, Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';

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
  loading$: Observable<boolean>;
  constructor(private router: Router, private mo: MediaObserver, private adListItemService: AdListItemService, public adsDataSource: AdsDataSourceService) { }
  ngOnInit() {
    this.loading$ = this.adListItemService.loading$;
    this.mo.asObservable().pipe(filter(() => !!this.viewport), debounceTime(500)).subscribe(() => {
      this.viewport.checkViewportSize();
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.searchForm.previousValue !== changes.searchForm.currentValue) {
      this.adsDataSource.searchForm = changes.searchForm.currentValue;
    }
  }
  viewAd(id: string) {
    this.router.navigateByUrl(`/ads/ad/${id}`);
  }
}
