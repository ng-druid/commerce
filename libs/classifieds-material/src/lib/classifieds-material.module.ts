import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [ScrollingModule]
})
export class ClassifiedsMaterialModule {}
