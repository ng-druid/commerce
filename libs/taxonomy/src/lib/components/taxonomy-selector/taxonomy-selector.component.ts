import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { SelectionModel, SelectionChange } from '@angular/cdk/collections';
import { Vocabulary, Term } from '../../models/taxonomy.models';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'classifieds-ui-taxonomy-selector',
  templateUrl: './taxonomy-selector.component.html',
  styleUrls: ['./taxonomy-selector.component.scss']
})
export class TaxonomySelectorComponent implements OnInit, OnChanges {

  @Input()
  vocabulary: Vocabulary;

  @Input()
  readonly = false;

  @Input()
  hideUnselected = false;

  dataChange$ = new BehaviorSubject<Vocabulary>(new Vocabulary());

  treeControl = new NestedTreeControl<Term>(t => t.children);
  dataSource = new MatTreeNestedDataSource<Term>();

  checklistSelection = new SelectionModel<Term>(true);

  constructor() {
  }

  ngOnInit() {
    this.checklistSelection.changed.subscribe((evt: SelectionChange<Term>) => {
      evt.added.forEach(t => t.selected = true);
      evt.removed.forEach(t => t.selected = false);
    });
    this.dataChange$.subscribe(vocabulary => {
      this.vocabulary = vocabulary;
      this.dataSource.data = vocabulary.terms;
    });
    if(this.vocabulary) {
      this.dataChange$.next(this.vocabulary);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.vocabulary.previousValue !== changes.vocabulary.currentValue) {
      this.dataChange$.next(changes.vocabulary.currentValue);
    }
  }

  hasChild = (_: number, term: Term): boolean => {
    return !!term.children && term.children.length > 0;
  }

  hasNoContent = (_: number, term: Term): boolean => {
    return term.humanName === '';
  }

  addNewTerm(node: Term) {
    const vocab = new Vocabulary(this.vocabulary);
    const term = this.matchTerm(node.id, vocab.terms);
    term.children.push(this.createTerm(term.vocabularyId, term.id, term.level + 1, term.children.length + 1));
    this.dataChange$.next(vocab);
  }

  createTerm(vocabularyId: string, parentId: string, level: number, weight: number) {
    return new Term({ id: undefined, vocabularyId, parentId, humanName: '', machineName: '', level, group: false, children: [], weight, selected: true });
  }

  toggleSelected(term: Term) {
    this.checklistSelection.toggle(term);
    const descendants = this.treeControl.getDescendants(term);
    this.checklistSelection.isSelected(term) ? this.checklistSelection.select(...descendants) : this.checklistSelection.deselect(...descendants);
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(term);
  }

  checkAllParentsSelection(term: Term): void {
    let parent = this.matchTerm(term.parentId, this.vocabulary.terms);
    while (parent) {
      this.checklistSelection.select(parent);
      parent = this.matchTerm(parent.parentId, this.vocabulary.terms);
    }
  }

  matchTerm(id: string, terms: Array<Term>): Term {
    const len = this.dataSource.data.length;
    if(!id) {
      return;
    }
    for(let i = 0; i < len; i++) {
      if(terms[i].id === id) {
        return terms[i];
      }
      if(terms[i].children.length > 0) {
        const term = this.matchTerm(id, terms[i].children);
        if(term) {
          return term;
        }
      }
    }
  }

}
