import { Injectable } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseDialogComponent } from '../../../shared/components/base-dialog/base-dialog.component';
import { DialogOptionService } from '../dialog/dialog-option.service';
import { Router } from '@angular/router';
import { ClaimService } from '../../../modules/dashboard/claims/new-claim/claim-types/claim/services/claim.service';
import { RefundService } from '../../../modules/dashboard/claims/new-claim/claim-types/refund/services/refund.service';
import { NewAuthorizationService } from '../../../modules/dashboard/authorizations/new-authorization/services/new-authorization.service';
import { LifeService } from 'src/app/modules/dashboard/requests/new-request/life/services/life.service';
import { MajorExpensesService } from '../../../modules/dashboard/requests/new-request/major-expenses/services/major-expenses.service';
import { DisabilityService } from '../../../modules/dashboard/requests/new-request/disability/services/disability.service';


@Injectable({
	providedIn: 'root'
})
export class FormHandlerService {
	sendedForm;
	errorServer = this.dialogOption.errorServer;

	constructor(
		private dialog: MatDialog,
		private dialogOption: DialogOptionService,
		private route: Router,
		private claimService: ClaimService,
		private refundService: RefundService,
		private newAuthorizationService: NewAuthorizationService,
		private lifeService: LifeService,
		private majorExpensesService: MajorExpensesService,
		private disabilityService: DisabilityService,
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

			case 'life':
				dataOpen = this.dialogOption.lifeConfirmation;
				dataClosing = this.dialogOption.requestConfirmated;
				route = 'dashboard/requests';
				break;

			case 'major-expenses':
				dataOpen = this.dialogOption.healthConfirmation;
				dataClosing = this.dialogOption.requestConfirmated;
				route = 'dashboard/requests';
				break;

			case 'disability':
				dataOpen = this.dialogOption.disabilityConfirmation;
				dataClosing = this.dialogOption.requestConfirmated;
				route = 'dashboard/requests';
				break;
		}

		Dialog = this.dialog.open(BaseDialogComponent, {
			data: dataOpen,
			minWidth: 385,
		});

		Dialog.afterClosed().subscribe((result) => {
			this.sendedForm = form.value;
			const json = JSON.stringify(this.sendedForm);
			console.log(json);

			if (result === 'true') {
				let dialog;

				if (form.valid) {

					switch (name) {
						case 'claims-reclaim':
							this.claimService.postClaim(json)
								.subscribe(res => {
									this.correctSend(res, dialog, dataClosing, route);

								}, (err) => {
									this.badSend(dialog);

								});
							break;

						case 'claims-refund':
							this.refundService.postClaim(json)
								.subscribe(res => {
									this.correctSend(res, dialog, dataClosing, route);

								}, (err) => {
									this.badSend(dialog);

								});
							break;

						case 'new-authorization':
							this.newAuthorizationService.postClaim(json)
								.subscribe(res => {
									this.correctSend(res, dialog, dataClosing, route);

								}, (err) => {
									this.badSend(dialog);

								});
							break;

						case 'life':
							this.lifeService.postRequest(json)
								.subscribe(res => {
									this.correctSend(res, dialog, dataClosing, route);

								}, (err) => {
									this.badSend(dialog);

								});
							break;

						case 'major-expenses':
							this.majorExpensesService.postRequest(json)
								.subscribe(res => {
									this.correctSend(res, dialog, dataClosing, route);

								}, (err) => {
									this.badSend(dialog);

								});
							break;

						case 'disability':
							this.disabilityService.postRequest(json)
								.subscribe(res => {
									this.correctSend(res, dialog, dataClosing, route);

								}, (err) => {
									this.badSend(dialog);

								});
							break;

						default:
							break;
					}

					console.log(JSON.stringify(this.sendedForm));
				} else {
					dialog = this.dialog.open(BaseDialogComponent, {
						data: this.dialogOption.formError,
						minWidth: 385
					});
					this.closeDialog(dialog);


				}


			}


		});
	}

	correctSend(response, dialog, dataClosing, route) {
		console.log(response);
		dialog = this.dialog.open(BaseDialogComponent, {
			data: dataClosing,
			minWidth: 385
		});
		this.closeDialog(dialog);
		this.navigateToMenu(route);
	}

	badSend(dialog) {
		dialog = this.dialog.open(BaseDialogComponent, {
			data: this.errorServer,
			minWidth: 385
		});
		this.closeDialog(dialog);
	}

	closeDialog(dialog) {
		setTimeout(() => {
			dialog.close();

		}, 3000);
	}

	navigateToMenu(route) {
		this.route.navigateByUrl(route);
	}
}
