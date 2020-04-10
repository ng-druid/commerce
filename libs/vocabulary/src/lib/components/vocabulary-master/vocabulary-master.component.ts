import { Component, OnInit } from '@angular/core';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { VocabularyListItem } from '@classifieds-ui/taxonomy';
import { Observable } from 'rxjs';

@Component({
  selector: 'classifieds-ui-vocabulary-master',
  templateUrl: './vocabulary-master.component.html',
  styleUrls: ['./vocabulary-master.component.scss']
})
export class VocabularyMasterComponent implements OnInit {
  vocabularies$: Observable<Array<VocabularyListItem>>;
  loading$: Observable<boolean>;
  displayOverlay = false;
  private vocabularyListItemsService: EntityCollectionService<VocabularyListItem>;

  constructor(es: EntityServices) {
    this.vocabularyListItemsService = es.getEntityCollectionService('VocabularyListItem');
  }

  ngOnInit() {
    this.vocabularies$ = this.vocabularyListItemsService.getAll();
    this.loading$ = this.vocabularyListItemsService.loading$;
  }

}
