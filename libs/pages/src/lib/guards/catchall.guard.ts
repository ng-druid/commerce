import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { NEVER } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { PanelPageListItem } from '../models/page.models';

@Injectable()
export class CatchAllGuard implements CanActivate {

  panelPageListItemsService: EntityCollectionService<PanelPageListItem>;

  constructor(
    private router: Router,
    es: EntityServices
  ) {
    this.panelPageListItemsService = es.getEntityCollectionService('PanelPageListItem');
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(res => {
      const qs = 'path=' + state.url.substr(1).split('/').reduce<Array<string>>((p, c, i) => [ ...p, i === 0 ?  `/${c}`  :  `${p[i-1]}/${c}` ], []).join('&path=');
      this.panelPageListItemsService.getWithQuery(qs).pipe(
        catchError(e => {
          res(false);
          return NEVER;
        }),
        map(pages => pages.reduce<PanelPageListItem>((p, c) => p === undefined ? c : p.path.split('/').length < c.path.split('/').length ? c : p , undefined)),
        tap(panelPage => {
          const argPath = state.url.substr(1).split('/').slice(panelPage.path.split('/').length - 1).join('/');
          this.router.navigateByUrl(`/pages/panelpage/${panelPage.id}/${argPath}`, {skipLocationChange: true});
        })
      ).subscribe(success => {
        res(true);
      });
    });
  }
}
