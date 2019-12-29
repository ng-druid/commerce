import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

import { VocabularyFacade } from '../../+state/vocabulary/vocabulary.facade';
import { Vocabulary } from '../../models/taxonomy.models';

@Component({
  selector: 'classifieds-ui-vocabulary-edit',
  templateUrl: './vocabulary-edit.component.html',
  styleUrls: ['./vocabulary-edit.component.scss']
})
export class VocabularyEditComponent implements OnInit {

  vocabulary: Vocabulary;

  constructor(private route: ActivatedRoute, private vocabularyFacade: VocabularyFacade) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      map(p => p.get('vocabularyId')),
      filter(vocabularyId => typeof(vocabularyId) === 'string'),
      switchMap(vocabularyId => this.vocabularyFacade.getVocabulary(vocabularyId)),
      filter(v => v !== undefined)
    ).subscribe((vocabulary: Vocabulary) => {
      this.vocabulary = vocabulary;
    });
  }

  submitted() {
    this.vocabularyFacade.updateVocabulary(this.vocabulary);
  }

}
