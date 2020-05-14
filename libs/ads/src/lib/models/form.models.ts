import { Ad } from './ads.models';

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

export class AdFormPayload {
  ad: Ad;
  files: Array<File>;
  constructor(data?: AdFormPayload) {
    if(data) {
      this.ad = data.ad;
      this.files = data.files;
    }
  }
}
