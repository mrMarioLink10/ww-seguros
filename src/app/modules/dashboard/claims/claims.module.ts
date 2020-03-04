import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimsComponent } from './claims.component';
import { ClaimsRoutingModule } from './claims-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';



@NgModule({
  declarations: [ClaimsComponent],
  imports: [
    CommonModule,
    ClaimsRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class ClaimsModule { }
