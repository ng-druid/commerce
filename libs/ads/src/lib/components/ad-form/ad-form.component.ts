import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { MediaObserver } from '@angular/flex-layout';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NEVER, Subject } from 'rxjs';
import { catchError, switchMap, tap, debounceTime, finalize, takeUntil, map, distinctUntilChanged, take } from 'rxjs/operators';
import { FilesService, MediaFile } from '@classifieds-ui/media';
import { CityListItemsService, CityListItem, ZippoService } from '@classifieds-ui/cities';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { Term, Vocabulary, VocabularySelectorComponent } from '@classifieds-ui/taxonomy';
import { Attribute, ValueComputerService, AttributeValue } from '@classifieds-ui/attributes';
import { AdBrowserFacade } from '../../features/ad-browser/ad-browser.facade';

import { AdImage, Ad, AdStatuses, AdType, AdProfileItem } from '../../models/ads.models';

@Component({
  selector: 'classifieds-ui-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrls: ['./ad-form.component.scss']
})
export class AdFormComponent implements OnInit, OnDestroy {

  files: Array<File> = [];
  cities: Array<CityListItem> = [];
  adTypes: Array<AdType> = [];
  attributes: Array<Attribute> = [];
  profiles: Array<AdProfileItem> = [];
  ad: Ad = new Ad();

  isLoadingCities = false;
  isLoadingProfiles = false;
  orientation = 'horizontal';

  featuresSheetData: { selectedId: string; } = { selectedId: undefined };
  featureSets: Array<Vocabulary> = [];

  adTypeFormGroup: FormGroup;
  detailsFormGroup: FormGroup;
  attributesFormGroup: FormGroup;

  private adsService: EntityCollectionService<Ad>;
  private adTypesService: EntityCollectionService<AdType>
  private vocabularyService: EntityCollectionService<Vocabulary>;
  private profilesService: EntityCollectionService<AdProfileItem>;

  private componentDestroyed = new Subject();

  @ViewChild(MatHorizontalStepper, { static: true })
  stepper: MatHorizontalStepper;

  get adType(): AdType {
    return this.adTypes[this.adTypeFormGroup.get('adType').value];
  }

  constructor(private router: Router, es: EntityServices, private mo: MediaObserver, private bs: MatBottomSheet, private sb: MatSnackBar, private filesService: FilesService, private cityListItemsService: CityListItemsService, private fb: FormBuilder, private zippoService: ZippoService, private adBrowserFacade: AdBrowserFacade, private valueComputerService: ValueComputerService) {
    this.adsService = es.getEntityCollectionService('Ad');
    this.adTypesService = es.getEntityCollectionService('AdType');
    this.vocabularyService = es.getEntityCollectionService('Vocabulary');
    this.profilesService = es.getEntityCollectionService('AdProfileItem');
  }

