import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { FormlyModule } from '@ngx-formly/core';
// import { FormlyMaterialModule } from '@ngx-formly/material';
import { MaterialModule } from '@classifieds-ui/material';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EntityDefinitionService, EntityDataService } from '@ngrx/data';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { entityMetadata } from './entity-metadata';
import { ProfileMasterComponent } from './components/profile-master/profile-master.component';
import { LocationMasterComponent } from './components/location-master/location-master.component';
import { ProfileBrowserComponent } from './components/profile-browser/profile-browser.component';
import { ProfileDashboardComponent } from './components/profile-dashboard/profile-dashboard.component';

const routes = [
  { path: '', component: ProfileBrowserComponent, children: [
    { path: 'profile/:profileId', component: ProfileDashboardComponent },
    { path: 'create-profile', component: CreateProfileComponent },
  ] }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxDropzoneModule,
    RouterModule.forChild(routes),
    /*FormlyModule.forChild(),
    FormlyMaterialModule*/
  ],
  declarations: [CreateProfileComponent, ProfileMasterComponent, LocationMasterComponent, ProfileBrowserComponent, ProfileDashboardComponent]
})
export class ProfilesModule {
  constructor(eds: EntityDefinitionService, entityDataService: EntityDataService) {
    eds.registerMetadataMap(entityMetadata);
  }
}
