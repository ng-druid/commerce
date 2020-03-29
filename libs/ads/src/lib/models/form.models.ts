export class AdSearchBarForm {
  searchString: string;
  location: Array<number>;
  features: Array<string>;
  adType: string;
  attributes: any;
  constructor(data?: AdSearchBarForm) {
    if(data) {
      this.searchString = data.searchString;
      this.location = data.location;
      this.features = data.features;
      this.adType = data.adType;
      this.attributes = Object.assign({}, data.attributes);
    }
  }
}
