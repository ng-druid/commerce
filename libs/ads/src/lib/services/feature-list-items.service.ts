import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { FeatureListItem } from '../models/ads.models';

@Injectable({ providedIn: 'root' })
export class FeatureListItemsService extends EntityCollectionServiceBase<FeatureListItem> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('FeatureListItem', serviceElementsFactory);
  }
}
