import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NEVER } from 'rxjs';
import { catchError, switchMap, map, take } from 'rxjs/operators';
import { FilesService, MediaFile } from '@classifieds-ui/media';
import { AdBrowserFacade } from '../../features/ad-browser/ad-browser.facade';

import { AdImage, Ad, AdType } from '../../models/ads.models';
import { AdFormPayload } from '../../models/form.models';

@Component({
  selector: 'classifieds-ui-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {

  adTypes: Array<AdType> = [];

  private adsService: EntityCollectionService<Ad>;
  private adTypesService: EntityCollectionService<AdType>

  constructor(private router: Router, es: EntityServices, private filesService: FilesService, private sb: MatSnackBar, private adBrowserFacade: AdBrowserFacade) {
    this.adsService = es.getEntityCollectionService('Ad');
    this.adTypesService = es.getEntityCollectionService('AdType');
  }

  ngOnInit() {
    this.adTypesService.getAll().subscribe(adTypes => this.adTypes = adTypes);
  }

  onSubmit(event: AdFormPayload) {
    this.filesService.bulkUpload(event.files).pipe(
      catchError(e => {
        // alert(e.error);
        return NEVER;
      }),
      map((files: Array<MediaFile>) => {
        return new Ad({ ...event.ad, images: files.map((f, i) => new AdImage({ id: f.id, path: f.path, weight: i + 1})) });
      }),
      switchMap(ad => {
        return this.adsService.upsert(new Ad(ad));
      })
    ).subscribe((ad: Ad) => {
      this.sb.open(`Ad has been created!`, 'Created', { duration: 3000 });
      setTimeout(() => {
        this.adBrowserFacade.getAdType$.pipe(take(1)).subscribe(adType => {
          this.router.navigateByUrl(`/ads/${adType}/ad/${ad.id}`);
        });
      }, 2000)
    });
  }

}
