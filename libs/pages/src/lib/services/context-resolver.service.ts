import { Injectable } from '@angular/core';
import { ContextManagerService } from '@classifieds-ui/context';
import { InlineContext } from '../models/context.models';
import { PageBuilderPartialState } from '../features/page-builder/page-builder.reducer';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, iif, of } from 'rxjs';
import { filter, map, tap, switchMap, take } from 'rxjs/operators';
import { UrlGeneratorService } from './url-generator.service';
import { Rest } from '../models/datasource.models';
import { selectDataset } from '../features/page-builder/page-builder.selectors';
import { PageBuilderFacade } from '../features/page-builder/page-builder.facade';
import { TokenizerService } from '@classifieds-ui/token';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ContextResolverService {

  constructor(
    private pageBuilderFacade: PageBuilderFacade,
    private contextManager: ContextManagerService,
    private store: Store<PageBuilderPartialState>,
    private tokenizerService: TokenizerService
  ) { }

  resolve(context: InlineContext, metadata: Map<string, any>, urlGen: UrlGeneratorService): Observable<any> {
    switch(context.adaptor) {
      case 'rest':
        return this.resolveRest(context.rest, metadata, urlGen).pipe(
          tap(v => console.log(v)),
          switchMap(d => iif(
            () => metadata.has('_field'),
            of(d).pipe(
              map(d => this.tokenizerService.generateGenericTokens(d.results[0])),
              map(tokens => this.tokenizerService.replaceTokens(`[${metadata.get('_field')}]`, tokens)),
              take(1)
            ),
            of(d.results[0]).pipe(
              take(1)
            )
          ))
        );
      default:
        return this.contextManager.matchAdaptor(context.adaptor)[0].resolver.resolve();
    }
  }

  resolveRest(rest: Rest, metadata: Map<string, any>, urlGen: UrlGeneratorService): Observable<any> {
    const subject = new Subject();
    const meta = new Map<string, any>([ ...metadata, [ 'tag', uuid.v4() ] ]);
    urlGen.generateUrl(rest.url, rest.params, metadata).subscribe(url => {
      this.pageBuilderFacade.loadRestData(`${meta.get('tag')}`, new Rest({ ...rest, url }));
      this.store.pipe(
        select(selectDataset(`${meta.get('tag')}`)),
        filter(dataset => dataset !== undefined),
      ).subscribe(dataset => {
        subject.next(dataset);
        subject.complete();
      });
    });
    return subject;
  }

}
