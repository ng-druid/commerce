import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../../models/profiles.model';

@Component({
  selector: 'classifieds-ui-location-master',
  templateUrl: './location-master.component.html',
  styleUrls: ['./location-master.component.scss']
})
export class LocationMasterComponent implements OnInit {

  @Input()
  locations: Array<Location> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
