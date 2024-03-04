import { Routes, RouterModule, CanDeactivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClaimsComponent } from './claims.component';
import { NewClaimComponent } from './new-claim/new-claim.component';
import { ClaimComponent } from './new-claim/claim-types/claim/claim.component';
import { RefundComponent } from './new-claim/claim-types/refund/refund.component';
import { CanExitGuard } from '../../../core/guards/can-exit.guard';
import { DiagnosticsTableComponent } from './diagnostics-table/diagnostics-table.component';
import { RefundCommentsComponent } from './refund-comments/refund-comments.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ClaimsComponent,
		data: {
			slug: 'claims',
			name: 'Reclamos'
		}
	},
	{
		path: 'refund',
		data: {
			slug: 'refund',
			name: 'reembolsos'
		},
		children: [
			{ path: ':refundId/diagnostics/:diagnosticId/comments', component: RefundCommentsComponent, canDeactivate: [CanExitGuard]},
			{ path: ':refundId/diagnostics', component: DiagnosticsTableComponent, canDeactivate: [CanExitGuard]}
		]
	},
	{
		path: 'new-claim',
		component: NewClaimComponent,
		data: {
			slug: 'new-claim',
			name: 'Nuevo Reclamo'
		},
		children: [
			{ path: 'claim', component: ClaimComponent, canDeactivate: [CanExitGuard] },
			{ path: 'claim/:id', component: ClaimComponent, canDeactivate: [CanExitGuard] },
			{ path: 'refund', component: RefundComponent, canDeactivate: [CanExitGuard] },
			{ path: 'refund/:id', component: RefundComponent, canDeactivate: [CanExitGuard] }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ClaimsRoutingModule { }
