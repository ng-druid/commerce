import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { map, filter, distinctUntilChanged, switchMap, withLatestFrom, tap, take } from 'rxjs/operators';
import { PageBuilderFacade } from '../../features/page-builder/page-builder.facade';
import { PanelPageStateSlice, PanelPage } from '../../models/page.models';

@Component({
  selector: 'classifieds-ui-panel-page-router',
  templateUrl: './panel-page-router.component.html',
  styleUrls: ['./panel-page-router.component.scss']
})
export class PanelPageRouterComponent implements OnInit {

  panelPageId: string;

  private panelPageService: EntityCollectionService<PanelPage>;

  constructor(
    private route: ActivatedRoute,
    private pageBuilderFacade: PageBuilderFacade,
    private routerStore: Store<RouterReducerState>,
    es: EntityServices
  ) {
    this.panelPageService = es.getEntityCollectionService('PanelPage');
  }

  ngOnInit(): void {
    const { selectCurrentRoute } = getSelectors((state: any) => state.router);
    this.route.paramMap.pipe(
      map(p => p.get('panelPageId')),
      filter(id => id !== undefined),
      distinctUntilChanged(),
      switchMap(id => this.panelPageService.getByKey(id)),
      withLatestFrom(this.routerStore.pipe(
        select(selectCurrentRoute),
        tap(r => console.log(r)),
        map(route => route.params),
        take(1)
      ))
    ).subscribe(([panelPage, args]) => {
      const realPath = '/pages/panelpage/' + panelPage.id;
      this.pageBuilderFacade.setPageInfo(new PanelPageStateSlice({ id: panelPage.id, realPath, path: panelPage.path, args }));
      this.panelPageId = panelPage.id;
    });
    this.route.data.subscribe(v => {
      console.log(v);
    });
  }

}
