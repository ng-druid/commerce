import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder, FormGroup, FormControl, Validator, Validators, AbstractControl, ValidationErrors, FormArray } from "@angular/forms";
import { AttributeTypes, AttributeSerializerService } from '@classifieds-ui/attributes';
import { SelectOption } from '../../models/plugin.models';

@Component({
  selector: 'classifieds-ui-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectionComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectionComponent),
      multi: true
    },
  ]
})
export class SelectionComponent implements OnInit, ControlValueAccessor, Validator {

  @Input()
  name: string;

  @Input()
  label: string;

  @Input()
  options: Array<SelectOption>;

  @Input()
  renderType: string;

  selectionForm = this.fb.group({
    attributes: this.fb.array([])
  });

  public onTouched: () => void = () => {};

  get attributesArray(): FormArray {
    return this.selectionForm.get('attributes') as FormArray;
  }

  get attributeType(): AttributeTypes {
    switch(this.renderType) {
      case 'checkboxgroup':
        return AttributeTypes.Complex;

      default:
        return AttributeTypes.Text
    }
  }

  constructor(private fb: FormBuilder, private attributesSerializer: AttributeSerializerService) { }

  ngOnInit(): void {
    this.attributesArray.push(this.fb.group({
      name: new FormControl('value', Validators.required),
      type: new FormControl(this.attributeType, Validators.required),
      displayName: new FormControl('Value', Validators.required),
      value: new FormControl(''),
      attributes: this.fb.array([])
    }));
    (this.attributesArray.controls[0].get('attributes') as FormArray).push(this.fb.group({
      name: new FormControl('value', Validators.required),
      type: new FormControl(this.attributeType, Validators.required),
      displayName: new FormControl('Value', Validators.required),
      value: new FormControl(''),
      attributes: this.fb.array([])
    }));
    (this.attributesArray.controls[0].get('attributes') as FormArray).controls[0].get('value').valueChanges.subscribe(v => {
      console.log(this.attributesSerializer.serialize([v], 'value'));
    });
  }

  writeValue(val: any): void {
    if (val) {
      this.attributesArray.setValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.attributesArray.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.attributesArray.disable()
    } else {
      this.attributesArray.enable()
    }
  }

  validate(c: AbstractControl): ValidationErrors | null{
    return this.selectionForm.valid ? null : { invalidForm: {valid: false, message: "selection is invalid"}};
  }

}
