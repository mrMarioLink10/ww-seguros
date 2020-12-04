import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalSharedModule } from 'src/app/shared/global-shared.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';

import { PolicyAdministrationComponent } from './policy-administration.component';
import { PolicyAdministrationRoutingModule } from './policy-administration-routing.module';


@NgModule({
  declarations: [PolicyAdministrationComponent],
  imports: [
    CommonModule,
    PolicyAdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GlobalSharedModule,
    SharedModule,
    MaterialModule
  ]
})
export class PolicyAdministrationModule { }
