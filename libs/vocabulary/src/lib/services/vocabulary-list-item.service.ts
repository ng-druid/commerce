import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { VocabularyListItem } from '@classifieds-ui/taxonomy';

@Injectable({ providedIn: 'root' })
export class VocabularyListItemService extends EntityCollectionServiceBase<VocabularyListItem> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('VocabularyListItem', serviceElementsFactory);
  }
}
