import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MarkdownModule, MarkdownComponent } from 'ngx-markdown';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@classifieds-ui/material';
import { UtilsModule, EMBEDDABLE_COMPONENT  } from '@classifieds-ui/utils';
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
    UtilsModule
  ],
  declarations: [PageConstructionFormComponent, CreatePageComponent, PageComponent, PageControllerComponent, LayoutConstructionFormComponent, CreateLayoutComponent, ContentSelectorComponent, PageSelectorComponent, ContentSelectionHostDirective],
  providers: [
    { provide: EMBEDDABLE_COMPONENT, useValue: PageRouterLinkComponent, multi: true },
    { provide: EMBEDDABLE_COMPONENT, useValue: PageComponent , multi: true},
    { provide: EMBEDDABLE_COMPONENT, useValue: MarkdownComponent, multi: true },
    { provide: CONTENT_PROVIDER, useValue: new ContentProvider({ title: 'page', selectionComponent: PageSelectorComponent }), multi: true }
  ],
  // exports: [ConvertLinksDirective]
})
export class PagesModule {
  constructor(eds: EntityDefinitionService) {
    eds.registerMetadataMap(entityMetadata);
  }
}
