import { ChangeDetectionStrategy, Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
  @Input()
  searchForm: AdSearchBarForm;
  loading$: Observable<boolean>;
  constructor(private router: Router, private adListItemService: AdListItemService, public adsDataSource: AdsDataSourceService) { }
  ngOnInit() {
    this.loading$ = this.adListItemService.loading$;
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
