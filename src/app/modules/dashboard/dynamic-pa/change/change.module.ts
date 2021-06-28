import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeRoutingModule } from './change-routing.module';
import { ChangeComponent } from './change.component';
import { NewRequestModule } from '../../requests/new-request/new-request.module';
import { SharedModule } from '../../shared/shared.module';
import { GlobalSharedModule } from '../../../../shared/global-shared.module';


@NgModule({
  declarations: [ChangeComponent],
  imports: [
    CommonModule,
    ChangeRoutingModule,
    NewRequestModule,
    SharedModule,
    GlobalSharedModule
  ]
})
export class ChangeModule { }
