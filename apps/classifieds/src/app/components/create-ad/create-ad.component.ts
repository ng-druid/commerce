import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NEVER } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AdImage, AdDetail, AdsService } from '@classifieds-ui/ads';
import { FilesService, MediaFile } from '@classifieds-ui/media';
import { MatHorizontalStepper } from '@angular/material/stepper';

@Component({
  selector: 'classifieds-ui-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {

  files: Array<File> = [];
  ad: AdDetail = new AdDetail();

  detailsFormGroup: FormGroup;

  @ViewChild(MatHorizontalStepper, { static: true })
  stepper: MatHorizontalStepper;

  constructor(private router: Router, private adsService: AdsService, private filesService: FilesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.detailsFormGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createAd() {
    this.stepper.next();
    this.filesService.bulkUpload(this.files).pipe(
      catchError(e => {
        alert(e.error);
        return NEVER;
      }),
      tap((files: Array<MediaFile>) => {
        this.ad.title = this.detailsFormGroup.get('title').value;
        this.ad.description = this.detailsFormGroup.get('description').value;
        this.ad.images = files.map((f, i) => new AdImage({ id: f.id, path: f.path, weight: i}));
      }),
      switchMap(f => {
        return this.adsService.createAd(this.ad);
      })
    ).subscribe((ad: AdDetail) => {
      this.stepper.next();
      setTimeout(() => {
        this.router.navigateByUrl(`/ad/${ad.id}`);
      }, 2000)
    });
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