  ngOnInit() {
    this.adTypesService.getAll().subscribe(adTypes => this.adTypes = adTypes);
    this.adTypeFormGroup = this.fb.group({
      adType: ['', Validators.required]
    });
    this.detailsFormGroup = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      profile: [''],
      description: ['', Validators.required]
    });
    this.attributesFormGroup = this.fb.group({
      attributes: new FormControl('')
    });
    this.detailsFormGroup.get('location').valueChanges.pipe(
      debounceTime(500),
      tap(() => {
        this.cities = [];
        this.isLoadingCities = true;
      }),
      /*switchMap(value => this.cityListItemsService.getWithQuery({ searchString: value })
        .pipe(
          finalize(() => {
            this.isLoadingCities = false
          }),
        )
      ),*/
      switchMap(value => this.zippoService.getWithQuery({ searchString: value })
        .pipe(
          catchError(e => {
            this.cities = [];
            this.isLoadingCities = false;
            return NEVER;
          }),
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
    this.adTypeFormGroup.get('adType').valueChanges.pipe(
      map(v => this.adTypes[v]),
      /*tap(() => {
        while (this.attributes.length !== 0) {
          this.attributes.removeAt(0)
        }
      }),*/
      takeUntil(this.componentDestroyed)
    ).subscribe(adType => {
      this.attributes = adType.attributes.map(a => new Attribute(a));
      /*adType.attributes.forEach(attr => {
        this.attributes.push(this.fb.group({
          name: [attr.name, Validators.required],
          type: [attr.type, Validators.required],
          displayName: [attr.label, Validators.required],
          value: ['']
        }));
      });*/
    });
    this.detailsFormGroup.get('profile').valueChanges.pipe(
      debounceTime(500),
      tap(() => {
        this.profiles = [];
        this.isLoadingProfiles = true;
      }),
      switchMap(value => this.profilesService.getAll()
        .pipe(
          catchError(e => {
            this.profiles = [];
            this.isLoadingProfiles = false;
            return NEVER;
          }),
          finalize(() => {
            this.isLoadingProfiles = false
          }),
        )
      ),
      takeUntil(this.componentDestroyed)
    ).subscribe((profiles: Array<AdProfileItem>) => {
      this.profiles = profiles;
    });
    this.mo.asObservable().pipe(
      map(v => v.length !== 0 && v[0].mqAlias.indexOf('sm') === -1 && v[0].mqAlias.indexOf('xs') === -1),
      distinctUntilChanged(),
      debounceTime(250)
    ).subscribe(desktop => {
      this.orientation = desktop ? 'horizontal' : 'vertical';
    });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

  createAd() {
    // this.stepper.next();
    this.filesService.bulkUpload(this.files).pipe(
      catchError(e => {
        // alert(e.error);
        return NEVER;
      }),
      tap((files: Array<MediaFile>) => {
        const attributes = this.attributesFormGroup.get('attributes').value.map(av => new AttributeValue(av));
        this.valueComputerService.compute(attributes);
        const city = this.detailsFormGroup.get('location').value;
        const profile = this.detailsFormGroup.get('profile').value;
        this.ad.adType = this.adTypes[this.adTypeFormGroup.get('adType').value].id;
        this.ad.status = AdStatuses.Submitted;
        this.ad.title = this.detailsFormGroup.get('title').value;
        this.ad.description = this.detailsFormGroup.get('description').value;
        this.ad.location = city ? city.location : [];
        this.ad.profileId = profile ? profile.id : undefined;
        this.ad.images = files.map((f, i) => new AdImage({ id: f.id, path: f.path, weight: i}));
        this.ad.featureSets = this.featureSets.map(v => new Vocabulary(v));
        this.ad.attributes = this.valueComputerService.compute(attributes);
        this.ad.cityDisplay = `${city.city}, ${city.stateName} (${city.zip})`
      }),
      switchMap(f => {
        return this.adsService.upsert(new Ad(this.ad));
      })
    ).subscribe((ad: Ad) => {
      // this.stepper.next();
      this.sb.open(`Ad has been created!`, 'Created', { duration: 3000 });
      setTimeout(() => {
        this.adBrowserFacade.getAdType$.pipe(take(1)).subscribe(adType => {
          this.router.navigateByUrl(`/ads/${adType}/ad/${ad.id}`);
        });
      }, 2000)
    });
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onAddFeatureSet() {
    const sheet = this.bs.open(VocabularySelectorComponent, { data: this.featuresSheetData });
    sheet.afterDismissed().pipe(
      switchMap(() => this.vocabularyService.getByKey(this.featuresSheetData.selectedId))
    ).subscribe((v) => {
      this.featureSets = [ ...this.featureSets, new Vocabulary(v) ];
    });
  }

  displayCity(city?: CityListItem): string | undefined {
    return city ? `${city.city}, ${city.stateId} (${city.zip})` : undefined;
  }

  displayProfile(profile?: AdProfileItem) {
    return profile ? `${profile.title} [${profile.id}]` : undefined;
  }

}
