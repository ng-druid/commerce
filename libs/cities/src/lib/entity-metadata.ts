import { EntityMetadataMap } from '@ngrx/data';

export const entityMetadata: EntityMetadataMap= {
  CityListItem: {
    selectId: (m) => m.sourceId,
    entityName: 'CityListItem',
  }
};
