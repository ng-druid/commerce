import { Component, OnInit, OnChanges, SimpleChanges, Input, Inject, ViewChild, ComponentFactoryResolver, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder, FormGroup,FormControl, Validator, Validators, AbstractControl, ValidationErrors, FormArray } from "@angular/forms";
import { AttributeValue } from '@classifieds-ui/attributes';
import { ContentPlugin, CONTENT_PLUGIN } from '@classifieds-ui/content';
import { PaneContentHostDirective } from '../../directives/pane-content-host.directive';
import { PanelContentHandler } from '../../handlers/panel-content.handler';
import { PanelPage, Pane } from '../../models/page.models';
import { InlineContext } from '../../models/context.models';

@Component({
  selector: 'classifieds-ui-render-pane',
  templateUrl: './render-pane.component.html',
  styleUrls: ['./render-pane.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RenderPaneComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RenderPaneComponent),
      multi: true
    },
  ]
})
export class RenderPaneComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

  @Input()
  pluginName: string;

  @Input()
  settings: Array<AttributeValue> = [];

  @Input()
  linkedPageId: string;

  @Input()
  contexts: Array<InlineContext>;

  @Input()
  originPane: Pane;

  @Input()
  displayType: string;

  @Input()
  name: string;

  @Input()
  label: string;

  contentPlugin: ContentPlugin;

  panelPage: PanelPage;

  paneForm = this.fb.group({
    contentPlugin: this.fb.control('', Validators.required),
    name: this.fb.control(''),
    label: this.fb.control(''),
    settings: this.fb.control('')
  });

  public onTouched: () => void = () => {};

  private contentPlugins: Array<ContentPlugin> = [];

  @ViewChild(PaneContentHostDirective, { static: true }) contentPaneHost: PaneContentHostDirective;

  constructor(
    @Inject(CONTENT_PLUGIN) contentPlugins: Array<ContentPlugin>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private panelHandler: PanelContentHandler,
    private fb: FormBuilder
  ) {
    this.contentPlugins = contentPlugins;
  }

  ngOnInit(): void {
    console.log('Render Pane: OnInit');
    this.contentPlugin = this.contentPlugins.find(p => p.name === this.pluginName);
    this.paneForm.get('contentPlugin').setValue(this.contentPlugin.name);
    this.paneForm.get('name').setValue(this.name);
    this.paneForm.get('label').setValue(this.label);
    if(this.pluginName === 'panel') {
      this.resolveNestedPanelPage();
    } else  {
      this.renderPaneContent();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Render Pane: OnChanges');
    this.contentPlugin = this.contentPlugins.find(p => p.name === this.pluginName);
    this.paneForm.get('contentPlugin').setValue(this.contentPlugin.name);
    this.paneForm.get('name').setValue(this.name);
    this.paneForm.get('label').setValue(this.label);
    if(this.pluginName === 'panel') {
      this.resolveNestedPanelPage();
    } else {
      this.renderPaneContent();
    }
  }

  writeValue(val: any): void {
    if (val) {
      this.paneForm.setValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.paneForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.paneForm.disable()
    } else {
      this.paneForm.enable()
    }
  }

  validate(c: AbstractControl): ValidationErrors | null{
    return this.paneForm.valid ? null : { invalidForm: {valid: false, message: "pane is invalid"}};
  }

  resolveNestedPanelPage() {
    this.panelHandler.toObject(this.settings).subscribe(p => {
      this.panelPage = p;
    });
  }

  renderPaneContent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.contentPlugin.renderComponent);

    const viewContainerRef = this.contentPaneHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).settings = this.settings;
    (componentRef.instance as any).name = this.name;
    (componentRef.instance as any).label = this.label;
    (componentRef.instance as any).contexts = this.contexts.map(c => new InlineContext(c));
    (componentRef.instance as any).displayType = this.displayType;
  }

}
