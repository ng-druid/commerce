import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdSearchBarForm } from '../../models/form.models';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { QueryParams } from '@ngrx/data';
import { FeatureListItemsService } from '../../services/feature-list-items.service';
import { FeaturesSearchConfig, FeatureListItem } from '../../models/ads.models';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'classifieds-ui-ad-features-filter',
  templateUrl: './ad-features-filter.component.html',
  styleUrls: ['./ad-features-filter.component.scss']
})
export class AdFeaturesFilterComponent implements OnInit {

  @Input()
  searchForm: AdSearchBarForm;

  @Output()
  searchFormChange = new EventEmitter<AdSearchBarForm>();

  featuresFormGroup: FormGroup;

  features: Array<string> = [];
  features$ = new BehaviorSubject<Array<FeatureListItem>>([]);
  featuresMap = new Map<string, FeatureListItem>();

  featureSelections = new SelectionModel<string>(true);

  constructor(private fb: FormBuilder, private featuresListItemsService: FeatureListItemsService) { }

  ngOnInit() {
    this.featuresFormGroup = this.fb.group({
      searchString: [''],
      features: new FormArray([])
    });
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

  loadFeatures(searchString: string) {
    this.featuresListItemsService.clearCache();
    const location = this.searchForm.location === undefined || this.searchForm.location.length !== 2 ? '' : this.searchForm.location.join(",");
    const search = new FeaturesSearchConfig({ searchString: searchString, location, features: this.searchForm.features });
    this.featuresListItemsService.getWithQuery(search as Object as QueryParams).subscribe(features => {
      this.features$.next(features);
    });
  }

  toggleInactive(id: string) {
    this.featureSelections.toggle(id);
  }

  populateFeatures() {
    for(let i = 0; i < this.features.length; i++) {
      (this.featuresFormGroup.get('features') as FormArray).push(this.fb.control(false))
    }
  }

  clearFeatures() {
    let i = 0;
    while ((this.featuresFormGroup.get('features') as FormArray).length !== 0) {
      this.featureSelections.deselect(this.features[i]);
      (this.featuresFormGroup.get('features') as FormArray).removeAt(0);
      i++;
    }
  }

}
