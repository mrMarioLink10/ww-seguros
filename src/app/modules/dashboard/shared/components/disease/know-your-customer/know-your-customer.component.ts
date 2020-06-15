import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { $country } from 'src/app/core/form/objects';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { LifeService } from '../../../../requests/new-request/life/services/life.service';

@Component({
  selector: 'app-know-your-customer',
  templateUrl: './know-your-customer.component.html',
  styleUrls: []
})
export class KnowYourCustomerComponent implements OnInit, DoCheck {

  @Input() form:FormGroup;
  @Input() title:string;

  // accordionTitles=['Datos Generales','Datos Profesionales', 'Persona políticamente expuesta',
  // 'Pólizas con prima anual, igual o mayor a US$10,000.00','Declaración de fuente y origen de
  // recursos de la transacción','Perfil financiero', 'Referencias bancarias', 'Referencias comerciales',
  //  'Referencias personales', 'Documentos Necesarios (Indicar con una ✓)','Datos del corredor
  // (Quien declara haber revisado los datos dados por el cliente o contratante)','Para uso de la aseguradora', 'Declaración']

  customer: FormGroup;

  genderOptions: FieldConfig = {

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

  }

  yesNo: FieldConfig = {

    label: '',
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

  }

  main_annual_income_options: FieldConfig = {
		label: 'Ingresos anuales actividad principal',
		options: [
			{
				value: 'menos de 10000',
				viewValue: '< de US$10 mil'
			},
			{
				value: '10000 a 30000',
				viewValue: 'US$10 mil a US$30 mil'
			},
			{
				value: '30000 a 50000',
				viewValue: 'US$30 mil a US$50 mil'
			},
			{
				value: 'mas de 50000',
				viewValue: '> de US$50 mil'
			}
		]
	};

	other_annual_income_options: FieldConfig = {
		label: 'Ingresos anuales por otras actividades',
		options: [
      {
				value: 'menos de 10000',
				viewValue: '< de US$10 mil'
			},
			{
				value: '10000 a 30000',
				viewValue: 'US$10 mil a US$30 mil'
			},
			{
				value: '30000 a 50000',
				viewValue: 'US$30 mil a US$50 mil'
			},
			{
				value: 'mas de 50000',
				viewValue: '> de US$50 mil'
			}
		]
	};

  countryList: FieldConfig = {
    label: 'País de Residencia',
    options: $country
  };

  documents = [
      {
    		viewValue:'1. Copia de Documento de Identidad o pasaporte',
  		},
 	    {
    		viewValue: '2. Estados financieros auditados de los dos(2) últimos ejercicios',
  		},
   		{
    		viewValue: '3. Cartas de referencias bancarias',
  		},
  		{
    		viewValue: '4. Documentación que pruebe la fuente y origen de recursos de transacción',
  		},
	   ];

  bankFormArray: FormArray;
  bank_property;

  bankGroup = {
    social: ['', Validators.required],
    products: ['', Validators.required],
    telephone: ['', Validators.required]
  };

  commercialFormArray: FormArray;
  commercial_property;

  commercialGroup ={
    name_social: ['', Validators.required],
    description: ['', Validators.required],
    telephone: ['', Validators.required]
  }

  personalFormArray: FormArray;
  personal_property;

  personalGroup = {
    name: ['', Validators.required],
    relationship: ['', Validators.required],
    telephone: ['', Validators.required]
  }

  constructor(private fb: FormBuilder, public formMethods: FormArrayGeneratorService, private life: LifeService) { }

