import { Component, OnInit } from '@angular/core';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { FilesService, MediaFile } from '@classifieds-ui/media';
import { Page } from '../../models/page.models';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'classifieds-ui-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  pagesService: EntityCollectionService<Page>;

  constructor(private filesService: FilesService, private es: EntityServices) {
    this.pagesService = es.getEntityCollectionService('Page');
  }

  ngOnInit(): void {
  }

  onSubmitted(page: Page) {
    const file = new File([page.body], 'content', { type: 'text/markdown' })
    this.filesService.bulkUpload([file]).pipe(
      map(m => new Page({ ...page, body: m[0].path})),
      switchMap(p => this.pagesService.add(p))
    ).subscribe(() => {
      alert("Saved page");
    });
  }

}
