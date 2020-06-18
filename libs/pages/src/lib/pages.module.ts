import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule, MarkdownComponent } from 'ngx-markdown';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@classifieds-ui/material';
import { UtilsModule, EMBEDDABLE_COMPONENT  } from '@classifieds-ui/utils';
import { EntityDefinitionService } from '@ngrx/data';
import { HttpClientModule } from '@angular/common/http';
import { PageConstructionFormComponent } from './components/page-construction-form/page-construction-form.component';
import { CreatePageComponent } from './components/create-page/create-page.component';
import { entityMetadata } from './entity-metadata';
import { PageComponent } from './components/page/page.component';
import { PageControllerComponent } from './components/page-controller/page-controller.component';
import { PageRouterLinkComponent } from './components/page-router-link/page-router-link.component';

const routes = [
  { path: 'create-page', component: CreatePageComponent },
  { path: '**', component: PageControllerComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    MarkdownModule.forChild(),
    UtilsModule
  ],
  declarations: [PageConstructionFormComponent, CreatePageComponent, PageComponent, PageControllerComponent],
  providers: [
    { provide: EMBEDDABLE_COMPONENT, useValue: PageRouterLinkComponent, multi: true },
    { provide: EMBEDDABLE_COMPONENT, useValue: PageComponent , multi: true},
    { provide: EMBEDDABLE_COMPONENT, useValue: MarkdownComponent, multi: true },
  ],
  // exports: [ConvertLinksDirective]
})
export class PagesModule {
  constructor(eds: EntityDefinitionService) {
    eds.registerMetadataMap(entityMetadata);
  }
}
