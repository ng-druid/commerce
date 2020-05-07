import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';

const routes = [
  { path: 'create-profile', component: CreateProfileComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormlyModule.forChild(),
    FormlyMaterialModule
  ],
  declarations: [CreateProfileComponent]
})
export class ProfilesModule {}
