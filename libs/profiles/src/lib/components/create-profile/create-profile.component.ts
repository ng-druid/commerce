import { Component, OnInit } from '@angular/core';
import { Profile, ProfileImage } from '../../models/profiles.model';
import { ProfileFormPayload } from '../../models/form.models';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { ProfileBrowserFacade } from '../../features/profile-browser/profile-browser.facade';
import { FilesService, MediaFile } from '@classifieds-ui/media';
import { NEVER } from 'rxjs';
import { catchError, switchMap, map, take } from 'rxjs/operators';

@Component({
  selector: 'classifieds-ui-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  parent: Profile;
  private profilesService: EntityCollectionService<Profile>;

  constructor(private profileBrowserFacade: ProfileBrowserFacade, private filesService: FilesService, es: EntityServices) {
    this.profilesService = es.getEntityCollectionService('Profile');
  }

  ngOnInit() {
    this.profileBrowserFacade.getProfile$.subscribe(p => {
      this.parent = p;
    });
  }

  onSubmitted(payload: ProfileFormPayload) {
    this.filesService.bulkUpload([ payload.logo, payload.headshot ]).pipe(
      catchError(e => {
        // alert(e.error);
        return NEVER;
      }),
      map((files: Array<MediaFile>) => {
        return new Profile({
          ...payload.profile,
          logo: payload.logo ? new ProfileImage({ ...files[0], weight: 1 }) : undefined,
          headshot: payload.headshot ? new ProfileImage({ ...files[0], weight: 1 }) : undefined
        });
      }),
      switchMap(profile => {
        return this.profilesService.upsert(new Profile(profile));
      })
    ).subscribe((profile: Profile) => {
      /*this.sb.open(`Ad has been created!`, 'Created', { duration: 3000 });
      setTimeout(() => {
        this.adBrowserFacade.getAdType$.pipe(take(1)).subscribe(adType => {
          this.router.navigateByUrl(`/ads/${adType}/ad/${ad.id}`);
        });
      }, 2000)*/
      alert('created profile');
    });
    /*this.profilesService.add(payload.profile).subscribe(() => {
      alert('created profile');
    });*/
  }

}
