export class AdsSettings {
  endpointUrl: string;
  constructor(data?: AdsSettings) {
    if(data) {
      this.endpointUrl = data.endpointUrl;
    }
  }
}

export class SearchConfig {
  searchString: string;
  constructor(data: SearchConfig) {
    if(data) {
      this.searchString = data.searchString;
    }
  }
}

export class Ad {
  id: string;
  title: string;
  description: string;
  constructor(data?: Ad) {
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
    }
  }
}

export class AdDetail extends Ad {
}
