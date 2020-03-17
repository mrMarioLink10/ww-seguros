import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig, Validator } from '../../../../../../shared/components/form-components/models/field-config';
import { FormHandlerService } from '../../../../../../core/services/forms/form-handler.service';

@Component({
	selector: 'app-refund',
	templateUrl: './refund.component.html',
	styleUrls: [ './refund.component.scss' ]
})
export class RefundComponent implements OnInit {
	accordionTitles = [
		'Información del Asegurado / Paciente',
		'Diagnóstico o Naturaleza de condición Médica / Accidente',
		'Comentarios adicionales',
		'Información para fines de pago',
		'Declaración'
	];

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

	constructor(private fb: FormBuilder, public formHandler: FormHandlerService) {}

	ngOnInit() {
		this.refundForm = this.fb.group({
			fecha: [ '', Validators.required ],
			informacion: this.fb.group({
				noPoliza: [ '', Validators.required ],
				idNumber: [ '', Validators.required ],
				nombre: [ '', Validators.required ],
				direccion: [ '', Validators.required ],
				telefono: [ '', Validators.required ]
			}),
			diagnosticos: this.fb.array([ this.createDiagnostic() ]),
			comentario: [ '' ],
			forma: [ '', Validators.required ]
		});

		this.diagnosticList = this.refundForm.get('diagnosticos') as FormArray;
	}

	changePayment(event) {
		if (event.value === 'cheque') {
			this.refundForm.removeControl('infoTransferencia');
		} else if (event.value === 'transferencia') {
			this.refundForm.addControl(
				'infoTransferencia',
				this.fb.group({
					cedula: [ '', Validators.required ],
					noCuenta: [ '', Validators.required ],
					tipoCuenta: [ '', Validators.required ],
					bancoEmisor: [ '', Validators.required ],
					correo: [ '', Validators.required ]
				})
			);
		}
	}

	createInfo(): FormGroup {
		return this.fb.group({
			cedula: [ '', Validators.required ],
			noCuenta: [ '', Validators.required ],
			tipoCuenta: [ '', Validators.required ],
			bancoEmisor: [ '', Validators.required ],
			correo: [ '', Validators.required ]
		});
	}

	createDiagnostic(): FormGroup {
		return this.fb.group({
			fecha: [ '', Validators.required ],
			lugar: [ '', Validators.required ],
			descripcion: [ '', Validators.required ],
			monto: [ '', Validators.required ]
		});
	}

	addDiagnostic() {
		this.diagnosticList.push(this.createDiagnostic());
	}

	removeDiagnostic(index) {
		this.diagnosticList.removeAt(index);
	}
}
