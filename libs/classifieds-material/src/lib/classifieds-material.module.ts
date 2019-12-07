import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [ScrollingModule, MatInputModule, MatIconModule ]
})
export class ClassifiedsMaterialModule {}
