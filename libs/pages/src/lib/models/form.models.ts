export class PropertiesFormPayload {
  title: string;
  name: string;
  path: string;
  constructor(data?: PropertiesFormPayload) {
    if(data) {
      this.title = data.title;
      this.name = data.name;
      this.path = data.path;
    }
  }
}

export class PanelPropsFormPayload {
  label: string;
  name: string;
  constructor(data?: PanelPropsFormPayload) {
    if(data) {
      this.label = data.label;
      this.name = data.name;
    }
  }
}
