import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { Store, select } from '@ngrx/store';
import { take, map, switchMap } from 'rxjs/operators';
import { PanelPageListItem } from '../../models/page.models';
import * as qs from 'qs';

@Component({
  selector: 'classifieds-ui-catch-all-router',
  templateUrl: './catch-all-router.component.html',
  styleUrls: ['./catch-all-router.component.scss']
})
export class CatchAllRouterComponent implements OnInit {

  panelPageListItemsService: EntityCollectionService<PanelPageListItem>;

  panelPageId: string;

  constructor(
    private routerStore: Store<RouterReducerState>,
    private router: Router,
    es: EntityServices
  ) {
    this.panelPageListItemsService = es.getEntityCollectionService('PanelPageListItem');
  }

  ngOnInit(): void {
    const { selectCurrentRoute } = getSelectors((state: any) => state.router);
    this.routerStore.pipe(
      select(selectCurrentRoute),
      map(route => [(route as ActivatedRouteSnapshot).url.reduce<Array<string>>((p, c) => [ ...p, `${p.join('/')}/${c.path}` ], []), route]),
      map(([paths, route])  => ['path=' + paths.join('&path='), route]),
      switchMap(([qs, route]) => this.panelPageListItemsService.getWithQuery(qs).pipe(
        map(pages => [pages.reduce<PanelPageListItem>((p, c) => p === undefined ? c : p.path.split('/').length < c.path.split('/').length ? c : p , undefined), route])
      )),
      take(1)
    ).subscribe(([panelPage, route]) => {
      console.log(route);
      const argPath = (route as ActivatedRouteSnapshot).url.map(s => s.path).slice(panelPage.path.split('/').length - 1).join('/');
      this.router.navigateByUrl(`/pages/panelpage/${panelPage.id}/${argPath}?${qs.stringify(route.queryParams)}`, {skipLocationChange: true, queryParams: { ...((route as ActivatedRouteSnapshot).queryParams) }, fragment: (route as ActivatedRouteSnapshot).fragment });
    });
  }

}
