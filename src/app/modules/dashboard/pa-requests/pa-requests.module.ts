import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaRequestsRoutingModule } from './pa-requests-routing.module';
import { PaRequestsComponent } from './pa-requests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedDirectivesModule } from 'src/app/core/directive';
import { ServicesModule } from 'src/app/core/services/services.module';
import { GlobalSharedModule } from 'src/app/shared/global-shared.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PaRequestsComponent],
  imports: [
    CommonModule,
    PaRequestsRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedDirectivesModule,
    GlobalSharedModule,
    ServicesModule,
  ]
})
export class PaRequestsModule { }
