import { Component, AfterViewInit, ViewChild, ElementRef, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, tap, switchMap, takeUntil, finalize } from 'rxjs/operators';
import { City , CitiesService } from '@classifieds-ui/cities';

@Component({
  selector: 'classifieds-ui-ad-search-bar',
  templateUrl: './ad-search-bar.component.html',
  styleUrls: ['./ad-search-bar.component.scss']
})
export class AdSearchBarComponent implements OnInit, OnDestroy {

  @Output()
  searchChange = new EventEmitter<string>();

  cities: Array<City> = [];
  isLoadingCities = false;

  searchFormGroup: FormGroup;

  private componentDestroyed = new Subject();

  constructor(private fb: FormBuilder, private citiesService: CitiesService) { }

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

  onSubmit() {
    this.searchChange.emit(this.searchFormGroup.get('searchString').value);
  }

  displayCity(city?: City): string | undefined {
    return city ? `${city.city}, ${city.stateId}` : undefined;
  }

}
