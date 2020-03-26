import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, AfterViewInit, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { AdSearchBarForm } from '../../models/form.models';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { QueryParams } from '@ngrx/data';
import { FeatureListItemsService } from '../../services/feature-list-items.service';
import { FeaturesSearchConfig, FeatureListItem, AdTypes } from '../../models/ads.models';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'classifieds-ui-ad-features-filter',
  templateUrl: './ad-features-filter.component.html',
  styleUrls: ['./ad-features-filter.component.scss']
})
export class AdFeaturesFilterComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChildren(MatCheckbox)
  featureCheckboxes: QueryList<MatCheckbox>;

  @Input()
  searchForm: AdSearchBarForm;

  @Input()
  adType: string;

  @Output()
  searchFormChange = new EventEmitter<AdSearchBarForm>();

  featuresFormGroup = this.fb.group({
    searchString: [''],
    features: new FormArray([])
  });

  features: Array<string> = [];
  features$ = new BehaviorSubject<Array<FeatureListItem>>([]);
  featuresMap = new Map<string, FeatureListItem>();

  featureSelections = new SelectionModel<string>(true);

  constructor(private renderer: Renderer2, private fb: FormBuilder, private featuresListItemsService: FeatureListItemsService) { }

  ngOnInit() {
    this.featuresFormGroup.get('features').valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(v => {
      this.searchForm = new AdSearchBarForm({ ...this.searchForm, features: this.featureSelections.selected });
      this.searchFormChange.emit(this.searchForm);
    });
    this.featuresFormGroup.get("searchString").valueChanges.pipe(
      debounceTime(1000)
    ).subscribe((v) => {
      this.loadFeatures(v);
    });
    this.features$.subscribe(features => {
      this.clearFeatures();
      this.features = features.map(f => f.humanName);
      this.populateFeatures();
    });
    this.loadFeatures("");
  }

  ngAfterViewInit() {
    this.featureCheckboxes.changes.subscribe((checkboxes: QueryList<MatCheckbox>) => {
      checkboxes.forEach(checkbox => {
        checkbox.change.subscribe((change: MatCheckboxChange) => {
          const el = document.getElementById(checkbox.inputId).closest('.feature-wrapper');
          if(change.checked) {
            this.renderer.addClass(el, 'is-selected');
          } else {
            this.renderer.removeClass(el,'is-selected');
          }
        });
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(
      changes.searchForm.previousValue &&
      (
        changes.searchForm.previousValue.searchString !== changes.searchForm.currentValue.searchString ||
        changes.searchForm.previousValue.location !== changes.searchForm.currentValue.location
      )
    ) {
      const searchString = this.featuresFormGroup.get("searchString").value;
      this.loadFeatures(searchString);
    }
    if (changes.adType && changes.adType.previousValue !== changes.adType.currentValue) {
      this.clearFeatures();
      this.featureSelections.clear();
      this.featuresFormGroup.setValue({
        searchString: '',
        features: []
      });
    }
  }

  loadFeatures(searchString: string) {
    this.featuresListItemsService.clearCache();
    const location = this.searchForm.location === undefined || this.searchForm.location.length !== 2 ? '' : this.searchForm.location.join(",");
    const search = new FeaturesSearchConfig({ adType: this.mapAdType(this.searchForm.adType), searchString: searchString, location, features: this.searchForm.features, adSearchString: this.searchForm.searchString });
    this.featuresListItemsService.getWithQuery(search as Object as QueryParams).subscribe(features => {
      this.features$.next(features);
    });
  }

  toggleInactive(id: string) {
    this.featureSelections.toggle(id);
  }

  populateFeatures() {
    for(let i = 0; i < this.features.length; i++) {
      const selected = this.featureSelections.isSelected(this.features[i]);
      (this.featuresFormGroup.get('features') as FormArray).push(this.fb.control(selected))
    }
  }

  clearFeatures() {
    let i = 0;
    while ((this.featuresFormGroup.get('features') as FormArray).length !== 0) {
      (this.featuresFormGroup.get('features') as FormArray).removeAt(0);
      i++;
    }
  }

    mapAdType(adType: string): number {
    // @todo: This should be reusable.
    switch(adType) {
      case 'general':
        return AdTypes.General;
      case 'realestate':
        return AdTypes.RealEstate;
      case 'rentals':
        return AdTypes.Rental;
      case 'autos':
        return AdTypes.Auto;
      case 'jobs':
        return AdTypes.Job;
    }
  }

}
