import { Snippet } from './page.models';

export class Rest {
  url: string;
  renderer: Renderer;
  params: Array<Param>;
  constructor(data?: Rest) {
    if(data) {
      this.url = data.url;
      if(data.renderer !== undefined) {
        this.renderer = new Renderer(data.renderer);
      }
      if(data.params !== undefined) {
        this.params = data.params.map(p => new Param(p));
      }
    }
  }
}

export class Renderer {
  type: string;
  data: Snippet;
  constructor(data?: Renderer) {
    if(data) {
      this.type = data.type;
      this.data = new Snippet(data.data);
    }
  }
}

export class Param {
  mapping: Mapping;
  flags: Array<Flag>;
  constructor(data?: Param) {
    if(data) {
      this.mapping = new Mapping(data.mapping);
      if(data.flags !== undefined) {
        this.flags = data.flags.map(f => new Flag(f));
      }
    }
  }
}

export class Mapping {
  type: string;
  value: string;
  context: string;
  constructor(data?: Mapping) {
    if(data) {
      this.type = data.type;
      this.value = data.value;
      this.context = data.context;
    }
  }
}

export class Flag {
  name: string;
  enabled: boolean;
  constructor(data?: Flag) {
    if(data) {
      this.name = data.name;
      this.enabled = data.enabled;
    }
  }
}