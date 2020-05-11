import { Component, OnInit } from '@angular/core';
import { ProfileBrowserFacade } from '../../features/profile-browser/profile-browser.facade';
import { Profile, Location } from '../../models/profiles.model';

@Component({
  selector: 'classifieds-ui-profile-browser',
  templateUrl: './profile-browser.component.html',
  styleUrls: ['./profile-browser.component.scss']
})
export class ProfileBrowserComponent implements OnInit {

  profiles: Array<Profile>;
  locations: Array<Location>;

  constructor(private profileBrowserFacade: ProfileBrowserFacade) { }

  ngOnInit(): void {
    this.profileBrowserFacade.getProfile$.subscribe(p => {
      this.profiles = [];
      this.locations = p.locations;
    });
  }

}
