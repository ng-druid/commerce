import { Component, OnInit } from '@angular/core';
import { VocabularyListItem } from '@classifieds-ui/taxonomy';
import { Observable } from 'rxjs';
import { VocabularyListItemService } from '../../services/vocabulary-list-item.service';

@Component({
  selector: 'classifieds-ui-vocabulary-master',
  templateUrl: './vocabulary-master.component.html',
  styleUrls: ['./vocabulary-master.component.scss']
})
export class VocabularyMasterComponent implements OnInit {
  vocabularies$: Observable<Array<VocabularyListItem>>;
  displayOverlay = false;

  constructor(private vocabularyListItemService: VocabularyListItemService) { }

  ngOnInit() {
    this.vocabularies$ = this.vocabularyListItemService.getAll();
  }

}
