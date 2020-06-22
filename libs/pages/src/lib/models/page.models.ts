// import { ContentInstance } from '@classifieds-ui/content';
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

export class GridLayout {
  id: string;
  site: string;
  gridItems: Array<GridItem> = [];
  constructor(data?: GridLayout) {
    if(data) {
      this.id = data.id;
      this.site = data.site;
      if(data.gridItems) {
        this.gridItems = data.gridItems.map(i => new GridItem(i));
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
  contentPlugin: string;
  settings: Array<AttributeValue> = [];
  constructor(data?: Pane) {
    if(data) {
      this.contentPlugin = data.contentPlugin;
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
  weight: number;
  constructor(data?: GridItem) {
    if(data) {
      this.cols = data.cols;
      this.rows = data.rows;
      this.x = data.x;
      this.y = data.y;
      this.weight = data.weight;
    }
  }
}
