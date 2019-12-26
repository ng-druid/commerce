import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NEVER, Subject } from 'rxjs';
import { catchError, switchMap, tap, debounceTime, finalize, takeUntil } from 'rxjs/operators';
import { FilesService, MediaFile } from '@classifieds-ui/media';
import { CitiesService, City } from '@classifieds-ui/cities';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { VocabularyService, Term, Vocabulary } from '@classifieds-ui/taxonomy';

import { AdsService } from '../../services/ads.service';
import { AdImage, AdDetail } from '../../models/ads.models';

@Component({
  selector: 'classifieds-ui-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit, OnDestroy {

  files: Array<File> = [];
  cities: Array<City> = [];
  vocabulary: Vocabulary;
  ad: AdDetail = new AdDetail();
  isLoadingCities = false;

  detailsFormGroup: FormGroup;

  private componentDestroyed = new Subject();

  @ViewChild(MatHorizontalStepper, { static: true })
  stepper: MatHorizontalStepper;

  constructor(private router: Router, private adsService: AdsService, private filesService: FilesService, private citiesService: CitiesService, private fb: FormBuilder, private vocabularyService: VocabularyService) { }

  ngOnInit() {
    this.detailsFormGroup = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.vocabularyService.getVocabulary("5dfd097acb38b113cc858508").subscribe(vocab => {
      this.vocabulary = vocab;
    });
    this.detailsFormGroup.get('location').valueChanges.pipe(
      debounceTime(500),
      tap(() => {
        this.cities = [];
        this.isLoadingCities = true;
      }),
      switchMap(value => this.citiesService.getCities(value)
        .pipe(
          finalize(() => {
            this.isLoadingCities = false
          }),
        )
      ),
      takeUntil(this.componentDestroyed)
    )
    .subscribe((cities: Array<City>) => {
      this.cities = cities;
    });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

  createAd() {
    this.stepper.next();
    this.filesService.bulkUpload(this.files).pipe(
      catchError(e => {
        alert(e.error);
        return NEVER;
      }),
      tap((files: Array<MediaFile>) => {
        const city = this.detailsFormGroup.get('location').value
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
        this.router.navigateByUrl(`/ads/ad/${ad.id}`);
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
