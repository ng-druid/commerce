import { Component, OnInit } from '@angular/core';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { ProfileBrowserFacade } from '../../features/profile-browser/profile-browser.facade';
import { Location, ProfileListItem } from '../../models/profiles.model';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'classifieds-ui-profile-browser',
  templateUrl: './profile-browser.component.html',
  styleUrls: ['./profile-browser.component.scss']
})
export class ProfileBrowserComponent implements OnInit {

  profiles: Array<ProfileListItem>;
  locations: Array<Location>;

  private profileListitemsService: EntityCollectionService<ProfileListItem>;

  constructor(private profileBrowserFacade: ProfileBrowserFacade, es: EntityServices) {
    this.profileListitemsService = es.getEntityCollectionService('ProfileListItem');
  }

  ngOnInit(): void {
    this.profileBrowserFacade.getProfile$.pipe(
      tap(p => this.locations = p.locations),
      switchMap(p => this.profileListitemsService.getWithQuery({ parentId: p.id }))
    ).subscribe(profiles => {
      this.profiles = profiles;
    });
  }

}
