import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { City } from '../models/cities.models';

@Injectable({ providedIn: 'root' })
export class CitiesService extends EntityCollectionServiceBase<City> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('City', serviceElementsFactory);
  }
}
