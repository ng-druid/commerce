import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TaxonomyModule } from '@classifieds-ui/taxonomy';
import { MaterialModule } from '@classifieds-ui/material';
import { VocabularyBrowserComponent } from './components/vocabulary-browser/vocabulary-browser.component';
import { VocabularyMasterComponent } from './components/vocabulary-master/vocabulary-master.component';
import { CreateVocabularyComponent } from './components/create-vocabulary/create-vocabulary.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromVocabularies from './+state/vocabularies/vocabularies.reducer';
import { VocabulariesEffects } from './+state/vocabularies/vocabularies.effects';
import { VocabulariesFacade } from './+state/vocabularies/vocabularies.facade';

const routes = [
  {
    path: '',
    component: VocabularyBrowserComponent,
    children: [
      { path: 'create-vocabulary', component: CreateVocabularyComponent }
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
    CreateVocabularyComponent
  ],
  providers: [VocabulariesFacade]
})
export class VocabularyModule {}
