import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MajorExpensesRoutingModule } from './major-expenses-routing.module';
import { MajorExpensesComponent } from './major-expenses.component';
import { SharedModule } from '../../dashboard/shared/shared.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedDirectivesModule } from 'src/app/core/directive';
import { GlobalSharedModule } from 'src/app/shared/global-shared.module';
import { ServicesModule } from 'src/app/core/services/services.module';
import { KnowYourCustomerComponent } from '../../dashboard/shared/components/disease/know-your-customer/know-your-customer.component';


@NgModule({
  declarations: [MajorExpensesComponent],
  imports: [
    MajorExpensesRoutingModule,
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedDirectivesModule,
    GlobalSharedModule,
    ServicesModule
  ], providers: [
    KnowYourCustomerComponent
  ]
})
export class MajorExpensesModule { }
