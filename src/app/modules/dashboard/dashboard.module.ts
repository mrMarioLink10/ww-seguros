import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LoginModule } from '../auth/login/login.module';
import { DashboardLayoutModule } from './shared/layouts/dashboard-layout/dashboard-layout.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { RequestManagementModule } from './request-management/request-management.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    MaterialModule,
    RequestManagementModule,
    DashboardRoutingModule,
    LoginModule,
    DashboardLayoutModule,
    RouterModule
  ],
  exports: [
    MaterialModule
  ]
})
export class DashboardModule { }
