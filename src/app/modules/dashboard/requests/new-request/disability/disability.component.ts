import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { DisabilityService } from '../disability/services/disability.service'
import { $country } from 'src/app/core/form/objects';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-disability',
  templateUrl: './disability.component.html',
  styleUrls: ['./disability.component.scss']
})
export class DisabilityComponent implements OnInit {

  accordionTitles= ['Sección A. Datos del propuesto Asegurado y Estatus laboral', 'Sección B. Datos del Contratante', 'Sección C. Cuestionario Médico', 'Sección D. Opción del Plan', 'Sección E. Beneficiarios Primarios', 'Beneficiario(s) Contigente(s)']

  genderOptions:FieldConfig ={

    label:'',
    options: [

      {
        value:'masculino',
        viewValue:'Masculino'
      },

      {
        value:'femenino',
        viewValue:'Femenino'
      }

    ]

  };

  contractOPtions:FieldConfig={

    label:'',
    options: [

      {

        value:'permanente',
        viewValue:'Permanente'

      },
      {
        value:'temporal',
        viewValue:'Temporal'
      }

    ]

  }

  type = {
    label: 'Tipo de Solicitud',
    options: [

      {
        value: 'vida',
        viewValue: 'Solicitud de Seguro de Vida',
        link: '/dashboard/requests/new-requests/life'
      },

      {
        value: 'disability',
        viewValue: 'Solicitud de Suscripción Disability',
        link: '/dashboard/requests/new-requests/disability'
      },

      {
        value: 'gastos mayores',
        viewValue: 'Suscripción Seguro Gastos Médicos Mayores',
        link: '/dashboard/requests/new-requests/major-expenses'
      }

    ]
  };


