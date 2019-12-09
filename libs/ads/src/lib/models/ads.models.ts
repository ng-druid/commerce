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
  page: string;
  constructor(data: SearchConfig) {
    if(data) {
      this.searchString = data.searchString;
      this.page = data.page;
    }
  }
}

export class Ad {
  id: string;
  title: string;
  description: string;
  images: Array<AdImage> = [];
  constructor(data?: Ad) {
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      if(data.images) {
        this.images = data.images.map(i => new AdImage(i));
      }
    }
  }
}

export class AdDetail extends Ad {
}

export class AdImage {
  id: string;
  path: string;
  weight: number;
  constructor(data?: AdImage) {
    if (data) {
      this.id = data.id;
      this.path = data.path;
      this.weight = data.weight;
    }
  }
}
