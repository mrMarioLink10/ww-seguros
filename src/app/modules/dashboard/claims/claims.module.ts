import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimsComponent } from './claims.component';
import { ClaimsRoutingModule } from './claims-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { NewClaimComponent } from './new-claim/new-claim.component';
import { ClaimComponent } from './new-claim/claim-types/claim/claim.component';
import { RefundComponent } from './new-claim/claim-types/refund/refund.component';
import { PreCertificationComponent } from './new-claim/claim-types/pre-certification/pre-certification.component';



@NgModule({
  declarations: [ClaimsComponent, NewClaimComponent, ClaimComponent, RefundComponent, PreCertificationComponent],
  imports: [
    CommonModule,
    ClaimsRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class ClaimsModule { }
