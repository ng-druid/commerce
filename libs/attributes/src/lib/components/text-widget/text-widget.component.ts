
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup,FormControl, Validator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Attribute, AttributeWidget } from '../../models/attributes.models';

@Component({
  selector: 'classifieds-ui-text-widget',
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextWidgetComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextWidgetComponent),
      multi: true
    },
  ]
})
export class TextWidgetComponent implements ControlValueAccessor, Validator {

  @Input()
  attribute: Attribute;

  valueForm = new FormGroup({
    value: new FormControl('')
  });

  constructor() { }

  public onTouched: () => void = () => {};

  writeValue(val: any): void {
    if (val) {
      this.valueForm.setValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.valueForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.valueForm.disable()
    } else {
      this.valueForm.enable()
    }
  }

  validate(c: AbstractControl): ValidationErrors | null{
    return this.valueForm.valid ? null : { invalidForm: {valid: false, message: `${this.attribute.label} is invalid` } };
  }

}
