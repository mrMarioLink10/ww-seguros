import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../../shared/components/form-components/models/field-config'
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormHandlerService } from '../../../../core/services/forms/form-handler.service';
import { $country } from 'src/app/core/form/objects';


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
				value: 'cirugia_electiva',
				viewValue: 'Cirugía Electiva'
			},
			{
				value: 'ambulatorio',
				viewValue: 'Ambulatorio'
			},
			{
				value: 'estudios_especiales',
				viewValue: 'Estudios Especiales'
			}
		]
	};

	authorization: FormGroup;

	constructor(private fb: FormBuilder, public formHandler: FormHandlerService) { 

	}

	selectChange(event: any) {
		const form = this.authorization.get('informacionAsegurado') as FormGroup;

		if (event.valor === 'si') {
			switch (event.name) {
				case 'otroSeguro':
					form.addControl('seguro', this.fb.group({
						nombre: ['', Validators.required],
						noPoliza: ['', Validators.required],
						fecha: ['', Validators.required],
						suma: ['', Validators.required],
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


ngOnInit() {
		this.authorization= this.fb.group({
			fecha: ['', Validators.required],
			informacionAsegurado: this.fb.group({
				nombre: ['', Validators.required],
				noPoliza: ['', Validators.required],
				sexo: ['', Validators.required],
				correo: ['', Validators.required],
				direccion: ['', Validators.required],
				telefonoResidencia: ['', Validators.required],
				telefonoCelular: ['', Validators.required],
				telefonoOficina: ['', Validators.required],
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
				direccion: ['', Validators.required],
				telefono: ['', Validators.required],
			})
		});
	}


}
