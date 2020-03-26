import { Component, OnInit, DoCheck, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { $sex, $country } from 'src/app/core/form/objects';

@Component({
  selector: 'app-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.scss']
})
export class LifeComponent implements OnInit, DoCheck {

  maxWidth: any;
  dependentsFormArray: FormArray;
  requestType = [
    {
      value: 'Suscripción para Colectivos',
      viewValue: 'Suscripción para Colectivos',
      link: '/dashboard/requests/new-requests/major-expenses'
    }
  ];
  options: FieldConfig =
    {
      label: 'Tipo de Solicitud',
      options: this.requestType,
      name: 'requestType',
      type: 'select'
    };
  countryOfResidence = {
    options: $country,
    name: 'countryOfResidence',
  };
  countryOfBirth = {
    options: $country,
    name: 'countryOfBirth',
  };
  currency = {
    name: 'currency',
    options: [
      {
        value: 'Dolares',
        viewValue: 'Dolares'
      },
      {
        value: 'Pesos Dominicanos',
        viewValue: 'Pesos Dominicanos'
      },

      {
        value: 'Balboa',
        viewValue: 'Balboa'
      }
    ],
  };
  status = {
    options: [
      {
        value: 'Soltero',
        viewValue: 'soltero'
      },
      {
        value: 'Casado',
        viewValue: 'casado'
      },
      {
        value: 'Únion Libre',
        viewValue: 'Union Libre'
      }
    ],
    name: 'status'
  };
  sex = $sex;
  dependentFormGroup = {
    name: [''],
    lastName: [''],
    family: [''],
    weight: [''],
    height: [''],
    sex: [''],
    birtday: [''],
    student: [false],
    telUnivercity: ['']
  };

  // tslint:disable-next-line: max-line-length
  titles = ['Información del Propuesto Asegurado', 'Empleador (Datos laborales)', 'Contratante (completar sólo si no fuese el asegurado. De ser una Persona Jurídica, completar el Formulario Persona Jurídica.)', 'Pagador (completar sólo si no fuese el contratante. De ser una Persona Jurídica, completar el Formulario Persona Jurídica.)', 'Persona políticamente expuesta', 'Perfil Financiero', 'Información pertinente al plan', 'Información pertinente al pago de la prima', 'Designación de los Beneficiario(s) Primario(s)', 'Beneficiario(s) Contingente(s)', 'Información general', 'Historial Médico', 'Firmas', 'Reporte del agente'];
  newRequest: FormGroup;
  dependentsNumber = 0;
  constructor(private fb: FormBuilder, public formMethods: FormArrayGeneratorService) { }

  ngOnInit() {
    this.newRequest = this.fb.group({
      requestType: [''],
      person: this.fb.group({
        firstName: ['', Validators.required],
        secondName: ['', Validators.required],
        lastName: ['', Validators.required],
        date: [new Date(), Validators.required],
        sex: ['', Validators.required],
        nationality: ['', Validators.required],
        id: ['', Validators.required],
        age: ['', Validators.required],
        weight: ['', Validators.required],
        height: ['', Validators.required],
        status: ['', Validators.required],
        annualIncome: ['', Validators.required],
        currency: ['', Validators.required],
        countryOfResidence: ['', Validators.required],
        countryOfBirth: ['', Validators.required],
        city: ['', Validators.required],
        direction: ['', Validators.required],
        tel: ['', Validators.required],
        cel: ['', Validators.required],
        officeTel: ['', Validators.required],
        email: ['', Validators.required],
      }),
      employer: this.fb.group({
        CompanyName: ['', Validators.required],
        profession: ['', Validators.required],
        economicActivity: ['', Validators.required],
        years: ['', Validators.required],
        jobDuties: ['', Validators.required],
        countryOfResidence: ['', Validators.required],
        youAre: ['', Validators.required],
      }),
      contractor: this.fb.group({
        firstName: ['', Validators.required],
        secondName: ['', Validators.required],
        lastName: ['', Validators.required],
        date: [new Date(), Validators.required],
        sex: ['', Validators.required],
        nationality: ['', Validators.required],
        id: ['', Validators.required],
        countryOfResidence: ['', Validators.required],
        status: ['', Validators.required],
        countryOfBirth: ['', Validators.required],
        direction: ['', Validators.required],
        tel: ['', Validators.required],
        cel: ['', Validators.required],
        officeTel: ['', Validators.required],
        fax: ['', Validators.required],
        email: ['', Validators.required],
      }),
      dependentsNumber: [''],
      dependents: this.fb.array([this.formMethods.createItem(this.dependentFormGroup)])

    });

    this.dependentsFormArray = this.newRequest.get('dependents') as FormArray;
  }
  ngDoCheck(): void {
    this.maxWidth = window.matchMedia('(max-width: 11270px)');
  }

  onChangeDependents() {
    const dependent = parseInt(this.newRequest.get('dependentsNumber').value, 10);
    this.dependentsFormArray = this.formMethods.onChangeForms(dependent, this.dependentFormGroup, this.dependentsFormArray);
  }

  delete(id) {
    this.dependentsFormArray = this.formMethods.deleteOneElement(this.dependentsFormArray, id).formArray;
    this.newRequest.get('dependentsNumber').setValue(this.dependentsFormArray.length);
  }
}
