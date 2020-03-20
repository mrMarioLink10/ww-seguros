import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../../shared/components/form-components/models/field-config'


@Component({
  selector: 'app-new-authorization',
  templateUrl: './new-authorization.component.html',
  styleUrls: ['./new-authorization.component.scss']
})
export class NewAuthorizationComponent implements OnInit {

  
  accordionTitles = [
		'Información del Asegurado',
		'Información Médica'
  ];

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
  
  condiciones: FieldConfig = {
		label: 'La condición se trata de:',
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

  constructor() { }

  ngOnInit() {
  }

}
