import { Component, OnInit, Input } from '@angular/core';
import { ProfileListItem } from '../../models/profiles.model';

@Component({
  selector: 'classifieds-ui-profile-master',
  templateUrl: './profile-master.component.html',
  styleUrls: ['./profile-master.component.scss']
})
export class ProfileMasterComponent implements OnInit {

  @Input()
  profiles: Array<ProfileListItem> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
