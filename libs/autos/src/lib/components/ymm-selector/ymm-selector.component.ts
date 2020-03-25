import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ControlContainer, FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Attribute } from '@classifieds-ui/attributes';

@Component({
  selector: 'classifieds-ui-ymm-selector',
  templateUrl: './ymm-selector.component.html',
  styleUrls: ['./ymm-selector.component.scss']
})
export class YmmSelectorComponent implements OnInit {

  @Input()
  attribute: Attribute;

  get attributes(): FormArray {
    return this.controlContainer.control.get('attributes') as FormArray;
  }

  constructor(public controlContainer: ControlContainer) { }

  ngOnInit() {
    this.attribute.attributes.forEach(attr => {
      this.attributes.push(new FormGroup({
        name: new FormControl(attr.name, Validators.required),
        type: new FormControl(attr.type, Validators.required),
        displayName: new FormControl(attr.label, Validators.required),
        value: new FormControl(''),
        attributes: new FormArray([])
      }));
    });
  }

}
