import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NEVER } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AdImage, AdDetail, AdsService } from '@classifieds-ui/ads';
import { FilesService, MediaFile } from '@classifieds-ui/media';

@Component({
  selector: 'classifieds-ui-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent {

  files: Array<File> = [];
  ad: AdDetail = new AdDetail();
  displayOverlay = false;

  constructor(private router: Router, private adsService: AdsService, private filesService: FilesService) { }

  onSubmit() {
    this.displayOverlay = true;
    this.filesService.bulkUpload(this.files).pipe(
      catchError(e => {
        this.displayOverlay = false;
        alert(e.error);
        return NEVER;
      }),
      tap((files: Array<MediaFile>) => {
        this.ad.images = files.map((f, i) => new AdImage({ id: f.id, path: f.path, weight: i}));
      }),
      switchMap(f => {
        return this.adsService.createAd(this.ad);
      })
    ).subscribe((ad: AdDetail) => {
      this.router.navigateByUrl(`/ad/${ad.id}`);
    });
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
