import { Component, OnInit, Output, EventEmitter, Input, DoCheck, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { DisabilityService } from '../disability/services/disability.service';
import { $country, $weightTypes, $heightTypes, $time, $family } from 'src/app/core/form/objects';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { DiseaseService } from '../../../shared/components/disease/shared/disease/disease.service';
import { UserService } from '../../../../../core/services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { FormDataFillingService } from 'src/app/modules/dashboard/services/shared/formDataFillingService';
import { map, first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
// tslint:disable: forin
// tslint:disable: one-line

@Component({
  selector: 'app-disability',
  templateUrl: './disability.component.html',
  styleUrls: ['./disability.component.scss']
})
export class DisabilityComponent implements OnInit, DoCheck {
  sicknessQuestions: any[];
  coveragesQuestions: any[];
  todayDate = new Date();
  changingCoveragesList: FormArray;
  role: string;
  routeSelected = 'disability';
  accordionTitles = [
    'Sección A. Datos del propuesto Asegurado y Estatus laboral',
    'Sección B. Datos del Contratante', 'Sección C. Cuestionario Médico',
    'Sección D. Opción del Plan', 'Sección E. Beneficiarios Primarios',
    'Beneficiario(s) Contigente(s)', 'En caso de Cesión Bancaria'];
  bmi: number;
  // massName = 'PESO';
  // heightName = 'ALTURA';
  showContent = false;

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

  weightUnit = {
    label: 'Unidad de peso',
    options: $weightTypes,
    name: 'weightUnit'
  };

  heightUnit = {
    label: 'Unidad de altura',
    options: $heightTypes,
    name: 'heightUnit'
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

  testOptions: FieldConfig = {

    label: '¿Cuál?',
    options: this.disabilityService.testArray

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

  rentArray: any[] = [
    { value: 'us$ 1,000', viewValue: 'US$ 1,000' },
    { value: 'us$ 2,000', viewValue: 'US$ 2,000' },
    { value: 'us$ 3,000', viewValue: 'US$ 3,000' },
    { value: 'us$ 4,000', viewValue: 'US$ 4,000' },
    { value: 'us$ 5,000', viewValue: 'US$ 5,000' },
    { value: 'us$ 6,000', viewValue: 'US$ 6,000' },
    { value: 'us$ 7,000', viewValue: 'US$ 7,000' },
    { value: 'us$ 8,000', viewValue: 'US$ 8,000' },
    { value: 'us$ 9,000', viewValue: 'US$ 9,000' },
    { value: 'us$ 10,000', viewValue: 'US$ 10,000' },
    { value: 'us$ 11,000', viewValue: 'US$ 11,000' },
    { value: 'us$ 12,000', viewValue: 'US$ 12,000' }
  ];

  trashArray = [
    { value: 'us$ 1,000', viewValue: 'US$ 1,000' },
    { value: 'us$ 2,000', viewValue: 'US$ 2,000' },
    { value: 'us$ 3,000', viewValue: 'US$ 3,000' },
    { value: 'us$ 4,000', viewValue: 'US$ 4,000' },
    { value: 'us$ 5,000', viewValue: 'US$ 5,000' },
    { value: 'us$ 6,000', viewValue: 'US$ 6,000' },
    { value: 'us$ 7,000', viewValue: 'US$ 7,000' },
    { value: 'us$ 8,000', viewValue: 'US$ 8,000' },
    { value: 'us$ 9,000', viewValue: 'US$ 9,000' },
    { value: 'us$ 10,000', viewValue: 'US$ 10,000' },
    { value: 'us$ 11,000', viewValue: 'US$ 11,000' },
    { value: 'us$ 12,000', viewValue: 'US$ 12,000' }
  ];

  rentOptions: FieldConfig = {

    label: 'Renta Disability',
    options: this.rentArray

  };

  year = {
    label: 'Seleccione',
    options: $time,
    name: 'time'
  };

  sicknessOptions: FieldConfig = {
    label: 'Enfermedades/Desordenes',
    options: [
      {
        value: 'depresión',
        viewValue: 'Depresión'
      },
      {
        value: 'hipertensión arterial',
        viewValue: 'Hipertensión arterial'
      },
      {
        value: 'desórdenes cardiovasculares',
        viewValue: 'Desórdenes cardiovasculares'
      },
      {
        value: 'desórdenes de hígado',
        viewValue: 'Desórdenes de hígado'
      },
      {
        value: 'desórdenes digestivos',
        viewValue: 'Desórdenes digestivos'
      },
      {
        value: 'desórdenes renales',
        viewValue: 'Desórdenes renales'
      },
      {
        value: 'desórdenes reumáticos',
        viewValue: 'Desórdenes reumáticos'
      },
      {
        value: 'desórdenes respiratorios o pulmonares',
        viewValue: 'Desórdenes respiratorios o pulmonares'
      },
      {
        value: 'desórdenes ginecológicos',
        viewValue: 'Desórdenes ginecológicos'
      },
      {
        value: 'desórdenes urológicos o metabólicos (diabetes, hipercolesterolemia)',
        viewValue: 'Desórdenes urológicos o metabólicos (Diabetes, Hipercolesterolemia)'
      },
      {
        value: 'desórdenes osteoarticulares (Discal, vertebral y paravertebral, lumbado, clática)',
        viewValue: 'Desórdenes osteoarticulares (discal, vertebral y paravertebral, lumbado, clática)'
      }
    ]
  };

  negationOptions: FieldConfig = {
    label: '',
    options: [
      {
        value: 'declinado',
        viewValue: 'Declinado'
      },
      {
        value: 'aplazado',
        viewValue: 'Aplazado'
      },
      {
        value: 'recargado',
        viewValue: 'Recargado'
      },
      {
        value: 'limitado',
        viewValue: 'Limitado'
      },
    ]
  };

  policyOptions: FieldConfig = {
    label: 'Tipo de Póliza',
    options: [
      {
        value: 'salud',
        viewValue: 'Salud'
      },
      {
        value: 'vida',
        viewValue: 'Vida'
      }
    ]
  };

  family = $family;

  typeRequestGroup: FormGroup;

  disabilityGroup: FormGroup;
  mainFormArray: FormArray;
  mainProperty;
  contingentFormArray: FormArray;
  contingentProperty;
  testArray: FormArray;
  testProperty;
  sickPayArray: FormArray;
  sickPayProperty;
  therapyArray: FormArray;
  therapyProperty;
  otherAnalysisArray: FormArray;
  otherAnalysisProperty;
  inpatientCareArray: FormArray;
  inpatientCareProperty;
  hospitalizationArray: FormArray;
  hospitalizationProperty;
  bloodSickArray: FormArray;
  bloodSickProperty;
  VIHArray: FormArray;
  VIHProperty;
  specialTherapyArray: FormArray;
  specialTherapyProperty;
  accidentArray: FormArray;
  accidentProperty;
  denyArray: FormArray;
  denyProperty;
  insuranceArray: FormArray;
  insuranceProperty;
  existingCoveragesList: FormArray;


  money_laundering: FormGroup;
  know_client: FormGroup;


  mainGroup = {
    full_name: ['', Validators.required],
    id2: ['', Validators.required],
    nationality: ['', Validators.required],
    ocupation: ['', Validators.required],
    family: ['', Validators.required],
    percentage: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
  };

  contingentGroup = {
    full_name: ['', Validators.required],
    id2: ['', Validators.required],
    nationality: ['', Validators.required],
    ocupation: ['', Validators.required],
    family: ['', Validators.required],
    percentage: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
  };

  testGroup = {
    date: ['', Validators.required],
    test: ['', Validators.required],
  };

  therapyGroup = {
    diagnosis: ['', Validators.required],
    date: ['', Validators.required],
    reason: ['', Validators.required],
    therapy: ['', Validators.required]
  };

  sickPayGroup = {
    date: ['', Validators.required],
    reason: ['', Validators.required],
    therapy: ['', Validators.required]
  };

  otherAnalysisGroup = {
    date: ['', Validators.required],
    reason: ['', Validators.required],
  };

  policyHolderGroup = {
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
  };

  inpatientCareGroup = {
    date: ['', Validators.required],
    reason: ['', Validators.required],
  };

  hospitalizationGroup = {
    date: ['', Validators.required],
    reason: ['', Validators.required],
  };

  bloodSickGroup = {
    date: ['', Validators.required],
    name: ['', Validators.required],
    reason: ['', Validators.required]
  };

  VIHGroup = {
    date: ['', Validators.required],
    name: ['', Validators.required],
    // reason: ['', Validators.required]
  };

  specialTherapyGroup = {
    date: ['', Validators.required],
    name: ['', Validators.required],
    reason: ['', Validators.required]
  };

  accidentGroup = {
    date: ['', Validators.required],
    effects: ['', Validators.required],
    reason: ['', Validators.required]
  };

  denyGroup = {
    negationRadio: ['', Validators.required],
    reason: ['', Validators.required]
  };

  insuranceGroup = {
    company: ['', Validators.required],
    num: ['', Validators.required],
    name: ['', Validators.required],
    insured_company: ['', Validators.required],
    policy: ['', Validators.required],
    date: ['', Validators.required],
    claim_radio: ['', Validators.required]
  };

  noCotizacion;
  age;

  @ViewChild('form', { static: false }) form;


  constructor(
    private fb: FormBuilder,
    private dataMappingFromApi: FormDataFillingService,
    public formMethods: FormArrayGeneratorService,
    private disabilityService: DisabilityService,
    public formHandler: FormHandlerService,
    public diseaseService: DiseaseService,
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogModal: DialogService,
    private dialogOption: DialogOptionService,
    public dialog: MatDialog,
    public appComponent: AppComponent,

  ) { }

  ID = null;
  ngOnInit() {

    //this.ID = this.disabilityService.id;

    this.route.params.subscribe(res => {
      this.ID = res.id;
    });
    this.route.params.subscribe(res => {
      this.noCotizacion = res.noCotizacion;
    });
    if (this.ID != null) {
      console.log('El ID es ' + this.ID);
      this.getData(this.ID);
    } else if (this.ID == null) {
      console.log('ID esta vacio');
    }

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

    this.coveragesQuestions = [
      {
        // tslint:disable-next-line: max-line-length
        label: '1.a. ¿La persona propuesta para seguro tiene alguna cobertura existente, o alguna solicitud pendiente para seguro de vida o anualidad con esta compañía o cualquier otra?',
        name: 'hasAnotherCoverage',
        group: 'anotherCoverages'
      },
      {
        label: '1.b. ¿Tiene la persona propuesta para seguro la intención de remplazar, descontinuar o cambiar alguna de estas coberturas?',
        name: 'changeAnotherCoverage',
        group: 'changingCoverages'
      }
    ];

    this.mainProperty = this.fb.array([this.formMethods.createItem(this.mainGroup)]);
    this.contingentProperty = this.fb.array([this.formMethods.createItem(this.contingentGroup)]);
    this.testProperty = this.fb.array([this.formMethods.createItem(this.testGroup)]);
    this.sickPayProperty = this.fb.array([this.formMethods.createItem(this.sickPayGroup)]);
    this.therapyProperty = this.fb.array([this.formMethods.createItem(this.therapyGroup)]);
    this.otherAnalysisProperty = this.fb.array([this.formMethods.createItem(this.otherAnalysisGroup)]);
    this.inpatientCareProperty = this.fb.array([this.formMethods.createItem(this.inpatientCareGroup)]);
    this.hospitalizationProperty = this.fb.array([this.formMethods.createItem(this.hospitalizationGroup)]);
    this.bloodSickProperty = this.fb.array([this.formMethods.createItem(this.bloodSickGroup)]);
    this.VIHProperty = this.fb.array([this.formMethods.createItem(this.VIHGroup)]);
    this.specialTherapyProperty = this.fb.array([this.formMethods.createItem(this.specialTherapyGroup)]);
    this.accidentProperty = this.fb.array([this.formMethods.createItem(this.accidentGroup)]);
    this.denyProperty = this.fb.array([this.formMethods.createItem(this.denyGroup)]);
    this.insuranceProperty = this.fb.array([this.formMethods.createItem(this.insuranceGroup)]);

    this.money_laundering = this.fb.group({}),
      this.know_client = this.fb.group({}),

      this.typeRequestGroup = this.fb.group({
        typeRequest: [''],

      });

    this.disabilityGroup = this.fb.group({

      // money_laundering: this.fb.group({}),
      // know_client: this.fb.group({}),

      num_financial_quote: ['', Validators.required],
      isComplete: [false, Validators.required],

      // typeRequest:[''],
      insured_data: this.fb.group({
        name: ['', Validators.required],
        last_name: ['', Validators.required],
        birthdate: ['', Validators.required],
        gender: ['', Validators.required],
        job: ['', Validators.required],
        nationality: ['', Validators.required],
        id_passport: ['', Validators.required],
        contract: ['', Validators.required],
        date_since: ['', Validators.required],
        date_until: ['', Validators.required],
        position: ['', Validators.required],
        salary: ['', [Validators.required, Validators.min(1)]],
        // currency: ['', Validators.required],
        address: ['', Validators.required],
        telephone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        job_description: ['', Validators.required],
        job_hours: ['', [Validators.required, Validators.min(1)]],
        date: ['', Validators.required],
        reason_pension: [''],
        office_hours: ['', [Validators.required, Validators.min(1)]],
        company: ['', Validators.required],
        amount_pension: ['', Validators.min(1)],
        currency_pension: [''],
        outside_hours: ['', [Validators.required, Validators.min(1)]],
        pension_radio: ['', Validators.required],
        pep_radio_insured: ['', Validators.required],
        insuredPolicyholderRadio: ['', Validators.required]
      }),
      policyholder: this.fb.group(this.policyHolderGroup),
      questions: this.fb.group({
        smoker_radio: ['', Validators.required],
        alcohol_radio: ['', Validators.required],
        weight: ['', [Validators.required, Validators.min(1)]],
        height: ['', [Validators.required, Validators.min(1)]],
        weightUnit: ['', Validators.required],
        heightUnit: ['', Validators.required],
        bmiName: [{ value: '', disabled: true }, Validators.required],
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
        full_name: [''],
        family: [''],
        id_passport: [''],
        main_array: this.fb.array([this.formMethods.createItem(this.mainGroup)])
      }),
      contingent: this.fb.group({
        full_name: [''],
        family: [''],
        id_passport: [''],
        contingent_array: this.fb.array([this.formMethods.createItem(this.contingentGroup)]),
        hasAnotherCoverage: ['', Validators.required],
        changeAnotherCoverage: ['', Validators.required],
      }),
      bankTransfer: this.fb.group({
        bankEntity: [''],
        amount: ['', Validators.min(0)],
        contact: ['']
      }),
      questionnaires: this.fb.group({})
    });

    this.mainFormArray = this.disabilityGroup.get('main').get('main_array') as FormArray;
    this.contingentFormArray = this.disabilityGroup.get('contingent').get('contingent_array') as FormArray;

    this.disabilityGroup.get('insured_data').get('birthdate').valueChanges.subscribe(value => {
      const timeDiff = Math.abs(Date.now() - new Date(value).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      // this.disabilityGroup.get('person').get('this.age').setValue(this.age);
      console.log('La persona tiene ' + this.age + ' de edad');
    });

  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.submitted) {
      return true;
    }

    if (this.disabilityGroup.dirty && !this.form.submitted) {
      const dialogRef = this.dialog.open(BaseDialogComponent, {
        data: this.dialogOption.exitConfirm,
        minWidth: 385,
      });
      return dialogRef.componentInstance.dialogRef.afterClosed().pipe(map(result => {
        if (result === 'true') {
          return true;
        }
      }), first());
    }
    return true;
  }

  getBmi() {
    const weightUnit = this.disabilityGroup.get('questions').get('weightUnit').value;
    const heightUnit = this.disabilityGroup.get('questions').get('heightUnit').value;

    let weight = this.disabilityGroup.get('questions').get('weight').value;
    let height = this.disabilityGroup.get('questions').get('height').value;
    let inches;

    if (this.disabilityGroup.get('questions').get('inches')) { inches = this.disabilityGroup.get('questions').get('inches').value; }

    if (weightUnit === 'libras') { weight = weight / 2.205; }
    if (heightUnit === 'pie') {
      height = (((height * 12) + inches) * 2.54) / 100;
    }
    const bmi = weight / ((height / 100) * (height * 100));

    if (bmi !== Infinity && !isNaN(bmi)) {
      const value = parseFloat(`${bmi}`).toFixed(2);
      this.disabilityGroup.get('questions').get('bmiName').setValue(value);
    }
  }

  onHeightUnitChange(evento) {
    const form = this.disabilityGroup.get('questions') as FormGroup;
    if (evento.valor === 'pie') {
      form.addControl('inches', this.fb.control('', Validators.required));
    } else {
      form.removeControl('inches');
    }

    this.getBmi();
  }

  onWeightUnitChange() {
    this.getBmi();

  }

  // actualValue;
  y = 0
  x = 0;
  xx = 0;
  ngDoCheck(): void {

    // if (this.disabilityGroup.get('questions').get('weightUnit').value != '' &&
    //   this.disabilityGroup.get('questions').get('heightUnit').value != '') {
    //   // &&
    //   // this.disabilityGroup.get('questions').get('weight').value != (null || undefined) &&
    //   // this.disabilityGroup.get('questions').get('height').value != (null || undefined)
    //   // console.log(this.disabilityGroup.get('questions').get('heightUnit').value);
    //   // console.log(this.disabilityGroup.get('questions').get('weightUnit').value);

    //   let weightConst;
    //   let heightConst;

    //   if (this.disabilityGroup.get('questions').get('weightUnit').value == 'libras') {
    //     weightConst = this.disabilityGroup.get('questions').get('weight').value / 2.205;
    //     // console.log("holaaaaaaaaaaaaaaaaa 1 " + weightConst);
    //   }
    //   else if (this.disabilityGroup.get('questions').get('weightUnit').value == 'kilogramos') {
    //     weightConst = this.disabilityGroup.get('questions').get('weight').value;
    //     // console.log("adiiooooooooooooooos 2 " + weightConst);
    //   }

    //   if (this.disabilityGroup.get('questions').get('heightUnit').value == 'pie') {
    //     heightConst = this.disabilityGroup.get('questions').get('height').value / 3.281;
    //     // console.log("saludoooooooooooooooooos 3" + heightConst);
    //   }
    //   else if (this.disabilityGroup.get('questions').get('heightUnit').value == 'metro') {
    //     heightConst = this.disabilityGroup.get('questions').get('height').value;
    //     // console.log("despedidadsdsaaaaaaaaaaaaaaaaasssssss 4" + heightConst);
    //   }

    //   this.bmi = Math.round((weightConst / (heightConst * heightConst) * 100)) / 100;
    //   this.disabilityGroup.get('questions').get('bmiName').setValue(this.bmi)
    //   // console.log(this.disabilityGroup.get('questions').get('weight').value / 2.205);
    //   // console.log(this.disabilityGroup.get('questions').get('height').value / 3.281);
    //   // console.log('this.bmi =======  aaaaaaaaaaaaaaaaaa ' + this.bmi);
    // }

    let valueSalary;
    // const plan = this.disabilityGroup.get('plan') as FormGroup;
    // console.log(this.disabilityGroup.get('insured_data').get('salary').value * 0.7 );
    // tslint:disable-next-line: prefer-for-of
    if (this.disabilityGroup.get('insured_data').get('salary').valueChanges) {
      valueSalary = this.disabilityGroup.get('insured_data').get('salary').value;
      this.y = 0;
    }

    if ((valueSalary != null ||
      valueSalary != undefined) &&
      valueSalary > 0) {
      // this.actualValue = valueSalary;
      // console.log(this.actualValue);
      if ((1000 < (valueSalary * 0.7)) && this.y == 0) {
        for (let x = 0; x < this.trashArray.length; x++) {
          // tslint:disable-next-line: radix
          if (this.rentArray[x] == (null || undefined) &&
            // tslint:disable-next-line: radix
            (Number.parseInt(this.trashArray[x].value.slice(3).replace(',', ''))) <
            (valueSalary * 0.7)) {

            this.rentArray.push(this.trashArray[x]);
            // tslint:disable-next-line: radix
            // console.log(Number.parseInt(this.rentArray[x].value.slice(3).replace(',', '')));
          }
        }
        // plan.removeControl('rent');
        // this.actualValue = valueSalary;
        this.y = 1;
        // plan.addControl('rent', this.fb.control(['', Validators.required]));
      }
      for (let x = 0; x < this.rentArray.length; x++) {
        // tslint:disable-next-line: radix
        if ((Number.parseInt(this.rentArray[x].value.slice(3).replace(',', ''))) >
          (valueSalary * 0.7)) {

          this.rentArray.splice(x, 1);
          this.y = 0;
          // tslint:disable-next-line: radix
          // console.log(Number.parseInt(this.rentArray[x].value.slice(3).replace(',', '')));
        }
      }
    }
    // console.log(this.rentArray);

    // tslint:disable-next-line: align
    if (this.age >= 50 && this.disabilityGroup.get('insured_data').get('gender').value == 'masculino') {
      if (this.xx != 0) {
        this.xx = 0;
      }
      const questionnaires = this.disabilityGroup.get('questionnaires') as FormGroup;
      if (this.x == 0) {
        if (!this.disabilityGroup.get('questionnaires').get('solicitudProstatica')) {
          questionnaires.addControl('solicitudProstatica', this.fb.group({}));
        }
        this.disabilityGroup.get('questions').get('questionnaire').get('sicknessType_radio').setValue('si');

        const var1 = {
          name: 'sicknessType_radio', valor: 'si'
        };

        this.selectChange(var1);

        if (this.disabilityGroup.get('questions').get('questionnaire').get('sicknessType')) {
          this.disabilityGroup.get('questions').get('questionnaire').get('sicknessType').get('haveProstatics').setValue('si');
          this.x++;
        }
      }
    }
    else if (this.age < 50 || this.disabilityGroup.get('insured_data').get('gender').value == 'femenino') {
      if (this.xx == 0) {
        this.x++;
      }
      const questionnaires = this.disabilityGroup.get('questionnaires') as FormGroup;
      if (this.x != 0) {
        if (this.disabilityGroup.get('questionnaires').get('solicitudProstatica')) {
          questionnaires.removeControl('solicitudProstatica');
        }
        if (this.disabilityGroup.get('questions').get('questionnaire').get('sicknessType')) {
          this.disabilityGroup.get('questions').get('questionnaire').get('sicknessType').get('haveProstatics').setValue('no');
          this.x = 0;
          this.xx++;
        }
      }
      if (!this.disabilityGroup.get('questionnaires').get('solicitudProstatica') &&
        !this.disabilityGroup.get('questions').get('questionnaire').get('sicknessType')) {
        this.x = 0;
      }
    }

    if (this.disabilityGroup.get('questions').get('questionnaire').get('therapy_radio').value == 'no' &&
      this.disabilityGroup.get('questions').get('questionnaire').get('therapy_array')) {

      const formQDoCheck = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;
      formQDoCheck.removeControl('therapy_array');
    }

    if (this.disabilityGroup.get('questions').get('questionnaire').get('sick_pay_radio').value == 'no' &&
      this.disabilityGroup.get('questions').get('questionnaire').get('sick_pay_array')) {

      const formQDoCheck = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;
      formQDoCheck.removeControl('sick_pay_array');
    }

    if (this.disabilityGroup.get('questions').get('questionnaire').get('analysis_radio').value == 'no' &&
      this.disabilityGroup.get('questions').get('questionnaire').get('analysis_array')) {

      const formQDoCheck = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;
      formQDoCheck.removeControl('analysis_array');
    }

    if (this.disabilityGroup.get('questions').get('questionnaire').get('other_analysis_radio').value == 'no' &&
      this.disabilityGroup.get('questions').get('questionnaire').get('other_analysis_array')) {

      const formQDoCheck = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;
      formQDoCheck.removeControl('other_analysis_array');
    }

    if (this.disabilityGroup.get('questions').get('questionnaire').get('inpatientCare_radio').value == 'no' &&
      this.disabilityGroup.get('questions').get('questionnaire').get('inpatientCare_array')) {

      const formQDoCheck = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;
      formQDoCheck.removeControl('inpatientCare_array');
    }

    if (this.disabilityGroup.get('questions').get('questionnaire').get('hospitalization_radio').value == 'no' &&
      this.disabilityGroup.get('questions').get('questionnaire').get('hospitalization_array')) {

      const formQDoCheck = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;
      formQDoCheck.removeControl('hospitalization_array');
    }

    if (this.disabilityGroup.get('questions').get('questionnaire').get('bloodSick_radio').value == 'no' &&
      this.disabilityGroup.get('questions').get('questionnaire').get('bloodSick_array')) {

      const formQDoCheck = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;
      formQDoCheck.removeControl('bloodSick_array');
    }

    if (this.disabilityGroup.get('questions').get('questionnaire').get('VIH_radio').value == 'no' &&
      this.disabilityGroup.get('questions').get('questionnaire').get('VIH_array')) {

      const formQDoCheck = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;
      formQDoCheck.removeControl('VIH_array');
    }

    if (this.disabilityGroup.get('questions').get('questionnaire').get('specialTherapy_radio').value == 'no' &&
      this.disabilityGroup.get('questions').get('questionnaire').get('specialTherapy_array')) {

      const formQDoCheck = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;
      formQDoCheck.removeControl('specialTherapy_array');
    }

    if (this.disabilityGroup.get('questions').get('questionnaire').get('accident_radio').value == 'no' &&
      this.disabilityGroup.get('questions').get('questionnaire').get('accident_array')) {

      const formQDoCheck = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;
      formQDoCheck.removeControl('accident_array');
    }

    if (this.disabilityGroup.get('questions').get('questionnaire').get('deny_radio').value == 'no' &&
      this.disabilityGroup.get('questions').get('questionnaire').get('deny_array')) {

      const formQDoCheck = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;
      formQDoCheck.removeControl('deny_array');
    }

    if (this.disabilityGroup.get('questions').get('questionnaire').get('insurance_radio').value == 'no' &&
      this.disabilityGroup.get('questions').get('questionnaire').get('insurance_array')) {

      const formQDoCheck = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;
      formQDoCheck.removeControl('insurance_array');
    }

    if (this.disabilityGroup.get('questions').get('questionnaire').get('insurance_array')) {
      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < this.insuranceArray.controls.length; x++) {

        if ((this.disabilityGroup.get('questions').get('questionnaire').get('insurance_array'
        ).get(x.toString()).get('claim_radio').value == 'no' ||
          this.disabilityGroup.get('questions').get('questionnaire').get('insurance_array'
          ).get(x.toString()).get('claim_radio').value == '' ||
          this.disabilityGroup.get('questions').get('questionnaire').get('insurance_array'
          ).get(x.toString()).get('claim_radio').value == null ||
          this.disabilityGroup.get('questions').get('questionnaire').get('insurance_array'
          ).get(x.toString()).get('claim_radio').value == undefined) &&
          this.disabilityGroup.get('questions').get('questionnaire').get('insurance_array'
          ).get(x.toString()).get('claim')) {

          const formQDoCheck = this.disabilityGroup.get('questions').get('questionnaire').get('insurance_array'
          ).get(x.toString()) as FormGroup;
          formQDoCheck.removeControl('claim');
        }
      }
    }

    if (this.disabilityGroup.get('contingent').get('hasAnotherCoverage').value == 'no' &&
      this.disabilityGroup.get('contingent').get('anotherCoverages')) {

      const formCBDoCheck = this.disabilityGroup.get('contingent') as FormGroup;
      formCBDoCheck.removeControl('anotherCoverages');
    }

    if (this.disabilityGroup.get('contingent').get('hasAnotherCoverage').value == 'si') {

      if (this.disabilityGroup.get('contingent').get('changeAnotherCoverage')) {
        if ((this.disabilityGroup.get('contingent').get('changeAnotherCoverage').value == 'no'
          || this.disabilityGroup.get('contingent').get('changeAnotherCoverage').value == ''
          || this.disabilityGroup.get('contingent').get('changeAnotherCoverage').value == null
          || this.disabilityGroup.get('contingent').get('changeAnotherCoverage').value == undefined) &&
          this.disabilityGroup.get('contingent').get('changingCoverages')) {

          const formCBDoCheck = this.disabilityGroup.get('contingent') as FormGroup;
          formCBDoCheck.removeControl('changingCoverages');
        }
      }
    }
  }

  selectChange(event, position?) {
    const form = this.disabilityGroup.get('questions') as FormGroup;
    const formInsured = this.disabilityGroup.get('insured_data') as FormGroup;
    const formHolder = this.disabilityGroup.get('policyholder') as FormGroup;
    const questionnaires = this.disabilityGroup.get('questionnaires') as FormGroup;
    const formQ = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;
    let formC;
    if (this.disabilityGroup.get('questions').get('questionnaire').get('insurance_array')) {
      formC = this.disabilityGroup.get('questions').get('questionnaire').get('insurance_array').get(position) as FormGroup;
    }
    const formGeneral = this.disabilityGroup as FormGroup;
    const formCB = this.disabilityGroup.get('contingent') as FormGroup;

    console.log(event);

    if (event.valor === 'si') {
      // console.log(JSON.stringify(this.disabilityGroup.value));

      switch (event.name) {
        case 'smoker_radio':
          form.addControl('smoke', this.fb.group({
            quantity: ['', [Validators.required, Validators.min(1)]],
            duration: ['', Validators.required]
          }));
          break;

        case 'alcohol_radio':
          form.addControl('alcohol', this.fb.group({
            quantity: ['', [Validators.required, Validators.min(1)]]
          }));
          break;

        case 'health_radio':
          formQ.addControl('health', this.fb.group({
            date: ['', Validators.required],
            reason: ['', Validators.required],
            therapy: ['', Validators.required]
          }));
          break;

        case 'therapy_radio':
          formQ.addControl('therapy_array', this.fb.array([this.formMethods.createItem(this.therapyGroup)]));
          this.therapyArray = this.disabilityGroup.get('questions').get('questionnaire').get('therapy_array') as FormArray;
          break;

        case 'sick_pay_radio':
          formQ.addControl('sick_pay_array', this.fb.array([this.formMethods.createItem(this.sickPayGroup)]));
          this.sickPayArray = this.disabilityGroup.get('questions').get('questionnaire').get('sick_pay_array') as FormArray;
          break;

        case 'analysis_radio':
          formQ.addControl('analysis_array', this.fb.array([this.formMethods.createItem(this.testGroup)]));
          this.testArray = this.disabilityGroup.get('questions').get('questionnaire').get('analysis_array') as FormArray;
          break;

        case 'other_analysis_radio':
          formQ.addControl('other_analysis_array', this.fb.array([this.formMethods.createItem(this.otherAnalysisGroup)]));
          this.otherAnalysisArray = this.disabilityGroup.get('questions').get('questionnaire').get('other_analysis_array') as FormArray;
          break;

        case 'inpatientCare_radio':
          formQ.addControl('inpatientCare_array', this.fb.array([this.formMethods.createItem(this.inpatientCareGroup)]));
          this.inpatientCareArray = this.disabilityGroup.get('questions').get('questionnaire').get('inpatientCare_array') as FormArray;
          break;

        case 'bloodSick_radio':
          formQ.addControl('bloodSick_array', this.fb.array([this.formMethods.createItem(this.bloodSickGroup)]));
          this.bloodSickArray = this.disabilityGroup.get('questions').get('questionnaire').get('bloodSick_array') as FormArray;
          break;

        case 'hospitalization_radio':
          formQ.addControl('hospitalization_array', this.fb.array([this.formMethods.createItem(this.hospitalizationGroup)]));
          this.hospitalizationArray = this.disabilityGroup.get('questions').get('questionnaire').get('hospitalization_array') as FormArray;
          break;

        case 'sicknessType_radio':
          formQ.addControl('sicknessType', this.fb.group({
            // sickness: ['', Validators.required],
            // date: ['', Validators.required],
            // duration: ['', Validators.required],
            // therapy: ['', Validators.required],
            // cureDate: ['', Validators.required],
            // secundaryEffects: ['', Validators.required],
            // additionalInfo: ['', Validators.required],
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
          questionnaires.addControl('solicitudHipertensionArterial', this.fb.group({}));
          break;

        case 'pep_radio_insured':
          console.log(this.role);

          formInsured.addControl('pep', this.fb.group({
            contractor: ['', Validators.required],
            payer: ['', Validators.required],
            insured: ['', Validators.required],
            lastPosition: ['', Validators.required],
            time: ['', Validators.required],
            timeNumber: ['', [Validators.required, Validators.min(1)]]
          }));

          if (this.role === 'WMA') { formInsured.addControl('knowYourClient', this.fb.group({})); }
          else if (this.role === 'WWS') { formInsured.addControl('knowYourCustomer', this.fb.group({})); }
          break;

        case 'pep_radio_holder':
          console.log(this.role);

          formHolder.addControl('pep', this.fb.group({
            contractor: ['', Validators.required],
            payer: ['', Validators.required],
            insured: ['', Validators.required],
            lastPosition: ['', Validators.required],
            time: ['', Validators.required],
            timeNumber: ['', [Validators.required, Validators.min(1)]]
          }));

          if (this.role === 'WMA') { formHolder.addControl('knowYourClient', this.fb.group({})); }
          else if (this.role === 'WWS') { formHolder.addControl('KnowYourCustomer', this.fb.group({})); }
          break;

        case 'haveArthritis':
          questionnaires.addControl('solicitudArtitris', this.fb.group({}));
          break;

        case 'haveCardiovascular':
          questionnaires.addControl('solicitudCardioVasculares', this.fb.group({}));
          break;

        case 'haveRenalUrinary':
          questionnaires.addControl('solicitudRenales', this.fb.group({}));
          break;

        case 'haveMetabolics':
          questionnaires.addControl('solicitudDiabetes', this.fb.group({}));
          break;

        case 'haveMusculoSkeletal':
          questionnaires.addControl('solicitudMusculoesqueleticos', this.fb.group({}));
          break;

        case 'haveProstatics':
          questionnaires.addControl('solicitudProstatica', this.fb.group({}));
          break;

        case 'haveSpine':
          questionnaires.addControl('columnaVertebralColumnaVertebral', this.fb.group({}));
          break;

        case 'VIH_radio':

          formQ.addControl('VIH_array', this.fb.array([this.formMethods.createItem(this.VIHGroup)]));
          this.VIHArray = this.disabilityGroup.get('questions').get('questionnaire').get('VIH_array') as FormArray;
          break;

        case 'specialTherapy_radio':
          formQ.addControl('specialTherapy_array', this.fb.array([this.formMethods.createItem(this.specialTherapyGroup)]));
          this.specialTherapyArray = this.disabilityGroup.get('questions').get('questionnaire').get('specialTherapy_array') as FormArray;
          break;

        case 'accident_radio':
          formQ.addControl('accident_array', this.fb.array([this.formMethods.createItem(this.accidentGroup)]));
          this.accidentArray = this.disabilityGroup.get('questions').get('questionnaire').get('accident_array') as FormArray;
          break;

        case 'deny_radio':
          formQ.addControl('deny_array', this.fb.array([this.formMethods.createItem(this.denyGroup)]));
          this.denyArray = this.disabilityGroup.get('questions').get('questionnaire').get('deny_array') as FormArray;
          break;

        case 'insurance_radio':
          formQ.addControl('insurance_array', this.fb.array([this.formMethods.createItem(this.insuranceGroup)]));
          this.insuranceArray = this.disabilityGroup.get('questions').get('questionnaire').get('insurance_array') as FormArray;
          break;

        case 'claim_radio':
          formC.addControl('claim', this.fb.group({
            explanation: ['', Validators.required],
          }));
          break;

        case 'insuredPolicyholderRadio':
          if (this.disabilityGroup.get('insured_data').get('policyholderKnowClientRadio')) {
            formInsured.removeControl('policyholderKnowClientRadio');
          }
          this.accordionTitles = [
            'Sección A. Datos del propuesto Asegurado y Estatus laboral', 'Sección C. Cuestionario Médico',
            'Sección D. Opción del Plan', 'Sección E. Beneficiarios Primarios',
            'Beneficiario(s) Contigente(s)', 'En caso de Cesión Bancaria'];
          formGeneral.removeControl('policyholder');
          break;

        case 'policyholderKnowClientRadio':
          // if (this.disabilityGroup.get('insured_data').get('policyholderKnowClientRadio')){
          //   formInsured.removeControl('policyholderKnowClientRadio');
          // }
          this.accordionTitles = [
            'Sección A. Datos del propuesto Asegurado y Estatus laboral', 'Sección C. Cuestionario Médico',
            'Sección D. Opción del Plan', 'Sección E. Beneficiarios Primarios',
            'Beneficiario(s) Contigente(s)', 'En caso de Cesión Bancaria'];
          formGeneral.removeControl('policyholder');
          formInsured.addControl('knowYourClientSecond', this.fb.group({}));
          break;

        case 'hasAnotherCoverage':
          formCB.addControl('anotherCoverages', this.fb.array([this.createFormArray('coverages')]));
          formCB.addControl('changeAnotherCoverage', this.fb.control('', Validators.required));
          this.existingCoveragesList = formCB.get('anotherCoverages') as FormArray;
          break;

        case 'changeAnotherCoverage':
          formCB.addControl('changingCoverages', this.fb.array([this.createFormArray('coverages')]));
          this.changingCoveragesList = formCB.get('changingCoverages') as FormArray;
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
          formQ.removeControl('therapy_array');
          break;

        case 'sick_pay_radio':
          formQ.removeControl('sick_pay_array');
          break;

        case 'analysis_radio':
          formQ.removeControl('analysis_array');
          break;

        case 'other_analysis_radio':
          formQ.removeControl('other_analysis_array');
          break;

        case 'inpatientCare_radio':
          formQ.removeControl('inpatientCare_array');
          break;

        case 'sicknessType_radio':
          formQ.removeControl('sicknessType');
          break;

        case 'VIH_radio':
          formQ.removeControl('VIH_array');
          break;

        case 'accident_radio':
          formQ.removeControl('accident_array');
          break;

        case 'deny_radio':
          formQ.removeControl('deny_array');
          break;

        case 'insurance_radio':
          formQ.removeControl('insurance_array');
          break;

        case 'specialTherapy_radio':
          formQ.removeControl('specialTherapy_array');
          break;

        case 'bloodSick_radio':
          formQ.removeControl('bloodSick_array');
          break;

        case 'hospitalization_radio':
          formQ.removeControl('hospitalization_array');
          break;

        case 'claim_radio':
          formC.removeControl('claim');
          break;

        case 'haveHypertension':
          questionnaires.removeControl('solicitudHipertensionArterial');
          break;

        case 'haveArthritis':
          questionnaires.removeControl('solicitudArtitris');
          break;

        case 'haveCardiovascular':
          questionnaires.removeControl('solicitudCardioVasculares');
          break;

        case 'haveRenalUrinary':
          questionnaires.removeControl('solicitudRenales');
          break;

        case 'haveMetabolics':
          questionnaires.removeControl('solicitudDiabetes');
          break;

        case 'haveMusculoSkeletal':
          questionnaires.removeControl('solicitudMusculoesqueleticos');
          break;

        case 'haveProstatics':
          questionnaires.removeControl('solicitudProstatica');
          break;

        case 'haveSpine':
          questionnaires.removeControl('columnaVertebralColumnaVertebral');
          break;

        case 'pep_radio_insured':
          formInsured.removeControl('pep');
          formInsured.removeControl('knowYourClient');
          formInsured.removeControl('knowYourCustomer');
          break;


        case 'pep_radio_holder':
          formHolder.removeControl('pep');
          formHolder.removeControl('knowYourClient');
          formHolder.removeControl('KnowYourCustomer');
          break;

        case 'insuredPolicyholderRadio':

          formInsured.addControl('policyholderKnowClientRadio', this.fb.control('', Validators.required));
          if (!this.disabilityGroup.get('policyholder')) {
            formGeneral.addControl('policyholder', this.fb.group(this.policyHolderGroup));
            this.accordionTitles = [
              'Sección A. Datos del propuesto Asegurado y Estatus laboral',
              'Sección B. Datos del Contratante', 'Sección C. Cuestionario Médico',
              'Sección D. Opción del Plan', 'Sección E. Beneficiarios Primarios',
              'Beneficiario(s) Contigente(s)', 'En caso de Cesión Bancaria'];
          }
          else {
            console.log('Ya existe, por tanto no hay que crear a policyholder de nuevo.');
          }
          break;

        case 'policyholderKnowClientRadio':
          // formInsured.addControl('policyholderKnowClientRadio', this.fb.control('', Validators.required));
          if (!this.disabilityGroup.get('policyholder')) {
            formGeneral.addControl('policyholder', this.fb.group(this.policyHolderGroup));
            this.accordionTitles = [
              'Sección A. Datos del propuesto Asegurado y Estatus laboral',
              'Sección B. Datos del Contratante', 'Sección C. Cuestionario Médico',
              'Sección D. Opción del Plan', 'Sección E. Beneficiarios Primarios',
              'Beneficiario(s) Contigente(s)', 'En caso de Cesión Bancaria'];
          }
          else {
            console.log('Ya existe, por tanto no hay que crear a policyholder de nuevo.');
          }

          if (this.disabilityGroup.get('insured_data').get('knowYourClientSecond')) {
            formInsured.removeControl('knowYourClientSecond');
          }
          break;

        case 'hasAnotherCoverage':
          formCB.removeControl('anotherCoverages');
          this.existingCoveragesList = undefined;
          formCB.get('changeAnotherCoverage').reset();
          formCB.removeControl('changeAnotherCoverage');
          this.changingCoveragesList = undefined;
          break;

        case 'changeAnotherCoverage':
          formCB.removeControl('changingCoverages');
          this.changingCoveragesList = undefined;
          break;

      }
    }

    // else if (event.name === 'weightUnit') {
    //   if (event.valor == 'kilogramos'){
    //     this.massName = 'kg';
    //   }
    //   else if (event.valor == 'libras') {
    //     this.massName = 'lb';
    //   }
    // }
    // else if (event.name === 'heightUnit') {
    //   if (event.valor == 'pies'){
    //     this.heightName = 'pies';
    //   }
    //   else if (event.valor == 'centimetros') {
    //     this.heightName = 'cm';
    //   }
    // }
  }

  createFormArray(name: string) {
    const formP = this.disabilityGroup.get('main') as FormGroup;
    const formC = this.disabilityGroup.get('contingent') as FormGroup;
    const formQ = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;
    // const formS = this.disabilityGroup.get('questions').get('questionnaire') as FormGroup;

    formP.addControl('main_array', this.mainProperty);
    formC.addControl('contingent_array', this.contingentProperty);


    switch (name) {
      case 'main_array':
        return this.mainGroup;
        break;

      case 'contingent_array':
        return this.contingentGroup;
        break;

      case 'analysis_array':
        formQ.addControl('analysis_array', this.testProperty);
        return this.testGroup;
        break;

      case 'sick_pay_array':
        formQ.addControl('sick_pay_array', this.sickPayProperty);
        return this.sickPayGroup;
        break;

      case 'therapy_array':
        formQ.addControl('therapy_array', this.therapyProperty);
        return this.therapyGroup;
        break;

      case 'other_analysis_array':
        formQ.addControl('other_analysis_array', this.otherAnalysisProperty);
        return this.otherAnalysisGroup;
        break;

      case 'inpatientCare_array':
        formQ.addControl('inpatientCare_array', this.inpatientCareProperty);
        return this.inpatientCareGroup;
        break;

      case 'hospitalization_array':
        formQ.addControl('hospitalization_array', this.hospitalizationProperty);
        return this.hospitalizationGroup;
        break;

      case 'bloodSick_array':
        formQ.addControl('bloodSick_array', this.bloodSickProperty);
        return this.bloodSickGroup;
        break;

      case 'VIH_array':
        formQ.addControl('VIH_array', this.VIHProperty);
        return this.VIHGroup;
        break;

      case 'specialTherapy_array':
        formQ.addControl('specialTherapy_array', this.specialTherapyProperty);
        return this.specialTherapyGroup;
        break;

      case 'accident_array':
        formQ.addControl('accident_array', this.accidentProperty);
        return this.accidentGroup;
        break;

      case 'deny_array':
        formQ.addControl('deny_array', this.denyProperty);
        return this.denyGroup;
        break;

      case 'insurance_array':
        formQ.addControl('insurance_array', this.insuranceProperty);
        return this.insuranceGroup;
        break;

      case 'coverages':
        return this.fb.group({
          name: ['', Validators.required],
          amount: ['', Validators.required],
          policeNo: ['', [Validators.required, Validators.min(1)]],
          adbQuantity: ['', [Validators.required, Validators.min(0)]],
          date: ['', Validators.required],
        });
        break;

    }
  }

  addToList(list: any, type: string) {
    list.push(this.createFormArray(type));
  }

  addFormArray(array: any, name: string) {
    const increment = array.length + 1;
    array = this.formMethods.addElement(array, increment, this.createFormArray(name)).formArray;

    console.log(JSON.stringify(this.disabilityGroup.value));
    // console.log(this.mainFormArray);
    // console.log(this.mainFormArray.value);

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

  selectChangeUrl(event) {
    switch (event) {
      case 'vida':
        this.router.navigate(['../life'], { relativeTo: this.route });
        break;

      case 'disability':
        this.router.navigate(['../disability'], { relativeTo: this.route });
        break;

      case 'gastos mayores':
        this.router.navigate(['../major-expenses'], { relativeTo: this.route });
        break;

      default:
        break;
    }
  }
  getData(id) {
    console.log(id);
    this.disabilityService.returnData(id).subscribe(data => {
      // console.log(data.data.asegurado.documentoIdentidad)
      console.log(data)
      if (data !== undefined && data.data !== null &&
        data.data != undefined) {
        this.ID = data.data.id;
        this.dataMappingFromApi.iterateThroughtAllObject(data.data, this.disabilityGroup);

        console.log(this.disabilityGroup);
        console.log(data.data);
        this.therapyArray = this.disabilityGroup.get('questions').get('questionnaire').get('therapy_array') as FormArray;
        this.sickPayArray = this.disabilityGroup.get('questions').get('questionnaire').get('sick_pay_array') as FormArray;
        this.testArray = this.disabilityGroup.get('questions').get('questionnaire').get('analysis_array') as FormArray;
        this.otherAnalysisArray = this.disabilityGroup.get('questions').get('questionnaire').get('other_analysis_array') as FormArray;
        this.inpatientCareArray = this.disabilityGroup.get('questions').get('questionnaire').get('inpatientCare_array') as FormArray;
        this.bloodSickArray = this.disabilityGroup.get('questions').get('questionnaire').get('bloodSick_array') as FormArray;
        this.hospitalizationArray = this.disabilityGroup.get('questions').get('questionnaire').get('hospitalization_array') as FormArray;

        this.VIHArray = this.disabilityGroup.get('questions').get('questionnaire').get('VIH_array') as FormArray;
        this.specialTherapyArray = this.disabilityGroup.get('questions').get('questionnaire').get('specialTherapy_array') as FormArray;
        this.accidentArray = this.disabilityGroup.get('questions').get('questionnaire').get('accident_array') as FormArray;
        this.denyArray = this.disabilityGroup.get('questions').get('questionnaire').get('deny_array') as FormArray;
        this.insuranceArray = this.disabilityGroup.get('questions').get('questionnaire').get('insurance_array') as FormArray;
        this.existingCoveragesList = this.disabilityGroup.get('contingent').get('anotherCoverages') as FormArray;
        this.changingCoveragesList = this.disabilityGroup.get('contingent').get('changingCoverages') as FormArray;

        //this.disabilityGroup['controls'].num_financial_quote.setValue(data.data.num_financial_quote)
      }

    });
  }

  // getDataSubForms(id, name) {
  // 	this.disabilityService.returnData(id).subscribe(data => {
  // 		// console.log(data.data.asegurado.documentoIdentidad)
  //     console.log(data);
  //     if (data !== undefined && data.data !== null &&
  //       data.data != undefined )
  //    {
  //      this.ID = data.data.id;
  //      if (name == 'solicitudMusculoesqueleticos'){
  //       this.iterateThroughtAllObject(data.data.questionnaires.solicitudMusculoesqueleticos,
  //         // tslint:disable-next-line: no-string-literal
  //         this.disabilityGroup.get('questionnaires').get('solicitudMusculoesqueleticos'));
  //      }
  //      if (name == 'solicitudRenales'){
  //       this.iterateThroughtAllObject(data.data.questionnaires.solicitudRenales,
  //         // tslint:disable-next-line: no-string-literal
  //         this.disabilityGroup.get('questionnaires').get('solicitudRenales'));
  //      }

  //     //this.disabilityGroup['controls'].num_financial_quote.setValue(data.data.num_financial_quote)
  //    }

  //   });

  // // this.disabilityService.id = null;
  // 	console.log('this.disabilityService.id es igual a ' + this.disabilityService.id);
  // }

}
