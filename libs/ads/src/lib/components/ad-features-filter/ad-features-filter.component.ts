import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, AfterViewInit, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { AdSearchBarForm } from '../../models/form.models';
import { FormBuilder, FormArray } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { FeaturesSearchConfig, FeatureListItem } from '../../models/ads.models';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { mapAdType } from '../../ad.helpers';
import * as qs from 'qs';
import { AdType } from '../../models/ads.models';

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
  adType: AdType;

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

  private featureListItemsService: EntityCollectionService<FeatureListItem>;

  get featuresArray(): FormArray {
    return this.featuresFormGroup.controls.features as FormArray;
  }

  constructor(private renderer: Renderer2, private fb: FormBuilder, es: EntityServices) {
    this.featureListItemsService = es.getEntityCollectionService('FeatureListItem');
  }

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
      const displayFeatures = this.features.filter(f => this.featureSelections.isSelected(f));
      features.forEach(f => {
        if(!this.featureSelections.isSelected(f.key)) {
          displayFeatures.push(f.key);
        }
      })
      this.features = [ ...displayFeatures ];
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
        // changes.searchForm.previousValue.attributes !== changes.searchForm.currentValue.attributes
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
    this.featureListItemsService.clearCache();
    this.featureListItemsService.getWithQuery(this.makeQueryString(searchString)).subscribe(features => {
      this.features$.next(features);
    });
  }

  toggleInactive(id: string) {
    this.featureSelections.toggle(id);
  }

  populateFeatures() {
    for(let i = 0; i < this.features.length; i++) {
      const selected = this.featureSelections.isSelected(this.features[i]);
      if(!selected) {
        (this.featuresFormGroup.get('features') as FormArray).push(this.fb.control(selected))
      }
    }
  }

  clearFeatures() {
    let startIndex = 0;
    const len = (this.featuresFormGroup.get('features') as FormArray).length;
    for(let i = 0; i < len; i++) {
      if(this.featureSelections.isSelected(this.features[i])) {
        startIndex++;
      } else {
        (this.featuresFormGroup.get('features') as FormArray).removeAt(startIndex);
      }
    }
  }

  makeQueryString(searchString: string): string {
    const baseSearch = new AdSearchBarForm({ ...this.searchForm, location: undefined, attributes: undefined, features: undefined});
    let queryString = qs.stringify(baseSearch as Object);
    if(searchString !== undefined && searchString !== "") {
      queryString += `&featureSearchString=${encodeURI(searchString)}`;
    }
    if(this.searchForm.location !== undefined && this.searchForm.location.length === 2) {
      queryString += `&location=${this.searchForm.location[0]}&location=${this.searchForm.location[1]}`
    }
    if(this.searchForm.attributes !== undefined) {
      for(const attr in this.searchForm.attributes) {
        const len = this.searchForm.attributes[attr].length;
        for(let i = 0; i < len; i++) {
          queryString += `&${encodeURI(attr)}=${encodeURI(this.searchForm.attributes[attr][i])}`;
        }
      }
    }
    if(this.searchForm.features !== undefined) {
      const len = this.searchForm.features.length;
      for(let i = 0; i < len; i++) {
        queryString += `&features=${encodeURI(this.searchForm.features[i])}`;
      }
    }
    return queryString;
  }

}
