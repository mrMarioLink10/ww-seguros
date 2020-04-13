import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterComponent } from "./components/filter/filter.component";
import { MaterialModule } from "src/app/shared/modules/material.module";
import { FormsContainerComponent } from "./components/forms-container/forms-container.component";
import { CardiovascularComponent } from "./components/disease/cardiovascular/cardiovascular.component";
import { GlobalSharedModule } from "../../../shared/global-shared.module";
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

import { HttpClientModule } from '@angular/common/http'

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
    MellitusDiabetesComponent
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
    MellitusDiabetesComponent
  ]
})
export class SharedModule { }
