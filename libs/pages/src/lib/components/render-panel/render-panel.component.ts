import { Component, OnInit, Input, ComponentFactoryResolver, Inject, ViewChild, OnChanges, SimpleChanges, ElementRef, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder, FormGroup,FormControl, Validator, Validators, AbstractControl, ValidationErrors, FormArray } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Panel } from '../../models/page.models';
import * as uuid from 'uuid';
import { AttributeValue } from '@classifieds-ui/attributes';
import { ContextManagerService } from '@classifieds-ui/context';
import { CONTENT_PLUGIN, ContentPlugin } from '@classifieds-ui/content';
import { STYLE_PLUGIN, StylePlugin } from '@classifieds-ui/style';
import { PaneContentHostDirective } from '../../directives/pane-content-host.directive';
import { Pane } from '../../models/page.models';
import { PanelContentHandler } from '../../handlers/panel-content.handler';
import { switchMap, map, tap, take, filter, distinctUntilChanged } from 'rxjs/operators';
import { of, forkJoin, Observable, iif } from 'rxjs';
import { InlineContext } from '../../models/context.models';
import { RuleSet } from 'angular2-query-builder';
import { RulesResolverService } from '../../services/rules-resolver.service';
import { RulesParserService } from '../../services/rules-parser.service';

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

  @Output()
  heightChange = new EventEmitter<number>();

  panelForm = this.fb.group({
    panes: this.fb.array([])
  });

  panes: Array<Pane>;

  resolvedPanes: Array<Pane>;
  originMappings: Array<number> = [];

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
    private panelHandler: PanelContentHandler,
    private fb: FormBuilder,
    private rulesResolver: RulesResolverService,
    private rulesParser: RulesParserService,
    private contextManager: ContextManagerService,
    private route: ActivatedRoute
  ) {
    this.counter = RenderPanelComponent.COUNTER++;
    this.stylePlugins = stylePlugins;
    this.contentPlugins = contentPlugins;
  }

  ngOnInit(): void {
    this.stylePlugin = this.panel.stylePlugin !== undefined && this.panel.stylePlugin !== '' ? this.stylePlugins.find(p => p.name === this.panel.stylePlugin) : undefined;
    if(this.panel !== undefined && this.panelHost !== undefined) {
      this.resolvePanes();
      this.handlePanelRefresh();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.stylePlugin = this.panel.stylePlugin !== undefined && this.panel.stylePlugin !== '' ? this.stylePlugins.find(p => p.name === this.panel.stylePlugin) : undefined;
    if(this.panel !== undefined && this.panelHost !== undefined) {
      this.resolvePanes();
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

  resolvePanes() {

    const globalContexts = this.contextManager.getAll().map(c => new InlineContext({ name: c.name, adaptor: 'data', data: c.baseObject  }));

    const staticPanes = this.panel.panes.reduce<Array<Pane>>((p, c) => {
      const plugin = this.contentPlugins.find(cp => cp.name === c.contentPlugin);
      if(plugin.handler === undefined || !plugin.handler.isDynamic(c.settings)) {
        return [ ...p, c ];
      } else {
        return [ ...p ];
      }
    }, []);

    forkJoin(this.panel.panes.reduce<Array<Observable<Array<string>>>>((p, c) => {
      const plugin = this.contentPlugins.find(cp => cp.name === c.contentPlugin);
      if(plugin.handler !== undefined) {
        return [ ...p, plugin.handler.getBindings(c.settings).pipe(
          map(c => c.map(c => c.id))
        ) ];
      } else {
        return [ ...p, of([])];
      }
    }, [])).pipe(
      map(groups => groups.reduce<Array<string>>((p, c) => [ ...p, ...c ], [])),
      switchMap(bindings => forkJoin(
        this.panel.panes.reduce<Array<Observable<Array<Pane>>>>((p, c) => {
          const plugin = this.contentPlugins.find(cp => cp.name === c.contentPlugin);
          if(plugin.handler !== undefined && plugin.handler.isDynamic(c.settings)) {
            return [ ...p, plugin.handler.buildDynamicItems(c.settings, new Map<string, any>([ ...(c.metadata === undefined ? [] : c.metadata),['tag', uuid.v4()], ['panes', staticPanes], ['contexts', this.contexts !== undefined ? this.contexts: [] ] ])).pipe(
              map(items => this.panelHandler.fromPanes(items)),
              map<Array<Pane>, Array<Pane>>(panes => this.panelHandler.wrapPanel(panes).panes),
              take(1)
            )];
          } else if(c.name === '' || bindings.findIndex(n => n === c.name) === -1) {
            return [ ...p , of([ new Pane({ ...c, contexts: this.mergeContexts(c.contexts) }) ]).pipe(
              switchMap(panes => iif(
                () => panes[0].rule !== undefined && panes[0].rule !== null && panes[0].rule.condition !== '',
                this.rulesResolver.evaluate(panes[0].rule, [ ...globalContexts, ...(panes[0].contexts !== undefined ? panes[0].contexts : []) ]).pipe(
                  map(res => res ? panes: [])
                ),
                of(panes)
              ))
            ) ];
          } else {
            return [ ...p ];
          }
        }, [])
      ).pipe(
        tap(paneGroups => {
          this.resolvedPanes = [];
          this.originMappings = [];
          paneGroups.forEach((panes, index) => {
            this.resolvedPanes = [ ...(this.resolvedPanes === undefined ? [] : this.resolvedPanes), ...panes ];
            this.originMappings = [ ...(this.originMappings ? [] : this.originMappings), ...panes.map(() => index)];
            if(this.paneContainer && this.stylePlugin === undefined) {
              setTimeout(() => this.heightChange.emit(this.paneContainer.nativeElement.offsetHeight));
            }
          });
          this.populatePanesFormArray();
        }),
        filter(() => this.stylePlugin !== undefined)
      ))
    ).subscribe(() => {
      this.renderPanelContent();
    })
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

  handlePanelRefresh() {

    const facts = new Map<string, Array<string>>();

    this.panel.panes.forEach(p => {
      if(p.rule !== undefined && p.rule !== null && p.rule.condition !== '') {
        this.rulesParser.extractConditions(p.rule).forEach(c => {
          if((c as any).fact === '_route') {
            facts.set(
              (c as any).fact,
              [ ...(facts.has((c as any).fact) ? facts.get((c as any).fact) : []), (c as any).path.substr(2) ]
            );
          }
        });
      }
    });

    if(facts.has('_route')) {
      this.route.paramMap.pipe(
        //map(p => facts.get('_route').findIndex(r => r === p)),
        distinctUntilChanged()
      ).subscribe(() => {
        console.log('resolve panes');
        this.resolvePanes();
      });
    }

  }

  mergeContexts(contexts: Array<InlineContext>): Array<InlineContext> {
    return [ ...( this.contexts !== undefined ? this.contexts.map(c => new InlineContext(c)) : [] ), ...( contexts !== undefined ? contexts.map(c => new InlineContext(c)) : [] ) ];
  }

}
