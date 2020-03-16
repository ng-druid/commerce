import { Component, EventEmitter, Output, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject, } from 'rxjs';
import { debounceTime, tap, switchMap, takeUntil, finalize, filter } from 'rxjs/operators';
import { CityListItem , CityListItemsService, ZippoService } from '@classifieds-ui/cities';

import { AdSearchBarForm } from '../../models/form.models';

@Component({
  selector: 'classifieds-ui-ad-search-bar',
  templateUrl: './ad-search-bar.component.html',
  styleUrls: ['./ad-search-bar.component.scss']
})
export class AdSearchBarComponent implements OnInit, OnDestroy {

  @Input()
  searchForm: AdSearchBarForm;

  @Output()
  searchFormChange = new EventEmitter<AdSearchBarForm>();

  cities: Array<CityListItem> = [];
  isLoadingCities = false;

  searchFormGroup: FormGroup;

  private componentDestroyed = new Subject();

  constructor(private fb: FormBuilder, private citiesListService: CityListItemsService, private zippoService: ZippoService) { }

  ngOnInit() {
    this.searchFormGroup = this.fb.group({
      searchString: [''],
      location: ['']
    });
    this.searchFormGroup.get('searchString').valueChanges.pipe(
      debounceTime(1000),
      takeUntil(this.componentDestroyed)
    ).subscribe(() => {
      this.onSubmit()
    });
    this.searchFormGroup.get('location').valueChanges.pipe(
      debounceTime(500),
      tap(v => {
        if(v === "") {
          this.onSubmit();
        }
      }),
      filter(value => !(value instanceof CityListItem) && value !== ""),
      tap(value => {
        this.cities = [];
        this.isLoadingCities = true;
        console.log(`value: "${value}"`);
      }),
      /*switchMap(value => this.citiesListService.getWithQuery({ searchString: value })
        .pipe(
          finalize(() => {
            this.isLoadingCities = false
          }),
        )
      ),*/
      switchMap(value => this.zippoService.getWithQuery({ searchString: value })
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

  onSubmit() {
    const searchString = this.searchFormGroup.get('searchString').value;
    const city = this.searchFormGroup.get('location').value;
    const location =  city ? city.location: undefined;
    this.searchForm = new AdSearchBarForm({ ...this.searchForm, searchString, location });
    this.searchFormChange.emit(this.searchForm);
  }

  displayCity(city?: CityListItem): string | undefined {
    return city ? `${city.city}, ${city.stateId}` : undefined;
  }

}
