import { Component, OnInit, Input } from '@angular/core';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { Page } from '../../models/page.models';
import { PageBuilderFacade } from '../../features/page-builder/page-builder.facade';
import { Observable } from 'rxjs';
import { ContentInstance } from '@classifieds-ui/content';

@Component({
  selector: 'classifieds-ui-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.scss']
})
export class PageSelectorComponent implements OnInit {

  pages$: Observable<Array<Page>>;

  private pagesService: EntityCollectionService<Page>;

  constructor(es: EntityServices, private pageBuilderFacade: PageBuilderFacade) {
    this.pagesService = es.getEntityCollectionService('Page');
  }

  ngOnInit(): void {
    this.pages$ = this.pagesService.getWithQuery({ site: "main" });
  }

  onItemSelect(page: Page) {
    this.pageBuilderFacade.addContentInstance(new ContentInstance({ providerName: 'page' }));
  }

}
