import { Component, OnInit, ViewChild, ComponentFactoryResolver, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder, Validator, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { ContextManagerService } from '../../services/context-manager.service';
import { ContextPlugin } from '../../models/context.models';
import { ContextEditorHostDirective } from '../../directives/context-editor-host.directive';

@Component({
  selector: 'classifieds-ui-context-form',
  templateUrl: './context-form.component.html',
  styleUrls: ['./context-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContextFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ContextFormComponent),
      multi: true
    },
  ]
})
export class ContextFormComponent implements OnInit, ControlValueAccessor, Validator {

  contextPlugins: Array<ContextPlugin>;

  contextForm = this.fb.group({
    name: this.fb.control('', Validators.required),
    plugin: this.fb.control('', Validators.required)
  });

  public onTouched: () => void = () => {};

  @ViewChild(ContextEditorHostDirective, { static: true }) editorHost: ContextEditorHostDirective;

  get contextPlugin(): ContextPlugin {
    return this.contextManager.lookupContext(this.contextForm.get('plugin').value);
  }

  constructor(
    private contextManager: ContextManagerService,
    private fb: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    this.contextPlugins = this.contextManager.getAll(false);
    this.contextForm.get('plugin').valueChanges.subscribe(v => {
      if(this.contextPlugin.editorComponent) {
        this.renderEditor();
      } else {
        this.editorHost.viewContainerRef.clear();
      }
    });
  }

  writeValue(val: any): void {
    if (val) {
      this.contextForm.setValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.contextForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.contextForm.disable()
    } else {
      this.contextForm.enable()
    }
  }

  validate(c: AbstractControl): ValidationErrors | null{
    return this.contextForm.valid ? null : { invalidForm: {valid: false, message: "context is invalid"}};
  }

  renderEditor() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.contextPlugin.editorComponent);

    const viewContainerRef = this.editorHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
  }

}
