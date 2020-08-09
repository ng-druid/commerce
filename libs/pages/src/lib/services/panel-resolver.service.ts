import { Injectable, Inject } from '@angular/core';
import * as uuid from 'uuid';
import { CONTENT_PLUGIN, ContentPlugin, ContentBinding } from '@classifieds-ui/content';
import { Pane } from '../models/page.models';
import { PanelContentHandler } from '../handlers/panel-content.handler';
import { switchMap, map, take, reduce } from 'rxjs/operators';
import { of, forkJoin, Observable, iif } from 'rxjs';
import { InlineContext } from '../models/context.models';
import { RulesResolverService } from './rules-resolver.service';
import { InlineContextResolverService } from '../services/inline-context-resolver.service';

@Injectable()
export class PanelResolverService {

  contentPlugins: Array<ContentPlugin> = [];

  constructor(
    @Inject(CONTENT_PLUGIN) contentPlugins: Array<ContentPlugin>,
    private panelHandler: PanelContentHandler,
    private rulesResolver: RulesResolverService,
    private inlineContextResolver: InlineContextResolverService
  ) {
    this.contentPlugins = contentPlugins;
  }

  usedContexts(panes: Array<Pane>): Observable<Array<string>> {
    return forkJoin(
      panes.reduce<Array<Observable<Array<string>>>>((p, c) => {
        const plugin = this.contentPlugins.find(cp => cp.name === c.contentPlugin);
        if(plugin.handler !== undefined) {
          return [ ...p, plugin.handler.getBindings(c.settings, 'context').pipe(
            map(cb => cb.map(b => b.id))
          ) ];
        } else {
          return [ ...p ];
        }
      }, [])
    ).pipe(
      map(v => v.reduce<Array<string>>((p, c) => ([ ...p, ...c ]), []))
    );
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
            return [ ...p , of([ new Pane({ ...c, contexts: [ ...contexts, ...(c.contexts ? c.contexts: []) ] }) ]).pipe(
              switchMap(panes => iif(
                () => panes[0].rule !== undefined && panes[0].rule !== null && panes[0].rule.condition !== '',
                this.rulesResolver.evaluate(panes[0].rule, [ ...contexts, ...(c.contexts ? c.contexts: []) ]).pipe(
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
        switchMap(paneGroups => forkJoin([
          ...paneGroups.reduce<Array<Observable<any>>>((p, c) => [ ...p, ...c.map(pa => (pa.contexts && pa.contexts.length !== 0 ? this.inlineContextResolver.resolveAll(pa.contexts).pipe(take(1)) : of({}).pipe(take(1))))], [])
        ]).pipe(
          map(pc => [paneGroups, pc.map(c => ({ ...c, ...resolvedContext }))])
        )),
        map<[Array<Array<Pane>>, Array<any>],[Array<Pane>, Array<number>, Array<any>]>(([paneGroups, resolvedContexts]) => {
          let resolvedPanes = [];
          let originMappings = [];
          paneGroups.forEach((panes, index) => {
            resolvedPanes = [ ...(resolvedPanes === undefined ? [] : resolvedPanes), ...panes ];
            originMappings = [ ...(originMappings ? [] : originMappings), ...panes.map(() => index)];
          });
          return [resolvedPanes, originMappings, resolvedContexts];
        })
      ))
    );
  }
}