  pruebaArray:FieldConfig = {
    label: 'Prueba',
    options: [

      {
        value: 'vida',
        viewValue: 'Solicitud de Seguro de Vida',
      },

      {
        value: 'disability',
        viewValue: 'Solicitud de Suscripción Disability',
      },

      {
        value: 'gastos mayores',
        viewValue: 'Suscripción Seguro Gastos Médicos Mayores',
      }

    ]
  };

array;

countrylist: Array<any> = [
  { name: 'Alemania', cities: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn'] },
  { name: 'España', cities: ['Barcelona'] },
  { name: 'Estados Unidos', cities: ['Downers Grove'] },
  { name: 'México', cities: ['Puebla'] },
  { name: 'China', cities: ['Beijing'] },
];

// countrylist: Array<any> = [
//   { name: 'Alemania', cities: [ 
//     {
//       value:'Duesseldorf',
//       viewValue:'Duesseldorf'
//     },
//     {
//       value:'Leinfelden-Echterdingen',
//       viewValue:'Leinfelden-Echterdingen'
//     },
//     {
//       value:'Eschborn',
//       viewValue:'Eschborn'
//     },] 
// },
//   { name: 'España', cities: [
//     {
//       value:'Barcelona',
//       viewValue:'Barcelona'
//     }] 
// },
//   { name: 'Estados Unidos', cities: [
//     {
//       value:'Downers Grove',
//       viewValue:'Downers Grove'
//     }] 
// },
//   { name: 'México', cities: [
//     {
//       value:'Puebla',
//       viewValue:'Puebla'
//     }]
// },
//   { name: 'China', cities: [
//     {
//       value:'Beijing',
//       viewValue:'Beijing'
//     }] 
// },
// ];

cities: Array<any>;
changeCountry(event) {
  this.cities = this.countrylist.find(con => con.name == event.valor).cities;
  console.log("hola")
}

// countryListPrueba= {
//   label: 'Estado Prueba',
//   options: this.countrylist[0].cities
// };

// pruebaCambio(event):any{

// console.log(event.value)

// }


  // pruebaArray2:FieldConfig = {
  //   label: 'Prueba2',
  //   options: this.pruebaCambio(event)
  // };

  currencyOptions:FieldConfig={

    label:'Moneda',
    options: this.disabilityService.currencyArray

  };

  YesNo:FieldConfig={
    label:'',
    options: [

      {
        value:'si',
        viewValue:'Si'
      },

      {
        value:'no',
        viewValue:'No'
      }

    ]
  };

status:FieldConfig={

  label:'Estado Civil',
  options: [
    {
      value: 'casado',
      viewValue: 'Casado'
    },
    {
      value: 'soltero',
      viewValue: 'Soltero'
    },
    {
      value: 'union Libre',
      viewValue: 'Unión Libre'
    }, 
    {
      value: 'divorciado',
      viewValue: 'Divorciado'
    }
  ]
};

countryList: FieldConfig = {
  label: 'País',
  options: $country
};

countryList2: FieldConfig = {
  label: 'País de residencia',
  options: $country
};

cityList: FieldConfig = {
  label: 'Ciudad',
  options: [

    {

      value:'santiago',
      viewValue:'Santiago'

    }

  ]
};

waitingTime:FieldConfig={
  label:'',
  options:[

    {

      value:'30 días',
      viewValue:'30 días'

    },

    {

      value:'60 días',
      viewValue:'60 días'

    },

    {

      value:'90 días',
      viewValue:'90 días'

    },

    {

      value:'120 días',
      viewValue:'120 días'

    }

  ]
};

lifeOptions:FieldConfig={

  label:'Vida/MA&D',
  options: this.disabilityService.lifeArray

};

rentOptions:FieldConfig={

  label:'Renta Disability',
  options: this.disabilityService.rentArray

};

@Output() selected = new EventEmitter<any>();

emitter(event) {
  // this.selected.emit({ valor: event.value });

  // if(event.value==="vida"){
    console.log("Funciona " + event.value)
  // }

}

selectChange(event){
  const form = this.disabilityGroup.get('questions') as FormGroup;
  const formQ = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;
  const formC = this.disabilityGroup.get('questions').get('questionnaire').get('insurance') as FormGroup;

  if (event.valor === 'si') {

        switch(event.name){
        
            case 'smoker_radio':
        
              form.addControl('smoke', this.fb.group({
                quantity: ['', [Validators.required, Validators.min(1)]]
              }));
              console.log(JSON.stringify(this.disabilityGroup.value));

            break;
        
            case 'alcohol_radio':

              form.addControl('alcohol', this.fb.group({
                quantity: ['', [Validators.required, Validators.min(1)]]
              }));
              console.log(JSON.stringify(this.disabilityGroup.value));

            break;

            case 'health_radio':

              formQ.addControl('health', this.fb.group({
                date: [new Date(), Validators.required,],
                reason: ['', Validators.required],
                therapy: ['', Validators.required]

              }));
              console.log(JSON.stringify(this.disabilityGroup.value));

            break;
            
            case 'therapy_radio':

              formQ.addControl('therapies', this.fb.group({
                date: [new Date(), Validators.required,],
                reason: ['', Validators.required],
                therapy: ['', Validators.required]

              }));
              console.log(JSON.stringify(this.disabilityGroup.value));

            break;
            
            case 'sick_pay_radio':

              formQ.addControl('sick_pay', this.fb.group({
                date: [new Date(), Validators.required,],
                reason: ['', Validators.required],
                therapy: ['', Validators.required]

              }));
              console.log(JSON.stringify(this.disabilityGroup.value));

            break;

            case 'analysis_radio':

              formQ.addControl('analysis', this.fb.group({
                date: [new Date(), Validators.required,],
                name: ['', Validators.required],

              }));
              console.log(JSON.stringify(this.disabilityGroup.value));

            break;
            
            case 'other_analysis_radio':

              formQ.addControl('other_analysis', this.fb.group({
                date: [new Date(), Validators.required,],
                reason: ['', Validators.required],

              }));
              console.log(JSON.stringify(this.disabilityGroup.value));

            break;

            case 'inpatientCare_radio':

              formQ.addControl('inpatientCare', this.fb.group({
                date: [new Date(), Validators.required,],
                reason: ['', Validators.required],

              }));
              console.log(JSON.stringify(this.disabilityGroup.value));

            break;
            
            case 'sicknessType_radio':

              formQ.addControl('sicknessType', this.fb.group({
                date: [new Date(), Validators.required,],
                description: ['', Validators.required],

              }));
              console.log(JSON.stringify(this.disabilityGroup.value));

            break;
            
            case 'VIH_radio':

              formQ.addControl('VIH', this.fb.group({
                date: [new Date(), Validators.required,],
                name: ['', Validators.required],

              }));
              console.log(JSON.stringify(this.disabilityGroup.value));

            break;
            
            case 'specialTherapy_radio':

              formQ.addControl('specialTherapy', this.fb.group({
                date: [new Date(), Validators.required,],
                reason: ['', Validators.required],

              }));
              console.log(JSON.stringify(this.disabilityGroup.value));

            break;
            
            case 'accident_radio':

              formQ.addControl('accident', this.fb.group({
                date: [new Date(), Validators.required,],
                reason: ['', Validators.required],
                effects: ['', Validators.required],

              }));
              console.log(JSON.stringify(this.disabilityGroup.value));

            break;
            
            case 'deny_radio':

              formQ.addControl('deny', this.fb.group({
                reason: ['', Validators.required]

              }));
              console.log(JSON.stringify(this.disabilityGroup.value));

            break;
            
            case 'insurance_radio':

              formQ.addControl('insurance', this.fb.group({
                company: ['', Validators.required],
                num: ['', [Validators.required, Validators.min(1)]],
                name: ['', Validators.required],
                insured_company: ['', Validators.required],
                policy: ['', Validators.required],
                date: [new Date(), Validators.required],
                claim_radio:['', Validators.required],

              }));
              console.log(JSON.stringify(this.disabilityGroup.value));

            break;

            case 'claim_radio':

              formC.addControl('claim', this.fb.group({
                explanation: ['', Validators.required],
              }));
              console.log(JSON.stringify(this.disabilityGroup.value));

            break;
        
        }

    }

    else if (event.valor === 'no'){

        switch(event.name){

          case 'smoker_radio':
        
            form.removeControl('smoke');

          break;
          
          case 'alcohol_radio':

            form.removeControl('alcohol');

          break;

          case 'health_radio':

            formQ.removeControl('health');

          break;
          
          case 'therapy_radio':

            formQ.removeControl('therapies');

          break;
          
          case 'sick_pay_radio':

            formQ.removeControl('sick_pay');

          break;

          case 'analysis_radio':

            formQ.removeControl('analysis');

          break;
          
          case 'other_analysis_radio':

            formQ.removeControl('other_analysis');

          break;
          
          case 'inpatientCare_radio':

            formQ.removeControl('inpatientCare');

          break;
          
          case 'sicknessType_radio':

            formQ.removeControl('sicknessType');

          break;

          case 'VIH_radio':

            formQ.removeControl('VIH');

          break;
          
          case 'accident_radio':

            formQ.removeControl('accident');

          break;

          case 'deny_radio':

            formQ.removeControl('deny');

          break;
          
          case 'insurance_radio':

            formQ.removeControl('insurance');

          break;

          case 'claim_radio':

            formC.removeControl('claim');

          break;
          
      } 
  } 
}

  typeRequestGroup:FormGroup;

  disabilityGroup:FormGroup;
  mainFormArray:FormArray;
  mainProperty;
  contingentFormArray:FormArray;
  contingentProperty;

  money_laundering:FormGroup;
  know_client:FormGroup;

  // INTENTAR HACER LA CONDICION 6 DEL FORMULARIO DE DISABILITY, TOMANDO COMO BASE LO QUE HIZO ISAI EN EL FORMULARIO
  // DE VIDA. AH, Y VER SI AL <mat-tab> SE LE PUEDE PONER UNA CONDICION DE QUE APAREZCA SI UNA VARIABLE ES MAYOR
  // QUE 0 ó HACER VARIOS <mat-tab Y QUE UN RADIOBUTTON HAGA QUE EXISTA
  //X COMPONENTE RELACIONADO A LOS RADIOBUTTONS, Y SI EXISTE, QUE EL <mat-tab APAREZCA ENTONCES.
  
  // @Input() options: FieldConfig;     TERMINAR ESTAS 3 COSAS PARA PROBAR EL SELECT
  // @Input() group: FormGroup=this.disabilityGroup.get('policyholder') as FormGroup;
  // @Input() name: string="countryPrueba";

  mainGroup ={
    full_name: ['', Validators.required],
    id: ['', Validators.required],
    nationality: ['', Validators.required],
    relationship: ['', Validators.required],
    percentage: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
  }

  contingentGroup ={
    full_name: ['', Validators.required],
    id: ['', Validators.required],
    nationality: ['', Validators.required],
    relationship: ['', Validators.required],
    percentage: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
  }

  createFormArray(name: string) {

    const formP = this.disabilityGroup.get('main') as FormGroup;
    const formC = this.disabilityGroup.get('contingent') as FormGroup;
    
    formP.addControl('main_array', this.mainProperty);
    formC.addControl('contingent_array', this.contingentProperty);

		switch (name) {

			case 'main_array':

				  return this.mainGroup;
          break;

      case 'contingent_array':

          return this.contingentGroup;
          break;

      }

    }

    items=[];

  constructor(private fb:FormBuilder, public formMethods: FormArrayGeneratorService, private disabilityService:DisabilityService, private http:HttpClient) {

    this.http.get('https://restcountries.eu/rest/v2/all').subscribe(data=>
      {
        console.log(data)

        let list=[];

        for(let key in data){
          if(data.hasOwnProperty(key)){

            list.push(
                  {
                    value: data[key].translations.es,
                    viewValue: data[key].translations.es
                  }
              )
          }
        }
    
        list[27].value="Bonaire, San Eustaquio y Saba";
        list[27].viewValue="Bonaire, San Eustaquio y Saba";
        list[59].value="Curazao";
        list[59].viewValue="Curazao";
        list[203].value="San Martín (Países Bajos)";
        list[203].viewValue="San Martín (Países Bajos)";

        //  this.items= list.map(n=>n.translations.es).sort();

        list.sort(function(a, b){
          var nameA=a.value.toLowerCase(), nameB=b.value.toLowerCase()
          if (nameA < nameB) //sort string ascending
              return -1 
          if (nameA > nameB)
              return 1
          return 0 //default return value (no sorting)
        })

        this.items= list
        console.log(this.items)

      });

   }

   

  ngOnInit() {

    this.mainProperty = this.fb.array([this.formMethods.createItem(this.mainGroup)]);
    this.contingentProperty = this.fb.array([this.formMethods.createItem(this.contingentGroup)]);

    this.money_laundering= this.fb.group({}),
    this.know_client=this.fb.group({}),

    this.typeRequestGroup= this.fb.group({
      typeRequest:[''],
      // prueba:[''],
      // pruebaA:[''],
      // pruebaB:['']

    })

    this.disabilityGroup = this.fb.group({

      // money_laundering: this.fb.group({}),
      // know_client: this.fb.group({}),

      num_financial_quote: ['', Validators.required],
      // typeRequest:[''],
      insured_data: this.fb.group({

        name: ['', Validators.required],
        last_name: ['', Validators.required],
        birthdate: [new Date(), Validators.required],
        gender: ['', Validators.required],
        job: ['', Validators.required],
        nationality: ['', Validators.required],
        id_passport: ['', Validators.required],
        contract: ['', Validators.required],
        date_since:[new Date(), Validators.required],
        date_until:[new Date(), Validators.required],
        position:['', Validators.required],
        salary:['', [Validators.required, Validators.min(1)]],
        currency:['', Validators.required],
        address:['', Validators.required],
        telephone:['', Validators.required],
        email:['', [Validators.required, Validators.email]],
        job_description:['', Validators.required],
        job_hours:['',[Validators.required, Validators.min(1)]],
        date:[new Date(), Validators.required],
        reason_pension:['', Validators.required],
        office_hours:['', [Validators.required, Validators.min(1)]],
        company:['', Validators.required],
        amount_pension:['', [Validators.required, Validators.min(1)]],
        currency_pension:['', Validators.required],
        outside_hours:['', [Validators.required, Validators.min(1)]],
        pension_radio:['', Validators.required],
        pep_radio:['', Validators.required]

      }),

      policyholder: this.fb.group({

        name:['', Validators.required],
        id_passport:['', Validators.required],
        marital_status:['', Validators.required],
        nationality:['', Validators.required],
        telephone:['', Validators.required],
        cell:['', Validators.required],
        email:['', [Validators.required, Validators.email]],
        annual_income:['', [Validators.required, Validators.min(1)]],
        currency:['', Validators.required],
        address:['', Validators.required],
        country:['', Validators.required],
        countryPrueba:['', Validators.required],
        city:['', Validators.required],
        postal_address:['', Validators.required],
        country_residence:['', Validators.required],
        relationship:['', Validators.required],
        pep_radio:['', Validators.required],
        representative:['', Validators.required],
        passport_id:['', Validators.required]

      }),

      questions: this.fb.group({
        smoker_radio:['', Validators.required],
        alcohol_radio:['', Validators.required],
        weight:['', Validators.required],
        height:['', Validators.required],

        questionnaire: this.fb.group({

          weight_radio:['', Validators.required],
          health_radio:['', Validators.required],
          therapy_radio:['', Validators.required],
          sick_pay_radio:['', Validators.required],
          analysis_radio:['', Validators.required],
          other_analysis_radio:['', Validators.required],
          inpatientCare_radio:['', Validators.required],
          hospitalization_radio:['', Validators.required],
          sicknessType_radio:['', Validators.required],
          bloodSick_radio:['', Validators.required],
          VIH_radio:['', Validators.required],
          specialTherapy_radio:['', Validators.required],
          accident_radio:['', Validators.required],
          deny_radio:['', Validators.required],
          insurance_radio:['', Validators.required],


        })

      }),

      plan: this.fb.group({

        period:['', Validators.required],
        life:['', Validators.required],
        rent:['', Validators.required]
      }),

      main: this.fb.group({

        full_name:['', Validators.required],
        relationship:['', Validators.required],
        id_passport:['', Validators.required],
          
        main_array: this.fb.array([this.formMethods.createItem(this.mainGroup)])   

      }),

      contingent: this.fb.group({

        full_name:['', Validators.required],
        relationship:['', Validators.required],
        id_passport:['', Validators.required],
          
        contingent_array: this.fb.array([this.formMethods.createItem(this.contingentGroup)])   

      }),

    })

    this.mainFormArray = this.disabilityGroup.get('main').get('main_array') as FormArray;
    this.contingentFormArray = this.disabilityGroup.get('contingent').get('contingent_array') as FormArray;

  }

  addFormArray(array: any, name: string) {

    const increment = array.length + 1;
    array = this.formMethods.addElement(array, increment, this.createFormArray(name)).formArray;
    
    console.log(JSON.stringify(this.disabilityGroup.value));
    // array.push(this.createFormArray(name));
    
  }

  removeFormArray(index, array: any) {
    array.removeAt(index);
  }

}
