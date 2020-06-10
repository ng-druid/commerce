import { EntityMetadataMap } from '@ngrx/data';

export const entityMetadata: EntityMetadataMap = {
  Ad: {
    entityName: 'Ad'
  },
  AdListItem: {
    entityName: 'AdListItem'
  },
  FeatureListItem: {
    selectId: data => data.key,
    entityName: 'FeatureListItem'
  },
  AdType: {
    entityName: 'AdType'
  },
  AdProfileItem: {
    entityName: 'AdProfileItem'
  },
  AdProfile: {
    entityName: 'AdProfile'
  }
};
