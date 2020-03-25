import { Component, Input } from '@angular/core';
import { ControlContainer, FormArray } from "@angular/forms";
import { Attribute } from '@classifieds-ui/attributes';

@Component({
  selector: 'classifieds-ui-ymm-selector',
  templateUrl: './ymm-selector.component.html',
  styleUrls: ['./ymm-selector.component.scss']
})
export class YmmSelectorComponent {

  @Input()
  attribute: Attribute;

  get attributes(): FormArray {
    return this.controlContainer.control.get('attributes') as FormArray;
  }

  constructor(public controlContainer: ControlContainer) { }

}
