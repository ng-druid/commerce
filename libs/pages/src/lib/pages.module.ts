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
import { CreateGridLayoutComponent } from './components/create-grid-layout/create-grid-layout.component';
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
import { PageBuilderComponent } from './components/page-builder/page-builder.component';
import { ContentEditorComponent } from './components/content-editor/content-editor.component';
import { SnippetEditorComponent } from './components/snippet-editor/snippet-editor.component';
import { GridLayoutFormComponent } from './components/grid-layout-form/grid-layout-form.component';
import { GridLayoutMasterComponent } from './components/grid-layout-master/grid-layout-master.component';
import { PanelPageComponent } from './components/panel-page/panel-page.component';
import { RenderPaneComponent } from './components/render-pane/render-pane.component';
import { PanelPageRouterComponent } from './components/panel-page-router/panel-page-router.component';
import { CreatePanelPageComponent } from './components/create-panel-page/create-panel-page.component';
import { EditPanelPageComponent } from './components/edit-panel-page/edit-panel-page.component';

const routes = [
  { path: 'create-grid-layout', component: CreateGridLayoutComponent },
  { path: 'create-panel-page', component: CreatePanelPageComponent },
  { path: 'page-builder', component: PageBuilderComponent },
  { path: 'grid-layouts', component: GridLayoutMasterComponent },
  { path: 'panelpage/:panelPageId/manage', component: EditPanelPageComponent },
  { path: 'panelpage/:panelPageId', component: PanelPageRouterComponent },
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
  declarations: [GridLayoutComponent, CreateGridLayoutComponent, ContentSelectorComponent, ContentSelectionHostDirective, PaneContentHostDirective, EditablePaneComponent, SnippetFormComponent, SnippetPaneRendererComponent, PageBuilderComponent, ContentEditorComponent, SnippetEditorComponent, GridLayoutFormComponent, GridLayoutMasterComponent, PanelPageComponent, RenderPaneComponent, PanelPageRouterComponent, CreatePanelPageComponent, EditPanelPageComponent],
  providers: [
    { provide: EMBEDDABLE_COMPONENT, useValue: MarkdownComponent, multi: true },
    { provide: EMBEDDABLE_COMPONENT, useValue: PanelPageComponent, multi: true },
    { provide: CONTENT_PLUGIN, useValue: new ContentPlugin({ title: 'Snippet', name: 'snippet', selectionComponent: undefined, renderComponent: SnippetPaneRendererComponent, editorComponent: SnippetEditorComponent }), multi: true }
  ],
  // exports: [ConvertLinksDirective]
})
export class PagesModule {
  constructor(eds: EntityDefinitionService) {
    eds.registerMetadataMap(entityMetadata);
  }
}
