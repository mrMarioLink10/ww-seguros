import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import { RequestsRoutingModule } from './requests-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedDirectivesModule } from 'src/app/core/directive';
import { GlobalSharedModule } from 'src/app/shared/global-shared.module';
import { ServicesModule } from 'src/app/core/services/services.module';
import { NewRequestComponent } from './new-request/new-request.component';

@NgModule({
	declarations: [RequestsComponent],
	imports: [
		CommonModule,
		RequestsRoutingModule,
		SharedModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		SharedDirectivesModule,
		GlobalSharedModule,
		ServicesModule
	]
})
export class RequestsModule { }
