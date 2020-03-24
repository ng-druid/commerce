import { Vocabulary } from '@classifieds-ui/taxonomy';

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

export enum AdAttributeTypes {
  Number,
  Text
}

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

export class AdTypeAttribute {
  name: string;
  type: AdTypes;
  label: string;
  required: boolean;
  constructor(data?: AdTypeAttribute) {
    if (data) {
      this.name = data.name;
      this.type = data.type;
      this.label = data.label;
      this.required = data.required;
    }
  }
}

export class AdType {
  id: AdTypes;
  name: string;
  attributes: Array<AdTypeAttribute> = [];
  constructor(data?: AdType) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      if (data.attributes) {
        this.attributes = data.attributes.map(a => new AdTypeAttribute(a));
      }
    }
  }
}

export class AdAttributeValue {
  name: string;
  type: AdAttributeTypes;
  value: string;
  constructor(data?: AdAttributeValue) {
    if (data) {
      this.name = data.name;
      this.type = data.type;
      this.value = data.value;
    }
  }
}

export class FeaturesSearchConfig {
  searchString: string;
  adSearchString: string;
  location: string;
  features: Array<string>;
  constructor(data: FeaturesSearchConfig) {
    if(data) {
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
  attributes: Array<AdAttributeValue> = [];
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
        this.attributes = data.attributes.map(v => new AdAttributeValue(v));
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
