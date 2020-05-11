import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ArrayTypeComponent } from './components/array-type/array-type.component';
import { ObjectTypeComponent } from './components/object-type/object-type.component';
import { MultiSchemaTypeComponent } from './components/multi-schema-type/multi-schema-type.component';
import { NullTypeComponent } from './components/null-type/null-type.component';
// import { SelectOverrideComponent } from './components/select-override/select-override.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatSelectModule } from '@angular/material/select';
import { FormlyFieldNativeSelect } from '@ngx-formly/material/native-select';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { MatPseudoCheckboxModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormlyMatFormFieldModule,
    FormlySelectModule,
    MatPseudoCheckboxModule,
    FormlyMaterialModule,
    FormlyModule.forRoot({
      extras: { immutable: true },
      types: [
        {
          name: 'native-select',
          component: FormlyFieldNativeSelect,
          wrappers: ['form-field'],
        },
        /*{
          name: 'select-override',
          component: SelectOverrideComponent,
          wrappers: ['form-field'],
        },*/
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
    })
  ],
  declarations: [
    ArrayTypeComponent,
    ObjectTypeComponent,
    MultiSchemaTypeComponent,
    NullTypeComponent,
    // SelectOverrideComponent,
    // FormlyFieldNativeSelect
  ]
})
export class JsonschemaModule {}
