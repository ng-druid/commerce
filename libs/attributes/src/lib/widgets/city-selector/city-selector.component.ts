import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Attribute, AttributeTypes } from '../../models/attributes.models';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { CityListItem, ZippoService } from '@classifieds-ui/cities';
import { NEVER, Subject } from 'rxjs';
import { debounceTime, tap, switchMap, catchError, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'classifieds-ui-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.scss']
})
export class CitySelectorComponent implements OnInit {

  @Input()
  attribute: Attribute;

  cities: Array<CityListItem> = [];
  isLoadingCities = false;

  citiesService: EntityCollectionService<CityListItem>;

  private componentDestroyed = new Subject();

  fakeForm = this.fb.group({
    city: this.fb.control('')
  });

  get attributes(): FormArray {
    return this.controlContainer.control.get('attributes') as FormArray;
  }

  constructor(public controlContainer: ControlContainer, private fb: FormBuilder, private zippoService: ZippoService, es: EntityServices) {
    this.citiesService = es.getEntityCollectionService('CityListItem');
  }

  ngOnInit(): void {
    this.fakeForm.get('city').valueChanges.pipe(
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
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

  onOptionSelected(e) {
    const city = new CityListItem(e.option.value);
    console.log(city);
    this.attributes.clear();
    this.attributes.push(this.fb.group({
      name: new FormControl('city', Validators.required),
      type: new FormControl(AttributeTypes.Text, Validators.required),
      displayName: new FormControl('City', Validators.required),
      value: new FormControl(city.city, Validators.required),
    }));
    this.attributes.push(this.fb.group({
      name: new FormControl('stateName', Validators.required),
      type: new FormControl(AttributeTypes.Text, Validators.required),
      displayName: new FormControl('State Name', Validators.required),
      value: new FormControl(city.stateName, Validators.required),
    }));
    this.attributes.push(this.fb.group({
      name: new FormControl('stateId', Validators.required),
      type: new FormControl(AttributeTypes.Text, Validators.required),
      displayName: new FormControl('State Id', Validators.required),
      value: new FormControl(city.stateId, Validators.required),
    }));
    this.attributes.push(this.fb.group({
      name: new FormControl('zip', Validators.required),
      type: new FormControl(AttributeTypes.Text, Validators.required),
      displayName: new FormControl('Zip', Validators.required),
      value: new FormControl(`${city.zip}`, Validators.required),
    }));
    this.attributes.push(this.fb.group({
      name: new FormControl('location', Validators.required),
      type: new FormControl(AttributeTypes.Complex, Validators.required),
      displayName: new FormControl('Location', Validators.required),
      value: new FormControl('', Validators.required),
      attributes: this.fb.array([
        this.fb.group({
          name: new FormControl('lat', Validators.required),
          type: new FormControl(AttributeTypes.Float, Validators.required),
          displayName: new FormControl('Lat', Validators.required),
          value: new FormControl(`${city.location[0]}`, Validators.required),
        }),
        this.fb.group({
          name: new FormControl('lng', Validators.required),
          type: new FormControl(AttributeTypes.Float, Validators.required),
          displayName: new FormControl('Lng', Validators.required),
          value: new FormControl(`${city.location[1]}`, Validators.required),
        })
      ])
    }));
  }

  displayCity(city?: CityListItem): string | undefined {
    return city ? `${city.city}, ${city.stateId} (${city.zip})` : undefined;
  }

}
