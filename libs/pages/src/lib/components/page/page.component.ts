import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EntityServices, EntityCollectionService, DefaultDataServiceConfig } from '@ngrx/data';
import { Page } from '../../models/page.models';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'classifieds-ui-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnChanges {

  @Input()
  path: string;

  content: string;

  private pagesService: EntityCollectionService<Page>;

  constructor(
    private dataServiceConfig: DefaultDataServiceConfig,
    private http: HttpClient,
    private markdownService: MarkdownService,
    es: EntityServices,
  ) {
    this.pagesService = es.getEntityCollectionService('Page');
  }

  ngOnInit(): void {
    this.renderPage();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.renderPage();
  }

  renderPage() {
    this.pagesService.getWithQuery({ site: 'main', path: this.path }).pipe(
      map(pages => pages.find(p => p.path === this.path)),
      switchMap(p => this.http.get(`${this.dataServiceConfig.root}/${p.body}`, { responseType: 'text' })),
      map(c => this.markdownService.compile(c))
    ).subscribe(c => {
      this.content = c;
    });
  }

}
