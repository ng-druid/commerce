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
