import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@classifieds-ui/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TaxonomySelectorComponent } from './components/taxonomy-selector/taxonomy-selector.component';
import { EntityDefinitionService } from '@ngrx/data';
import { VocabularyEditComponent } from './components/vocabulary-edit/vocabulary-edit.component';
import { VocabularyFormComponent } from './components/vocabulary-form/vocabulary-form.component';
import { VocabularyCreateComponent } from './components/vocabulary-create/vocabulary-create.component';
import { entityMetadata } from './entity-metadata';
import { VocabularySelectorComponent } from './components/vocabulary-selector/vocabulary-selector.component';

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
  constructor(eds: EntityDefinitionService) {
    eds.registerMetadataMap(entityMetadata);
  }
}
