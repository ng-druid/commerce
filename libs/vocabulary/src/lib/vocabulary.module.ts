import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VocabularyBrowserComponent } from './components/vocabulary-browser/vocabulary-browser.component';
import { VocabularyMasterComponent } from './components/vocabulary-master/vocabulary-master.component';
import { CreateVocabularyComponent } from './components/create-vocabulary/create-vocabulary.component';

const routes = [
  { path: '', component: VocabularyBrowserComponent, children: [
    { path: 'create-vocabulary', component: CreateVocabularyComponent },
  ]}
];

@NgModule({
  imports: [CommonModule, FlexLayoutModule, RouterModule.forChild(routes)],
  declarations: [VocabularyBrowserComponent, VocabularyMasterComponent, CreateVocabularyComponent]
})
export class VocabularyModule {}
