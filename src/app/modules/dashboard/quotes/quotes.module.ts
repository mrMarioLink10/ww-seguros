import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesComponent } from './quotes.component';
import { QuotesRoutingModule } from './quotes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';



@NgModule({
  declarations: [QuotesComponent],
  imports: [
    CommonModule,
    QuotesRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class QuotesModule { }
