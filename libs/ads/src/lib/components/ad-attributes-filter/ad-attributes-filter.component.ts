import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { AdType } from '../../models/ads.models';
import { AdSearchBarForm } from '../../models/form.models';
import { mapAdType } from '../../ad.helpers';
import { Attribute } from '@classifieds-ui/attributes';

@Component({
  selector: 'classifieds-ui-ad-attributes-filter',
  templateUrl: './ad-attributes-filter.component.html',
  styleUrls: ['./ad-attributes-filter.component.scss']
})
export class AdAttributesFilterComponent implements OnInit {

  @Input()
  adType: string;

  @Input()
  searchForm: AdSearchBarForm;

  @Output()
  searchFormChange = new EventEmitter<AdSearchBarForm>();

  filters: Array<Attribute> = [];

  filterForm = this.fb.group({
    attributes: new FormControl('')
  });

  private adTypesService: EntityCollectionService<AdType>;

  constructor(private fb: FormBuilder, entityServices: EntityServices) {
    this.adTypesService = entityServices.getEntityCollectionService('AdType');
  }

  ngOnInit() {
    const adType = mapAdType(this.adType);
    this.adTypesService.getByKey(adType).subscribe(t => {
      this.filters = t.filters;
    });
  }

}
