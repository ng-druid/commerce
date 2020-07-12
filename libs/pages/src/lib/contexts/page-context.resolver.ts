import { Injectable } from '@angular/core';
import { ContextResolver } from '@classifieds-ui/context';
import { Observable } from 'rxjs';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { Store, select } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

@Injectable()
export class PageContextResolver implements ContextResolver {

  constructor(private routerStore: Store<RouterReducerState>) { }

  resolve(): Observable<any> {
    const { selectCurrentRoute } = getSelectors((state: any) => state.router);
    return this.routerStore.pipe(
      select(selectCurrentRoute),
      map(route => {
        const obj = {
          path: `<route>`
        };
        return obj;
      }),
      take(1)
    );
  }
}
