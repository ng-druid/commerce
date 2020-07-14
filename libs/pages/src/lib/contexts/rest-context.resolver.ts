import { Injectable } from '@angular/core';
import { ContextResolver, ContextPlugin } from '@classifieds-ui/context';
import { InlineContext } from '../models/context.models';
import { PageBuilderPartialState } from '../features/page-builder/page-builder.reducer';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UrlGeneratorService } from '../services/url-generator.service';
import { Rest } from '../models/datasource.models';
import { selectDataset } from '../features/page-builder/page-builder.selectors';
import { PageBuilderFacade } from '../features/page-builder/page-builder.facade';
import * as uuid from 'uuid';

@Injectable()
export class RestContextResolver implements ContextResolver {

  constructor(
    private pageBuilderFacade: PageBuilderFacade,
    private store: Store<PageBuilderPartialState>,
    private urlGeneratorService: UrlGeneratorService
  ) { }

  resolve(context: ContextPlugin, data?: any): Observable<any> {
    const rest = new Rest(data);
    const subject = new Subject();
    const metadata = new Map<string, any>([ [ 'tag', uuid.v4() ] ]);
    this.urlGeneratorService.generateUrl(rest.url, rest.params, metadata).subscribe(url => {
      this.pageBuilderFacade.loadRestData(`${metadata.get('tag')}`, new Rest({ ...rest, url }));
      this.store.pipe(
        select(selectDataset(`${metadata.get('tag')}`)),
        filter(dataset => dataset !== undefined),
      ).subscribe(dataset => {
        subject.next(dataset.results);
        subject.complete();
      });
    });
    return subject;
  }

}
