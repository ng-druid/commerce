import { Component, OnInit } from '@angular/core';
import { VocabularyListItem, VocabularyListItemService } from '@classifieds-ui/taxonomy';
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

  constructor(private vocabularyListItemService: VocabularyListItemService) { }

  ngOnInit() {
    this.vocabularies$ = this.vocabularyListItemService.getAll();
    this.loading$ = this.vocabularyListItemService.loading$;
  }

}
