import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { BaseDialogComponent } from '../../../../../../shared/components/base-dialog/base-dialog.component';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import { ClaimModel } from '../models/claim';
import { FieldConfig } from '../../../../../../shared/components/form-components/models/field-config';
import { FormHandlerService } from '../../../../../../core/services/forms/form-handler.service';
import { ClaimService } from './../claim/services/claim.service';
import { Observable } from 'rxjs';
import { DialogService } from '../../../../../../core/services/dialog/dialog.service';
import { map, first } from 'rxjs/operators';
// tslint:disable: no-string-literal

@Component({
	selector: 'app-claim',
	templateUrl: './claim.component.html',
	styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {
	Date: any;
	initialDate: any;
	finalDate: any;

	accordionTitles = [
		'Formulario de Reclamación',
		'Datos del Asegurado',
		'Datos del Proveedor',
		'Servicios Reclamados',
		'En caso de hospitalización',
		'Observaciones',
		'Declaración'
	];

	claimForm: FormGroup;
	reclaimedList: FormArray;
	sendedForm: ClaimModel;

	tipoServicio: FieldConfig = {
		label: 'Tipo de Servicio',
		options: [
			{
				value: 'ambulatorio',
				viewValue: 'Ambulatorio'
			},
			{
				value: 'hospitalizacion',
				viewValue: 'Hospitalización'
			}
		]
	};

	tipoAsegurado: FieldConfig = {
		label: 'Tipo de Asegurado',
		options: [
			{
				value: 'titular',
				viewValue: 'Titular'
			},
			{
				value: 'depediente',
				viewValue: 'Dependiente'
			}
		]
	};

	constructor(
		private fb: FormBuilder,
		public formHandler: FormHandlerService,
		private claim: ClaimService,
		public dialog: MatDialog,
		public dialogModal: DialogService,
		private dialogOption: DialogOptionService
	) { }

	ID = null;
	ngOnInit() {
		this.ID = this.claim.id;
		if (this.ID != null) {
			console.log('El ID es ' + this.ID);
			this.getData(this.ID);
		} else if (this.ID == null) {
			console.log('ID esta vacio');
		}

		this.claimForm = this.fb.group({
			reclamacion: this.fb.group({
				diagnostico: ['', Validators.required],
				tipoServicio: ['', Validators.required],
				autorizadoNo: ['', Validators.required],
				autorizadoPor: ['', Validators.required],
				fechaDiagnostico: ['', Validators.required]
			}),
			asegurado: this.fb.group({
				numeroPoliza: ['', Validators.required],
				idNumero: ['', Validators.required],
				documentoIdentidad: ['', Validators.required],
				nombre: ['', Validators.required],
				numero: ['', Validators.required],
				edad: ['', [Validators.required, Validators.min(1)]],
				tipo: ['', Validators.required]
			}),
			proveedor: this.fb.group({
				nombre: ['', Validators.required],
				correo: ['', Validators.required],
				codigo: ['', Validators.required],
				noContrato: ['', [Validators.required, Validators.min(1)]]
			}),
			reclamados: this.fb.array([this.createReclaimed()]),
			casoHospitalizacion: this.fb.group({
				ingreso: [''],
				egreso: ['']
			}),
			observaciones: this.fb.group({
				observacion: ['']
			}),
			isComplete: [false, Validators.required]
		});

		this.reclaimedList = this.claimForm.get('reclamados') as FormArray;
	}

	createReclaimed(): FormGroup {
		return this.fb.group({
			codigoCpt: ['', Validators.required],
			procedimiento: ['', Validators.required],
			montoReclamado: ['', [Validators.required, Validators.min(0)]],
			montoAutorizado: ['', [Validators.required, Validators.min(0)]],
			montoDeducible: ['', [Validators.required, Validators.min(0)]]
		});
	}

	addReclaimed() {
		this.reclaimedList.push(this.createReclaimed());
	}

	removeReclaimed(index) {
		this.reclaimedList.removeAt(index);
	}

	getReclaimedFormGroup(index): FormGroup {
		this.reclaimedList = this.claimForm.get('reclamados') as FormArray;
		const formGroup = this.reclaimedList.controls[index] as FormGroup;

		return formGroup;
	}

	sendClaim() {
		this.formHandler.sendForm(this.claimForm, 'claims-reclaim');
	}

	canDeactivate(): Observable<boolean> | boolean {
		if (this.claimForm.dirty) {
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

	getData(id) {
		this.claim.returnData(id).subscribe(data => {
			console.log(data.data.asegurado.documentoIdentidad);
			console.log(data);
			for (let x = 0; x < data.data.reclamados.length; x++) {
				// console.log("hola, soy id numero "+data.data.reclamados[x].id)
				if (x >= 1) {
					// console.log('Hola, soy yo, ' + x)
					this.addReclaimed();
				}
				this.claimForm['controls'].reclamados['controls'][x]['controls'].codigoCpt.setValue(data.data.reclamados[x].codigoCpt);
				this.claimForm['controls'].reclamados['controls'][x]['controls'].montoAutorizado.setValue(data.data.reclamados[x].montoAutorizado);
				this.claimForm['controls'].reclamados['controls'][x]['controls'].montoDeducible.setValue(data.data.reclamados[x].montoDeducible);
				this.claimForm['controls'].reclamados['controls'][x]['controls'].montoReclamado.setValue(data.data.reclamados[x].montoReclamado);
				this.claimForm['controls'].reclamados['controls'][x]['controls'].procedimiento.setValue(data.data.reclamados[x].procedimiento);

				const formID7 = this.claimForm.get('reclamados').get([x]) as FormGroup;
				formID7.addControl('id', this.fb.control(data.data.reclamados[x].id, Validators.required));
			}

			this.claimForm['controls'].asegurado['controls'].documentoIdentidad.setValue(data.data.asegurado.documentoIdentidad);
			this.claimForm['controls'].asegurado['controls'].edad.setValue(data.data.asegurado.edad);
			this.claimForm['controls'].asegurado['controls'].idNumero.setValue(data.data.asegurado.idNumero);
			this.claimForm['controls'].asegurado['controls'].nombre.setValue(data.data.asegurado.nombre);
			this.claimForm['controls'].asegurado['controls'].numero.setValue(data.data.asegurado.numero);
			this.claimForm['controls'].asegurado['controls'].numeroPoliza.setValue(data.data.asegurado.numeroPoliza);
			this.claimForm['controls'].asegurado['controls'].tipo.setValue(data.data.asegurado.tipo);
			this.claimForm['controls'].reclamacion['controls'].diagnostico.setValue(data.data.reclamacion.diagnostico);
			this.claimForm['controls'].reclamacion['controls'].tipoServicio.setValue(data.data.reclamacion.tipoServicio);
			this.claimForm['controls'].reclamacion['controls'].autorizadoNo.setValue(data.data.reclamacion.autorizadoNo);
			this.claimForm['controls'].reclamacion['controls'].autorizadoPor.setValue(data.data.reclamacion.autorizadoPor);
			this.claimForm['controls'].reclamacion['controls'].fechaDiagnostico.setValue(data.data.reclamacion.fechaDiagnostico);
			this.claimForm['controls'].proveedor['controls'].nombre.setValue(data.data.proveedor.nombre);
			this.claimForm['controls'].proveedor['controls'].correo.setValue(data.data.proveedor.correo);
			this.claimForm['controls'].proveedor['controls'].codigo.setValue(data.data.proveedor.codigo);
			this.claimForm['controls'].proveedor['controls'].noContrato.setValue(data.data.proveedor.noContrato);
			this.claimForm['controls'].casoHospitalizacion['controls'].ingreso.setValue(data.data.casoHospitalizacion.ingreso);
			this.claimForm['controls'].casoHospitalizacion['controls'].egreso.setValue(data.data.casoHospitalizacion.egreso);
			this.claimForm['controls'].observaciones['controls'].observacion.setValue(data.data.observaciones.observacion);
			// console.log("El largo es "+ data.data.reclamados.length)
			// console.log(data.data.id)
			// console.log(data.data.asegurado.id)
			// console.log(data.data.casoHospitalizacion.id)
			// console.log(data.data.observaciones.id)
			// console.log(data.data.proveedor.id)
			// console.log(data.data.reclamacion.id)
			const formID1 = this.claimForm as FormGroup;
			formID1.addControl('id', this.fb.control(data.data.id, Validators.required));

			const formID2 = this.claimForm.get('asegurado') as FormGroup;
			formID2.addControl('id', this.fb.control(data.data.asegurado.id, Validators.required));

			const formID3 = this.claimForm.get('casoHospitalizacion') as FormGroup;
			formID3.addControl('id', this.fb.control(data.data.casoHospitalizacion.id, Validators.required));

			const formID4 = this.claimForm.get('observaciones') as FormGroup;
			formID4.addControl('id', this.fb.control(data.data.observaciones.id, Validators.required));

			const formID5 = this.claimForm.get('proveedor') as FormGroup;
			formID5.addControl('id', this.fb.control(data.data.proveedor.id, Validators.required));

			const formID6 = this.claimForm.get('reclamacion') as FormGroup;
			formID6.addControl('id', this.fb.control(data.data.reclamacion.id, Validators.required));

			console.log(JSON.stringify(this.claimForm.value));
		});
		this.claim.id = null;
		console.log('this.claim.id es igual a ' + this.claim.id);
	}
}
