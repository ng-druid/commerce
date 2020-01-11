import { Vocabulary } from '@classifieds-ui/taxonomy';

export class SearchConfig {
  searchString: string;
  location: string;
  page: string;
  features: Array<string>;
  constructor(data: SearchConfig) {
    if(data) {
      this.searchString = data.searchString;
      this.location = data.location;
      this.features = data.features;
      this.page = data.page;
    }
  }
}

export class FeaturesSearchConfig {
  searchString: string;
  location: string;
  features: Array<string>;
  constructor(data: FeaturesSearchConfig) {
    if(data) {
      this.searchString = data.searchString;
      this.location = data.location;
      this.features = data.features;
    }
  }
}

export class Ad {
  id: string;
  title: string;
  description: string;
  location: Array<number>;
  images: Array<AdImage> = [];
  featureSets: Array<Vocabulary> = [];
  constructor(data?: Ad) {
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.location = data.location;
      if(data.images) {
        this.images = data.images.map(i => new AdImage(i));
      }
      if(data.featureSets) {
        this.featureSets = data.featureSets.map(v => new Vocabulary(v));
      }
    }
  }
}

export class AdListItem extends Ad {
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

export class FeatureListItem {
  id: string;
  humanName: string;
  constructor(data?: FeatureListItem) {
    if(data) {
      this.id = data.id;
      this.humanName = data.humanName;
    }
  }
}
