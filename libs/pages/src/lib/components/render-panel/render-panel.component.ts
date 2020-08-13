import { Component, OnInit, Input, ComponentFactoryResolver, Inject, ViewChild, OnChanges, SimpleChanges, ElementRef, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder, Validator, AbstractControl, ValidationErrors, FormArray } from "@angular/forms";
import { Panel } from '../../models/page.models';
import { CONTENT_PLUGIN, ContentPlugin } from '@classifieds-ui/content';
import { STYLE_PLUGIN, StylePlugin } from '@classifieds-ui/style';
import { PaneContentHostDirective } from '../../directives/pane-content-host.directive';
import { Pane } from '../../models/page.models';
import { switchMap, map, filter, debounceTime, tap } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { InlineContext } from '../../models/context.models';
import { PanelResolverService } from '../../services/panel-resolver.service';

@Component({
  selector: 'classifieds-ui-render-panel',
  templateUrl: './render-panel.component.html',
  styleUrls: ['./render-panel.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RenderPanelComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RenderPanelComponent),
      multi: true
    },
  ]
})
export class RenderPanelComponent implements OnInit, OnChanges, ControlValueAccessor, Validator  {

  static COUNTER = 0;

  @Input()
  panel: Panel;

  @Input()
  contexts: Array<InlineContext>;

  @Input()
  nested = false;

  @Input()
  displayType: string;

  @Input()
  resolvedContext = {};

  @Input()
  contextChanged: string;

  @Output()
  heightChange = new EventEmitter<number>();

  panelForm = this.fb.group({
    panes: this.fb.array([])
  });

  panes: Array<Pane>;

  scheduleRender = new Subject<[Array<Pane>, Array<InlineContext>, any]>();
  scheduleRenderSub = this.scheduleRender.pipe(
    switchMap(([panes, contexts, resolvedContext]) => this.panelResolverService.resolvePanes(panes, contexts, resolvedContext))
  ).subscribe(([resolvedPanes, originMappings, resolvedContexts]) => {
    console.log(`render panel: ${this.panel.name}`);
    this.resolvedPanes = resolvedPanes;
    this.originMappings = originMappings;
    this.resolvedContexts = resolvedContexts;
    if(this.paneContainer && this.stylePlugin === undefined) {
      setTimeout(() => this.heightChange.emit(this.paneContainer.nativeElement.offsetHeight));
    }
    this.populatePanesFormArray();
    if(this.stylePlugin !== undefined) {
      this.renderPanelContent();
    }
  });

  schduleContextChangeSub: Subscription;
  schduleContextChange = new Subject<string>();

  resolvedPanes: Array<Pane>;
  originMappings: Array<number> = [];
  resolvedContexts: Array<any> = [];

  resolveContextsSub: Subscription;

  stylePlugins: Array<StylePlugin> = [];
  stylePlugin: StylePlugin;

  contentPlugins: Array<ContentPlugin> = [];

  public onTouched: () => void = () => {};

  private counter: number;

  @ViewChild(PaneContentHostDirective, { static: true }) panelHost: PaneContentHostDirective;
  @ViewChild('panes', { static: true }) paneContainer: ElementRef;

  get panesArray(): FormArray {
    return this.panelForm.get('panes') as FormArray;
  }

  constructor(
    @Inject(STYLE_PLUGIN) stylePlugins: Array<StylePlugin>,
    @Inject(CONTENT_PLUGIN) contentPlugins: Array<ContentPlugin>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private fb: FormBuilder,
    private panelResolverService: PanelResolverService
  ) {
    this.counter = RenderPanelComponent.COUNTER++;
    this.stylePlugins = stylePlugins;
    this.contentPlugins = contentPlugins;
  }

  ngOnInit(): void {
    this.stylePlugin = this.panel.stylePlugin !== undefined && this.panel.stylePlugin !== '' ? this.stylePlugins.find(p => p.name === this.panel.stylePlugin) : undefined;
    if(this.panel !== undefined && this.panelHost !== undefined) {
      console.log(`panel render init [${this.panel.name}`);
      this.panelResolverService.usedContexts(this.panel.panes).pipe(
        map(ctx => ctx.filter(c => c !== '_page' && c !== '_root' && c !== '.')),
        switchMap(ctx => this.schduleContextChange.pipe(
          map(contextChanged => [ctx, contextChanged])
        )),
        filter(([ctx, contextChanged]) => Array.isArray(ctx) && ctx.findIndex(c => c === contextChanged) !== -1),
        debounceTime(100)
      ).subscribe(([ctx, contextChanged]) => {
        console.log(`Context changed [${this.panel.name}]: ${contextChanged}`);
        console.log(`contexts detected [${this.panel.name}]: ${(ctx as Array<string>).join('.')}`);
        this.scheduleRender.next([this.panel.panes, this.contexts, this.resolvedContext]);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.stylePlugin = this.panel.stylePlugin !== undefined && this.panel.stylePlugin !== '' ? this.stylePlugins.find(p => p.name === this.panel.stylePlugin) : undefined;
    if(changes.resolvedContext && changes.resolvedContext.previousValue === undefined) {
      this.scheduleRender.next([this.panel.panes, this.contexts, this.resolvedContext]);
    }
    if(changes.contextChanged && changes.contextChanged.currentValue !== undefined) {
      this.schduleContextChange.next(changes.contextChanged.currentValue);
    }
  }

  writeValue(val: any): void {
    if (val) {
      this.panelForm.setValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.panelForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.panelForm.disable()
    } else {
      this.panelForm.enable()
    }
  }

  validate(c: AbstractControl): ValidationErrors | null{
    return this.panelForm.valid ? null : { invalidForm: {valid: false, message: "panel are invalid"}};
  }

  populatePanesFormArray() {
    this.panesArray.clear();
    this.resolvedPanes.forEach((p, i) => {
      this.panesArray.push(this.fb.control(''));
    });
  }

  renderPanelContent() {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.stylePlugin.renderComponent);

    const viewContainerRef = this.panelHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).settings = this.panel.settings;
    (componentRef.instance as any).panes = this.resolvedPanes;
    (componentRef.instance as any).originPanes = this.panel.panes;
    (componentRef.instance as any).originMappings = this.originMappings;
    (componentRef.instance as any).contexts = this.contexts.map(c => new InlineContext(c));
    (componentRef.instance as any).displayType = this.displayType;
  }

}
