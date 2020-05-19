import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRequestRoutingModule } from './new-request-routing.module';
import { LifeComponent } from './life/life.component';
import { MajorExpensesComponent } from './major-expenses/major-expenses.component';
import { GlobalSharedModule } from '../../../../shared/global-shared.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedDirectivesModule } from 'src/app/core/directive';
import { ServicesModule } from 'src/app/core/services/services.module';
import { NewRequestComponent } from './new-request.component';
import { DisabilityComponent } from './disability/disability.component';
import { KnowYourCustomerComponent } from '../../shared/components/disease/know-your-customer/know-your-customer.component'


@NgModule({
  declarations: [NewRequestComponent, LifeComponent, MajorExpensesComponent, DisabilityComponent],
  imports: [
    NewRequestRoutingModule,
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
export class NewRequestModule { }
