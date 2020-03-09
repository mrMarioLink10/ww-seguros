import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

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

	claimForm = this.fb.group({
		reclamacion: this.fb.group({
			diagnostico: [ '' ],
			tipoServicio: [ '' ],
			autorizadoNo: [ '' ],
			autorizadoPor: [ '' ],
			fechaDiagnostico: [ '' ]
		}),
		asegurado: this.fb.group({
			numeroPoliza: [ '' ],
			idNumero: [ '' ],
			documentoIdentidad: [ '' ],
			nombre: [ '' ],
			numero: [ '' ],
			edad: [ '' ],
			tipo: [ '' ]
		}),
		proveedor: this.fb.group({
			nombre: [ '' ],
			correo: [ '' ],
			codigo: [ '' ],
			noContrato: [ '' ]
		}),
		reclamados: this.fb.group({
			street: [ '' ],
			city: [ '' ]
		}),
		casoHospitalizacion: this.fb.group({
			ingreso: [ '' ],
			egreso: [ '' ]
		}),
		observaciones: this.fb.group({
			observacion: [ '' ]
		})
	});

	constructor(private fb: FormBuilder) {}

	ngOnInit() {}

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
