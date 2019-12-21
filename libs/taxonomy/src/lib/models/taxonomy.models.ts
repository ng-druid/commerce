export class TaxonomySettings {
  endpointUrl: string;
  constructor(data?: TaxonomySettings) {
    if(data) {
      this.endpointUrl = data.endpointUrl;
    }
  }
}

export class Vocabulary {
  id: string;
  machineName: string;
  humanName: string;
  terms: Array<Term> = [];
  constructor(data?: Vocabulary) {
    if(data) {
      this.id = data.id;
      this.machineName = data.machineName;
      this.humanName = data.humanName;
      if(data.terms) {
        this.terms = data.terms.map(t => new Term(t));
      }
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
      if(data.children) {
        this.children = data.children.map(t => new Term(t));
      }
    }
  }
}
