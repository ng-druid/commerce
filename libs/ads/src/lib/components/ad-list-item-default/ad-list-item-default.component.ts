import { Component, Input } from '@angular/core';
import { AdListItem } from '../../models/ads.models';

@Component({
  selector: 'classifieds-ui-ad-list-item-default',
  templateUrl: './ad-list-item-default.component.html',
  styleUrls: ['./ad-list-item-default.component.scss']
})
export class AdListItemDefaultComponent {

  @Input()
  ad: AdListItem;

  @Input()
  adType: string;

  constructor() { }

}
