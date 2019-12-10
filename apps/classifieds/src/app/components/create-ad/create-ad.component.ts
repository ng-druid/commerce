import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NEVER } from 'rxjs';
import { catchError, switchMap, tap, debounceTime, finalize } from 'rxjs/operators';
import { AdImage, AdDetail, AdsService } from '@classifieds-ui/ads';
import { FilesService, MediaFile } from '@classifieds-ui/media';
import { CitiesService, City } from '@classifieds-ui/cities';
import { MatHorizontalStepper } from '@angular/material/stepper';

@Component({
  selector: 'classifieds-ui-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {

  files: Array<File> = [];
  cities: Array<City> = [];
  ad: AdDetail = new AdDetail();
  isLoadingCities = false;

  detailsFormGroup: FormGroup;
  locationFormGroup: FormGroup;

  @ViewChild(MatHorizontalStepper, { static: true })
  stepper: MatHorizontalStepper;

  constructor(private router: Router, private adsService: AdsService, private filesService: FilesService, private cititesService: CitiesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.detailsFormGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.locationFormGroup = this.fb.group({
      location: ['', Validators.required]
    });
    this.locationFormGroup.get('location').valueChanges.pipe(
      debounceTime(500),
      tap(() => {
        this.cities = [];
        this.isLoadingCities = true;
      }),
      switchMap(value => this.cititesService.getCities(value)
        .pipe(
          finalize(() => {
            this.isLoadingCities = false
          }),
        )
      )
    )
    .subscribe((cities: Array<City>) => {
      this.cities = cities;
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
        const city = this.locationFormGroup.get('location').value
        this.ad.title = this.detailsFormGroup.get('title').value;
        this.ad.description = this.detailsFormGroup.get('description').value;
        this.ad.location = city ? city.location : [];
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

  displayCity(city?: City): string | undefined {
    return city ? `${city.city}, ${city.stateId}` : undefined;
  }

}
