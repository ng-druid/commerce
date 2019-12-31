import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Vocabulary } from '../models/taxonomy.models';

@Injectable({ providedIn: 'root' })
export class VocabularyService extends EntityCollectionServiceBase<Vocabulary> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Vocabulary', serviceElementsFactory);
  }
}
