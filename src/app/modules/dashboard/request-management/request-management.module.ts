import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestManagementComponent } from './request-management.component';
import { RequestManagementRoutingModule } from './request-management-routing.module';
import { FilterComponent } from '../shared/components/filter/filter.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';



@NgModule({
  declarations: [RequestManagementComponent],
  imports: [
    CommonModule,
    RequestManagementRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class RequestManagementModule { }
