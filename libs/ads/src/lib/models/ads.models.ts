import { Vocabulary } from '@classifieds-ui/taxonomy';
import { Attribute, AttributeValue } from '@classifieds-ui/attributes';

export enum AdTypes {
  General,
  RealEstate,
  Rental,
  Auto,
  Job
}

export enum AdStatuses {
  Submitted,
  Approved,
  Rejected,
  Expired,
  Deleted
}

export class SearchConfig {
  searchString: string;
  location: string;
  page: string;
  features: Array<string>;
  adType: number;
  constructor(data: SearchConfig) {
    if(data) {
      this.searchString = data.searchString;
      this.location = data.location;
      this.features = data.features;
      this.page = data.page;
      this.adType = data.adType;
    }
  }
}

export class AdType {
  id: AdTypes;
  name: string;
  attributes: Array<Attribute> = [];
  filters: Array<Attribute> = [];
  constructor(data?: AdType) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      if (data.attributes) {
        this.attributes = data.attributes.map(a => new Attribute(a));
      }
      if (data.filters) {
        this.filters = data.filters.map(a => new Attribute(a));
      }
    }
  }
}

export class FeaturesSearchConfig {
  searchString: string;
  adSearchString: string;
  location: string;
  features: Array<string>;
  adType: number;
  constructor(data: FeaturesSearchConfig) {
    if(data) {
      this.adType = data.adType;
      this.searchString = data.searchString;
      this.adSearchString = data.adSearchString;
      this.location = data.location;
      this.features = data.features;
    }
  }
}

export class Ad {
  id: string;
  title: string;
  adType: AdTypes;
  status: AdStatuses;
  description: string;
  location: Array<number>;
  cityDisplay: string;
  images: Array<AdImage> = [];
  featureSets: Array<Vocabulary> = [];
  attributes: Array<AttributeValue> = [];
  constructor(data?: Ad) {
    if (data) {
      this.id = data.id;
      this.adType = data.adType;
      this.status = data.status;
      this.title = data.title;
      this.description = data.description;
      this.location = data.location;
      this.cityDisplay = data.cityDisplay;
      if(data.images) {
        this.images = data.images.map(i => new AdImage(i));
      }
      if(data.featureSets) {
        this.featureSets = data.featureSets.map(v => new Vocabulary(v));
      }
      if(data.attributes) {
        this.attributes = data.attributes.map(v => new AttributeValue(v));
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
