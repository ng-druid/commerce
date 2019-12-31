import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Ad } from '../models/ads.models';

@Injectable({ providedIn: 'root' })
export class AdsService extends EntityCollectionServiceBase<Ad> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Ad', serviceElementsFactory);
  }
}
