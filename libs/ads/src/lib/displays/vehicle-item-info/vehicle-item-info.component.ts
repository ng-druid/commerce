import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Ad } from '../../models/ads.models';

@Component({
  selector: 'classifieds-ui-vehicle-item-info',
  templateUrl: './vehicle-item-info.component.html',
  styleUrls: ['./vehicle-item-info.component.scss']
})
export class VehicleItemInfoComponent implements OnInit, OnChanges {

  @Input()
  ad: Ad;

  constructor() { }

  ngOnInit() {
    console.log(this.ad);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.ad);
  }

}
