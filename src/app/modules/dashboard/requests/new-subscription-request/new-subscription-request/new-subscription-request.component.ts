import { Component, OnInit, DoCheck } from '@angular/core';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {$sex, $res, $country, $time, $family} from '../../../../../core/form/objects';
import { CountriesService } from '../../../../../core/services/countries/countries.service';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
@Component({
  selector: 'app-new-subscription-request',
  templateUrl: './new-subscription-request.component.html',
  styleUrls: ['./new-subscription-request.component.scss']
})
export class NewSubscriptionRequestComponent implements OnInit, DoCheck {
  
  requestTypeOptions: FieldConfig =
   {
    label: 'Tipo de Solicitud',
    options: [
      {
        value: 'Cambio de plan',
        viewValue: 'Cambio de plan',
      }
    ],
    name: 'requestType',
   };
   payments: FieldConfig = {
    label: 'Frecuencia de Pago',
    options: [
      {
        value: 'Anual',
        viewValue: 'Anual'
      },
      {
       value: 'Semestral',
       viewValue: 'Semestral'
     },
     {
       value: 'otro',
       viewValue: 'Otra'
     },
    ]
  };
  deducibles: FieldConfig = {
    label: 'Frecuencia de Pago',
    options: [
      {
        value: 'RD$1,000',
        viewValue: '1000'
      },
      {
       value: 'RD$3,000',
       viewValue: '3000'
     },
     {
      value: 'RD$5,000',
      viewValue: '5000'
    },
     {
       value: 'otro',
       viewValue: 'Otr0'
     },
    ]
  };
  plans: FieldConfig = {
    label: 'Planes',
    options: [
      {
        value: 'Signature Special',
        viewValue: 'Signature Special',
      }
    ],
    name: 'plans',
  };
  titles = ['Contratante','Solicitante', 'Persona políticamente expuesta','Perfil Financiero', 'Dependientes', 'Sección A','Sección B','Sección C Beneficiarios Primarios','Beneficiario(s) Contingente(s)','Comentarios adicionales'];
  country = {
    label: 'País',
    options: $country,
    name: 'country',
  }
  status = {
    label: 'Estado Civil',
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
  year = {
    label: 'Tiempo',
    options: $time,
    name: 'time'
  };
  mony = {
    options: [
      {
        value: 'Menos de 10 mil US$',
        viewValue: 'Menos de 10 mil US$'
      },
      {
        value: '10 mil a 30 mil US$',
        viewValue: '10 mil a 30 mil US$'
      },
      {
        value: '30 mil a 50 mil US$',
        viewValue: '30 mil a 50 mil US$'
      },
      {
        value: 'Más de 50 mil US$',
        viewValue: 'Más de 50 mil US$'
      },
    ]
  };
  dependentFormGroup = {
    name:  [''],
    lastName:   [''],
    family: [''],
    weight:     [''],
    date:     [''],
    height:     [''],
    sex:        [''],
    birtday:       [''],
    student: [false],
    telUnivercity: [''],
    id: [''],
    nationality: [''],
  };
  newRequest: FormGroup;
  sex = $sex;
  res = $res;
  family = $family;
  dependentsFormArray: FormArray;
  constructor(private fb: FormBuilder, public formMethods: FormArrayGeneratorService) { }

  ngOnInit() {
   this.newRequest = this.fb.group({
      requestType: [''],
      NoC:         [''],
      deducibles:   [''],
      payment:     [''],
      plans:       [''],
      person: this.fb.group({
        firstName:    ['', Validators.required],
        secondName:   [''],
        lastName:     ['', Validators.required],
        date:         [''],
        sex:          [''],
        nationality:  [''],
        id:           [''],
        age:          [''],
        weight:       [''],
        height:       [''],
        status:       [''],
        country:      [''],
        city:         [''],
        direction:    [''],
        tel:          [''],
        cel:          [''],
        officeTel:    [''],
        fax:          [''],
        email:        [''],
        office: this.fb.group({
          company:            [''],
          position:           [''],
          direction:          [''],
          economicActivity:   [''],
          sector:             [''],
          city:               [''],
          country:            [''],
        })
      }),
      contractor: this.fb.group({
        societyName:        [''],
        commercialName:     [''],
        taxpayerNumber:     [''],
        socialHome:         [''],
        tel:                [''],
        email:              [''],
        commercialActivity: [''],
        requestType:        [''],
        legalRepresentation: this.fb.group({
          name:             [''],
          position:         [''],
          nationality:      [''],
          id:               [''],
          policy:           [''],
          email:            ['']
        })
      }),
      exposedPerson: this.fb.group({
        contractor:     [false],
        headLine:       [false],
        lastPosition:   [''],
        time:           [''],
        timeNumber:     ['']
      }),
      prinsipalIncome:  [''],
      otherIncomes:     [''],
      dependents: this.fb.array([ this.formMethods.createItem(this.dependentFormGroup)])
    });
    this.dependentsFormArray = this.newRequest.get('dependents') as FormArray;
  }
  ngDoCheck(){
  //console.log(this.newRequest);
  }
  add(){
    const increment = this.dependentsFormArray.length + 1;
    this.dependentsFormArray =  this.formMethods.addElement( this.dependentsFormArray, increment, this.dependentFormGroup).formArray;
  }
}
