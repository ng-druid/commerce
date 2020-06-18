import { ContentInstance } from '@classifieds-ui/content';
import { AttributeValue } from '@classifieds-ui/attributes';

export class Page {
  site: string;
  path: string;
  page: string;
  title: string;
  createdAt: string;
  published: boolean;
  body: string;
  constructor(data?: Page) {
    if(data) {
      this.site = data.site;
      this.path = data.path;
      this.page = data.page;
      this.title = data.title;
      this.createdAt = data.createdAt;
      this.published = data.published;
      this.body = data.body;
    }
  }
}

export class Layout {
  panels: Array<Panel> = [];
  constructor(data?: Layout) {
    if(data) {
      if(data.panels) {
        this.panels = data.panels.map(p => new Panel(p));
      }
    }
  }
}

export class Panel {
  panes: Array<Pane> = [];
  constructor(data?: Panel) {
    if(data) {
      if(data.panes) {
        this.panes = data.panes.map(p => new Pane(p));
      }
    }
  }
}

export class Pane {
  contentProvider: string;
  settings: Array<AttributeValue> = [];
  constructor(data?: Pane) {
    if(data) {
      this.contentProvider = data.contentProvider;
      if(data.settings) {
        this.settings = data.settings.map(a => new AttributeValue(a));
      }
    }
  }
}
