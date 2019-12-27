import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { SelectionModel, SelectionChange } from '@angular/cdk/collections';
import { Vocabulary, Term } from '../../models/taxonomy.models';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ObjectId } from 'bson';

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

  checklistSelection = new SelectionModel<string>(true);

  constructor() {
  }

  ngOnInit() {
    this.checklistSelection.changed.subscribe((evt: SelectionChange<string>) => {
      evt.added.forEach(id => {
        const term = this.matchTerm(id, this.vocabulary.terms);
        term.selected = true;
      });
      evt.removed.forEach(id => {
        const term = this.matchTerm(id, this.vocabulary.terms);
        term.selected = false;
      });
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

  saveNewTerm(node: Term, humanName: string) {
    const term = this.matchTerm(node.id, this.vocabulary.terms);
    term.selected = true;
    term.humanName = humanName;
    term.machineName  = humanName;
    const vocab = new Vocabulary(this.vocabulary);
    this.dataChange$.next(vocab);
    const newNode = this.matchTerm(node.id, this.vocabulary.terms);
    this.toggleSelected(newNode);
  }

  createTerm(vocabularyId: string, parentId: string, level: number, weight: number) {
    return new Term({ id: new ObjectId().toHexString(), vocabularyId, parentId, humanName: '', machineName: '', level, group: false, children: [], weight, selected: true });
  }

  toggleSelected(term: Term) {
    this.checklistSelection.toggle(term.id);
    const descendants = this.treeControl.getDescendants(term);
    this.checklistSelection.isSelected(term.id) ? this.checklistSelection.select(...descendants.map(t => t.id)) : this.checklistSelection.deselect(...descendants.map(t => t.id));
    descendants.every(child =>
      this.checklistSelection.isSelected(child.id)
    );
    this.checkAllParentsSelection(term);
  }

  checkAllParentsSelection(term: Term): void {
    let parent = this.matchTerm(term.parentId, this.vocabulary.terms);
    while (parent) {
      this.checklistSelection.select(parent.id);
      parent = this.matchTerm(parent.parentId, this.vocabulary.terms);
    }
  }

  matchTerm(id: string | Term, terms: Array<Term>): Term {
    const len = terms.length;
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
