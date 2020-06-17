import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageConstructionFormComponent } from './components/page-construction-form/page-construction-form.component';
import { CreatePageComponent } from './components/create-page/create-page.component';

const routes = [
  { path: 'create-page', component: CreatePageComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [PageConstructionFormComponent, CreatePageComponent]
})
export class PagesModule {}
