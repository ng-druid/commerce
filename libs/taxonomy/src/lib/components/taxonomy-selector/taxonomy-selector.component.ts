import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import { Vocabulary, Term, FlatTermNode } from '../../models/taxonomy.models';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

@Component({
  selector: 'classifieds-ui-taxonomy-selector',
  templateUrl: './taxonomy-selector.component.html',
  styleUrls: ['./taxonomy-selector.component.scss']
})
export class TaxonomySelectorComponent implements OnInit, OnChanges {

  @Input()
  vocabulary: Vocabulary;

  treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
  treeControl = new FlatTreeControl<FlatTermNode>(this.getLevel, this.isExpandable);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() { }

  ngOnInit() {
    if(this.vocabulary) {
      this.dataSource.data = this.vocabulary.terms;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.vocabulary.previousValue !== changes.vocabulary.currentValue) {
      this.vocabulary = changes.vocabulary.currentValue;
      this.dataSource.data = this.vocabulary.terms;
      console.log(this.vocabulary);
    }
  }

  transformer(term: Term, level: number): FlatTermNode {
    return new FlatTermNode({ item: term.humanName, level: !term.parentId ? 0 : term.level + 1, expandable: term.children.length > 0 });
  }

  getChildren(term: Term): Array<Term> {
    return term.children;
  }

  getLevel(termNode: FlatTermNode): number {
    return termNode.level;
  }

  isExpandable(termNode: FlatTermNode): boolean {
    return termNode.expandable;
  }

  hasChild(termNode: FlatTermNode): boolean {
    return termNode.expandable;
  }

}
