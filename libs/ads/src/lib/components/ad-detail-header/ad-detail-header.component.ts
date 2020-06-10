import { Component, Input, OnInit } from '@angular/core';
import { Ad } from '../../models/ads.models';

@Component({
  selector: 'classifieds-ui-ad-detail-header',
  templateUrl: './ad-detail-header.component.html'
})
export class AdDetailHeaderComponent implements OnInit {

  @Input()
  ad: Ad;

  constructor() { }

  ngOnInit() {

  }

}
