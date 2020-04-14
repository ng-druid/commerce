import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumeralPipe } from './pipes/numeral.pipe';
import { NotAvailablePipe } from './pipes/not-available.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [NumeralPipe, NotAvailablePipe],
  exports: [NumeralPipe, NotAvailablePipe]
})
export class UtilsModule {}
