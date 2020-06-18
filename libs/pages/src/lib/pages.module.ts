import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MarkdownModule, MarkdownComponent } from 'ngx-markdown';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@classifieds-ui/material';
import { UtilsModule, EMBEDDABLE_COMPONENT  } from '@classifieds-ui/utils';
import { AttributesModule } from '@classifieds-ui/attributes';
import { CONTENT_PROVIDER, ContentProvider } from '@classifieds-ui/content';
import { GridsterModule } from 'angular-gridster2';
import { EntityDefinitionService } from '@ngrx/data';
import { HttpClientModule } from '@angular/common/http';
import { PageConstructionFormComponent } from './components/page-construction-form/page-construction-form.component';
import { CreatePageComponent } from './components/create-page/create-page.component';
import { entityMetadata } from './entity-metadata';
import { PageComponent } from './components/page/page.component';
import { PageControllerComponent } from './components/page-controller/page-controller.component';
import { PageRouterLinkComponent } from './components/page-router-link/page-router-link.component';
import { LayoutConstructionFormComponent } from './components/layout-construction-form/layout-construction-form.component';
import { CreateLayoutComponent } from './components/create-layout/create-layout.component';
import { ContentSelectorComponent } from './components/content-selector/content-selector.component';
import { PageSelectorComponent } from './components/page-selector/page-selector.component';
import { ContentSelectionHostDirective } from './directives/content-selection-host.directive';
import { PanelContentHostDirective } from './directives/panel-content-host.directive';
import { StoreModule } from '@ngrx/store';
import * as fromPageBuilder from './features/page-builder/page-builder.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PageBuilderEffects } from './features/page-builder/page-builder.effects';
import { PagePaneRendererComponent } from './components/page-pane-renderer/page-pane-renderer.component';
import { EditablePaneComponent } from './components/editable-pane/editable-pane.component';

const routes = [
  { path: 'create-page', component: CreatePageComponent },
  { path: 'create-layout', component: CreateLayoutComponent },
  { path: '**', component: PageControllerComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    MarkdownModule.forChild(),
    GridsterModule,
    UtilsModule,
    AttributesModule,
    StoreModule.forFeature(fromPageBuilder.pageBuilderFeatureKey, fromPageBuilder.reducer),
    EffectsModule.forFeature([PageBuilderEffects])
  ],
  declarations: [PageConstructionFormComponent, CreatePageComponent, PageComponent, PageControllerComponent, LayoutConstructionFormComponent, CreateLayoutComponent, ContentSelectorComponent, PageSelectorComponent, ContentSelectionHostDirective, PanelContentHostDirective, PagePaneRendererComponent, EditablePaneComponent],
  providers: [
    { provide: EMBEDDABLE_COMPONENT, useValue: PageRouterLinkComponent, multi: true },
    { provide: EMBEDDABLE_COMPONENT, useValue: PageComponent , multi: true},
    { provide: EMBEDDABLE_COMPONENT, useValue: MarkdownComponent, multi: true },
    { provide: CONTENT_PROVIDER, useValue: new ContentProvider({ title: 'Page', name: 'page', selectionComponent: PageSelectorComponent, renderComponent: PagePaneRendererComponent }), multi: true },
    { provide: CONTENT_PROVIDER, useValue: new ContentProvider({ title: 'Markdown', name: 'markdown', selectionComponent: undefined, renderComponent: PagePaneRendererComponent }), multi: true }
  ],
  // exports: [ConvertLinksDirective]
})
export class PagesModule {
  constructor(eds: EntityDefinitionService) {
    eds.registerMetadataMap(entityMetadata);
  }
}
