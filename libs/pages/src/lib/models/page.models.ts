// import { ContentInstance } from '@classifieds-ui/content';
import { RuleSet } from 'angular2-query-builder';
import { AttributeValue } from '@classifieds-ui/attributes';
import { InlineContext } from './context.models';

interface DatasourceModel<T> {
  new (): T;
}

export class PanelPage {
  id: string;
  layoutType: string;
  displayType: string;
  gridItems: Array<GridItem> = [];
  panels: Array<Panel> = [];
  constructor(data?: PanelPage) {
    if(data) {
      this.id = data.id;
      this.layoutType = data.layoutType;
      this.displayType = data.displayType;
      if(data.panels) {
        this.panels = data.panels.map(p => new Panel(p));
      }
      if(data.gridItems) {
        this.gridItems = data.gridItems.map(i => new GridItem(i));
      }
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
  contexts?: Array<InlineContext> = [];
  rule?: RuleSet;
  constructor(data?: Pane) {
    if(data) {
      this.name = data.name;
      this.label = data.label;
      this.contentPlugin = data.contentPlugin;
      if(data.metadata !== undefined) {
        this.metadata = new Map(...data.metadata);
      }
      if(data.settings !== undefined) {
        this.settings = data.settings.map(a => new AttributeValue(a));
      }
      if(data.contexts !== undefined) {
        this.contexts = data.contexts.map(c => new InlineContext(c));
      }
      if(data.rule !== undefined && typeof(data.rule) !== 'string') {
        this.rule = { ...data.rule } as RuleSet;
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
