import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TaxonomyModule, VocabularyEditComponent, VocabularyCreateComponent } from '@classifieds-ui/taxonomy';
import { MaterialModule } from '@classifieds-ui/material';
import { VocabularyBrowserComponent } from './components/vocabulary-browser/vocabulary-browser.component';
import { VocabularyMasterComponent } from './components/vocabulary-master/vocabulary-master.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromVocabularies from './+state/vocabularies/vocabularies.reducer';
import { VocabulariesEffects } from './+state/vocabularies/vocabularies.effects';
import { VocabulariesFacade } from './+state/vocabularies/vocabularies.facade';
import { VocabularySearchBarComponent } from './components/vocabulary-search-bar/vocabulary-search-bar.component';

const routes = [
  {
    path: '',
    component: VocabularyBrowserComponent,
    children: [
      { path: 'vocabulary/:vocabularyId', component: VocabularyEditComponent },
      { path: 'create', component: VocabularyCreateComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    TaxonomyModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(
      fromVocabularies.VOCABULARIES_FEATURE_KEY,
      fromVocabularies.reducer
    ),
    EffectsModule.forFeature([VocabulariesEffects])
  ],
  declarations: [
    VocabularyBrowserComponent,
    VocabularyMasterComponent,
    VocabularySearchBarComponent
  ],
  providers: [VocabulariesFacade]
})
export class VocabularyModule {}
