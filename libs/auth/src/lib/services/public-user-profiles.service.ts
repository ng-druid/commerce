import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { PublicUserProfile } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class PublicUserProfilesService extends EntityCollectionServiceBase<PublicUserProfile> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('PublicUserProfile', serviceElementsFactory);
  }
}
