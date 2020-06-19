import { EntityMetadataMap } from '@ngrx/data';
import { Page } from './models/page.models';

export const entityMetadata: EntityMetadataMap = {
  Page: {
    selectId: (p: Page) => `(${p.site})__(${p.path})`,
    entityName: 'Page'
  },
  Layout: {
    entityName: 'Layout'
  },
};
