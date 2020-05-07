import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrayTypeComponent } from './components/array-type/array-type.component';
import { ObjectTypeComponent } from './components/object-type/object-type.component';
import { MultiSchemaTypeComponent } from './components/multi-schema-type/multi-schema-type.component';
import { NullTypeComponent } from './components/null-type/null-type.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@NgModule({
  imports: [
    CommonModule,
    FormlyModule.forRoot({
      types: [
        { name: 'string', extends: 'input' },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        {
          name: 'integer',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        { name: 'boolean', extends: 'checkbox' },
        { name: 'enum', extends: 'select' },
        { name: 'null', component: NullTypeComponent, wrappers: ['form-field'] },
        { name: 'array', component: ArrayTypeComponent },
        { name: 'object', component: ObjectTypeComponent },
        { name: 'multischema', component: MultiSchemaTypeComponent },
      ]
    }),
    FormlyMaterialModule,
  ],
  declarations: [
    ArrayTypeComponent,
    ObjectTypeComponent,
    MultiSchemaTypeComponent,
    NullTypeComponent,
  ]
})
export class JsonschemaModule {}
