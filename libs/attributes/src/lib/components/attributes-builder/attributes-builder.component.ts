
import { Component, OnChanges, Input, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup,FormControl, Validator, Validators, AbstractControl, ValidationErrors, FormArray } from "@angular/forms";
import { Attribute, AttributeWidget } from '../../models/attributes.models';
import { WidgetsService } from '../../services/widgets.service';

@Component({
  selector: 'classifieds-ui-attributes-builder',
  templateUrl: './attributes-builder.component.html',
  styleUrls: ['./attributes-builder.component.scss'],
  providers: [
    WidgetsService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttributesBuilderComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AttributesBuilderComponent),
      multi: true
    },
  ]
})
export class AttributesBuilderComponent implements OnChanges, ControlValueAccessor, Validator {

  @Input()
  attributes: Array<Attribute> = [];

  attributesForm = new FormGroup({
    attributes: new FormArray([])
  });

  get attributesArray(): FormArray {
    return this.attributesForm.get('attributes') as FormArray;
  }

  constructor(private widgetsService: WidgetsService) { }

  public onTouched: () => void = () => {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes.attributes.previousValue !== changes.attributes.currentValue) {
      while (this.attributesArray.length !== 0) {
        this.attributesArray.removeAt(0);
      }
      this.attributes.forEach(attr => {
        this.attributesArray.push(new FormGroup({
          name: new FormControl(attr.name, Validators.required),
          type: new FormControl(attr.type, Validators.required),
          displayName: new FormControl(attr.label, Validators.required),
          value: new FormControl('')
        }));
      });
    }
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
    return this.attributesForm.valid ? null : { invalidForm: {valid: false, message: "attributes are invalid"}};
  }

  discoverWidget(widget: string): AttributeWidget {
    return this.widgetsService.get(widget);
  }

}
