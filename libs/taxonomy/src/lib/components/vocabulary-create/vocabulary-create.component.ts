import { Component, OnInit } from '@angular/core';
import { Vocabulary } from '../../models/taxonomy.models';
import { VocabularyService } from '../../services/vocabulary.service';

@Component({
  selector: 'classifieds-ui-vocabulary-create',
  templateUrl: './vocabulary-create.component.html',
  styleUrls: ['./vocabulary-create.component.scss']
})
export class VocabularyCreateComponent implements OnInit {

  vocabulary: Vocabulary = new Vocabulary({ humanName: '', machineName: '', id: undefined, terms: [] });

  constructor(private vocabularyService: VocabularyService) { }

  ngOnInit() {
  }

  submitted() {
    this.vocabularyService.add(this.vocabulary).subscribe(v => {
      console.log(v);
    });
  }

}
