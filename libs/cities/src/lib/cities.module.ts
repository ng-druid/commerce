import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EntityDefinitionService } from '@ngrx/data';

import { entityMetadata } from './entity-metadata';

@NgModule({
  imports: [CommonModule, HttpClientModule]
})
export class CitiesModule {
  constructor(eds: EntityDefinitionService) {
    eds.registerMetadataMap(entityMetadata);
  }
}
