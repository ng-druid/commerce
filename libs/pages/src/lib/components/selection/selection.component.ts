import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder, FormControl, Validator, Validators, AbstractControl, ValidationErrors, FormArray } from "@angular/forms";
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
  set values(values: Array<SelectOption>) {
    this.options = values;
    this.buildOptions();
  }

  @Input()
  renderType: string;

  selectionForm = this.fb.group({
    attributes: this.fb.array([])
  });

  options: Array<SelectOption>;

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

  constructor(private fb: FormBuilder, private attributeSerializer: AttributeSerializerService) { }

  ngOnInit(): void {
    this.attributesArray.push(this.fb.group({
      name: new FormControl('value', Validators.required),
      type: new FormControl(AttributeTypes.Array, Validators.required),
      displayName: new FormControl('Value', Validators.required),
      value: new FormControl(''),
      attributes: ['checkboxgroup'].findIndex(r => r === this.renderType) > -1 ? this.fb.array([]) : new FormControl('')
    }));
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

  buildOptions() {
    if(this.renderType === 'checkboxgroup' && this.options !== undefined) {
      const formArray = (this.attributesArray.controls[0].get('attributes') as FormArray);
      formArray.clear();
      this.options.forEach(option => {
        const group = this.attributeSerializer.convertToGroup(option.value);
        group.addControl('_store', new FormControl(false));
        formArray.push(group);
      });
    }
  }

}
