import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { BaseDialogComponent } from '../../../../../../shared/components/base-dialog/base-dialog.component';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import { ClaimModel } from '../models/claim';
import { FieldConfig } from '../../../../../../shared/components/form-components/models/field-config';
import { FormHandlerService } from '../../../../../../core/services/forms/form-handler.service';

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

	constructor(private fb: FormBuilder, public dialog: MatDialog, private formHandler: FormHandlerService) { }

	ngOnInit() {
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
				edad: ['', Validators.required],
				tipo: ['', Validators.required]
			}),
			proveedor: this.fb.group({
				nombre: ['', Validators.required],
				correo: ['', Validators.required],
				codigo: ['', Validators.required],
				noContrato: ['', Validators.required]
			}),
			reclamados: this.fb.array([this.createReclaimed()]),
			casoHospitalizacion: this.fb.group({
				ingreso: [''],
				egreso: ['']
			}),
			observaciones: this.fb.group({
				observacion: ['']
			})
		});

		this.reclaimedList = this.claimForm.get('reclamados') as FormArray;
	}

	createReclaimed(): FormGroup {
		return this.fb.group({
			codigoCpt: ['', Validators.required],
			procedimiento: ['', Validators.required],
			montoReclamado: ['', Validators.required],
			montoAutorizado: ['', Validators.required],
			montoDeducible: ['', Validators.required]
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
}
