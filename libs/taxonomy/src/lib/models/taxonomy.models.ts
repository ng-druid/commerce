export class TaxonomySettings {
  vocabularyUrl: string;
  constructor(data?: TaxonomySettings) {
    if(data) {
      this.vocabularyUrl = data.vocabularyUrl;
    }
  }
}

export class Vocabulary {
  id: string;
  machineName: string;
  humanName: string;
  terms: Array<Term> = [];
  userId: string;
  constructor(data?: Vocabulary) {
    if(data) {
      this.id = data.id;
      this.machineName = data.machineName;
      this.humanName = data.humanName;
      this.userId = data.userId;
      if(data.terms) {
        this.terms = data.terms.map(t => new Term(t));
      }
    }
  }
}

export class VocabularyListItem {
  id: string;
  machineName: string;
  humanName: string;
  userId: string;
  constructor(data?: VocabularyListItem) {
    if(data) {
      this.id = data.id;
      this.machineName = data.machineName;
      this.humanName = data.humanName;
      this.userId = data.userId;
    }
  }
}

export class Term {
  id: string;
  vocabularyId: string;
  parentId: string;
  machineName: string;
  humanName: string;
  weight: number;
  group: boolean;
  level: number;
  selected: boolean;
  children: Array<Term> = [];
  constructor(data?: Term) {
    if(data) {
      this.id = data.id;
      this.vocabularyId = data.vocabularyId;
      this.parentId = data.parentId;
      this.machineName = data.machineName;
      this.humanName = data.humanName;
      this.weight = data.weight;
      this.group = data.group;
      this.level = data.level;
      this.selected = data.selected;
      if(data.children) {
        this.children = data.children.map(t => new Term(t));
      }
    }
  }
}

export class FlatTermNode {
  item: string;
  expandable: boolean;
  level: number;
  visible: boolean;
  constructor(data?: FlatTermNode) {
    if(data) {
      this.item = data.item;
      this.expandable = data.expandable;
      this.level = data.level;
      this.visible = data.visible;
    }
  }
}
