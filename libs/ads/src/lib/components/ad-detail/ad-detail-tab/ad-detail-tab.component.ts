import { Component, Input } from '@angular/core';

import { AdDetail } from '../../../models/ads.models';

@Component({
  selector: 'classifieds-ui-ad-detail-tab',
  templateUrl: './ad-detail-tab.component.html',
  styleUrls: ['./ad-detail-tab.component.scss']
})
export class AdDetailTabComponent {
  @Input()
  ad: AdDetail;
  @Input()
  mediaBaseUrl: string;
}
