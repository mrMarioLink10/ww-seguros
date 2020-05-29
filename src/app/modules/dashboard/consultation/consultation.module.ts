import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultationRoutingModule } from './consultation-routing.module';
import { ConsultationComponent } from './consultation.component';
import { ConsultHeaderComponent } from './consult-header/consult-header.component';
import { PolicyFilterComponent } from './policy-content/policy-filter/policy-filter.component';
import {ReactiveFormsModule} from '@angular/forms';
import { PolicyTableComponent } from './policy-content/policy-table/policy-table.component';
import {MatSortModule} from '@angular/material/sort';
import {MaterialModule} from '../../../shared/modules/material.module';
import { BillsFilterComponent } from './bills-content/bills-filter/bills-filter.component';
import { BillsTableComponent } from './bills-content/bills-table/bills-table.component';

@NgModule({
  declarations: [ConsultationComponent, ConsultHeaderComponent, PolicyFilterComponent, PolicyTableComponent, BillsFilterComponent, BillsTableComponent],
  imports: [
    CommonModule,
    ConsultationRoutingModule,
    ReactiveFormsModule,
    MatSortModule,
    MaterialModule
  ]
})
export class ConsultationModule { }
