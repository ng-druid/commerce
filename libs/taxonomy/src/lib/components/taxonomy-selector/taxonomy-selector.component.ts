import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SelectionModel, SelectionChange } from '@angular/cdk/collections';
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

  flatNodeMap = new Map<FlatTermNode, Term>();
  nestedNodeMap = new Map<Term, FlatTermNode>();

  treeFlattener: MatTreeFlattener<Term, FlatTermNode>;
  treeControl: FlatTreeControl<FlatTermNode>;
  dataSource: MatTreeFlatDataSource<Term, FlatTermNode>;

  checklistSelection = new SelectionModel<FlatTermNode>(true);

  constructor() {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<FlatTermNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  ngOnInit() {
    this.checklistSelection.changed.subscribe((evt: SelectionChange<FlatTermNode>) => {
      evt.added.forEach(n => this.flatNodeMap.get(n).selected = true);
      evt.removed.forEach(n => this.flatNodeMap.get(n).selected = false);
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

  transformer = (term: Term, level: number): FlatTermNode => {
    const existingNode = this.nestedNodeMap.get(term);
    const flatNode = existingNode && existingNode.item === term.humanName
        ? existingNode
        : new FlatTermNode({ item: term.humanName, level: !term.parentId ? 0 : term.level + 1, expandable: term.children.length > 0 });
    this.flatNodeMap.set(flatNode, term);
    this.nestedNodeMap.set(term, flatNode);
    return flatNode;
  }

  getChildren = (term: Term): Array<Term> => {
    return term.children;
  }

  getLevel = (termNode: FlatTermNode): number => {
    return termNode.level;
  }

  isExpandable = (termNode: FlatTermNode): boolean => {
    return termNode.expandable;
  }

  hasChild = (_: number, termNode: FlatTermNode): boolean => {
    return termNode.expandable;
  }

  hasNoContent = (_: number, termNode: FlatTermNode): boolean => {
    return termNode.item === '';
  }

  addNewTerm(node: FlatTermNode) {
    const parentTerm = this.flatNodeMap.get(node);
    parentTerm.children.push(this.createTerm(parentTerm.vocabularyId, parentTerm.id, parentTerm.level + 1, parentTerm.children.length + 1));
    this.treeControl.expand(node);
  }

  createTerm(vocabularyId: string, parentId: string, level: number, weight: number) {
    return new Term({ id: undefined, vocabularyId, parentId, humanName: '', machineName: '', level, group: false, children: [], weight, selected: true });
  }

  toggleSelected(node: FlatTermNode) {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node) ? this.checklistSelection.select(...descendants) : this.checklistSelection.deselect(...descendants);
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }

  checkAllParentsSelection(node: FlatTermNode): void {
    let parent: FlatTermNode | null = this.getParentNode(node);
    while (parent) {
      this.checklistSelection.select(parent);
      parent = this.getParentNode(parent);
    }
  }

  getParentNode(node: FlatTermNode): FlatTermNode | null {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

}
