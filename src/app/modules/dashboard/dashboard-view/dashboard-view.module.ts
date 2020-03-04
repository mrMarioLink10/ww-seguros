import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardViewComponent } from './dashboard-view.component';
import { DashboardViewRoutingModule } from './dashboard-view-routing.module';



@NgModule({
  declarations: [DashboardViewComponent],
  imports: [
    CommonModule,
    DashboardViewRoutingModule
  ]
})
export class DashboardViewModule { }
