import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { SelectionModel, SelectionChange } from '@angular/cdk/collections';
import { Term, Vocabulary } from '../../models/taxonomy.models';
import { ObjectId } from 'bson';

@Component({
  selector: 'classifieds-ui-taxonomy-selector',
  templateUrl: './taxonomy-selector.component.html',
  styleUrls: ['./taxonomy-selector.component.scss']
})
export class TaxonomySelectorComponent implements OnInit, OnChanges {

  @Input()
  terms: Array<Term> = [];

  @Output()
  termsChange = new EventEmitter();

  @Input()
  readonly = false;

  @Input()
  hideUnselected = false;

  @Input()
  vocabulary: Vocabulary;

  treeControl = new NestedTreeControl<Term>(t => t.children);
  checklistSelection = new SelectionModel<string>(true);

  constructor() { }

  ngOnInit() {
    this.syncSelected();
    this.checklistSelection.changed.subscribe((evt: SelectionChange<string>) => {
      evt.added.forEach(id => {
        const term = this.matchTerm(id, this.terms);
        term.selected = true;
      });
      evt.removed.forEach(id => {
        const term = this.matchTerm(id, this.terms);
        term.selected = false;
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.terms.previousValue !== changes.terms.currentValue) {
      this.syncSelected();
    }
  }

  hasChild = (_: number, term: Term): boolean => {
    return (!!term.children && term.children.length > 0) || !term.parentId;
  }

  hasNoContentNotRoot = (_: number, term: Term): boolean => {
    return term.parentId && term.humanName === '';
  }

  hasNoContentRoot = (_: number, term: Term): boolean => {
    return !term.parentId && term.humanName === '';
  }

  isHidden = (_: number, term: Term): boolean => {
    return this.hideUnselected && !term.selected;
  }

  addNewRootTerm(node?: Term) {
    const terms = this.terms.map(t => new Term(t));
    terms.push(this.createTerm(undefined, 0, terms.length + 1));
    this.terms = terms;
    this.termsChange.emit(this.terms);
  }

  addNewTerm(node: Term) {
    const terms = this.terms.map(t => new Term(t));
    const term = this.matchTerm(node.id, terms);
    term.children.push(this.createTerm(term.id, term.level + 1, term.children.length + 1));
    this.terms = terms;
    this.termsChange.emit(this.terms);
  }

  saveNewTerm(node: Term, humanName: string) {
    const term = this.matchTerm(node.id, this.terms);
    term.selected = true;
    term.humanName = humanName;
    term.machineName  = humanName;
    const terms = this.terms.map(t => new Term(t));
    this.terms = terms;
    this.termsChange.emit(this.terms);
    const newNode = this.matchTerm(node.id, this.terms);
    this.toggleSelected(newNode);
  }

  createTerm(parentId: string, level: number, weight: number) {
    return new Term({ id: new ObjectId().toHexString(), vocabularyId: this.vocabulary.id, parentId, humanName: '', machineName: '', level, group: false, children: [], weight, selected: true });
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
    let parent = this.matchTerm(term.parentId, this.terms);
    while (parent) {
      this.checklistSelection.select(parent.id);
      parent = this.matchTerm(parent.parentId, this.terms);
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

  visitEachTerm(terms: Array<Term>, callback: (t: Term) => void) {
    const len = terms.length;
    for(let i = 0; i < len; i++) {
      callback(terms[i]);
      if(terms[i].children.length > 0) {
        const term = this.visitEachTerm(terms[i].children, callback);
      }
    }

  }

  syncSelected() {
    this.visitEachTerm(this.terms, (t) => {
      if(t.selected) {
        this.checklistSelection.select(t.id);
      }
    });
  }

}
