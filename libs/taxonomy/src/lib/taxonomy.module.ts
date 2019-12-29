import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@classifieds-ui/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TaxonomySelectorComponent } from './components/taxonomy-selector/taxonomy-selector.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromVocabulary from './+state/vocabulary/vocabulary.reducer';
import { VocabularyEffects } from './+state/vocabulary/vocabulary.effects';
import { VocabularyEditComponent } from './components/vocabulary-edit/vocabulary-edit.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule,
    StoreModule.forFeature(
      fromVocabulary.VOCABULARY_FEATURE_KEY,
      fromVocabulary.reducer
    ),
    EffectsModule.forFeature([VocabularyEffects])
  ],
  declarations: [TaxonomySelectorComponent, VocabularyEditComponent],
  exports: [TaxonomySelectorComponent, VocabularyEditComponent]
})
export class TaxonomyModule {}
