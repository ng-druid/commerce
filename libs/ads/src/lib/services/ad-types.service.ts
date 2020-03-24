import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { AdType } from '../models/ads.models';

@Injectable({ providedIn: 'root' })
export class AdTypesService extends EntityCollectionServiceBase<AdType> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('AdType', serviceElementsFactory);
  }
}
