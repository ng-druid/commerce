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
