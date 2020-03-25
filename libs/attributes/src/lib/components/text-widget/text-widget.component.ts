
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ControlContainer } from "@angular/forms";
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

  constructor(public controlContainer: ControlContainer) { }

  public onTouched: () => void = () => {};

  writeValue(val: any): void {
    if (val) {
      this.controlContainer.control.setValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.controlContainer.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.controlContainer.control.disable()
    } else {
      this.controlContainer.control.enable()
    }
  }

  validate(c: AbstractControl): ValidationErrors | null{
    return this.controlContainer.control.valid ? null : { invalidForm: {valid: false, message: `${this.attribute.label} is invalid` } };
  }

}
