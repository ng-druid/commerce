import { Component, Input, OnInit } from '@angular/core';
import { Ad } from '../../models/ads.models';

@Component({
  selector: 'classifieds-ui-vehicle-detail-header',
  templateUrl: './vehicle-detail-header.component.html',
  styleUrls: ['./vehicle-detail-header.component.scss']
})
export class VehicleDetailHeaderComponent implements OnInit {

  @Input()
  ad: Ad;

  constructor() { }

  ngOnInit() {

  }

}
