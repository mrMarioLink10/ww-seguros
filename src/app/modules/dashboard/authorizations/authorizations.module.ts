import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationsRoutingModule } from './authorizations-routing.module';
import { AuthorizationsComponent } from './authorizations.component';
import { NewAuthorizationComponent } from './new-authorization/new-authorization.component';
import { GlobalSharedModule } from '../../../shared/global-shared.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AuthorizationsComponent, NewAuthorizationComponent],
  imports: [
    CommonModule,
    AuthorizationsRoutingModule,
    GlobalSharedModule,
    SharedModule,
    ReactiveFormsModule,

  ]
})
export class AuthorizationsModule { }
