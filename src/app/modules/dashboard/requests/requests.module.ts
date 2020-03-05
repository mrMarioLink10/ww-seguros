import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import { RequestsRoutingModule } from './requests-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { NewRequestComponent } from './new-request/new-request/new-request.component';



@NgModule({
  declarations: [RequestsComponent, NewRequestComponent],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class RequestsModule { }
