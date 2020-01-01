import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NEVER, Subject } from 'rxjs';
import { catchError, switchMap, tap, debounceTime, finalize, takeUntil } from 'rxjs/operators';
import { FilesService, MediaFile } from '@classifieds-ui/media';
import { CityListItemsService, CityListItem } from '@classifieds-ui/cities';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { VocabularyService, Term, Vocabulary } from '@classifieds-ui/taxonomy';

import { AdsService } from '../../services/ads.service';
import { AdImage, Ad } from '../../models/ads.models';

@Component({
  selector: 'classifieds-ui-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit, OnDestroy {

  files: Array<File> = [];
  cities: Array<CityListItem> = [];
  vocabulary: Vocabulary;
  terms: Array<Term> = [];
  ad: Ad = new Ad();
  isLoadingCities = false;

  detailsFormGroup: FormGroup;

  private componentDestroyed = new Subject();

  @ViewChild(MatHorizontalStepper, { static: true })
  stepper: MatHorizontalStepper;

  constructor(private router: Router, private adsService: AdsService, private filesService: FilesService, private cityListItemsService: CityListItemsService, private fb: FormBuilder, private vocabularyService: VocabularyService) { }

  ngOnInit() {
    this.detailsFormGroup = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.vocabularyService.getByKey('5dfd097acb38b113cc858508').subscribe(vocab => {
      this.vocabulary = new Vocabulary(vocab);
      this.terms = vocab.terms;
    });
    this.detailsFormGroup.get('location').valueChanges.pipe(
      debounceTime(500),
      tap(() => {
        this.cities = [];
        this.isLoadingCities = true;
      }),
      switchMap(value => this.cityListItemsService.getWithQuery({ searchString: value })
        .pipe(
          finalize(() => {
            this.isLoadingCities = false
          }),
        )
      ),
      takeUntil(this.componentDestroyed)
    )
    .subscribe((cities: Array<CityListItem>) => {
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
        this.ad.featureSets = [new Vocabulary({ ...this.vocabulary, terms: this.terms.map(t => new Term(t)) })];
      }),
      switchMap(f => {
        return this.adsService.add(new Ad(this.ad));
      })
    ).subscribe((ad: Ad) => {
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

  displayCity(city?: CityListItem): string | undefined {
    return city ? `${city.city}, ${city.stateId}` : undefined;
  }

}
