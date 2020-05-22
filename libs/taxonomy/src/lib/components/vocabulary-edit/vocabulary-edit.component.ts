import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

import { Vocabulary } from '../../models/taxonomy.models';

@Component({
  selector: 'classifieds-ui-vocabulary-edit',
  templateUrl: './vocabulary-edit.component.html',
  styleUrls: ['./vocabulary-edit.component.scss']
})
export class VocabularyEditComponent implements OnInit {

  vocabulary: Vocabulary;
  private vocabularyService: EntityCollectionService<Vocabulary>;

  constructor(private route: ActivatedRoute, es: EntityServices) {
    this.vocabularyService = es.getEntityCollectionService('Vocabulary');
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      map(p => p.get('vocabularyId')),
      filter(vocabularyId => typeof(vocabularyId) === 'string'),
      switchMap(vocabularyId => this.vocabularyService.getByKey(vocabularyId)),
      filter(v => v !== undefined)
    ).subscribe((vocabulary: Vocabulary) => {
      this.vocabulary = new Vocabulary(vocabulary);
    });
  }

  submitted() {
    this.vocabularyService.update(this.vocabulary).subscribe(v => {
      alert("vocabulary updated");
    });
  }

}