  ngOnInit() {
console.log(this.form);
    if (this.form.get("id"))
    {
console.log("Edit Element");
    }
    else
    {
    this.bank_property = this.fb.array([this.formMethods.createItem(this.bankGroup)]);
    this.commercial_property = this.fb.array([this.formMethods.createItem(this.commercialGroup)]);
    this.personal_property = this.fb.array([this.formMethods.createItem(this.personalGroup)]);

    this.addBasicControls();
    }
    // this.customer= this.fb.group({

    //   request:['', [Validators.required, Validators.min(1)]],

    //   general_data: this.fb.group({

    //     first_name:['', Validators.required],
    //     middle_name:['', Validators.required],
    //     last_names:['', Validators.required],
    //     birthdate:[new Date(), Validators.required],
    //     gender:['', Validators.required],
    //     id_passport:['', Validators.required],
    //     marital_status:['', Validators.required],
    //     nationality:['', Validators.required],
    //     country:['', Validators.required],
    //     post_office_box:['', Validators.required],
    //     address:['', Validators.required],
    //     telephone:['', Validators.required],
    //     cellphone:['', Validators.required],
    //     email:['', [Validators.required, Validators.email]],

    //   }),

    //   professional_data: this.fb.group({

    //     profession:['', Validators.required],
    //     occupation:['', Validators.required],
    //     company:['', Validators.required],
    //     company_address:['', Validators.required],
    //     time_in_the_job:['', Validators.required],
    //     telephone:['', Validators.required],
    //     fax:['', Validators.required],
    //     email:['', Validators.required],

    //   }),

    //   exposed: this.fb.group({

    //     exposed_person_radio:['', Validators.required],
    //     info:['', Validators.required],

    //   }),

    //   policy: this.fb.group({

    //     total_policy_radio:['', Validators.required],

    //   }),

    //   broker: this.fb.group({

    //     social_name:['', Validators.required],
    //     license_num:['', [Validators.required, Validators.min(1)]],

    //   }),

    //   info_for_the_insurance_carrier: this.fb.group({

    //     fullname_functionary:['', Validators.required],
    //     position_functionary:['', Validators.required]

    //   }),

    // })

  }

  // x = 0;
  // iD;
  ngDoCheck(): void {


    if (this.form.get('policy').get('total_policy_radio').value == 'si' &&
		!this.form.get('questions')) {
			const varPolicy = {
        valor: 'si',
        name: 'total_policy_radio'
      };
      // tslint:disable-next-line: align
      this.selectChange(varPolicy);
			console.log('HolAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA policy');

      }
    if (this.form.get('questions')) {
          if (this.form.get('questions').get('transaction').get('investigation_radio').value == 'si' &&
          !this.form.get('questions').get('transaction').get('investigation')) {
            const varInvestigation = {
              valor: 'si',
              name: 'investigation_radio'
            };
            this.selectChange(varInvestigation);
            console.log('HolAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA transaction');
        }
      }
    // if (this.life.idKNOWCustomer != null) {
    //   console.log('this.iD es igual a ' + this.life.idKNOWCustomer);
    //   // if(!this.form){
    //   //   // this.x=1;
    //   //  this.addBasicControls();
    //   //  console.log("HOllaLALALALKALSLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!")
    //   // }
    //   if (this.x < 40) {
    //     if (this.form.get('policy').get('total_policy_radio').value == 'si') {
    //       const varPolicy = {
    //         valor: 'si',
    //         name: 'total_policy_radio'
    //       };
    //       this.selectChange(varPolicy);
    //     }
    //     // if (this.form.get('exposed').get('exposed_person_radio').value == 'si') {
    //     //   const varExposed = {
    //     //     valor: 'si',
    //     //     name:'exposed_person_radio'
    //     //   };
    //     //   this.selectChange(varExposed)
    //     // }
    //     // tslint:disable-next-line: max-line-length
    //     // this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].exposed['controls'].exposed_person_radio.setValue(data.data.contractorQuestionnaires.knowYourCustomer.exposed.exposed_person_radio);
    //     if (this.form.get('questions')) {
    //       if (this.form.get('questions').get('transaction').get('investigation_radio').value == 'si') {
    //         const varInvestigation = {
    //           valor: 'si',
    //           name: 'investigation_radio'
    //         };
    //         this.selectChange(varInvestigation);
    //       }
    //       // this.bankFormArray = this.form.get('questions').get('bank').get('bank_array') as FormArray;
    //       // this.commercialFormArray = this.form.get('questions').get('commercial').get('commercial_array') as FormArray;
    //       // this.personalFormArray = this.form.get('questions').get('personal').get('personal_array') as FormArray;
    //     }
    //     this.x++;
    //     console.log('WEOOOOOOOOOOOOOOOOOOOO, CALLENSEEEEEEEEEEEEEEEEEEEE!!!');
    //   }
    //   // tslint:disable-next-line: no-unused-expression
    //   this.life.idKNOWCustomer == null;
    // }
  }

  addBasicControls(){


    this.form.addControl('request', this.fb.control('', [Validators.required, Validators.min(1)]));
    this.form.addControl('general_data', this.fb.group({

        first_name: ['', Validators.required],
        middle_name: ['', Validators.required],
        last_names: ['', Validators.required],
        birthdate: [new Date(), Validators.required],
        gender: ['', Validators.required],
        id_passport: ['', Validators.required],
        marital_status: ['', Validators.required],
        nationality: ['', Validators.required],
        country: ['', Validators.required],
        post_office_box: ['', Validators.required],
        address: ['', Validators.required],
        telephone: ['', Validators.required],
        cellphone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],

    }));

