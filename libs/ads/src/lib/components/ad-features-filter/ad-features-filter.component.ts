import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdSearchBarForm } from '../../models/form.models';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { SelectionModel, SelectionChange } from '@angular/cdk/collections';

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

  features = ['Dryer', 'Dish Washer'];

  featuresFormGroup: FormGroup;

  inactiveSelection = new SelectionModel<number>(true);

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.featuresFormGroup = this.fb.group({
      searchString: [''],
      inactiveFeatures: new FormArray([])
    });
    this.inactiveSelection.changed.subscribe((evt: SelectionChange<number>) => {
      evt.added.forEach(i => {
        this.searchForm = new AdSearchBarForm({ ...this.searchForm, features: [ ...this.searchForm.features, this.features[i]] })
      });
      evt.removed.forEach(i => {
        const index = this.searchForm.features.indexOf(this.features[i]);
        const features = [ ...this.searchForm.features ];
        features.splice(index, 1);
        this.searchForm = new AdSearchBarForm({ ...this.searchForm, features })
      });
      this.searchFormChange.emit(this.searchForm);
    });
    this.refresh();
  }

  refresh() {
    this.features.forEach((v, i) => {
      this.inactiveSelection.deselect(i);
      (this.featuresFormGroup.get('inactiveFeatures') as FormArray).push(this.fb.control(false));
    });
  }

  toggleInactive(i: number) {
    this.inactiveSelection.toggle(i);
  }

}
