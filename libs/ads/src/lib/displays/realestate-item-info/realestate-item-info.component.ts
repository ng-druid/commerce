import { Component, Input, OnInit } from '@angular/core';
import { Ad } from '../../models/ads.models';

@Component({
  selector: 'classifieds-ui-realestate-item-info',
  templateUrl: './realestate-item-info.component.html',
  styleUrls: ['./realestate-item-info.component.scss']
})
export class RealestateItemInfoComponent implements OnInit {

  @Input()
  ad: Ad;

  constructor() { }

  ngOnInit() {

  }

}
