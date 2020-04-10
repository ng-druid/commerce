import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { Observable } from  'rxjs';
import { VocabularyListItem } from '../../models/taxonomy.models';

@Component({
  selector: 'classifieds-ui-vocabulary-selector',
  templateUrl: './vocabulary-selector.component.html',
  styleUrls: ['./vocabulary-selector.component.scss']
})
export class VocabularySelectorComponent implements OnInit {
  vocabs$: Observable<Array<VocabularyListItem>>;
  private vocabularyListItemsService: EntityCollectionService<VocabularyListItem>;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { selectedId: string; },
    private bottomSheetRef: MatBottomSheetRef<VocabularySelectorComponent>,
    es: EntityServices
  ) {
    this.vocabularyListItemsService = es.getEntityCollectionService('VocabularyListItem');
  }

  ngOnInit() {
    this.vocabs$ = this.vocabularyListItemsService.getAll();
  }

  openLink(event, vocabId: string) {
    this.data.selectedId = vocabId;
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
