import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, forwardRef, SkipSelf } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup,FormControl, Validator, Validators, AbstractControl, ValidationErrors, ControlContainer } from "@angular/forms";
import { AttributeWidget, Attribute } from '../../models/attributes.models';
import { AttributeWidgetDirective } from '../../directives/attribute-widget.directive';

@Component({
  selector: 'classifieds-ui-attribute-widget',
  styleUrls: ['./attribute-widget.component.scss'],
  template: `<ng-container [formGroup]="controlContainer.control"><ng-template classifiedsUiWidgetHost></ng-template></ng-container>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttributeWidgetComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AttributeWidgetComponent),
      multi: true
    },
  ]
})
export class AttributeWidgetComponent implements OnInit, ControlValueAccessor, Validator {

  @Input()
  widget: AttributeWidget;

  @Input()
  attribute: Attribute;

  @ViewChild(AttributeWidgetDirective, {static: true}) widgetHost: AttributeWidgetDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, public controlContainer: ControlContainer) { }

  public onTouched: () => void = () => {};

  ngOnInit() {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.widget.component);

    const viewContainerRef = this.widgetHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).attribute = this.attribute;
  }

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

  validate(c: AbstractControl): ValidationErrors | null {
    return this.controlContainer.control.valid ? null : { invalidForm: {valid: false, message: `${this.attribute.label} is invalid`}};
  }

}
