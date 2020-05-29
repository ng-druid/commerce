import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormArray } from '@angular/forms';
import { AdType } from '../../models/ads.models';
import { AdSearchBarForm } from '../../models/form.models';
import { mapAdType } from '../../ad.helpers';
import { Attribute } from '@classifieds-ui/attributes';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'classifieds-ui-ad-attributes-filter',
  templateUrl: './ad-attributes-filter.component.html',
  styleUrls: ['./ad-attributes-filter.component.scss']
})
export class AdAttributesFilterComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  adType: AdType;

  @Input()
  searchForm: AdSearchBarForm;

  @Output()
  searchFormChange = new EventEmitter<AdSearchBarForm>();

  filters: Array<Attribute> = [];

  filterForm = this.fb.group({
    attributes: new FormControl('')
  });

  componentDestroyed = new Subject();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.filterForm.get('attributes').valueChanges.pipe(
      debounceTime(1000),
      map(v => {
        const values = (this.filterForm.get('attributes') as FormArray).value;
        const attributes = {};
        values.forEach(value => {
          // @todo: Support infinite hierarchy (better recursion handling).
          if(value.attributes && value.attributes.length > 0) {
            value.attributes.forEach(value2 => {
              if(value2.value && value2.value !== '') {
                attributes[value2.name] = [value2.value];
              }
            });
          } else {
            if(value.value && value.value !== '') {
              attributes[value.name] = [value.value];
            }
          }
        });
        return attributes;
      }),
      takeUntil(this.componentDestroyed)
    ).subscribe(attributes => {
      this.searchForm = new AdSearchBarForm({ ...this.searchForm, attributes });
      this.searchFormChange.emit(this.searchForm);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.adType && changes.adType.previousValue !== changes.adType.currentValue) {
      // const adType = mapAdType(changes.adType.currentValue);
      this.filters = changes.adType.currentValue.filters;
      this.filterForm.setValue({
        attributes: ''
      });
    }
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

}
