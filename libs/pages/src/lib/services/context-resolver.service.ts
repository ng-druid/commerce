import { Injectable } from '@angular/core';
import { ContextManagerService } from '@classifieds-ui/context';
import { InlineContext } from '../models/context.models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextResolverService {

  constructor(private contextManager: ContextManagerService) { }

  resolve(context: InlineContext): Observable<any> {
    switch(context.adaptor) {
      case 'rest':
        return this.resolveRest(context);
      default:
        return this.contextManager.matchAdaptor(context.adaptor)[0].resolver.resolve();
    }
  }

  resolveRest(context: InlineContext): Observable<any> {
    return of('rest');
  }

}
