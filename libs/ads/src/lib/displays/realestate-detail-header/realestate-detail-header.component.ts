import { Component, Input, OnInit } from '@angular/core';
import { Ad } from '../../models/ads.models';

@Component({
  selector: 'classifieds-ui-realestate-detail-header',
  templateUrl: './realestate-detail-header.component.html',
  styleUrls: ['./realestate-detail-header.component.scss']
})
export class RealestateDetailHeaderComponent implements OnInit {

  @Input()
  ad: Ad;

  constructor() { }

  ngOnInit() {

  }

}
