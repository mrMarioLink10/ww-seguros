import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicPaRoutingModule } from './dynamic-pa-routing.module';
import { DynamicPaComponent } from './dynamic-pa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalSharedModule } from 'src/app/shared/global-shared.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { QuoteComponent } from './quote/quote.component';
import { ChangeModule } from './change/change.module';


@NgModule({
  declarations: [DynamicPaComponent, QuoteComponent],
  imports: [
    CommonModule,
    DynamicPaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GlobalSharedModule,
    SharedModule,
    MaterialModule,
    ChangeModule
  ]
})
export class DynamicPaModule { }
