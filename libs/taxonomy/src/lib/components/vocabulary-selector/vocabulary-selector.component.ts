import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Observable } from  'rxjs';
import { VocabularyListItem } from '../../models/taxonomy.models';
import { VocabularyListItemService } from '../../services/vocabulary-list-item.service';

@Component({
  selector: 'classifieds-ui-vocabulary-selector',
  templateUrl: './vocabulary-selector.component.html',
  styleUrls: ['./vocabulary-selector.component.scss']
})
export class VocabularySelectorComponent implements OnInit {
  vocabs$: Observable<Array<VocabularyListItem>>;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { selectedId: string; },
    private vocabularyListService: VocabularyListItemService,
    private bottomSheetRef: MatBottomSheetRef<VocabularySelectorComponent>
  ) { }

  ngOnInit() {
    this.vocabs$ = this.vocabularyListService.getAll();
  }

  openLink(event, vocabId: string) {
    this.data.selectedId = vocabId;
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
