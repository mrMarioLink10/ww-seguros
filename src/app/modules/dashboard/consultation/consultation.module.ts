import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultationRoutingModule } from './consultation-routing.module';
import { ConsultationComponent } from './consultation.component';
import { ConsultHeaderComponent } from './consult-header/consult-header.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PolicyFilterComponent } from './policy-content/policy-filter/policy-filter.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {DateAdapter} from '@angular/material/core';

@NgModule({
  declarations: [ConsultationComponent, ConsultHeaderComponent, PolicyFilterComponent],
  imports: [
    CommonModule,
    ConsultationRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule
  ]
})
export class ConsultationModule { }
