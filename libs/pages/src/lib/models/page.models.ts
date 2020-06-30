// import { ContentInstance } from '@classifieds-ui/content';
import { AttributeValue } from '@classifieds-ui/attributes';

interface DatasourceModel<T> {
  new (): T;
}

export class PanelPage {
  id: string;
  gridItems: Array<GridItem> = [];
  panels: Array<Panel> = [];
  constructor(data?: PanelPage) {
    if(data) {
      this.id = data.id;
      if(data.panels) {
        this.panels = data.panels.map(p => new Panel(p));
      }
      if(data.gridItems) {
        this.gridItems = data.gridItems.map(i => new GridItem(i));
      }
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
  stylePlugin: string;
  settings: Array<AttributeValue> = [];
  panes: Array<Pane> = [];
  constructor(data?: Panel) {
    if(data) {
      this.stylePlugin = data.stylePlugin;
      if(data.settings) {
        this.settings = data.settings.map(a => new AttributeValue(a));
      }
      if(data.panes) {
        this.panes = data.panes.map(p => new Pane(p));
      }
    }
  }
}

export class Pane {
  contentPlugin: string;
  name: string;
  label: string;
  settings: Array<AttributeValue> = [];
  metadata?: Map<string, any>;
  constructor(data?: Pane) {
    if(data) {
      this.name = data.name;
      this.label = data.label;
      this.contentPlugin = data.contentPlugin;
      if(data.metadata !== undefined) {
        this.metadata = new Map(...data.metadata);
      }
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
