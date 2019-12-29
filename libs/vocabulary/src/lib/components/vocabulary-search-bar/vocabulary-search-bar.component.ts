import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'classifieds-ui-vocabulary-search-bar',
  templateUrl: './vocabulary-search-bar.component.html',
  styleUrls: ['./vocabulary-search-bar.component.scss']
})
export class VocabularySearchBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  createVocabulary() {
    this.router.navigateByUrl('/vocabularies/create');
  }

}
