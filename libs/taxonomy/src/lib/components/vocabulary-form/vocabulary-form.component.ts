import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Vocabulary, Term } from '../../models/taxonomy.models';

@Component({
  selector: 'classifieds-ui-vocabulary-form',
  templateUrl: './vocabulary-form.component.html',
  styleUrls: ['./vocabulary-form.component.scss']
})
export class VocabularyFormComponent implements OnInit, OnChanges {

  @Input()
  vocabulary: Vocabulary;

  @Output()
  vocabularyChange = new EventEmitter<Vocabulary>();

  @Output()
  submitted = new EventEmitter();

  terms: Array<Term> = [];

  vocabularyFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.vocabularyFormGroup = fb.group({
      humanName: [ '' , Validators.required],
      machineName: [ '' , Validators.required]
    });
  }

  ngOnInit() {
    this.terms = this.vocabulary.terms;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.vocabulary.previousValue !== changes.vocabulary.currentValue) {
      this.terms = this.vocabulary.terms;
      this.vocabularyFormGroup.setValue({
        humanName: this.vocabulary.humanName,
        machineName: this.vocabulary.machineName
      });
    }
  }

  submit() {
    this.vocabulary = new Vocabulary({
      ...this.vocabulary,
      humanName: this.vocabularyFormGroup.controls.humanName.value,
      machineName: this.vocabularyFormGroup.controls.machineName.value,
      terms: this.terms
    });
    this.vocabularyChange.emit(this.vocabulary);
    this.submitted.emit();
  }

}
