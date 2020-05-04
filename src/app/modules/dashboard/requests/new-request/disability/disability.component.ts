import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { DisabilityService } from '../disability/services/disability.service';
import { $country, $weightTypes, $heightTypes } from 'src/app/core/form/objects';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { DiseaseService } from '../../../shared/components/disease/shared/disease/disease.service';
import { UserService } from '../../../../../core/services/user/user.service';
// tslint:disable: forin
// tslint:disable: one-line

@Component({
  selector: 'app-disability',
  templateUrl: './disability.component.html',
  styleUrls: ['./disability.component.scss']
})
export class DisabilityComponent implements OnInit {
  sicknessQuestions: any[];
  role: string;

  accordionTitles = [
    'Sección A. Datos del propuesto Asegurado y Estatus laboral',
    'Sección B. Datos del Contratante', 'Sección C. Cuestionario Médico',
    'Sección D. Opción del Plan', 'Sección E. Beneficiarios Primarios',
    'Beneficiario(s) Contigente(s)'];

  genderOptions: FieldConfig = {

    label: '',
    options: [
      {
        value: 'masculino',
        viewValue: 'Masculino'
      },
      {
        value: 'femenino',
        viewValue: 'Femenino'
      }
    ]
  };

  contractOPtions: FieldConfig = {
    label: '',
    options: [
      {
        value: 'permanente',
        viewValue: 'Permanente'
      },
      {
        value: 'temporal',
        viewValue: 'Temporal'
      }
    ]
  };

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

  currencyOptions: FieldConfig = {
    label: 'Moneda',
    options: this.disabilityService.currencyArray
  };

  YesNo: FieldConfig = {
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
  };

