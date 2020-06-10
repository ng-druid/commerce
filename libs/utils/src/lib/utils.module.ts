import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumeralPipe } from './pipes/numeral.pipe';
import { NotAvailablePipe } from './pipes/not-available.pipe';
// import { DynamicContentViewer } from './components/dynamic-content-viewer/dynamic-content-viewer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NumeralPipe, NotAvailablePipe],
  exports: [NumeralPipe, NotAvailablePipe]
})
export class UtilsModule {}
