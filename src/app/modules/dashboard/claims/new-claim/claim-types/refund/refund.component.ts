import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig, Validator } from '../../../../../../shared/components/form-components/models/field-config';
import { FormHandlerService } from '../../../../../../core/services/forms/form-handler.service';
import { RefundService } from '../../../../claims/new-claim/claim-types/refund/services/refund.service';


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

	constructor(private fb: FormBuilder, public formHandler: FormHandlerService, private refund:RefundService) {}

	ID= null;
	ngOnInit() {

	this.ID=this.refund.id;
	if(this.ID!=null){
		console.log("El ID es "+ this.ID);
		this.getData(this.ID)
	}
	else if(this.ID==null){
		console.log("ID esta vacio")
	}

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

	getData(id){
		this.refund.returnData(id).subscribe(data=>{
			console.log(data.data.informacion.nombre)
			console.log(data)
			for(let x=0; x<data.data.diagnosticos.length;x++){
				console.log("hola, soy id numero "+data.data.diagnosticos[x].id)
				// console.log("Hola, soy la descripcion de la posicion " + x + ", y mi valor es " + data.data.diagnosticos[x].descripcion)
				if(x>=1){
					// console.log('Hola, soy yo, ' + x)
					this.addDiagnostic();
				}
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].descripcion.setValue(data.data.diagnosticos[x].descripcion)
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].fecha.setValue(data.data.diagnosticos[x].fecha)
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].lugar.setValue(data.data.diagnosticos[x].lugar)
				this.refundForm['controls'].diagnosticos['controls'][x]['controls'].monto.setValue(data.data.diagnosticos[x].monto)
			
				const formID4 = this.refundForm.get('diagnosticos').get([x]) as FormGroup;
				formID4.addControl('id', this.fb.control(data.data.diagnosticos[x].id, Validators.required));
			}

			this.refundForm['controls'].comentario.setValue(data.data.comentario)
			this.refundForm['controls'].fecha.setValue(data.data.fecha)
			this.refundForm['controls'].forma.setValue(data.data.forma)
			let sd={
				value:data.data.forma
			}
			if(sd.value!=null){
				this.changePayment(sd);
				if(this.refundForm.get('infoTransferencia')){
					this.refundForm['controls'].infoTransferencia['controls'].cedula.setValue(data.data.infoTransferencia.cedula)
					this.refundForm['controls'].infoTransferencia['controls'].noCuenta.setValue(data.data.infoTransferencia.noCuenta)
					this.refundForm['controls'].infoTransferencia['controls'].tipoCuenta.setValue(data.data.infoTransferencia.tipoCuenta)
					this.refundForm['controls'].infoTransferencia['controls'].bancoEmisor.setValue(data.data.infoTransferencia.bancoEmisor)
					this.refundForm['controls'].infoTransferencia['controls'].correo.setValue(data.data.infoTransferencia.correo)
				}
			}
			else if (sd.value==null){
				console.log("No hay que crear el control")
			}

			this.refundForm['controls'].informacion['controls'].direccion.setValue(data.data.informacion.direccion)
			this.refundForm['controls'].informacion['controls'].idNumber.setValue(data.data.informacion.idNumber)
			this.refundForm['controls'].informacion['controls'].noPoliza.setValue(data.data.informacion.noPoliza)
			this.refundForm['controls'].informacion['controls'].nombre.setValue(data.data.informacion.nombre)
			this.refundForm['controls'].informacion['controls'].telefono.setValue(data.data.informacion.telefono)
			// console.log("El largo es "+ data.data.diagnosticos.length)
			// console.log(data.data.id)
			// console.log(data.data.infoTransferenciaId)
			// console.log(data.data.informacionId)
			// if(data.data.infoTransferencia.id!=null){
			// 	console.log(data.data.infoTransferencia.id)
			// }
			// console.log(data.data.informacion.id)
			const formID1 = this.refundForm as FormGroup;
			formID1.addControl('id', this.fb.control(data.data.id, Validators.required));
			// formID1.addControl('infoTransferenciaId', this.fb.control(data.data.infoTransferenciaId, Validators.required));
			// formID1.addControl('informacionId', this.fb.control(data.data.informacionId, Validators.required));
			
			if(this.refundForm.get('infoTransferencia')){
				const formID2 = this.refundForm.get('infoTransferencia') as FormGroup;
				formID2.addControl('id', this.fb.control(data.data.infoTransferencia.id, Validators.required));
			}

			const formID3 = this.refundForm.get('informacion') as FormGroup;
			formID3.addControl('id', this.fb.control(data.data.informacion.id, Validators.required));

			console.log(JSON.stringify(this.refundForm.value))
		})
		this.refund.id=null;
		console.log("this.refund.id es igual a "+ this.refund.id);
	  }
}
