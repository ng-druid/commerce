import { EntityMetadataMap } from '@ngrx/data';

export const entityMetadata: EntityMetadataMap= {
  City: {
    selectId: (m) => m.sourceId,
    entityName: 'City',
  },
  CityListItem: {
    selectId: (m) => m.sourceId,
    entityName: 'CityListItem',
  }
};
