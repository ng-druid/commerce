import { Component, OnInit } from '@angular/core';
import { Vocabulary } from '@classifieds-ui/taxonomy';
import { VocabulariesFacade } from '../../+state/vocabularies/vocabularies.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'classifieds-ui-vocabulary-master',
  templateUrl: './vocabulary-master.component.html',
  styleUrls: ['./vocabulary-master.component.scss']
})
export class VocabularyMasterComponent implements OnInit {
  vocabularies$: Observable<Array<Vocabulary>>;
  displayOverlay = false;

  constructor(private vocabulariesFacade: VocabulariesFacade) { }

  ngOnInit() {
    this.vocabularies$ = this.vocabulariesFacade.allVocabularies$;
    this.vocabulariesFacade.loadVocabularies();
  }

}
