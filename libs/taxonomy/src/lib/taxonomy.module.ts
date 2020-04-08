import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MaterialModule } from '@classifieds-ui/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TaxonomySelectorComponent } from './components/taxonomy-selector/taxonomy-selector.component';
import { EntityDefinitionService, EntityDataService, DefaultDataService, EntityCollectionDataService, HttpUrlGenerator, DefaultDataServiceConfig } from '@ngrx/data';
import { VocabularyEditComponent } from './components/vocabulary-edit/vocabulary-edit.component';
import { VocabularyFormComponent } from './components/vocabulary-form/vocabulary-form.component';
import { VocabularyCreateComponent } from './components/vocabulary-create/vocabulary-create.component';
import { entityMetadata } from './entity-metadata';
import { VocabularySelectorComponent } from './components/vocabulary-selector/vocabulary-selector.component';
import { Vocabulary, VocabularyListItem } from './models/taxonomy.models';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [TaxonomySelectorComponent, VocabularyEditComponent, VocabularyFormComponent, VocabularyCreateComponent, VocabularySelectorComponent],
  exports: [TaxonomySelectorComponent, VocabularyEditComponent, VocabularyCreateComponent],
  entryComponents: [ VocabularySelectorComponent ]
})
export class TaxonomyModule {
  constructor(eds: EntityDefinitionService, entityDataService: EntityDataService, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, config: DefaultDataServiceConfig) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Vocabulary', this.createTaxonomyDataService<Vocabulary>('Vocabulary', http, httpUrlGenerator, config));
    entityDataService.registerService('VocabularyListItem', this.createTaxonomyDataService<VocabularyListItem>('VocabularyListItem', http, httpUrlGenerator, config));
  }
  createTaxonomyDataService<T>(
    entityName: string,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    config: DefaultDataServiceConfig
  ): EntityCollectionDataService<T> {
    const configCopy = { ...config, root: `${config.root}/taxonomy` } as DefaultDataServiceConfig;
    return new DefaultDataService<T>(
      entityName,
      http,
      httpUrlGenerator,
      configCopy
    );
  }
}
