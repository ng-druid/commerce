import { Component, OnInit } from '@angular/core';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { Vocabulary } from '../../models/taxonomy.models';

@Component({
  selector: 'classifieds-ui-vocabulary-create',
  templateUrl: './vocabulary-create.component.html',
  styleUrls: ['./vocabulary-create.component.scss']
})
export class VocabularyCreateComponent implements OnInit {

  vocabulary: Vocabulary = new Vocabulary({ humanName: '', machineName: '', id: undefined, terms: [], userId: undefined });
  private vocabularyService: EntityCollectionService<Vocabulary>;

  constructor(es: EntityServices) {
    this.vocabularyService = es.getEntityCollectionService('Vocabulary');
  }

  ngOnInit() {
  }

  submitted() {
    this.vocabularyService.add(this.vocabulary).subscribe(v => {
      alert('vocabulary created');
    });
  }

}
