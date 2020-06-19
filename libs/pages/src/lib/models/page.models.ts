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
  id: string;
  gridItems: Array<GridItem> = [];
  panels: Array<Panel> = [];
  constructor(data?: Layout) {
    if(data) {
      if(data.panels) {
        this.id = data.id;
        this.panels = data.panels.map(p => new Panel(p));
        if(data.gridItems) {
          this.gridItems = data.gridItems.map(i => new GridItem(i));
        }
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

export class GridItem {
  cols: number;
  rows: number;
  x: number;
  y: number;
  constructor(data?: GridItem) {
    if(data) {
      this.cols = data.cols;
      this.rows = data.rows;
      this.x = data.x;
      this.y = data.y;
    }
  }
}
