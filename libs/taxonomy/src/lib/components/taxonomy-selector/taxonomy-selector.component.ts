import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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
    if(this.vocabulary) {
      this.dataSource.data = this.vocabulary.terms;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.vocabulary.previousValue !== changes.vocabulary.currentValue) {
      this.vocabulary = changes.vocabulary.currentValue;
      this.dataSource.data = this.vocabulary.terms;
    }
  }

  hasChild = (_: number, term: Term): boolean => {
    return !!term.children && term.children.length > 0;
  }

  addNewTerm(term: Term) {
    term.children.push(this.createTerm(term.vocabularyId, term.id, term.level + 1, term.children.length + 1));
    this.treeControl.expand(term);
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
    let parent = this.matchTerm(term.parentId);
    while (parent) {
      this.checklistSelection.select(parent);
      parent = this.matchTerm(parent.parentId);
    }
  }

  matchTerm(id: string): Term | null {
    const len = this.dataSource.data.length;
    if(!id) {
      return;
    }
    for(let i = 0; i < len; i++) {
      if(this.dataSource.data[i].id === id) {
        return this.dataSource.data[i];
      }
      if(this.dataSource.data[i].children.length > 0) {
        const term = this.matchTerm(id);
        if(term) {
          return term;
        }
      }
    }
  }

}