  status: FieldConfig = {
    label: 'Estado Civil',
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

  heightList: FieldConfig = {
    label: 'Unidad',
    options: $heightTypes
  };

  weightList: FieldConfig = {
    label: 'Unidad',
    options: $weightTypes
  };

  countryList2: FieldConfig = {
    label: 'País de residencia',
    options: $country
  };

  cityList: FieldConfig = {
    label: 'Ciudad',
    options: [
      {
        value: 'santiago',
        viewValue: 'Santiago'
      }
    ]
  };

  waitingTime: FieldConfig = {
    label: '',
    options: [
      {
        value: '30 días',
        viewValue: '30 días'
      },
      {
        value: '60 días',
        viewValue: '60 días'
      },
      {
        value: '90 días',
        viewValue: '90 días'
      },
      {
        value: '120 días',
        viewValue: '120 días'
      }
    ]
  };

  lifeOptions: FieldConfig = {

    label: 'Vida/MA&D',
    options: this.disabilityService.lifeArray

  };

  rentOptions: FieldConfig = {

    label: 'Renta Disability',
    options: this.disabilityService.rentArray

  };

  typeRequestGroup: FormGroup;

  disabilityGroup: FormGroup;
  mainFormArray: FormArray;
  mainProperty;
  contingentFormArray: FormArray;
  contingentProperty;

  money_laundering: FormGroup;
  know_client: FormGroup;


  mainGroup = {
    full_name: ['', Validators.required],
    id2: ['', Validators.required],
    nationality: ['', Validators.required],
    relationship: ['', Validators.required],
    percentage: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
  };

  contingentGroup = {
    full_name: ['', Validators.required],
    id2: ['', Validators.required],
    nationality: ['', Validators.required],
    relationship: ['', Validators.required],
    percentage: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
  };

  constructor(
    private fb: FormBuilder,
    public formMethods: FormArrayGeneratorService,
    private disabilityService: DisabilityService,
    public formHandler: FormHandlerService,
    public diseaseService: DiseaseService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.role = this.userService.getRoleCotizador();

    this.sicknessQuestions = [
      {
        label: 'Hipertensión arterial',
        name: 'haveHypertension'
      },
      {
        label: 'Artritis',
        name: 'haveArthritis'
      },
      {
        label: 'Desórdenes cardiovasculares',
        name: 'haveCardiovascular'
      },
      {
        label: 'Padecimientos renales',
        name: 'haveRenalUrinary'
      },
      {
        label: 'Padecimientos metabólicos (diabetes, hipercolesterolemia)',
        name: 'haveMetabolics'
      },
      {
        label: 'Padecimientos musculoesqueleticos',
        name: 'haveMusculoSkeletal'
      },
      {
        label: 'Desórdenes urologicos y tiene mas de 50 años',
        name: 'haveProstatics'
      },
      {
        label: 'Desórdenes osteoarticulares (discal, vertebral y paravertebral, lumbado, clática)',
        name: 'haveSpine'
      },
    ];

    this.mainProperty = this.fb.array([this.formMethods.createItem(this.mainGroup)]);
    this.contingentProperty = this.fb.array([this.formMethods.createItem(this.contingentGroup)]);

    this.money_laundering = this.fb.group({}),
      this.know_client = this.fb.group({}),

      this.typeRequestGroup = this.fb.group({
        typeRequest: [''],

      });

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
        date_since: [new Date(), Validators.required],
        date_until: [new Date(), Validators.required],
        position: ['', Validators.required],
        salary: ['', [Validators.required, Validators.min(1)]],
        currency: ['', Validators.required],
        address: ['', Validators.required],
        telephone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        job_description: ['', Validators.required],
        job_hours: ['', [Validators.required, Validators.min(1)]],
        date: [new Date(), Validators.required],
        reason_pension: [''],
        office_hours: ['', [Validators.required, Validators.min(1)]],
        company: ['', Validators.required],
        amount_pension: ['', Validators.min(1)],
        currency_pension: [''],
        outside_hours: ['', [Validators.required, Validators.min(1)]],
        pension_radio: ['', Validators.required],
        pep_radio_insured: ['', Validators.required]
      }),
      policyholder: this.fb.group({
        name: ['', Validators.required],
        id_passport: ['', Validators.required],
        marital_status: ['', Validators.required],
        nationality: ['', Validators.required],
        telephone: ['', Validators.required],
        cell: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        annual_income: ['', [Validators.required, Validators.min(1)]],
        currency: ['', Validators.required],
        address: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
        postal_address: ['', Validators.required],
        country_residence: ['', Validators.required],
        relationship: ['', Validators.required],
        pep_radio_holder: ['', Validators.required],
        representative: ['', Validators.required],
        passport_id: ['', Validators.required]
      }),
      questions: this.fb.group({
        smoker_radio: ['', Validators.required],
        alcohol_radio: ['', Validators.required],
        weight: ['', Validators.required],
        height: ['', Validators.required],
        weightUnit: ['', Validators.required],
        heightUnit: ['', Validators.required],
        questionnaire: this.fb.group({
          health_radio: ['', Validators.required],
          therapy_radio: ['', Validators.required],
          sick_pay_radio: ['', Validators.required],
          analysis_radio: ['', Validators.required],
          other_analysis_radio: ['', Validators.required],
          inpatientCare_radio: ['', Validators.required],
          hospitalization_radio: ['', Validators.required],
          sicknessType_radio: ['', Validators.required],
          bloodSick_radio: ['', Validators.required],
          VIH_radio: ['', Validators.required],
          specialTherapy_radio: ['', Validators.required],
          accident_radio: ['', Validators.required],
          deny_radio: ['', Validators.required],
          insurance_radio: ['', Validators.required],
        })
      }),
      plan: this.fb.group({
        period: ['', Validators.required],
        life: ['', Validators.required],
        rent: ['', Validators.required]
      }),
      main: this.fb.group({
        full_name: ['', Validators.required],
        relationship: ['', Validators.required],
        id_passport: ['', Validators.required],
        main_array: this.fb.array([this.formMethods.createItem(this.mainGroup)])
      }),
      contingent: this.fb.group({
        full_name: ['', Validators.required],
        relationship: ['', Validators.required],
        id_passport: ['', Validators.required],
        contingent_array: this.fb.array([this.formMethods.createItem(this.contingentGroup)])
      }),
      questionnaires: this.fb.group({})
    });

    this.mainFormArray = this.disabilityGroup.get('main').get('main_array') as FormArray;
    this.contingentFormArray = this.disabilityGroup.get('contingent').get('contingent_array') as FormArray;

  }

  selectChange(event) {
    const form = this.disabilityGroup.get('questions') as FormGroup;
    const formInsured = this.disabilityGroup.get('insured_data') as FormGroup;
    const formHolder = this.disabilityGroup.get('policyholder') as FormGroup;
    const questionnaires = this.disabilityGroup.get('questionnaires') as FormGroup;
    const formQ = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;
    const formC = this.disabilityGroup.get('questions').get('questionnaire').get('insurance') as FormGroup;
    console.log(event);

    if (event.valor === 'si') {
      // console.log(JSON.stringify(this.disabilityGroup.value));

      switch (event.name) {
        case 'smoker_radio':
          form.addControl('smoke', this.fb.group({
            quantity: ['', [Validators.required, Validators.min(1)]]
          }));
          break;

        case 'alcohol_radio':
          form.addControl('alcohol', this.fb.group({
            quantity: ['', [Validators.required, Validators.min(1)]]
          }));
          break;

        case 'health_radio':
          formQ.addControl('health', this.fb.group({
            date: [new Date(), Validators.required],
            reason: ['', Validators.required],
            therapy: ['', Validators.required]
          }));
          break;

        case 'therapy_radio':
          formQ.addControl('therapies', this.fb.group({
            date: [new Date(), Validators.required],
            reason: ['', Validators.required],
            therapy: ['', Validators.required]
          }));
          break;

        case 'sick_pay_radio':
          formQ.addControl('sick_pay', this.fb.group({
            date: [new Date(), Validators.required],
            reason: ['', Validators.required],
            therapy: ['', Validators.required]
          }));
          break;

        case 'analysis_radio':
          formQ.addControl('analysis', this.fb.group({
            date: [new Date(), Validators.required],
            name: ['', Validators.required],
          }));
          break;

        case 'other_analysis_radio':
          formQ.addControl('other_analysis', this.fb.group({
            date: [new Date(), Validators.required],
            reason: ['', Validators.required],
          }));
          break;

        case 'inpatientCare_radio':
          formQ.addControl('inpatientCare', this.fb.group({
            date: [new Date(), Validators.required],
            reason: ['', Validators.required],
          }));
          break;

        case 'bloodSick_radio':
          formQ.addControl('bloodSick', this.fb.group({
            date: [new Date(), Validators.required],
            reason: ['', Validators.required],
          }));
          break;

        case 'hospitalization_radio':
          formQ.addControl('hospitalization', this.fb.group({
            date: [new Date(), Validators.required],
            reason: ['', Validators.required],
          }));
          break;

        case 'sicknessType_radio':
          formQ.addControl('sicknessType', this.fb.group({
            date: [new Date(), Validators.required],
            description: ['', Validators.required],
            haveHypertension: ['', Validators.required],
            haveArthritis: ['', Validators.required],
            haveCardiovascular: ['', Validators.required],
            haveRenalUrinary: ['', Validators.required],
            haveMetabolics: ['', Validators.required],
            haveMusculoSkeletal: ['', Validators.required],
            haveProstatics: ['', Validators.required],
            haveSpine: ['', Validators.required],
          }));
          break;

        case 'haveHypertension':
          questionnaires.addControl('hypertension', this.fb.group({}));
          break;

        case 'pep_radio_insured':
          console.log(this.role);

          if (this.role === 'WWA') { formInsured.addControl('knowYourClient', this.fb.group({})); }
          else if (this.role === 'WWS') { formInsured.addControl('knowYourCustomer', this.fb.group({})); }
          break;

        case 'pep_radio_holder':
          console.log(this.role);

          if (this.role === 'WWA') { formHolder.addControl('knowYourClient', this.fb.group({})); }
          else if (this.role === 'WWS') { formHolder.addControl('knowYourCustomer', this.fb.group({})); }
          break;

        case 'haveArthritis':
          questionnaires.addControl('arthritis', this.fb.group({}));
          break;

        case 'haveCardiovascular':
          questionnaires.addControl('cardiovascular', this.fb.group({}));
          break;

        case 'haveRenalUrinary':
          questionnaires.addControl('renalUrinary', this.fb.group({}));
          break;

        case 'haveMetabolics':
          questionnaires.addControl('mellitusDiabetes', this.fb.group({}));
          break;

        case 'haveMusculoSkeletal':
          questionnaires.addControl('musculosSkeletal', this.fb.group({}));
          break;

        case 'haveProstatics':
          questionnaires.addControl('prostatic', this.fb.group({}));
          break;

        case 'haveSpine':
          questionnaires.addControl('spine', this.fb.group({}));
          break;

        case 'VIH_radio':
          formQ.addControl('VIH', this.fb.group({
            date: [new Date(), Validators.required],
            name: ['', Validators.required],
          }));
          break;

        case 'specialTherapy_radio':
          formQ.addControl('specialTherapy', this.fb.group({
            date: [new Date(), Validators.required],
            reason: ['', Validators.required],

          }));
          break;

        case 'accident_radio':
          formQ.addControl('accident', this.fb.group({
            date: [new Date(), Validators.required],
            reason: ['', Validators.required],
            effects: ['', Validators.required],

          }));
          break;

        case 'deny_radio':
          formQ.addControl('deny', this.fb.group({
            reason: ['', Validators.required]

          }));
          break;

        case 'insurance_radio':
          formQ.addControl('insurance', this.fb.group({
            company: ['', Validators.required],
            num: ['', [Validators.required, Validators.min(1)]],
            name: ['', Validators.required],
            insured_company: ['', Validators.required],
            policy: ['', Validators.required],
            date: [new Date(), Validators.required],
            claim_radio: ['', Validators.required],

          }));
          break;

        case 'claim_radio':
          formC.addControl('claim', this.fb.group({
            explanation: ['', Validators.required],
          }));
          break;

      }
    } else if (event.valor === 'no') {
      switch (event.name) {
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

        case 'specialTherapy_radio':
          formQ.removeControl('specialTherapy');
          break;

        case 'bloodSick_radio':
          formQ.removeControl('bloodSick');
          break;

        case 'hospitalization_radio':
          formQ.removeControl('hospitalization');
          break;

        case 'claim_radio':
          formC.removeControl('claim');
          break;

        case 'haveHypertension':
          questionnaires.removeControl('hypertension');
          break;

        case 'haveArthritis':
          questionnaires.removeControl('arthritis');
          break;

        case 'haveCardiovascular':
          questionnaires.removeControl('cardiovascular');
          break;

        case 'haveRenalUrinary':
          questionnaires.removeControl('renalUrinary');
          break;

        case 'haveMetabolics':
          questionnaires.removeControl('mellitusDiabetes');
          break;

        case 'haveMusculoSkeletal':
          questionnaires.removeControl('musculosSkeletal');
          break;

        case 'haveProstatics':
          questionnaires.removeControl('prostatic');
          break;

        case 'haveSpine':
          questionnaires.removeControl('spine');
          break;

        case 'pep_radio_insured':
          formInsured.removeControl('knowYourClient');
          formInsured.removeControl('knowYourCustomer');
          break;


        case 'pep_radio_holder':
          formHolder.removeControl('knowYourClient');
          formHolder.removeControl('knowYourCustomer');
          break;
      }
    }
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

  addFormArray(array: any, name: string) {
    const increment = array.length + 1;
    array = this.formMethods.addElement(array, increment, this.createFormArray(name)).formArray;

    console.log(JSON.stringify(this.disabilityGroup.value));
    // array.push(this.createFormArray(name));

  }

  removeFormArray(index, array: any) {
    array.removeAt(index);
  }

  print() {

  }

  questionsLength() {
    return Object.keys(this.disabilityGroup.get('questionnaires').value).length;
  }

  isBenefitMinorThan100(group: string, subgroup: string): boolean {
    const form = this.disabilityGroup.get(group).get(subgroup) as FormGroup;

    if (this.benefitFor(form).total < 100 && this.benefitFor(form).isDirty) { return true; } else { return false; }
  }

  isBenefitMajorThan100(group: string, subgroup: string): boolean {
    const form = this.disabilityGroup.get(group).get(subgroup) as FormGroup;

    if (this.benefitFor(form).total > 100 && this.benefitFor(form).isDirty) { return true; } else { return false; }
  }

  benefitFor(form: FormGroup) {
    let total = 0;
    let isDirty = false;

    for (const dpd in form.value) {
      if (form.controls[dpd].dirty) { isDirty = true; }
      total += form.value[dpd].percentage;

    }
    return { total, isDirty };
  }
}

