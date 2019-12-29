import { Component, OnInit } from '@angular/core';
import { VocabularyFacade } from '../../+state/vocabulary/vocabulary.facade';
import { Vocabulary } from '../../models/taxonomy.models';

@Component({
  selector: 'classifieds-ui-vocabulary-create',
  templateUrl: './vocabulary-create.component.html',
  styleUrls: ['./vocabulary-create.component.scss']
})
export class VocabularyCreateComponent implements OnInit {

  vocabulary: Vocabulary = new Vocabulary();

  constructor(private vocabularyFacade: VocabularyFacade) { }

  ngOnInit() {
  }

  submitted() {
    this.vocabularyFacade.createVocabulary(this.vocabulary);
  }

}
