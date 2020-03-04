import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardLayoutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [],
  providers: [],
})
export class DashboardLayoutModule {}