    this.form.addControl('professional_data', this.fb.group({

        profession: ['', Validators.required],
        occupation: ['', Validators.required],
        company:  ['', Validators.required],
        company_address:  ['', Validators.required],
        time_in_the_job:  ['', Validators.required],
        telephone:  ['', Validators.required],
        fax:  ['', Validators.required],
        email:  ['', Validators.required],

    }));

    // this.form.addControl('exposed', this.fb.group({

    //   exposed_person_radio:['', Validators.required]

    // }));

    this.form.addControl('policy', this.fb.group({

      total_policy_radio: ['', Validators.required],

    }));

    this.form.addControl('broker', this.fb.group({

      social_name: ['', Validators.required],
      license_num: ['', [Validators.required, Validators.min(1)]],

    }));

    this.form.addControl('info_for_the_insurance_carrier', this.fb.group({

      fullname_functionary: ['', Validators.required],
      position_functionary: ['', Validators.required]

    }));

  }

  prueba = 'No Existen';
  selectChange(event) {

		// const formP = this.form.get('exposed') as FormGroup;
    const formQ = this.form as FormGroup;
    let formI;

		// tslint:disable-next-line: align
		if (event.valor === 'si') {

      switch (event.name) {

        // case'exposed_person_radio':
				// 	formP.addControl('position', this.fb.group({
        //     info: ['', Validators.required]
        //   }));
        //   // console.log(JSON.stringify(this.form.value));
        // break;

        case'total_policy_radio':

          formQ.addControl('questions', this.fb.group({

            transaction: this.fb.group({

              details: ['', Validators.required],
              investigation_radio: ['', Validators.required],

            }),

            finance: this.fb.group({

              main_annual_income: ['', Validators.required],
              annual_income_others: ['', Validators.required],

            }),

            bank:  this.fb.group({

              bank_array: this.fb.array([this.formMethods.createItem(this.bankGroup)])

          }),

            commercial:  this.fb.group({

              commercial_array: this.fb.array([this.formMethods.createItem(this.commercialGroup)])

          }),

            personal:  this.fb.group({

              personal_array: this.fb.array([this.formMethods.createItem(this.personalGroup)])

          }),

          documents: this.fb.group({

            id_passport: [false],
				    bank_reference_letter: [false],
				    financial_status: [false],
				    transaction_source_documentation: [false],

          }),

          }));
          this.bankFormArray = this.form.get('questions').get('bank').get('bank_array') as FormArray;
          this.commercialFormArray = this.form.get('questions').get('commercial').get('commercial_array') as FormArray;
          this.personalFormArray = this.form.get('questions').get('personal').get('personal_array') as FormArray;
// tslint:disable-next-line: align
					this.prueba = 'Existen';
          console.log(this.prueba);

          break;


        case'investigation_radio':

        formI = this.form.get('questions').get('transaction') as FormGroup;

        formI.addControl('investigation', this.fb.group({
            info: ['', Validators.required]
          }));
          // console.log(JSON.stringify(this.form.value));
// tslint:disable-next-line: align
          break;
        }
			}
		 else if (event.valor === 'no') {

      switch (event.name) {

        // case'exposed_person_radio':

        //   formP.removeControl('position');

        //   break;

        case'total_policy_radio':

          formQ.removeControl('questions');

          this.bankFormArray = undefined;
          this.commercialFormArray = undefined;
          this.personalFormArray = undefined;

          this.prueba = 'No existen';
          console.log(this.prueba);

          break;

        case'investigation_radio':

          formI = this.form.get('questions').get('transaction') as FormGroup;

          formI.removeControl('investigation');

          break;

        }
			}

  }

  createFormArray(name: string) {

		switch (name) {

			case 'bank_array':

          return this.bankGroup;
          // tslint:disable-next-line: align
          break;

      case 'commercial_array':

          return this.commercialGroup;
          break;

      case 'personal_array':

          return this.personalGroup;
          break;

      }

    }

    addFormArray(array: any, name: string) {

      const increment = array.length + 1;
      array = this.formMethods.addElement(array, increment, this.createFormArray(name)).formArray;

      // console.log(JSON.stringify(this.form.value));
      // array.push(this.createFormArray(name));

    }

    removeFormArray(index, array: any) {
      array.removeAt(index);
    }

  }
