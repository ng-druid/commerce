import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MarkdownModule, MarkdownComponent } from 'ngx-markdown';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularSplitModule } from 'angular-split';
import { MaterialModule } from '@classifieds-ui/material';
import { UtilsModule, EMBEDDABLE_COMPONENT  } from '@classifieds-ui/utils';
import { AttributesModule } from '@classifieds-ui/attributes';
import { CONTENT_PLUGIN, ContentPlugin } from '@classifieds-ui/content';
import { GridsterModule } from 'angular-gridster2';
import { EntityDefinitionService } from '@ngrx/data';
import { HttpClientModule } from '@angular/common/http';
import { entityMetadata } from './entity-metadata';
import { GridLayoutComponent } from './components/grid-layout/grid-layout.component';
import { CreateLayoutComponent } from './components/create-layout/create-layout.component';
import { ContentSelectorComponent } from './components/content-selector/content-selector.component';
import { ContentSelectionHostDirective } from './directives/content-selection-host.directive';
import { PaneContentHostDirective } from './directives/pane-content-host.directive';
import { StoreModule } from '@ngrx/store';
import * as fromPageBuilder from './features/page-builder/page-builder.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PageBuilderEffects } from './features/page-builder/page-builder.effects';
import { EditablePaneComponent } from './components/editable-pane/editable-pane.component';
import { SnippetFormComponent } from './components/snippet-form/snippet-form.component';
import { SnippetPaneRendererComponent } from './components/snippet-pane-renderer/snippet-pane-renderer.component';
import { PageManagerConstructComponent } from './components/page-manager-construct/page-manager-construct.component';
import { ContentEditorComponent } from './components/content-editor/content-editor.component';

const routes = [
  { path: 'create-layout', component: CreateLayoutComponent },
  { path: 'content-editor', component: ContentEditorComponent },
  { path: 'page-manager', component: PageManagerConstructComponent },
  //{ path: '**', component: PageControllerComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularSplitModule,
    RouterModule.forChild(routes),
    MarkdownModule.forChild(),
    GridsterModule,
    UtilsModule,
    AttributesModule,
    StoreModule.forFeature(fromPageBuilder.pageBuilderFeatureKey, fromPageBuilder.reducer),
    EffectsModule.forFeature([PageBuilderEffects])
  ],
  declarations: [GridLayoutComponent, CreateLayoutComponent, ContentSelectorComponent, ContentSelectionHostDirective, PaneContentHostDirective, EditablePaneComponent, SnippetFormComponent, SnippetPaneRendererComponent, PageManagerConstructComponent, ContentEditorComponent],
  providers: [
    { provide: EMBEDDABLE_COMPONENT, useValue: MarkdownComponent, multi: true },
    { provide: CONTENT_PLUGIN, useValue: new ContentPlugin({ title: 'Snippet', name: 'snippet', selectionComponent: undefined, renderComponent: SnippetPaneRendererComponent, editorComponent: SnippetFormComponent }), multi: true }
  ],
  // exports: [ConvertLinksDirective]
})
export class PagesModule {
  constructor(eds: EntityDefinitionService) {
    eds.registerMetadataMap(entityMetadata);
  }
}
