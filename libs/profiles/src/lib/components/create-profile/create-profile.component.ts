import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/profiles.model';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { ProfileBrowserFacade } from '../../features/profile-browser/profile-browser.facade';

@Component({
  selector: 'classifieds-ui-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  parent: Profile;
  private profilesService: EntityCollectionService<Profile>;

  constructor(private profileBrowserFacade: ProfileBrowserFacade, es: EntityServices) {
    this.profilesService = es.getEntityCollectionService('Profile');
  }

  ngOnInit() {
    this.profileBrowserFacade.getProfile$.subscribe(p => {
      this.parent = p;
    });
  }

  onSubmitted(profile: Profile) {
    this.profilesService.add(profile).subscribe(() => {
      alert('created profile');
    });
  }

}
