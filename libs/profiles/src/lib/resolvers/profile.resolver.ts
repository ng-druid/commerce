import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { ProfileBrowserFacade } from '../features/profile-browser/profile-browser.facade';
import { Profile } from '../models/profiles.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {
  private profilesService: EntityCollectionService<Profile>;
  constructor(private profileBrowserFacade: ProfileBrowserFacade, es: EntityServices) {
    this.profilesService = es.getEntityCollectionService('Profile');
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Profile> {
    const profileId = route.paramMap.get('profileId');
    return this.profilesService.getByKey(profileId).pipe(
      tap(p => this.profileBrowserFacade.setProfile(p))
    ).toPromise();
  }
}
