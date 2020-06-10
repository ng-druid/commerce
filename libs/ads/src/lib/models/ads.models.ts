import { Type } from '@angular/core';
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

export class AdSettings {
  adUrl: string;
  constructor(data?: AdSettings) {
    if(data) {
      this.adUrl = data.adUrl;
    }
  }
}

export class SearchConfig {
  searchString: string;
  location: string;
  page: string;
  features: Array<string>;
  typeId: string;
  attributes: any;
  constructor(data: SearchConfig) {
    if(data) {
      this.searchString = data.searchString;
      this.location = data.location;
      this.features = data.features;
      this.page = data.page;
      this.typeId = data.typeId;
      this.attributes = Object.assign({}, data.attributes);
    }
  }
}

export class AdTypePlugin {
  adType: string;
  listItemDisplay: Type<any>;
  listItemInfoDisplay: Type<any>;
  detailHeaderDisplay: Type<any>;
  constructor(data?: AdTypePlugin) {
    if (data) {
      this.adType = data.adType;
      this.listItemDisplay = data.listItemDisplay;
      this.listItemInfoDisplay = data.listItemInfoDisplay;
      this.detailHeaderDisplay = data.detailHeaderDisplay;
    }
  }
}

export class AdType {
  id: string;
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
  typeId: string;
  attributes: any;
  constructor(data: FeaturesSearchConfig) {
    if(data) {
      this.typeId = data.typeId;
      this.searchString = data.searchString;
      this.adSearchString = data.adSearchString;
      this.location = data.location;
      this.features = data.features;
      this.attributes = Object.assign({}, data.attributes);
    }
  }
}

export class Ad {
  id: string;
  title: string;
  // adType: AdTypes;
  typeId: string;
  userId: string;
  status: AdStatuses;
  description: string;
  location: Array<number>;
  profileId: string;
  cityDisplay: string;
  images: Array<AdImage> = [];
  featureSets: Array<Vocabulary> = [];
  attributes: Array<AttributeValue> = [];
  constructor(data?: Ad) {
    if (data) {
      this.id = data.id;
      // this.adType = data.adType;
      this.typeId = data.typeId;
      this.status = data.status;
      this.title = data.title;
      this.description = data.description;
      this.location = data.location;
      this.profileId = data.profileId;
      this.cityDisplay = data.cityDisplay;
      this.userId = data.userId;
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
  key: string;
  doc_count: string;
  constructor(data?: FeatureListItem) {
    if(data) {
      this.key = data.key;
      this.doc_count = data.doc_count;
    }
  }
}

export class AdProfileItem {
  id: string;
  parentId: string;
  title: string;
  constructor(data: AdProfileItem) {
    if(data) {
      this.id = data.id;
      this.parentId = data.parentId;
      this.title = data.title;
    }
  }
}

export class AdProfile {
  id: string;
  parentId: string;
  title: string;
  headshot: AdImage;
  logo: AdImage;
  constructor(data: AdProfile) {
    if(data) {
      this.id = data.id;
      this.parentId = data.parentId;
      this.title = data.title;
      if(data.headshot) {
        this.headshot = new AdImage(data.headshot);
      }
      if(data.logo) {
        this.logo = new AdImage(data.logo);
      }
    }
  }
}
