import { Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
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
import { AdFormPayload } from '../../models/form.models';

@Component({
  selector: 'classifieds-ui-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrls: ['./ad-form.component.scss']
})
export class AdFormComponent implements OnInit, OnDestroy {

  @Input()
  adTypes: Array<AdType> = [];

  @Input()
  set ad(ad: Ad | undefined) {
    this._ad = ad;
    this.attributeValues = ad ? ad.attributes : [];
    this.featureSets = ad ? ad.featureSets.map(v => new Vocabulary(v)) : [];
    this.adTypeFormGroup.setValue({ adType: ad ? ad.typeId : '' });
    const [city, state, zip] = ad && ad.cityDisplay ? ad.cityDisplay.replace(/(^.*?)\(([0-9]+)\)$/, '$1,$2').split(',').map(v => v.trim()): [undefined, undefined, undefined];
    if(city && state && zip) {
      this.zippoService.getWithQuery({ searchString: `${city},${state}`}).subscribe(locations => {
        this.detailsFormGroup.setValue({
          title: ad ? ad.title: '',
          location: locations.find(l => l.zip === zip),
          profile: ad ? ad.profileId ? this.profilesService.getByKey(ad.profileId) : '' : '',
          description: ad ? ad.description: ''
         });
         this.detailsFormGroup.updateValueAndValidity();
      });
    } else {
      this.detailsFormGroup.setValue({
        title: ad ? ad.title: '',
        location: ad ? ad.location : '',
        profile: ad ? ad.profileId ? this.profilesService.getByKey(ad.profileId) : '' : '',
        description: ad ? ad.description: ''
       });
       this.detailsFormGroup.updateValueAndValidity();
    }
    this.adTypeFormGroup.updateValueAndValidity();
     // attributesFormGroup
    if(ad) {
      const mediaFiles = ad.images.map(i => {
        return new MediaFile({
          id: undefined,
          contentType: undefined,
          contentDisposition: undefined,
          path: `${i.path}`,
          length: undefined,
          fileName: i.path
        });
      });
      this.filesService.convertToFiles(mediaFiles).subscribe(files => {
        this.files = files;
      });
    } else {
      this.files = [];
    }
  }
  get ad() {
    return this._ad;
  }

  @Output()
  submitted = new EventEmitter<AdFormPayload>();

  files: Array<File> = [];
  cities: Array<CityListItem> = [];
  attributes: Array<Attribute> = [];
  profiles: Array<AdProfileItem> = [];
  attributeValues: Array<AttributeValue> = [];

  isLoadingCities = false;
  isLoadingProfiles = false;
  orientation = 'horizontal';

  featuresSheetData: { selectedId: string; } = { selectedId: undefined };
  featureSets: Array<Vocabulary> = [];

  adTypeFormGroup = this.fb.group({
    adType: ['', Validators.required]
  });
  detailsFormGroup = this.fb.group({
    title: ['', Validators.required],
    location: ['', Validators.required],
    profile: [''],
    description: ['', Validators.required]
  });
  attributesFormGroup = this.fb.group({
    attributes: new FormControl('')
  });

  private vocabularyService: EntityCollectionService<Vocabulary>;
  private profilesService: EntityCollectionService<AdProfileItem>;
  private _ad: Ad;

  private componentDestroyed = new Subject();

  @ViewChild(MatHorizontalStepper, { static: true })
  stepper: MatHorizontalStepper;

  get adType(): AdType {
    return this.adTypes.find(t => t.id === this.adTypeFormGroup.get('adType').value)
  }

  constructor(es: EntityServices, private mo: MediaObserver, private bs: MatBottomSheet, private sb: MatSnackBar, private filesService: FilesService, private cityListItemsService: CityListItemsService, private fb: FormBuilder, private zippoService: ZippoService, private adBrowserFacade: AdBrowserFacade, private valueComputerService: ValueComputerService) {
    this.vocabularyService = es.getEntityCollectionService('Vocabulary');
    this.profilesService = es.getEntityCollectionService('AdProfileItem');
  }

  ngOnInit() {
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
      map(id => this.adTypes.find(t => t.id === id)),
      /*tap(() => {
        while (this.attributes.length !== 0) {
          this.attributes.removeAt(0)
        }
      }),*/
      takeUntil(this.componentDestroyed)
    ).subscribe(adType => {
      if (adType) {
        this.attributes = adType.attributes.map(a => new Attribute(a));
      } else {
        this.attributes = []
      }
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
          map(profiles => profiles.filter(p => (p.title && p.title.indexOf(value) !== -1) || p.id.trim() === value)),
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

  submit() {
    const attributes = this.attributesFormGroup.get('attributes').value.map(av => new AttributeValue(av));
    this.valueComputerService.compute(attributes);
    const city = this.detailsFormGroup.get('location').value;
    const profile = this.detailsFormGroup.get('profile').value;
    const ad = new Ad({
      id: undefined,
      // adType: this.adTypes[this.adTypeFormGroup.get('adType').value].id,
      typeId: this.adTypeFormGroup.get('adType').value,
      userId: "",
      status: AdStatuses.Submitted,
      title: this.detailsFormGroup.get('title').value,
      description: this.detailsFormGroup.get('description').value,
      location: city ? city.location : [],
      profileId: profile ? profile.id : undefined,
      featureSets: this.featureSets.map(v => new Vocabulary(v)),
      attributes: this.valueComputerService.compute(attributes),
      cityDisplay: `${city.city}, ${city.stateName} (${city.zip})`,
      images: []
    });
    this.submitted.emit(new AdFormPayload({ files: this.files, ad }));
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
