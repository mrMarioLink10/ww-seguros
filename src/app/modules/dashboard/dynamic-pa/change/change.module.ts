import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeRoutingModule } from './change-routing.module';
import { ChangeComponent } from './change.component';
import { NewRequestModule } from '../../requests/new-request/new-request.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [ChangeComponent],
  imports: [
    CommonModule,
    ChangeRoutingModule,
    NewRequestModule,
    SharedModule
  ]
})
export class ChangeModule { }
