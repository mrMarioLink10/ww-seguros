import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { FormsContainerComponent } from './components/forms-container/forms-container.component';
import { CardiovascularComponent } from './components/disease/cardiovascular/cardiovascular.component';
import { GlobalSharedModule } from '../../../shared/global-shared.module';
import { DiseasesInfoComponent } from './components/disease/shared/diseases-info/diseases-info.component';
import { SpineComponent } from './components/disease/spine/spine.component';
import { KnowYourClientComponent } from './components/disease/know-your-client/know-your-client.component';
import { MoneyLaunderingComponent } from './components/disease/money-laundering/money-laundering.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArthritisComponent } from './components/disease/arthritis/arthritis.component';
import { MusculoskeletalComponent } from './components/disease/musculoskeletal/musculoskeletal.component';
import { RenalUrinaryComponent } from './components/disease/renal-urinary/renal-urinary.component';
import { HypertensionComponent } from './components/disease/hypertension/hypertension.component';
import { ProstaticComponent } from './components/disease/prostatic/prostatic.component';
import { MellitusDiabetesComponent } from './components/disease/mellitus-diabetes/mellitus-diabetes.component';

import { HttpClientModule } from '@angular/common/http';
import { MountaineeringComponent } from './components/disease/mountaineering/mountaineering.component';
import { SkydivingComponent } from './components/disease/skydiving/skydiving.component';
import { RacingComponent } from './components/disease/racing/racing.component';
import { DivingComponent } from './components/disease/diving/diving.component';
import { FinancialStatusComponent } from './components/disease/financial-status/financial-status.component';
import { KnowYourCustomerComponent } from './components/disease/know-your-customer/know-your-customer.component';
import { TableStatusPipe } from '../../../core/pipes/table-status.pipe';

@NgModule({
  declarations: [
    FilterComponent,
    FormsContainerComponent,
    CardiovascularComponent,
    DiseasesInfoComponent,
    SpineComponent,
    KnowYourClientComponent,
    MoneyLaunderingComponent,
    ArthritisComponent,
    MusculoskeletalComponent,
    RenalUrinaryComponent,
    HypertensionComponent,
    ProstaticComponent,
    MellitusDiabetesComponent,
    DivingComponent,
    RacingComponent,
    SkydivingComponent,
    MountaineeringComponent,
    FinancialStatusComponent,
    KnowYourCustomerComponent,
    TableStatusPipe
  ],
  imports: [CommonModule, MaterialModule, GlobalSharedModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    FilterComponent,
    FormsContainerComponent,
    CardiovascularComponent,
    DiseasesInfoComponent,
    SpineComponent,
    KnowYourClientComponent,
    MoneyLaunderingComponent,
    ArthritisComponent,
    MusculoskeletalComponent,
    RenalUrinaryComponent,
    HypertensionComponent,
    ProstaticComponent,
    MellitusDiabetesComponent,
    MountaineeringComponent,
    SkydivingComponent,
    RacingComponent,
    DivingComponent,
    FinancialStatusComponent,
    KnowYourCustomerComponent,
    TableStatusPipe
  ]
})
export class SharedModule { }
