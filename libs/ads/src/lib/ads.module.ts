import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EntityDefinitionService, EntityDataService } from '@ngrx/data';
import { MaterialModule } from '@classifieds-ui/material';
import { TaxonomyModule } from '@classifieds-ui/taxonomy';
import { CitiesModule } from '@classifieds-ui/cities';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDropzoneModule } from 'ngx-dropzone';


import { AdBrowserComponent } from './components/ad-browser/ad-browser.component';
import { AdDetailComponent } from './components/ad-detail/ad-detail.component';
import { CreateAdComponent } from './components/create-ad/create-ad.component';
import { AdMasterComponent } from './components/ad-master/ad-master.component';
import { AdSearchBarComponent } from './components/ad-search-bar/ad-search-bar.component';
import { AdDetailTabComponent } from './components/ad-detail/ad-detail-tab/ad-detail-tab.component';
import { AdGalleryTabComponent } from './components/ad-detail/ad-gallery-tab/ad-gallery-tab.component';
import { entityMetadata } from './entity-metadata';

const routes = [
  { path: '', component: AdBrowserComponent, children: [
    { path: 'ad/:adId', component: AdDetailComponent },
    { path: 'create-ad', component: CreateAdComponent },
  ] }
];

@NgModule({
  declarations: [AdDetailComponent, CreateAdComponent, AdMasterComponent, AdSearchBarComponent, AdBrowserComponent, AdDetailTabComponent, AdGalleryTabComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    NgxDropzoneModule,
    TaxonomyModule,
    CitiesModule
  ]
})
export class AdsModule {
  constructor(eds: EntityDefinitionService, entityDataService: EntityDataService) {
    eds.registerMetadataMap(entityMetadata);
  }
}
