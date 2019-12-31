import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EntityDefinitionService } from '@ngrx/data';
import { TaxonomyModule, VocabularyEditComponent, VocabularyCreateComponent } from '@classifieds-ui/taxonomy';
import { MaterialModule } from '@classifieds-ui/material';
import { VocabularyBrowserComponent } from './components/vocabulary-browser/vocabulary-browser.component';
import { VocabularyMasterComponent } from './components/vocabulary-master/vocabulary-master.component';
import { VocabularySearchBarComponent } from './components/vocabulary-search-bar/vocabulary-search-bar.component';
import { entityMetadata } from './entity-metadata';

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
  ],
  declarations: [
    VocabularyBrowserComponent,
    VocabularyMasterComponent,
    VocabularySearchBarComponent
  ]
})
export class VocabularyModule {
  constructor(eds: EntityDefinitionService) {
    eds.registerMetadataMap(entityMetadata);
  }
}
