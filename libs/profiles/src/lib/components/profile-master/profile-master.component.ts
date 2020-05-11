import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../../models/profiles.model';

@Component({
  selector: 'classifieds-ui-profile-master',
  templateUrl: './profile-master.component.html',
  styleUrls: ['./profile-master.component.scss']
})
export class ProfileMasterComponent implements OnInit {

  @Input()
  profiles: Array<Profile> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
