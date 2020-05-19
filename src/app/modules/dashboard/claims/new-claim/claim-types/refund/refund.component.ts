import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig, Validator } from '../../../../../../shared/components/form-components/models/field-config';
import { FormHandlerService } from '../../../../../../core/services/forms/form-handler.service';
import { RefundService } from '../../../../claims/new-claim/claim-types/refund/services/refund.service';
import { Observable } from 'rxjs';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { map, first } from 'rxjs/operators';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from '../../../../../../app.component';
import { UserService } from '../../../../../../core/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
// tslint:disable: no-string-literal
// tslint:disable: max-line-length

@Component({
	selector: 'app-refund',
	templateUrl: './refund.component.html',
	styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {
	accordionTitles = [
		'Información del Asegurado / Paciente',
		'Diagnóstico o Naturaleza de condición Médica / Accidente',
		'Información para fines de pago',
		'Declaración'
	];

	totalAmount: number;
	todayDate = new Date();
	validDatesCounter = 0;

	formaPago: FieldConfig = {
		label: 'Especifique forma de pago',
		options: [
			{
				value: 'transferencia',
				viewValue: 'Transferencia'
			},
			{
				value: 'cheque',
				viewValue: 'Cheque'
			}
		]
	};

	cuentaTipos: FieldConfig = {
		label: 'Tipo de Cuenta',
		options: [
			{
				value: 'ahorros',
				viewValue: 'Ahorros'
			},
			{
				value: 'corriente',
				viewValue: 'Corriente'
			}
		]
	};

	refundForm: FormGroup;
	diagnosticList: FormArray;
	@ViewChild('form', { static: false }) form;

	constructor(
		private fb: FormBuilder,
		public formHandler: FormHandlerService,
		private refund: RefundService,
		public dialogModal: DialogService,
		private dialogOption: DialogOptionService,
		public dialog: MatDialog,
		private appComponent: AppComponent,
		private userService: UserService,
		private route: ActivatedRoute,
		private cd: ChangeDetectorRef

	) { }

	ID = null;

	ngOnInit() {
		this.route.params.subscribe(res => {
			this.ID = res.id;
		});

		if (this.ID != null) {
			console.log('El ID es ' + this.ID);
			this.getData(this.ID);
		} else if (this.ID == null) {
			console.log('ID esta vacio');
		}

		console.log(this.ID);


		this.refundForm = this.fb.group({
			fecha: [new Date(), Validators.required],
			informacion: this.fb.group({
				noPoliza: [{ value: '', disabled: true }, [Validators.required]],
				idNumber: ['', Validators.required],
				nombre: [{ value: '', disabled: true }, [Validators.required]],
				direccion: ['', Validators.required],
				telefono: ['', Validators.required],
				correo: ['', [Validators.required, Validators.email]],
			}),
			diagnosticos: this.fb.array([this.createDiagnostic()]),
			haveAditionalComentary: [''],
			comentary: [''],
			forma: ['', Validators.required],
			totalAmount: ['', Validators.required],
			agreeWithDeclaration: ['', [Validators.required, Validators.requiredTrue]],
			isComplete: [false, Validators.required],
			areDiagnosticDatesValid: [true, Validators.required],
		});

		this.diagnosticList = this.refundForm.get('diagnosticos') as FormArray;

		this.refundForm.get('diagnosticos').valueChanges.subscribe(value => {
			this.validDatesCounter = 0;
			let total = 0;

			for (const element in value) {
				if (value.hasOwnProperty(element)) {
					total += this.refundForm.get('diagnosticos').get(element.toString()).value.monto;

					if (this.calculatedDate(this.refundForm.get('diagnosticos').get(element.toString()).value.fecha) >= 6) {
						this.receiveDateValidator(false);

					} else {
						this.receiveDateValidator(true);

					}
				}
			}
			this.refundForm.get('totalAmount').setValue(total);
			this.totalAmount = total;
		});
	}

	onFileChange(event, formName, index) {
		const reader = new FileReader();

		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.refundForm.get('diagnosticos').get(index.toString()).get('files').patchValue({
					[formName]: reader.result
				});

				// need to run CD since file load runs outside of zone
				this.cd.markForCheck();
			};
		}
	}

	calculatedDate(value: any) {
		const date = this.todayDate.getTime() - value;
		return Math.floor(date / (1000 * 3600 * 24) / 30.4375);
	}

	receiveDateValidator(value: any) {
		const testing = [];

		testing.push(value);

		for (const key in testing) {
			if (testing.hasOwnProperty(key)) {
				console.log(testing[key]);
				if (testing[key] === false) {
					this.validDatesCounter++;
				}
			}
		}

		if (this.validDatesCounter > 0) { this.refundForm.get('areDiagnosticDatesValid').setValue(false); } else { this.refundForm.get('areDiagnosticDatesValid').setValue(true); }

	}

	changePayment(event) {
		if (event.value === 'cheque') {
			this.refundForm.removeControl('infoTransferencia');
		} else if (event.value === 'transferencia') {
			this.refundForm.addControl(
				'infoTransferencia',
				this.fb.group({
					noCuenta: ['', Validators.required],
					tipoCuenta: ['', Validators.required],
					bancoEmisor: ['', Validators.required],
				})
			);
		}
	}

	createInfo(): FormGroup {
		return this.fb.group({
			cedula: ['', Validators.required],
			noCuenta: ['', Validators.required],
			tipoCuenta: ['', Validators.required],
			bancoEmisor: ['', Validators.required],
			correo: ['', Validators.required]
		});
	}

	createDiagnostic(): FormGroup {
		return this.fb.group({
			fecha: ['', Validators.required],
			lugar: ['', Validators.required],
			descripcion: ['', Validators.required],
			monto: ['', Validators.required],
			files: this.fb.group({
				invoices: [''],
				indications: [''],
				medicReports: [''],
				paymentVouchers: [''],
			})
		});
	}

	addDiagnostic() {
		this.diagnosticList.push(this.createDiagnostic());
	}

	removeDiagnostic(index) {
		this.diagnosticList.removeAt(index);
	}

	canDeactivate(): Observable<boolean> | boolean {
		if (this.form.submitted) {
			return true;
		}

		if (this.refundForm.dirty && !this.form.submitted) {
			const dialogRef = this.dialog.open(BaseDialogComponent, {
				data: this.dialogOption.exitConfirm,
				minWidth: 385,
			});
			return dialogRef.componentInstance.dialogRef.afterClosed().pipe(map(result => {
				if (result === 'true') {
					return true;
				}
			}), first());
		}
		return true;
	}

	searchIdNumber(idNumber: string) {
		this.appComponent.showOverlay = true;
		this.userService.getInsurancePeople(idNumber)
			.subscribe((response: any) => {
				console.log(response);
				this.appComponent.showOverlay = false;
				if (response.data !== null) {
					const dialogRef = this.dialog.open(BaseDialogComponent, {
						data: this.dialogOption.idNumberFound(response.data),
						minWidth: 385,
					});
					setTimeout(() => {
						dialogRef.close();
					}, 4000);

					this.refundForm.get('informacion').get('nombre').setValue(`${response.data.asegurado.nombres_asegurado} ${response.data.asegurado.apellidos_asegurado}`);
					this.refundForm.get('informacion').get('noPoliza').setValue(response.data.asegurado.no_poliza);

				} else {
					const dialogRef = this.dialog.open(BaseDialogComponent, {
						data: this.dialogOption.idNumberNotFound,
						minWidth: 385,
					});
					setTimeout(() => {
						dialogRef.close();
					}, 4000);

					this.refundForm.get('informacion').get('nombre').setValue('');
					this.refundForm.get('informacion').get('noPoliza').setValue('');

				}
			});
	}

	getData(id) {
		this.refund.returnData(id).subscribe(data => {
			console.log(data);
			this.refundForm.get('informacion').get('idNumber').disable();


			for (let x = 0; x < data.data.diagnosticos.length; x++) {
				// console.log('hola, soy id numero ' + data.data.diagnosticos[x].id);
				// console.log("Hola, soy la descripcion de la posicion " + x + ", y mi valor es " + data.data.diagnosticos[x].descripcion)
				if (x >= 1) {
					// console.log('Hola, soy yo, ' + x)
					this.addDiagnostic();
				}
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].descripcion.setValue(data.data.diagnosticos[x].descripcion);
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].fecha.setValue(data.data.diagnosticos[x].fecha);
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].lugar.setValue(data.data.diagnosticos[x].lugar);
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].monto.setValue(data.data.diagnosticos[x].monto);
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].files['controls'].indications.setValue(data.data.diagnosticos[x].files.indications);
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].files['controls'].invoices.setValue(data.data.diagnosticos[x].files.invoices);
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].files['controls'].medicReports.setValue(data.data.diagnosticos[x].files.medicReports);
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].files['controls'].paymentVouchers.setValue(data.data.diagnosticos[x].files.paymentVouchers);

				const formID4 = this.refundForm.get('diagnosticos').get([x]) as FormGroup;
				formID4.addControl('id', this.fb.control(data.data.diagnosticos[x].id, Validators.required));
			}

			this.refundForm['controls'].haveAditionalComentary.setValue(data.data.haveAditionalComentary);
			this.refundForm['controls'].comentary.setValue(data.data.comentary);
			this.refundForm['controls'].fecha.setValue(data.data.fecha);
			this.refundForm['controls'].forma.setValue(data.data.forma);
			this.refundForm['controls'].agreeWithDeclaration.setValue(data.data.agreeWithDeclaration);
			this.refundForm['controls'].areDiagnosticDatesValid.setValue(data.data.areDiagnosticDatesValid);

			const sd = {
				value: data.data.forma
			};

			if (sd.value != null) {
				this.changePayment(sd);
				if (this.refundForm.get('infoTransferencia')) {
					this.refundForm['controls'].infoTransferencia['controls'].noCuenta.setValue(data.data.infoTransferencia.noCuenta);
					this.refundForm['controls'].infoTransferencia['controls'].tipoCuenta.setValue(data.data.infoTransferencia.tipoCuenta);
					this.refundForm['controls'].infoTransferencia['controls'].bancoEmisor.setValue(data.data.infoTransferencia.bancoEmisor);
				}
			} else if (sd.value == null) {
				console.log('No hay que crear el control');
			}

			this.refundForm['controls'].informacion['controls'].direccion.setValue(data.data.informacion.direccion);
			this.refundForm['controls'].informacion['controls'].idNumber.setValue(data.data.informacion.idNumber);
			this.refundForm['controls'].informacion['controls'].noPoliza.setValue(data.data.informacion.noPoliza);
			this.refundForm['controls'].informacion['controls'].nombre.setValue(data.data.informacion.nombre);
			this.refundForm['controls'].informacion['controls'].telefono.setValue(data.data.informacion.telefono);
			this.refundForm['controls'].informacion['controls'].correo.setValue(data.data.informacion.correo);

			const formID1 = this.refundForm as FormGroup;
			formID1.addControl('id', this.fb.control(data.data.id, Validators.required));
			// formID1.addControl('infoTransferenciaId', this.fb.control(data.data.infoTransferenciaId, Validators.required));
			// formID1.addControl('informacionId', this.fb.control(data.data.informacionId, Validators.required));

			if (this.refundForm.get('infoTransferencia')) {
				const formID2 = this.refundForm.get('infoTransferencia') as FormGroup;
				formID2.addControl('id', this.fb.control(data.data.infoTransferencia.id, Validators.required));
			}

			const formID3 = this.refundForm.get('informacion') as FormGroup;
			formID3.addControl('id', this.fb.control(data.data.informacion.id, Validators.required));

			this.cd.markForCheck();

		});
		this.refund.id = null;
		console.log('this.refund.id es igual a ' + this.refund.id);
	}


	sendForm(form: FormGroup, formType: string, sendType: string, id?: number) {
		console.log(id);

		this.formHandler.sendForm(form, formType, sendType, id, this.appComponent);

	}
}
