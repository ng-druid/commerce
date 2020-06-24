import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@classifieds-ui/material';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, HttpClientModule, HttpClientJsonpModule],
})
export class AutosModule {}
