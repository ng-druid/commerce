import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MarkdownModule, MarkdownComponent } from 'ngx-markdown';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularSplitModule } from 'angular-split';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MaterialModule } from '@classifieds-ui/material';
import { MediaModule } from '@classifieds-ui/media';
import { UtilsModule, EMBEDDABLE_COMPONENT  } from '@classifieds-ui/utils';
import { AttributesModule } from '@classifieds-ui/attributes';
import { CONTENT_PLUGIN } from '@classifieds-ui/content';
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
import { SnippetPaneRendererComponent } from './plugins/snippet/snippet-pane-renderer/snippet-pane-renderer.component';
import { PageBuilderComponent } from './components/page-builder/page-builder.component';
import { ContentEditorComponent } from './components/content-editor/content-editor.component';
import { SnippetEditorComponent } from './plugins/snippet/snippet-editor/snippet-editor.component';
import { GridLayoutFormComponent } from './components/grid-layout-form/grid-layout-form.component';
import { GridLayoutMasterComponent } from './components/grid-layout-master/grid-layout-master.component';
import { PanelPageComponent } from './components/panel-page/panel-page.component';
import { RenderPaneComponent } from './components/render-pane/render-pane.component';
import { PanelPageRouterComponent } from './components/panel-page-router/panel-page-router.component';
import { CreatePanelPageComponent } from './components/create-panel-page/create-panel-page.component';
import { EditPanelPageComponent } from './components/edit-panel-page/edit-panel-page.component';
import { SnippetContentHandler } from './handlers/snippet-content.handler';
import { snippetContentPluginFactory, attributeContentPluginFactory, mediaContentPluginFactory } from './pages.factories';
import { AttributeSelectorComponent } from './plugins/attribute/attribute-selector/attribute-selector.component';
import { AttributeContentHandler } from './handlers/attribute-content.handler';
import { AttributeEditorComponent } from './plugins/attribute/attribute-editor/attribute-editor.component';
import { AttributePaneRendererComponent } from './plugins/attribute/attribute-pane-renderer/attribute-pane-renderer.component';
import { MediaContentHandler } from './handlers/media-content.handler';
import { MediaEditorComponent } from './plugins/media/media-editor/media-editor.component';
import { MediaPaneRendererComponent } from './plugins/media/media-pane-renderer/media-pane-renderer.component';

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
    NgxDropzoneModule,
    GridsterModule,
    UtilsModule,
    AttributesModule,
    MediaModule,
    StoreModule.forFeature(fromPageBuilder.pageBuilderFeatureKey, fromPageBuilder.reducer),
    EffectsModule.forFeature([PageBuilderEffects])
  ],
  declarations: [GridLayoutComponent, CreateGridLayoutComponent, ContentSelectorComponent, ContentSelectionHostDirective, PaneContentHostDirective, EditablePaneComponent, SnippetFormComponent, SnippetPaneRendererComponent, PageBuilderComponent, ContentEditorComponent, SnippetEditorComponent, GridLayoutFormComponent, GridLayoutMasterComponent, PanelPageComponent, RenderPaneComponent, PanelPageRouterComponent, CreatePanelPageComponent, EditPanelPageComponent, AttributeSelectorComponent, AttributeEditorComponent, AttributePaneRendererComponent, MediaEditorComponent, MediaPaneRendererComponent],
  providers: [
    { provide: EMBEDDABLE_COMPONENT, useValue: MarkdownComponent, multi: true },
    { provide: EMBEDDABLE_COMPONENT, useValue: PanelPageComponent, multi: true },
    { provide: SnippetContentHandler, useClass: SnippetContentHandler },
    { provide: AttributeContentHandler, useClass: AttributeContentHandler },
    { provide: MediaContentHandler, useClass: MediaContentHandler },
    { provide: CONTENT_PLUGIN, useFactory: snippetContentPluginFactory, multi: true, deps: [ SnippetContentHandler ] },
    { provide: CONTENT_PLUGIN, useFactory: attributeContentPluginFactory, multi: true, deps: [ AttributeContentHandler ] },
    { provide: CONTENT_PLUGIN, useFactory: mediaContentPluginFactory, multi: true, deps: [ MediaContentHandler ] }
  ],
  // exports: [ConvertLinksDirective]
})
export class PagesModule {
  constructor(eds: EntityDefinitionService) {
    eds.registerMetadataMap(entityMetadata);
  }
}
