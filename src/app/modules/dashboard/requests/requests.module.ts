import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import { RequestsRoutingModule } from './requests-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { NewRequestComponent } from './new-request/new-request/new-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedDirectivesModule } from 'src/app/core/directive';
import { NewSubscriptionRequestComponent } from './new-subscription-request/new-subscription-request/new-subscription-request.component';
import { GlobalSharedModule } from 'src/app/shared/global-shared.module';
import { FormComponentsModule } from 'src/app/shared/components/form-components/form-components.module';

@NgModule({
	declarations: [ RequestsComponent, NewRequestComponent, NewSubscriptionRequestComponent ],
	imports: [
		CommonModule,
		RequestsRoutingModule,
		SharedModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		SharedDirectivesModule,
		FormComponentsModule
	]
})
export class RequestsModule {}
