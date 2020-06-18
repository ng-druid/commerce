import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EntityServices, EntityCollectionService, DefaultDataServiceConfig } from '@ngrx/data';
import { Page } from '../../models/page.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'classifieds-ui-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.scss']
})
export class PageSelectorComponent implements OnInit {

  @Output()
  selected = new EventEmitter<Page>()

  pages$: Observable<Array<Page>>;

  private pagesService: EntityCollectionService<Page>;

  constructor(es: EntityServices) {
    this.pagesService = es.getEntityCollectionService('Page');
  }

  ngOnInit(): void {
    this.pages$ = this.pagesService.getWithQuery({ site: "main" });
  }

  onItemSelect(page: Page) {
    console.log(page);
    this.selected.emit(page);
  }

}
