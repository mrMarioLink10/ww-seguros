import { Injectable } from '@angular/core';
import { Form, FormGroup, AbstractControl, FormControl, FormArray } from '@angular/forms';
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
// tslint:disable: forin
// tslint:disable: variable-name

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

	sendForm(form: FormGroup, name: string, type?: string) {
		console.log('Impresion de formulario down here: ', form);
		this.dialogHandler(form, name, type);
	}

	dialogHandler(form: FormGroup, name: string, type: string) {
		let Dialog;
		let dataOpen;
		let dataClosing;
		let route;

		switch (name) {
			case 'claims-reclaim':
				if (type === 'send') {
					dataOpen = this.dialogOption.sendForm('Reclamo');
					dataClosing = this.dialogOption.confirmedForm('Reclamo');
				} else if (type === 'save') {
					dataOpen = this.dialogOption.saveForm('Reclamo');
					dataClosing = this.dialogOption.confirmedSavedForm('Reclamo');
				}
				route = 'dashboard/claims';
				break;

			case 'claims-refund':
				if (type === 'send') {
					dataOpen = this.dialogOption.sendForm('Reembolso');
					dataClosing = this.dialogOption.confirmedForm('Reembolso');
				} else if (type === 'save') {
					dataOpen = this.dialogOption.saveForm('Reembolso');
					dataClosing = this.dialogOption.confirmedSavedForm('Reembolso');
				}
				route = 'dashboard/claims';
				break;

			case 'new-authorization':
				if (type === 'send') {
					dataOpen = this.dialogOption.sendForm('Autorización');
					dataClosing = this.dialogOption.confirmedForm('Autorización');
				} else if (type === 'save') {
					dataOpen = this.dialogOption.saveForm('Autorización');
					dataClosing = this.dialogOption.confirmedSavedForm('Autorización');
				}
				route = 'dashboard/authorizations';
				break;

			case 'life':
				if (type === 'send') {
					dataOpen = this.dialogOption.sendForm('seguro de Vida');
					dataClosing = this.dialogOption.confirmedForm('seguro de Vida');
				} else if (type === 'save') {
					dataOpen = this.dialogOption.saveForm('seguro de Vida');
					dataClosing = this.dialogOption.confirmedSavedForm('seguro de Vida');
				}
				route = 'dashboard/requests';
				break;

			case 'major-expenses':
				if (type === 'send') {
					dataOpen = this.dialogOption.sendForm('seguro Gastos Médicos Mayores');
					dataClosing = this.dialogOption.confirmedForm('seguro Gastos Médicos Mayores');
				} else if (type === 'save') {
					dataOpen = this.dialogOption.saveForm('seguro Gastos Médicos Mayores');
					dataClosing = this.dialogOption.confirmedSavedForm('seguro Gastos Médicos Mayores');
				}
				route = 'dashboard/requests';
				break;

			case 'disability':
				if (type === 'send') {
					dataOpen = this.dialogOption.sendForm('suscripcion Disability');
					dataClosing = this.dialogOption.confirmedForm('suscripcion Disability');
				} else if (type === 'save') {
					dataOpen = this.dialogOption.sendForm('suscripcion Disability');
					dataClosing = this.dialogOption.confirmedForm('suscripcion Disability');
				}
				route = 'dashboard/requests';
				break;

		}

		if (type === 'cancel') {
			dataOpen = this.dialogOption.cancelRequest;
		}

		console.log(dataOpen, dataClosing);

		Dialog = this.dialog.open(BaseDialogComponent, {
			data: dataOpen,
			minWidth: 385,
		});

		Dialog.afterClosed().subscribe((result) => {
			this.sendedForm = form.getRawValue();
			const json = JSON.stringify(this.sendedForm);
			console.log(json);

			switch (type) {
				case 'save':
					if (result === 'true') {
						let dialog;
						switch (name) {
							case 'claims-reclaim':
								this.claimService.postClaim(json)
									.subscribe(res => {
										this.correctSend(res, dialog, dataClosing, route);
									}, (err) => {
										this.badSend(err, dialog);
									});
								break;

							case 'claims-refund':
								this.refundService.postClaim(json)
									.subscribe(res => {
										this.correctSend(res, dialog, dataClosing, route);
									}, (err) => {
										this.badSend(err, dialog);
									});
								break;

							case 'new-authorization':
								this.newAuthorizationService.postClaim(json)
									.subscribe(res => {
										this.correctSend(res, dialog, dataClosing, route);
									}, (err) => {
										this.badSend(err, dialog);
									});
								break;

							case 'life':
								this.lifeService.postRequest(json)
									.subscribe(res => {
										this.correctSend(res, dialog, dataClosing, route);
									}, (err) => {
										this.badSend(err, dialog);
									});
								break;

							case 'major-expenses':
								this.majorExpensesService.postRequest(json)
									.subscribe(res => {
										this.correctSend(res, dialog, dataClosing, route);
									}, (err) => {
										this.badSend(err, dialog);
									});
								break;

							case 'disability':
								this.disabilityService.postRequest(json)
									.subscribe(res => {
										this.correctSend(res, dialog, dataClosing, route);
									}, (err) => {
										this.badSend(err, dialog);
									});
								break;

							default:
								break;
						}
						console.log(JSON.stringify(this.sendedForm));
					}
					break;

				case 'send':
					if (result === 'true') {
						let dialog;
						dialog = this.dialog.open(BaseDialogComponent, {
							data: this.dialogOption.WIP,
							minWidth: 385
						});
						this.closeDialog(dialog);
						// if (form.valid) {
						// 	switch (name) {
						// 		case 'claims-reclaim':
						// 			this.claimService.postClaim(json)
						// 				.subscribe(res => {
						// 					this.correctSend(res, dialog, dataClosing, route);

						// 				}, (err) => {
						// 					this.badSend(err, dialog);

						// 				});
						// 			break;

						// 		case 'claims-refund':
						// 			this.refundService.postClaim(json)
						// 				.subscribe(res => {
						// 					this.correctSend(res, dialog, dataClosing, route);

						// 				}, (err) => {
						// 					this.badSend(err, dialog);

						// 				});
						// 			break;

						// 		case 'new-authorization':
						// 			this.newAuthorizationService.postClaim(json)
						// 				.subscribe(res => {
						// 					this.correctSend(res, dialog, dataClosing, route);

						// 				}, (err) => {
						// 					this.badSend(err, dialog);

						// 				});
						// 			break;

						// 		case 'life':
						// 			this.lifeService.postRequest(json)
						// 				.subscribe(res => {
						// 					this.correctSend(res, dialog, dataClosing, route);

						// 				}, (err) => {
						// 					this.badSend(err, dialog);

						// 				});
						// 			break;

						// 		case 'major-expenses':
						// 			this.majorExpensesService.postRequest(json)
						// 				.subscribe(res => {
						// 					this.correctSend(res, dialog, dataClosing, route);

						// 				}, (err) => {
						// 					this.badSend(err, dialog);

						// 				});
						// 			break;

						// 		case 'disability':
						// 			this.disabilityService.postRequest(json)
						// 				.subscribe(res => {
						// 					this.correctSend(res, dialog, dataClosing, route);

						// 				}, (err) => {
						// 					this.badSend(err, dialog);

						// 				});
						// 			break;

						// 		default:
						// 			break;
						// 	}

						// 	console.log(JSON.stringify(this.sendedForm));
						// } else {
						// 	// console.log(this.findInvalidControls(form));

						// 	const invalidControls = [];
						// 	for (const control in this.findInvalidControls(form)) {
						// 		invalidControls.push(this.getName(this.findInvalidControls(form)[control]));
						// 	}
						// 	dialog = this.dialog.open(BaseDialogComponent, {
						// 		data: this.dialogOption.getInvalidControls(invalidControls),
						// 		minWidth: 385
						// 	});
						// 	this.closeDialog(dialog);
						// }
					}
					break;

				case 'cancel':
					if (result === 'true') {
						this.navigateToMenu(route)
					}
					break;
				default:
					break;
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

	badSend(err, dialog) {
		console.log(err);

		dialog = this.dialog.open(BaseDialogComponent, {
			data: this.errorServer,
			minWidth: 385
		});
		this.closeDialog(dialog);
	}

	closeDialog(dialog) {
		setTimeout(() => {
			dialog.close();

		}, 4000);
	}

	navigateToMenu(route) {
		this.route.navigateByUrl(route);
	}

	findInvalidControls(_input: AbstractControl, _invalidControls?: AbstractControl[]): AbstractControl[] {
		if (!_invalidControls) { _invalidControls = []; }
		if (_input instanceof FormControl) {
			if (_input.invalid) { _invalidControls.push(_input); }
			return _invalidControls;
		}

		if (!(_input instanceof FormArray) && !(_input instanceof FormGroup)) { return _invalidControls; }

		const controls = _input.controls;

		for (const name in controls) {
			const control = controls[name];
			if (control.invalid) { _invalidControls.push(control); }

		}

		return _invalidControls;
	}

	getName(control: AbstractControl): string | null {
		const group = control.parent as FormGroup;

		if (!group) {
			return null;
		}

		let name: string;

		Object.keys(group.controls).forEach(key => {
			const childControl = group.get(key);

			if (childControl !== control) {
				return;
			}

			name = key;
		});

		return name;
	}
}
