import { Injectable } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { BaseDialogComponent } from '../../../shared/components/base-dialog/base-dialog.component';
import { DialogOptionService } from '../dialog/dialog-option.service';
import { Router } from '@angular/router';
import { ClaimService } from '../../../modules/dashboard/claims/new-claim/claim-types/claim/services/claim.service';
import { RefundService } from '../../../modules/dashboard/claims/new-claim/claim-types/refund/services/refund.service';
import { NewAuthorizationService } from '../../../modules/dashboard/authorizations/new-authorization/services/new-authorization.service';


@Injectable({
	providedIn: 'root'
})
export class FormHandlerService {
	sendedForm;

	constructor(
		private dialog: MatDialog,
		private dialogOption: DialogOptionService,
		private route: Router,
		private claimService: ClaimService,
		private refundService: RefundService,
		private newAuthorizationService:NewAuthorizationService
	) { }

	sendForm(form: FormGroup, name: string) {
		console.log('Impresion de formulario down here: ', form);
		this.dialogHandler(form, name);
	}

	dialogHandler(form: FormGroup, name: string) {
		let Dialog;
		let dataOpen;
		let dataClosing;
		let route;

		switch (name) {
			case 'claims-reclaim':
				dataOpen = this.dialogOption.reclaimConfirmation;
				dataClosing = this.dialogOption.reclaimConfirmated;
				route = 'dashboard/claims';
				break;

			case 'claims-refund':
				dataOpen = this.dialogOption.refundConfirmation;
				dataClosing = this.dialogOption.refundConfirmated;
				route = 'dashboard/claims';
				break;

			case 'new-authorization':
				dataOpen = this.dialogOption.authorizationConfirmation;
				dataClosing = this.dialogOption.authorizationConfirmated;
				route = 'dashboard/authorizations';
				break;
		}

		Dialog = this.dialog.open(BaseDialogComponent, {
			data: dataOpen,
			minWidth: 385,
		});

		Dialog.afterClosed().subscribe((result) => {
			if (result === 'true') {
				let dialog;
				this.sendedForm = form.value;
				const json = JSON.stringify(this.sendedForm);
				console.log('preview: ', json);

				if (form.valid) {
					dialog = this.dialog.open(BaseDialogComponent, {
						data: dataClosing,
						minWidth: 385

					});
					this.sendedForm = form.value;

					const json = JSON.stringify(this.sendedForm);
					
					if (name === 'claims-reclaim') {

						this.claimService.postClaim(json)
							.subscribe(res => {
								console.log(res);
							});
					}

					else if (name === 'claims-refund') {

						this.refundService.postClaim(json)
							.subscribe(res => {
								console.log(res);
							});
					}

					else if (name === 'new-authorization') {

						this.newAuthorizationService.postClaim(json)
							.subscribe(res => {
								console.log(res);
							});
					}

					console.log(JSON.stringify(this.sendedForm));

					// this.route.navigateByUrl(route);
				} else {
					dialog = this.dialog.open(BaseDialogComponent, {
						data: this.dialogOption.formError,
						minWidth: 385
					});
				}

				setTimeout(() => {
					dialog.close();

				}, 3000);
			}
		});
	}
}
