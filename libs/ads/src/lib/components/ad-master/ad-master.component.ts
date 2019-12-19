import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { AdSearchBarForm } from '../../models/form.models';
import { AdsDataSourceService } from '../../services/ads-data-source.service';

@Component({
  selector: 'classifieds-ui-ad-master',
  templateUrl: './ad-master.component.html',
  styleUrls: ['./ad-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ AdsDataSourceService ]
})
export class AdMasterComponent implements OnChanges {
  @Input()
  searchForm: AdSearchBarForm;
  displayOverlay = true;
  constructor(private router: Router, public adsDataSource: AdsDataSourceService) { }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.searchForm.previousValue !== changes.searchForm.currentValue) {
      this.adsDataSource.searchForm = changes.searchForm.currentValue;
    }
  }
  viewAd(id: string) {
    this.router.navigateByUrl(`/ads/ad/${id}`);
  }
}
