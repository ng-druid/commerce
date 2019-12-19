import { Component, Input } from '@angular/core';

import { AdDetail } from '../../../models/ads.models';

@Component({
  selector: 'classifieds-ui-ad-gallery-tab',
  templateUrl: './ad-gallery-tab.component.html',
  styleUrls: ['./ad-gallery-tab.component.scss']
})
export class AdGalleryTabComponent {
  @Input()
  ad: AdDetail;
  @Input()
  mediaBaseUrl: string;
}
