export class Snippet {
  content: string;
  contentType: string;
  constructor(data?: Snippet) {
    if(data) {
      this.content = data.content;
      this.contentType = data.contentType;
    }
  }
}

export class DataSlice {
  context: string;
  query: string;
  plugin: string;
  constructor(data?: DataSlice) {
    if(data) {
      this.context = data.context;
      this.query = data.query;
      this.plugin = data.plugin;
    }
  }
}

export class SelectOption {
  value: any;
  label: string;
  constructor(data?: SelectOption) {
    if(data) {
      this.value = data.value;
      this.label = data.label;
    }
  }
}

export class SelectMapping {
  value: string;
  label: string;
  constructor(data?: SelectMapping) {
    if(data) {
      this.value = data.value;
      this.label = data.label;
    }
  }
}
