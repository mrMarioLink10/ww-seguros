import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../../shared/components/form-components/models/field-config'
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormHandlerService } from '../../../../core/services/forms/form-handler.service';
import { $country } from 'src/app/core/form/objects';
import { NewAuthorizationService } from '../new-authorization/services/new-authorization.service';

@Component({
	selector: 'app-new-authorization',
	templateUrl: './new-authorization.component.html',
	styleUrls: ['./new-authorization.component.scss']
})
export class NewAuthorizationComponent implements OnInit {

	accordionTitles = [
		'Información del Asegurado',
		'Información médica'
	];

	seguros: FieldConfig = {
		label: '¿Tiene otro seguro de salud?',
		options: [
			{
				value: 'si',
				viewValue: 'Si'
			},
			{
				value: 'no',
				viewValue: 'No'
			}
		]
	};

	generos: FieldConfig = {
		label: 'Sexo',
		options: [
			{
				value: 'femenino',
				viewValue: 'Femenino'
			},
			{
				value: 'masculino',
				viewValue: 'Masculino'
			}
		]
	};

	condiciones: FieldConfig = {
		label: 'La condición se trata de: ',
		options: [
			{
				value: 'hospitalizacion',
				viewValue: 'Hospitalización'
			},
			{
				value: 'ambulatorio',
				viewValue: 'Ambulatorio'
			}
		]
	};

	authorization: FormGroup;

	constructor(private fb: FormBuilder, public formHandler: FormHandlerService, private newAuthorization: NewAuthorizationService) {
	}

	selectChange(event: any) {
		const form = this.authorization.get('informacionAsegurado') as FormGroup;

		if (event.valor === 'si') {
			switch (event.name) {
				case 'otroSeguro':
					form.addControl('seguro', this.fb.group({
						nombre: [''],
						noPoliza: [''],
						fecha: [''],
						suma: ['', Validators.min(0)],
					}));
					break;
				default:
					break;
			}
		} else if (event.valor === 'no') {
			switch (event.name) {
				case 'otroSeguro':
					form.removeControl('seguro');
					break;
				default:
					break;
			}
		}
	}

	ID = null;
	ngOnInit() {

		this.ID = this.newAuthorization.id;
		if (this.ID != null) {
			console.log("El ID es " + this.ID);
			this.getData(this.ID)
		}
		else if (this.ID == null) {
			console.log("ID esta vacio")
		}

		this.authorization = this.fb.group({
			fecha: ['', Validators.required],
			informacionAsegurado: this.fb.group({
				nombres: ['', Validators.required],
				apellidos: ['', Validators.required],
				noPoliza: ['', Validators.required],
				sexo: ['', Validators.required],
				correo: ['', Validators.required],
				direccion: ['', Validators.required],
				telefonoResidencia: [''],
				telefonoCelular: ['', Validators.required],
				telefonoOficina: [''],
				otroSeguro: ['', Validators.required],
			}),
			informacionMedica: this.fb.group({
				diagnostico: ['', Validators.required],
				condicion: ['', Validators.required],
				procedimiento: ['', Validators.required],
				primerosSintomas: this.fb.group({
					fecha: ['', Validators.required],
					nombreMedico: ['', Validators.required],
					direccion: ['', Validators.required],
					telefono: ['', Validators.required],
				}),
				admision: this.fb.group({
					fecha: ['', Validators.required],
					nombreMedico: ['', Validators.required],
					direccion: ['', Validators.required],
					telefono: ['', Validators.required],
				}),
				tiempoEstadia: ['', Validators.required],
				nombreServicio: ['', Validators.required],
				// direccion: ['', Validators.required],
				// telefono: ['', Validators.required],
			}),
			isComplete: [false, Validators.required]

		});
	}

