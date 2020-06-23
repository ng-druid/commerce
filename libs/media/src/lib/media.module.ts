import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  imports: [CommonModule, HttpClientModule, NgxDropzoneModule]
})
export class MediaModule {}
