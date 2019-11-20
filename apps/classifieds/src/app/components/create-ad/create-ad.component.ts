import { Component } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
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

  constructor(private adsService: AdsService, private filesService: FilesService) { }

  onSubmit() {
    console.log('create ad');
    this.filesService.bulkUpload(this.files).pipe(
      tap((files: Array<MediaFile>) => {
        this.ad.images = files.map((f, i) => new AdImage({ id: f.id, path: f.path, weight: i}));
      }),
      switchMap(f => {
        return this.adsService.createAd(this.ad);
      })
    ).subscribe();
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
