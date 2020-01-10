export class AdSearchBarForm {
  searchString: string;
  location: Array<number>;
  features: Array<string>;
  constructor(data?: AdSearchBarForm) {
    if(data) {
      this.searchString = data.searchString;
      this.location = data.location;
      this.features = data.features;
    }
  }
}
