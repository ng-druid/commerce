import { Component, Input } from '@angular/core';
import { AdDetail } from '@classifieds-ui/ads';

@Component({
  selector: 'classifieds-ui-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.scss']
})
export class AdDetailComponent {
  @Input()
  ad: AdDetail;
}
