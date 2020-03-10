import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-claim',
	templateUrl: './claim.component.html',
	styleUrls: [ './claim.component.scss' ]
})
export class ClaimComponent implements OnInit {
	step = 0;

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

	constructor(private fb: FormBuilder) {}

	ngOnInit() {
		this.claimForm = this.fb.group({
			reclamacion: this.fb.group({
				diagnostico: [ '', Validators.required ],
				tipoServicio: [ '', Validators.required ],
				autorizadoNo: [ '', Validators.required ],
				autorizadoPor: [ '', Validators.required ],
				fechaDiagnostico: [ '', Validators.required ]
			}),
			asegurado: this.fb.group({
				numeroPoliza: [ '', Validators.required ],
				idNumero: [ '', Validators.required ],
				documentoIdentidad: [ '', Validators.required ],
				nombre: [ '', Validators.required ],
				numero: [ '', Validators.required ],
				edad: [ '', Validators.required ],
				tipo: [ '', Validators.required ]
			}),
			proveedor: this.fb.group({
				nombre: [ '', Validators.required ],
				correo: [ '', Validators.required ],
				codigo: [ '', Validators.required ],
				noContrato: [ '', Validators.required ]
			}),
			reclamados: this.fb.array([ this.createReclaimed() ]),
			casoHospitalizacion: this.fb.group({
				ingreso: [ '' ],
				egreso: [ '' ]
			}),
			observaciones: this.fb.group({
				observacion: [ '' ]
			})
		});

		this.reclaimedList = this.claimForm.get('reclamados') as FormArray;
	}

	createReclaimed(): FormGroup {
		return this.fb.group({
			codigoCpt: [ '', Validators.required ],
			procedimiento: [ '', Validators.required ],
			montoReclamado: [ '', Validators.required ],
			montoAutorizado: [ '', Validators.required ],
			montoDeducible: [ '', Validators.required ]
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

	setStep(index: number) {
		this.step = index;
	}

	nextStep() {
		this.step++;
	}

	sendClaim() {
		console.log('Impresion de formulario down here:');
		console.log('form: ', this.claimForm);
	}
}
