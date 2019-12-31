import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { AdListItem } from '../models/ads.models';

@Injectable({ providedIn: 'root' })
export class AdListItemService extends EntityCollectionServiceBase<AdListItem> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('AdListItem', serviceElementsFactory);
  }
}
