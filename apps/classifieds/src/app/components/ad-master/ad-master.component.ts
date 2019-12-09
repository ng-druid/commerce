import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Ad} from '@classifieds-ui/ads';

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
  searchString;
  displayOverlay = true;
  constructor(private router: Router, public adsDataSource: AdsDataSourceService) { }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.searchString.previousValue !== changes.searchString.currentValue) {
      this.adsDataSource.searchString = changes.searchString.currentValue;
    }
  }
  viewAd(id: string) {
    this.router.navigateByUrl(`/ad/${id}`);
  }
}
