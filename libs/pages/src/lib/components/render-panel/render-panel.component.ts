import { Component, OnInit, Input, ComponentFactoryResolver, Inject, ViewChild, OnChanges, SimpleChanges, ElementRef, Output, EventEmitter, forwardRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder, FormGroup,FormControl, Validator, Validators, AbstractControl, ValidationErrors, FormArray } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Panel } from '../../models/page.models';
import * as uuid from 'uuid';
import { CONTENT_PLUGIN, ContentPlugin } from '@classifieds-ui/content';
import { STYLE_PLUGIN, StylePlugin } from '@classifieds-ui/style';
import { ContentBinding } from '@classifieds-ui/content';
import { PaneContentHostDirective } from '../../directives/pane-content-host.directive';
import { Pane } from '../../models/page.models';
import { PanelContentHandler } from '../../handlers/panel-content.handler';
import { switchMap, map, tap, take, filter, distinctUntilChanged, mergeAll, skip, debounceTime, bufferTime } from 'rxjs/operators';
import { of, forkJoin, Observable, iif, Subscription, Subject, merge } from 'rxjs';
import { InlineContext } from '../../models/context.models';
import { RulesResolverService } from '../../services/rules-resolver.service';
import { RulesParserService } from '../../services/rules-parser.service';
import { InlineContextResolverService } from '../../services/inline-context-resolver.service';
import { PanelResolverService } from '../../services/panel-resolver.service';
//import { RendereredPaneDirective } from '../../directives/rendered-pane.directive';
//import { RenderPaneComponent } from '../render-pane/render-pane.component';

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
    /*switchMap(([panes, contexts, resolvedContext, contextChanged]) => this.panelResolverService.usedContexts(panes).pipe(
      map(ctx => ctx.filter(c => c !== '_page' && c !== '_root' && c !== '.')),
      map(ctx => [panes, contexts, resolvedContext, (!contextChanged || ctx.findIndex(c => c === contextChanged) !== -1)])
    )),
    switchMap(([panes, contexts, resolvedContext, rerender]) => iif(
      () => rerender,
      this.panelResolverService.resolvePanes(panes, contexts, resolvedContext).pipe(
        map(([resolvedPanes, originMappings, resolvedContexts]) => [resolvedPanes, originMappings, resolvedContexts, rerender]),
      ),
      of([panes, contexts, resolvedContext, rerender])
    ))*/
    //debounceTime(100),
    switchMap(([panes, contexts, resolvedContext]) => this.panelResolverService.resolvePanes(panes, contexts, resolvedContext))
  ).subscribe(([resolvedPanes, originMappings, resolvedContexts]) => {
    //if(rerender) {
      console.log('render panel');
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
    //}
  });

  schduleContextChangeSub: Subscription;
  schduleContextChange = new Subject<string>();
  /*schduleContextChangeSub = this.schduleContextChange.pipe(
    debounceTime(250),
    tap(c => console.log(c)),
    switchMap(() => this.panelResolverService.usedContexts(this.panel.panes)),
    map(ctx => ctx.filter(c => c !== '_page' && c !== '_root' && c !== '.')),
    filter(ctx => ctx.findIndex(c => c === contextChanged) !== -1)
  ).subscribe(() => {
    //this.scheduleRender.next([this.panel.panes, this.contexts, this.resolvedContext]);
  });*/

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
  //@ViewChildren(RenderPaneComponent) renderedPanes: QueryList<RenderPaneComponent>;

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
    private inlineContextResolver: InlineContextResolverService,
    private route: ActivatedRoute,
    private panelResolverService: PanelResolverService
  ) {
    this.counter = RenderPanelComponent.COUNTER++;
    this.stylePlugins = stylePlugins;
    this.contentPlugins = contentPlugins;
  }

  ngOnInit(): void {
    // console.log('Render Panel: OnInit');
    this.stylePlugin = this.panel.stylePlugin !== undefined && this.panel.stylePlugin !== '' ? this.stylePlugins.find(p => p.name === this.panel.stylePlugin) : undefined;
    if(this.panel !== undefined && this.panelHost !== undefined) {
      //this.resolvePanes();
      /*if(!this.refreshSubscription$) {
        this.handlePanelRefresh();
      }*/
      this.panelResolverService.usedContexts(this.panel.panes).pipe(
        map(ctx => ctx.filter(c => c !== '_page' && c !== '_root' && c !== '.')),
        switchMap(ctx => this.schduleContextChange.pipe(
          map(contextChanged => [ctx, contextChanged])
        )),
        filter(([ctx, contextChanged]) => Array.isArray(ctx) && ctx.findIndex(c => c === contextChanged) !== -1),
        debounceTime(100)
      ).subscribe(() => {
        this.scheduleRender.next([this.panel.panes, this.contexts, this.resolvedContext]);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('Render Panel: OnChanges');
    this.stylePlugin = this.panel.stylePlugin !== undefined && this.panel.stylePlugin !== '' ? this.stylePlugins.find(p => p.name === this.panel.stylePlugin) : undefined;
    if(this.panel !== undefined && this.panelHost !== undefined) {
      //console.log('RESOLVE PANES');
      //this.resolvePanes();
      //console.log('resolve contexts');
      //this.resolveContexts$.next();
    }
    if(changes.resolvedContext, /*&& this.resolvedContexts.*/ changes.resolvedContext.previousValue === undefined) {
      /*console.log('trigger change');
      console.log(changes);
      this.resolvedContexts = this.resolvedContexts.map(c => ({ ...c, ...changes.resolvedContext.currentValue }));*/
      //console.log(`RESOLVE PANES - ${this.contextChanged}`);
      //this.resolvePanes();
      //console.log(changes.contextChanged ? changes.contextChanged.currentValue : this.contextChanged);
      this.scheduleRender.next([this.panel.panes, this.contexts, this.resolvedContext /*, changes.contextChanged && (changes.contextChanged.currentValue ? changes.contextChanged.currentValue : this.contextChanged)*/]);
    }
    if(changes.contextChanged && changes.contextChanged.currentValue !== undefined) {
      //console.log(`context change detected: ${this.contextChanged}`);
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

  resolvePanes(panes: Array<Pane>, contexts: Array<InlineContext>, resolvedContext: any): Observable<[Array<Pane>, Array<number>, Array<any>]> {

    const staticPanes = panes.reduce<Array<Pane>>((p, c) => {
      const plugin = this.contentPlugins.find(cp => cp.name === c.contentPlugin);
      if(plugin.handler === undefined || !plugin.handler.isDynamic(c.settings)) {
        return [ ...p, c ];
      } else {
        return [ ...p ];
      }
    }, []);

    return forkJoin(panes.reduce<Array<Observable<Array<string>>>>((p, c) => {
      const plugin = this.contentPlugins.find(cp => cp.name === c.contentPlugin);
      if(plugin.handler !== undefined) {
        return [ ...p, plugin.handler.getBindings(c.settings, 'pane').pipe(
          map(c => c.map(c => c.id))
        ) ];
      } else {
        return [ ...p, of([])];
      }
    }, [])).pipe(
      map(groups => groups.reduce<Array<string>>((p, c) => [ ...p, ...c ], [])),
      switchMap(bindings => forkJoin(
        panes.reduce<Array<Observable<Array<Pane>>>>((p, c) => {
          const plugin = this.contentPlugins.find(cp => cp.name === c.contentPlugin);
          if(plugin.handler !== undefined && plugin.handler.isDynamic(c.settings)) {
            return [ ...p, plugin.handler.buildDynamicItems(c.settings, new Map<string, any>([ ...(c.metadata === undefined ? [] : c.metadata),['tag', uuid.v4()], ['panes', staticPanes], ['contexts', contexts !== undefined ? contexts: [] ] ])).pipe(
              map(items => this.panelHandler.fromPanes(items)),
              map<Array<Pane>, Array<Pane>>(panes => this.panelHandler.wrapPanel(panes).panes),
              take(1)
            )];
          } else if(c.name === '' || bindings.findIndex(n => n === c.name) === -1) {
            return [ ...p , of([ new Pane({ ...c/*, contexts: this.mergeContexts(c.contexts)*/ }) ]).pipe(
              switchMap(panes => iif(
                () => panes[0].rule !== undefined && panes[0].rule !== null && panes[0].rule.condition !== '',
                this.rulesResolver.evaluate(panes[0].rule, [ ...contexts /*...globalContexts, ...(panes[0].contexts !== undefined ? panes[0].contexts : [])*/ ]).pipe(
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
        // tap(paneGroups => console.log(paneGroups)),
        switchMap(paneGroups => forkJoin([
          ...paneGroups.reduce<Array<Observable<any>>>((p, c) => [ ...p, ...c.map(pa => (pa.contexts && pa.contexts.length !== 0 ? this.inlineContextResolver.resolveAll(pa.contexts).pipe(take(1)) : of({}).pipe(take(1))))], [])
        ]).pipe(
          // tap(pc => this.resolvedContexts = pc.map(c => ({ ...c, ...this.resolvedContext }))),
          map(pc => [paneGroups, pc.map(c => ({ ...c, ...resolvedContext }))])
        )),
        map<[Array<Array<Pane>>, Array<any>],[Array<Pane>, Array<number>, Array<any>]>(([paneGroups, resolvedContexts]) => {
          let resolvedPanes = [];
          let originMappings = [];
          paneGroups.forEach((panes, index) => {
            resolvedPanes = [ ...(resolvedPanes === undefined ? [] : resolvedPanes), ...panes ];
            originMappings = [ ...(originMappings ? [] : originMappings), ...panes.map(() => index)];
            //this.resolvedContexts = [ ...(this.resolvedContexts === undefined ? [] : this.resolvedContexts), ...panes.map(() => ({})) ];
            /*if(this.paneContainer && this.stylePlugin === undefined) {
              setTimeout(() => this.heightChange.emit(this.paneContainer.nativeElement.offsetHeight));
            }*/
          });
          return [resolvedPanes, originMappings, resolvedContexts];
        })
        /*tap(paneGroups => {
          this.resolvedPanes = [];
          this.originMappings = [];
          //this.resolvedContexts = [];
          paneGroups.forEach((panes, index) => {
            this.resolvedPanes = [ ...(this.resolvedPanes === undefined ? [] : this.resolvedPanes), ...panes ];
            this.originMappings = [ ...(this.originMappings ? [] : this.originMappings), ...panes.map(() => index)];
            //this.resolvedContexts = [ ...(this.resolvedContexts === undefined ? [] : this.resolvedContexts), ...panes.map(() => ({})) ];
            if(this.paneContainer && this.stylePlugin === undefined) {
              setTimeout(() => this.heightChange.emit(this.paneContainer.nativeElement.offsetHeight));
            }
          });
          this.populatePanesFormArray();
          //setTimeout(() => this.resolveContexts());
        }),*/
        //filter(() => this.stylePlugin !== undefined)
      ))
    ); /*.subscribe(() => {
      this.renderPanelContent();
    });*/
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

  /*handlePanelRefresh() {

    const facts = new Map<string, Array<string>>();

    if(this.refreshSubscription$) {
      this.refreshSubscription$.unsubscribe();
    }

    this.panel.panes.forEach(p => {
      if(p.rule !== undefined && p.rule !== null && p.rule.condition !== '') {
        this.rulesParser.extractConditions(p.rule).forEach(c => {
          if((c as any).fact === '_route' || (c as any).fact === '_page') {
            facts.set(
              (c as any).fact,
              [ ...(facts.has((c as any).fact) ? facts.get((c as any).fact) : []), (c as any).path.substr(2) ]
            );
          }
        });
      }
    });

    if(facts.has('_route') || facts.has('_page')) {
      this.refreshSubscription$ = this.route.paramMap.pipe(
        //map(p => facts.get('_route').findIndex(r => r === p)),
        distinctUntilChanged()
      ).subscribe(() => {
        this.resolvePanes();
      });
    }

  }*/

  resolveContexts() {

    if(this.resolveContextsSub !== undefined) {
      this.resolveContextsSub.unsubscribe();
    }

    const seen = [];
    let usedContexts = [];

    if(this.resolvedPanes.length > 0) {

      forkJoin([
        ...this.resolvedPanes.map((p, i) => this.inlineContextResolver.resolveAll(p.contexts))
      ]).subscribe(p => {
        this.resolvedContexts = p.map((c) => ({ ...c, ...this.resolvedContext }));
      });

      /*this.resolveContextsSub = merge(...this.resolvedPanes.map((p, i) => this.inlineContextResolver.resolveAll(p.contexts).pipe(
        map((res => [res, i])
      )))).pipe(
        //filter(([res, i]) => this.resolvedContexts[i] !== undefined)
      ).subscribe(([res, i]) => {
        console.log('after resolved context');
        console.log(this.resolvedContext);
        this.resolvedContexts[i] = { ...this.resolvedContext, ...res };
        seen.push(i);
        if(seen.length > this.resolvedPanes.length) {
          this.resolveContextsSub.unsubscribe();
          this.resolvePanes();
        } else if(seen.length === this.resolvedPanes.length) {
          setTimeout(() => forkJoin([
            ...this.renderedPanes.map(p => p.introspectContexts())
          ]).pipe(
            map(v => v.reduce<Array<string>>((c, p) => [...p, ...c], []))
          ).subscribe(v => {
            usedContexts = v;
          }));
        }
      });*/

    } else {

      this.resolveContextsSub = this.inlineContextResolver.resolveMerged(this.mergeContexts(this.contexts)).pipe(
        skip(1),
        take(1)
      ).subscribe(() => {
        this.resolveContextsSub.unsubscribe();
        //this.resolvePanes();
      });

    }

  }

  mergeContexts(contexts: Array<InlineContext>): Array<InlineContext> {
    return [ ...( this.contexts !== undefined ? this.contexts.map(c => new InlineContext(c)) : [] ), ...( contexts !== undefined ? contexts.map(c => new InlineContext(c)) : [] ) ];
  }

}
