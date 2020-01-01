import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { CityListItem } from '../models/cities.models';

@Injectable({ providedIn: 'root' })
export class CityListItemsService extends EntityCollectionServiceBase<CityListItem> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('CityListItem', serviceElementsFactory);
  }
}
