import { Component, OnInit, ViewChild, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FieldConfig, Validator } from '../../../../../../shared/components/form-components/models/field-config';
import { FormHandlerService } from '../../../../../../core/services/forms/form-handler.service';
import { RefundService } from '../../../../claims/new-claim/claim-types/refund/services/refund.service';
import { Observable } from 'rxjs';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { map, first, startWith } from 'rxjs/operators';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from '../../../../../../app.component';
import { UserService } from '../../../../../../core/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { ClaimsService } from '../../../../services/claims/claims.service';
import { HttpParams } from '@angular/common/http';

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
	totalAmountPesos: number;
	todayDate = new Date();
	validDatesCounter = 0;
	filesInformation = [];
	showContent = false;
	step: number;

	formaPago: FieldConfig = {
		label: 'Especifique forma de pago',
		options: [
			{
				value: 'TRANSFERENCIA',
				viewValue: 'TRANSFERENCIA'
			},
			{
				value: 'CHEQUE',
				viewValue: 'CHEQUE'
			}
		]
  };

  tipoReclamo: FieldConfig = {
		label: 'Tipo Reclamo',
		options: [
			{
				value: 'LOCAL',
				viewValue: 'Local'
			},
			{
				value: 'INTERNACIONAL',
				viewValue: 'Internacional'
			}
		]
  };

  tipoReclamoLocal: FieldConfig = {
		label: 'Moneda',
		options: [
			{
				value: 'PESOS',
				viewValue: 'Pesos'
			},
			{
				value: 'DOLARES',
				viewValue: 'Dólares'
			}
		]
  };


  tipoReclamoInternacional: FieldConfig = {
		label: 'Moneda',
		options: [
			{
				value: 'DOLARES',
				viewValue: 'Dolares'
			}
		]
	};

	dataAutoCompleteIdNumber = [];
	dataAutoCompleteIdNumberObject = [];
	dataAutoCompleteName = [];
	dataAutoCompletePolicy = [];



	filteredOptions: Observable<any[]>;

	cuentaTipos: FieldConfig = {
		label: 'Tipo de Cuenta',
		options: [
			{
				value: 'AHORROS',
				viewValue: 'AHORROS'
			},
			{
				value: 'CORRIENTE',
				viewValue: 'CORRIENTE'
			}
		]
	};

	filterOptions: FieldConfig = {
		label: 'Filtro',
		options: [
			{
				value: 'NOMBRE',
				viewValue: 'Nombre'
			},
			{
				value: 'ID',
				viewValue: 'ID'
			},
			{
				value: 'POLIZA',
				viewValue: 'No. de Póliza'
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
		private cd: ChangeDetectorRef,
		private claimsService: ClaimsService

	) { }

	ID = null;

	timeAutoComplete = 0;

	ngOnInit() {

		this.appComponent.showOverlay = true;

		this.returnAutoCompleteData();
		// setTimeout(() => {
		// 	this.appComponent.showOverlay = true;
		// });
		// setTimeout(() => {

		// 	this.route.params.subscribe(res => {
		// 		this.ID = res.id;
		// 	});

		// 	if (this.ID != null) {
		// 		console.log('El ID es ' + this.ID);
		// 		this.getData(this.ID);
		// 	} else if (this.ID == null) {
		// 		console.log('ID esta vacio');
		// 	}

		// 	console.log(this.ID);

		// 	this.refundForm = this.fb.group({
		// 		fecha: [new Date(), Validators.required],
		// 		informacion: this.fb.group({
		// 			noPoliza: [{ value: '', disabled: true }, [Validators.required]],
		// 			idNumber: ['', Validators.required],
		// 			nombre: [{ value: '', disabled: true }, [Validators.required]],
		// 			direccion: ['', Validators.required],
		// 			telefono: ['', Validators.required],
		// 			correo: ['', [Validators.required, Validators.email]],
		// 		}),
		// 		diagnosticos: this.fb.array([this.createDiagnostic()]),
		// 		haveAditionalComentary: [''],
		// 		comentary: [''],
		// 		forma: ['', Validators.required],
		// 		totalAmount: ['', Validators.required],
		// 		agreeWithDeclaration: ['', [Validators.required, Validators.requiredTrue]],
		// 		isComplete: [false, Validators.required],
		// 		areDiagnosticDatesValid: [true, Validators.required],
		// 	});

		// 	this.diagnosticList = this.refundForm.get('diagnosticos') as FormArray;

		// 	this.refundForm.get('diagnosticos').valueChanges.subscribe(value => {
		// 		this.validDatesCounter = 0;
		// 		let total = 0;

		// 		for (const element in value) {
		// 			if (value.hasOwnProperty(element)) {
		// 				total += this.refundForm.get('diagnosticos').get(element.toString()).value.monto;

		// 				if (this.calculatedDate(this.refundForm.get('diagnosticos').get(element.toString()).value.fecha) >= 6) {
		// 					this.receiveDateValidator(false);

		// 				} else {
		// 					this.receiveDateValidator(true);

		// 				}
		// 			}
		// 		}
		// 		this.refundForm.get('totalAmount').setValue(total);
		// 		this.totalAmount = total;
		// 	});

		// 	this.filteredOptions = this.refundForm.get('informacion').get('idNumber').valueChanges
		// 		.pipe(
		// 			startWith(''),
		// 			map(value => typeof value === 'string' ? value : value),
		// 			map(value => value ? this._filter(value) : this.dataAutoCompleteIdNumber.slice())
		// 		);

		// 	this.timeAutoComplete = 1;
		// 	this.appComponent.showOverlay = false;

		// }, 15000);
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
			tipoReclamo: ['', Validators.required],
			informacion: this.fb.group({
				noPoliza: [{ value: '', disabled: true }, [Validators.required]],
				filterType: ['', Validators.required],
				idNumber: ['', Validators.required],
				nombre: [{ value: '', disabled: true }, [Validators.required]],
				direccion: ['',],
				telefono: ['',],
				correo: ['', [Validators.email]],
			}),
			diagnosticos: this.fb.array([this.createDiagnostic()]),
			haveAditionalComentary: [''],
			comentary: [''],
			forma: ['', Validators.required],
			totalAmount: ['', Validators.required],
			totalAmountPesos: ['', Validators.required],
			agreeWithDeclaration: ['', [Validators.requiredTrue]],
			isComplete: [false, Validators.required],
			areDiagnosticDatesValid: [true, Validators.required],
		});

		this.diagnosticList = this.refundForm.get('diagnosticos') as FormArray;

		this.refundForm.get('diagnosticos').valueChanges.subscribe(value => {
			this.validDatesCounter = 0;
			let total = 0;
			let totalPesos = 0;

			for (const element in value) {
				if (value.hasOwnProperty(element)) {
					if (this.refundForm.get('diagnosticos').get(element.toString()).get('tipoReclamoMoneda')) {
						if (this.refundForm.get('diagnosticos').get(element.toString()).get(
							'tipoReclamoMoneda').value != null) {
							if (this.refundForm.get('diagnosticos').get(element.toString()).get(
								'tipoReclamoMoneda').value == 'DOLARES') {
								total += this.refundForm.get('diagnosticos').get(element.toString()).value.monto;
							}
							if (this.refundForm.get('diagnosticos').get(element.toString()).get(
								'tipoReclamoMoneda').value == 'PESOS') {
								totalPesos += this.refundForm.get('diagnosticos').get(element.toString()).value.monto;
							}
						}
					}

					if (this.calculatedDate(this.refundForm.get('diagnosticos').get(element.toString()).value.fecha) >= 6) {
						this.receiveDateValidator(false);

					} else {
						this.receiveDateValidator(true);

					}
				}
			}
			this.refundForm.get('totalAmount').setValue(total);
			this.totalAmount = total;
			this.refundForm.get('totalAmountPesos').setValue(total);
			this.totalAmountPesos = totalPesos;
		});

		this.refundForm.get('informacion').get('filterType').valueChanges.subscribe(valueFilter => {

			this.refundForm.get('informacion').get('idNumber').setValue('');
			this.refundForm.get('informacion').get('idNumber').markAsUntouched();

			if (valueFilter == 'NOMBRE') {
				this.filteredOptions = this.refundForm.get('informacion').get('idNumber').valueChanges
					.pipe(
						startWith(''),
						map(value => typeof value === 'string' ? value : value),
						map(value => value ? this._filter(value) : this.dataAutoCompleteName.slice())
					);
			}
			if (valueFilter == 'ID') {
				this.filteredOptions = this.refundForm.get('informacion').get('idNumber').valueChanges
					.pipe(
						startWith(''),
						map(value => typeof value === 'string' ? value : value),
						map(value => value ? this._filter(value) : this.dataAutoCompleteIdNumber.slice())
					);
			}
			if (valueFilter == 'POLIZA') {
				this.filteredOptions = this.refundForm.get('informacion').get('idNumber').valueChanges
					.pipe(
						startWith(''),
						map(value => typeof value === 'string' ? value : value),
						map(value => value ? this._filter(value) : this.dataAutoCompletePolicy.slice())
					);
			}
		});

		console.log("El json de todo el formulario: ", JSON.stringify(this.refundForm.value));

	}
	// role;
	// idd;
	// getRefunds(params: HttpParams = new HttpParams()) {
	// 	let data;
	// 	this.claimsService.getRefunds(params)
	// 		.subscribe(res => {
	// 			data = res;
	// 			console.log(data);
	// 			console.log(data.data[0].id);
	// 			this.idd = data.data[0].id;
	// 		});
	// 	this.role = this.userService.getRoleCotizador();
	// 	}

	// 	seeRequest(id: number) {
	// 		if (this.role === 'WWS') {
	// 			window.open(`http://wwsdevportalbackend.azurewebsites.net/ReembolsosView/Index/${id}/?location=true`, '_blank');
	// 		} else {
	// 			window.open(`http://wwsdevportalbackend.azurewebsites.net/ReembolsosView/Index/${id}/?location=false`, '_blank');
	// 		}
	// 	}

	showWarningDot(form: any): boolean {
		if (!this.ID) {
			if (form === this.refundForm.get('forma') && this.refundForm.get('infoTransferencia')) {
				console.log(!this.refundForm.get('infoTransferencia').valid);

				if (!this.refundForm.get('infoTransferencia').valid && this.form.submitted) {
					return true;
				} else {
					return false;
				}
			} else {
				if (!form.valid && this.form.submitted) {
					return true;
				} else {
					return false;
				}
			}
		} else {
			if (form.valid) {
				return false;
			} else {
				return true;
			}
		}
	}

	displayFn(user: any) {
		return user ? user : '';
	}

	setStep(index: number) {
		this.step = index;
	}

	nextStep() {
		this.step++;

	}

	private _filter(value): any[] {
		// let n: Number;

		// n.toString
		// let arrayValue;

		if (this.refundForm.get('informacion').get('filterType').value == 'NOMBRE') {
			const filterValue = value.toLowerCase();

			return this.dataAutoCompleteName.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
		}
		if (this.refundForm.get('informacion').get('filterType').value == 'ID') {
			const filterValueNumber = value.toString();

			return this.dataAutoCompleteIdNumber.filter(option => option.toString().indexOf(filterValueNumber) === 0);
		}
		if (this.refundForm.get('informacion').get('filterType').value == 'POLIZA') {
			const filterValue = value.toLowerCase();

			return this.dataAutoCompletePolicy.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
		}

		// return arrayValue;

	}

	//   consoleMethod(nameOption){
	// 	// console.log("El valor de name es " + nameOption);
	// 	// console.log("El value de idNumber es " + this.refundForm.get('informacion').get('idNumber').value);
	// 	// console.log("El json de todo el formulario: ", JSON.stringify(this.refundForm.value) );
	// 	console.log('El tipo de dato de ' +
	// 	// tslint:disable-next-line: radix
	// 	Number.parseInt((nameOption).slice((nameOption).indexOf(' - ') + 3)) + ' es: ' +
	// 	// tslint:disable-next-line: radix
	// 	(typeof Number.parseInt((nameOption).slice((nameOption).indexOf(' - ') + 3)) ) );
	//   }

	returnAutoCompleteData() {

		this.refund.getIdNumbers().subscribe(data => {
			console.log(data.data);
			// tslint:disable-next-line: prefer-for-of
			for (let x = 0; x < data.data.length; x++) {
				// this.dataAutoCompleteIdNumber.push(data.data[x].asegurado.nombres_asegurado +
				// 	' ' + data.data[x].asegurado.apellidos_asegurado + ' - '
				// 	+ data.data[x].asegurado.id_asegurado);

				this.dataAutoCompleteIdNumberObject.push({
					name: data.data[x].asegurado.nombres_asegurado,
					// id: data.data[x].asegurado.id_asegurado,
					policy: data.data[x].asegurado.no_poliza,
					value: data.data[x].asegurado.id_asegurado
				});
				this.dataAutoCompleteName.push(data.data[x].asegurado.nombres_asegurado);

				this.dataAutoCompleteIdNumber.push(data.data[x].asegurado.id_asegurado);

				this.dataAutoCompletePolicy.push(data.data[x].asegurado.no_poliza);
			}
			this.timeAutoComplete = 1;
			this.appComponent.showOverlay = false;
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

	fileNameWatcher(type?: string, index?: number) {
		if (this.filesInformation[index]) {
			if (this.filesInformation[index][type + 'Url']) { return this.filesInformation[index][type + 'Url']; }
		}
	}

	clearArchives(formName, index) {
		this.refundForm.get('diagnosticos').get(index.toString()).get('files').get(formName).setValue('');
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
				if (testing[key] === false) {
					this.validDatesCounter++;
				}
			}
		}

		if (this.validDatesCounter > 0) { this.refundForm.get('areDiagnosticDatesValid').setValue(false); } else { this.refundForm.get('areDiagnosticDatesValid').setValue(true); }

	}

	changePayment(event) {
		if (event.value === 'CHEQUE') {
			this.refundForm.removeControl('infoTransferencia');
		} else if (event.value === 'TRANSFERENCIA') {
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
			// cedula: ['', Validators.required],
			noCuenta: ['', Validators.required],
			tipoCuenta: ['', Validators.required],
			bancoEmisor: ['', Validators.required],
			// correo: ['', Validators.required]
		});
	}

	createDiagnostic(): FormGroup {
		return this.fb.group({
			fecha: ['', Validators.required],
			lugar: ['', Validators.required],
			diagnostico: ['', Validators.required],
			tipoReclamoMoneda: ['', Validators.required],
			descripcion: ['', Validators.required],
			monto: ['', Validators.required],
			proveedor: ['', Validators.required],
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
		console.log("El json de todo el formulario: ", JSON.stringify(this.refundForm.value));

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

		let idNumberObject;

		if (this.refundForm.get('informacion').get('filterType').value == 'NOMBRE') {
			idNumberObject = this.dataAutoCompleteIdNumberObject.find(nombre =>
				nombre.name == idNumber);
			idNumber = (idNumberObject.value).toString();
		}
		if (this.refundForm.get('informacion').get('filterType').value == 'ID') {
			idNumber = (idNumber).toString();
		}
		if (this.refundForm.get('informacion').get('filterType').value == 'POLIZA') {
			idNumberObject = this.dataAutoCompleteIdNumberObject.find(nombre =>
				nombre.policy == idNumber);
			idNumber = (idNumberObject.value).toString();
		}

		// idNumberObject = this.dataAutoCompleteIdNumberObject.find(nombre =>
		// 	nombre.name == idNumber);
		// console.log(idNumberObject);

		this.appComponent.showOverlay = true;
		this.userService.getInsurancePeople(idNumber)
			.subscribe((response: any) => {
				console.log(response);
				this.appComponent.showOverlay = false;
				if (response.data !== null) {
					this.showContent = true;
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
					this.showContent = false;
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
		this.appComponent.showOverlay = true;
		this.refund.returnData(id).subscribe(data => {
			console.log(data);
			this.refundForm.get('informacion').get('idNumber').disable();
			this.refundForm.get('informacion').get('filterType').disable();
			this.showContent = true;

			this.refundForm['controls'].tipoReclamo.setValue(data.data.tipoReclamo);
			for (let x = 0; x < data.data.diagnosticos.length; x++) {
				// console.log('hola, soy id numero ' + data.data.diagnosticos[x].id);
				// console.log("Hola, soy la descripcion de la posicion " + x + ", y mi valor es " + data.data.diagnosticos[x].descripcion)
				if (x >= 1) {
					// console.log('Hola, soy yo, ' + x)
					this.addDiagnostic();
				}
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].diagnostico.setValue(data.data.diagnosticos[x].diagnostico);
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].descripcion.setValue(data.data.diagnosticos[x].descripcion);
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].fecha.setValue(data.data.diagnosticos[x].fecha);
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].lugar.setValue(data.data.diagnosticos[x].lugar);
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].tipoReclamoMoneda.setValue(data.data.diagnosticos[x].tipoReclamoMoneda);
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].monto.setValue(Number.parseFloat(data.data.diagnosticos[x].monto));
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].proveedor.setValue(data.data.diagnosticos[x].proveedor);
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].files['controls'].indications.setValue(data.data.diagnosticos[x].files.indications);
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].files['controls'].invoices.setValue(data.data.diagnosticos[x].files.invoices);
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].files['controls'].medicReports.setValue(data.data.diagnosticos[x].files.medicReports);
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].files['controls'].paymentVouchers.setValue(data.data.diagnosticos[x].files.paymentVouchers);
				this.filesInformation.push(data.data.diagnosticos[x].files);
				console.log(data.data.diagnosticos[x].files);

				const formID4 = this.refundForm.get('diagnosticos').get([x]) as FormGroup;
				formID4.addControl('id', this.fb.control(data.data.diagnosticos[x].id, Validators.required));
			}
			console.log(this.filesInformation);

			this.refundForm['controls'].haveAditionalComentary.setValue(data.data.haveAditionalComentary);
			this.refundForm['controls'].comentary.setValue(data.data.comentary);
			this.refundForm['controls'].fecha.setValue(data.data.fecha);
			this.refundForm['controls'].forma.setValue(data.data.forma);
			if (data.data.agreeWithDeclaration === 'TRUE') {
				this.refundForm['controls'].agreeWithDeclaration.setValue(true);
			}
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

			this.refundForm['controls'].informacion['controls'].filterType.setValue(data.data.informacion.filterType);
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

			this.refundForm.markAllAsTouched();
			this.refundForm.updateValueAndValidity();
			// this.cd.markForCheck();
			console.log("El json de todo el formulario: ", JSON.stringify(this.refundForm.value));

		});
		this.refund.id = null;
		console.log('this.refund.id es igual a ' + this.refund.id);
		this.appComponent.showOverlay = false;


	}


	sendForm(form: FormGroup, formType: string, sendType: string, id?: number) {
		console.log(id);

		this.formHandler.sendForm(form, formType, sendType, this.appComponent, id);

	}
}