	getData(id) {
		this.newAuthorization.returnData(id).subscribe(data => {
			// console.log(data.data.informacionAsegurado.nombre)
			// console.log(data)
			// console.log(data.data.informacionMedica.primerosSintomas.nombreMedico);
			// this.authorization.controls['informacionAsegurado'].setValue("")
			this.authorization['controls'].fecha.setValue(data.data.fecha)
			this.authorization['controls'].informacionAsegurado['controls'].nombre.setValue(data.data.informacionAsegurado.nombre)
			this.authorization['controls'].informacionAsegurado['controls'].noPoliza.setValue(data.data.informacionAsegurado.noPoliza)
			this.authorization['controls'].informacionAsegurado['controls'].sexo.setValue(data.data.informacionAsegurado.sexo)
			this.authorization['controls'].informacionAsegurado['controls'].correo.setValue(data.data.informacionAsegurado.correo)
			this.authorization['controls'].informacionAsegurado['controls'].direccion.setValue(data.data.informacionAsegurado.direccion)
			this.authorization['controls'].informacionAsegurado['controls'].telefonoResidencia.setValue(data.data.informacionAsegurado.telefonoResidencia)
			this.authorization['controls'].informacionAsegurado['controls'].telefonoCelular.setValue(data.data.informacionAsegurado.telefonoCelular)
			this.authorization['controls'].informacionAsegurado['controls'].telefonoOficina.setValue(data.data.informacionAsegurado.telefonoOficina)
			this.authorization['controls'].informacionAsegurado['controls'].otroSeguro.setValue(data.data.informacionAsegurado.otroSeguro)
			this.authorization['controls'].informacionMedica['controls'].diagnostico.setValue(data.data.informacionMedica.diagnostico)
			this.authorization['controls'].informacionMedica['controls'].condicion.setValue(data.data.informacionMedica.condicion)
			this.authorization['controls'].informacionMedica['controls'].procedimiento.setValue(data.data.informacionMedica.procedimiento)
			this.authorization['controls'].informacionMedica['controls'].primerosSintomas['controls'].fecha.setValue(data.data.informacionMedica.primerosSintomas.fecha)
			this.authorization['controls'].informacionMedica['controls'].primerosSintomas['controls'].nombreMedico.setValue(data.data.informacionMedica.primerosSintomas.nombreMedico)
			this.authorization['controls'].informacionMedica['controls'].primerosSintomas['controls'].direccion.setValue(data.data.informacionMedica.primerosSintomas.direccion)
			this.authorization['controls'].informacionMedica['controls'].primerosSintomas['controls'].telefono.setValue(data.data.informacionMedica.primerosSintomas.telefono)
			this.authorization['controls'].informacionMedica['controls'].admision['controls'].fecha.setValue(data.data.informacionMedica.admision.fecha)
			this.authorization['controls'].informacionMedica['controls'].admision['controls'].nombreMedico.setValue(data.data.informacionMedica.admision.nombreMedico)
			this.authorization['controls'].informacionMedica['controls'].admision['controls'].direccion.setValue(data.data.informacionMedica.admision.direccion)
			this.authorization['controls'].informacionMedica['controls'].admision['controls'].telefono.setValue(data.data.informacionMedica.admision.telefono)
			this.authorization['controls'].informacionMedica['controls'].tiempoEstadia.setValue(data.data.informacionMedica.tiempoEstadia)
			this.authorization['controls'].informacionMedica['controls'].nombreServicio.setValue(data.data.informacionMedica.nombreServicio)
			this.authorization['controls'].informacionMedica['controls'].direccion.setValue(data.data.informacionMedica.direccion)
			this.authorization['controls'].informacionMedica['controls'].telefono.setValue(data.data.informacionMedica.telefono)

			if (data.data.informacionAsegurado.otroSeguro == "si") {
				const form = this.authorization.get('informacionAsegurado') as FormGroup;
				form.addControl('seguro', this.fb.group({
					nombre: ['', Validators.required],
					noPoliza: ['', Validators.required],
					fecha: ['', Validators.required],
					suma: ['', [Validators.required, Validators.min(1)]],
				}));
				this.authorization['controls'].informacionAsegurado['controls'].seguro['controls'].nombre.setValue(data.data.informacionAsegurado.seguro.nombre)
				this.authorization['controls'].informacionAsegurado['controls'].seguro['controls'].noPoliza.setValue(data.data.informacionAsegurado.seguro.noPoliza)
				this.authorization['controls'].informacionAsegurado['controls'].seguro['controls'].fecha.setValue(data.data.informacionAsegurado.seguro.fecha)
				this.authorization['controls'].informacionAsegurado['controls'].seguro['controls'].suma.setValue(data.data.informacionAsegurado.seguro.suma)

				console.log(JSON.stringify(this.authorization.value))
			}
			else if (data.data.informacionAsegurado.otroSeguro == "no") {
				console.log("No hay que crear el control")
			}
			// console.log(data.data.id)
			// console.log(data.data.informacionAseguradoId)
			// console.log(data.data.informacionMedicaId)
			// console.log(data.data.informacionAsegurado.id)
			// if(data.data.informacionAsegurado.seguro.id!=null){
			// 	console.log(data.data.informacionAsegurado.seguro.id)
			// }
			// console.log(data.data.informacionMedica.admisionId)
			// console.log(data.data.informacionMedica.id)
			// console.log(data.data.informacionMedica.primerosSintomasId)
			// console.log(data.data.informacionMedica.admision.id)
			// console.log(data.data.informacionMedica.primerosSintomas.id)
			const formID1 = this.authorization as FormGroup;
			formID1.addControl('id', this.fb.control(data.data.id, Validators.required));
			// formID1.addControl('informacionAseguradoId', this.fb.control(data.data.informacionAseguradoId, Validators.required));
			// formID1.addControl('informacionMedicaId', this.fb.control(data.data.informacionMedicaId, Validators.required));

			const formID2 = this.authorization.get('informacionAsegurado') as FormGroup;
			formID2.addControl('id', this.fb.control(data.data.informacionAsegurado.id, Validators.required));

			const formID3 = this.authorization.get('informacionMedica') as FormGroup;
			formID3.addControl('admisionId', this.fb.control(data.data.informacionMedica.admisionId, Validators.required));
			formID3.addControl('id', this.fb.control(data.data.informacionMedica.id, Validators.required));
			formID3.addControl('primerosSintomasId', this.fb.control(data.data.informacionMedica.primerosSintomasId, Validators.required));

			const formID4 = this.authorization.get('informacionMedica').get('admision') as FormGroup;
			formID4.addControl('id', this.fb.control(data.data.informacionMedica.admision.id, Validators.required));

			if (this.authorization.get('informacionAsegurado').get('seguro')) {
				const formID5 = this.authorization.get('informacionAsegurado').get('seguro') as FormGroup;
				formID5.addControl('id', this.fb.control(data.data.informacionAsegurado.seguro.id, Validators.required));
			}

			const formID6 = this.authorization.get('informacionMedica').get('primerosSintomas') as FormGroup;
			formID6.addControl('id', this.fb.control(data.data.informacionMedica.primerosSintomas.id, Validators.required));

			console.log(JSON.stringify(this.authorization.value))
		})
		this.newAuthorization.id = null;
		console.log("this.newAuthorization.id es igual a " + this.newAuthorization.id);
	}
}
