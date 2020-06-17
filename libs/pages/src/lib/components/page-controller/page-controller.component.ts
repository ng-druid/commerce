import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityServices, EntityCollectionService, DefaultDataServiceConfig } from '@ngrx/data';
import { Page } from '../../models/page.models';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'classifieds-ui-page-controller',
  templateUrl: './page-controller.component.html',
  styleUrls: ['./page-controller.component.scss']
})
export class PageControllerComponent implements OnInit {

  content: string;

  private pagesService: EntityCollectionService<Page>;

  constructor(
    private router: Router,
    private dataServiceConfig: DefaultDataServiceConfig,
    private http: HttpClient,
    private markdownService: MarkdownService,
    es: EntityServices,
  ) {
    this.pagesService = es.getEntityCollectionService('Page');
  }

  ngOnInit(): void {
    const path = this.router.url.substr(6);
    console.log(path);
    this.pagesService.getWithQuery({ site: 'main', path }).pipe(
      map(pages => pages.find(p => p.path === path)),
      switchMap(p => this.http.get(`${this.dataServiceConfig.root}/${p.body}`, { responseType: 'text' })),
      map(c => this.markdownService.compile(c))
    ).subscribe(c => {
      console.log(c);
      this.content = c;
    });
  }

}
