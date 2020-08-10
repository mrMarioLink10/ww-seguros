import { Component, OnInit, DoCheck, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { Router, ActivatedRoute } from '@angular/router';
import { generate, Observable } from 'rxjs';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import { MatDialog } from '@angular/material';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { map, first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';
import { FormValidationsConstant } from 'src/app/shared/ShareConstant/shareConstantFile';
import { CurrencyPipe } from '@angular/common';
import { FormDataFillingService } from 'src/app/modules/dashboard/services/shared/formDataFillingService';
import { DiseaseService } from '../../dashboard/shared/components/disease/shared/disease/disease.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { QuotesService } from '../../dashboard/services/quotes/quotes.service';
import { MajorExpensesService } from '../../dashboard/requests/new-request/major-expenses/services/major-expenses.service';
import { $weightTypes, $heightTypes, $sex, $res, $family, $country, $time, $allFamily } from 'src/app/core/form/objects';
import { questionsA, questionsB } from '../../dashboard/requests/new-request/major-expenses/questions';
import { RequestsService } from '../services/requests.service';
import { $musculoSkeletalAilment, $cardiovascularSystemAilment, $nervousSystemAilment, $visionHearingAilment, $respiratorySystemAilment, $digestiveSystemAilment, $maleReproductiveOrgansAilment, $bloodDisordersAilment, $endocrineDisordersAilment, $alternateTreatmentAilment, $functionalLimitationAilment, $deformityAilment, $stdAilment, $urinarySystemAilment, $cerebroVascularAilment, $reproductiveOrganDisordersAilment } from 'src/app/core/class/major-expenses-ailments';
@Component({
  selector: 'app-major-expenses',
  templateUrl: './major-expenses.component.html',
  styleUrls: ['./major-expenses.component.scss']
})

export class MajorExpensesComponent implements OnInit, DoCheck {
  // tslint:disable-next-line: max-line-length
  constructor(
    private fb: FormBuilder,
    private dataMappingFromApi: FormDataFillingService,
    public formMethods: FormArrayGeneratorService,
    private router: Router,
    private route: ActivatedRoute,
    public formHandler: FormHandlerService,
    public diseaseService: DiseaseService,
    public dialogModal: DialogService,
    private dialogOption: DialogOptionService,
    private userService: UserService,
    private quotesService: QuotesService,
    private majorExpensesService: MajorExpensesService,
    public dialog: MatDialog,
    public appComponent: AppComponent,
    private currencyPipe: CurrencyPipe,
    private cd: ChangeDetectorRef,
    public requestService: RequestsService
  ) { }

  get allDependents(): FormArray {
    return this.newRequest.get('dependents').get('allDependents') as FormArray;
  }


  get questionnairesGastosMayores(): FormGroup {
    return this.newRequest.get('questionsA').get('questionnairesGastosMayores') as FormGroup;
  }

  get questionsA(): FormGroup {
    return this.newRequest.get('questionsA') as FormGroup;
  }

  get person(): FormGroup {
    return this.newRequest.get('person') as FormGroup;
  }
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
  pruebaCheck: any;
  visible = false;
  todayDate = new Date();
  primaryBenefitsArray: FormArray;
  contingentBeneficiaryArray: FormArray;
  newRequest: FormGroup;
  sex = $sex;
  res = $res;
  dependentsFormArray: FormArray;
  questionsFormArray: FormArray;
  questionsBFormArray: FormArray;
  studentDependents: FormArray;
  proceduresArray: FormArray;
  informationList: FormArray;
  filesStudiesArray: FormArray;
  familyWithDiseasesList: FormArray;
  musculoSkeletalList: FormArray;
  endocrineDisordersList: FormArray;
  urinarySystemList: FormArray;
  cardiovascularSystemList: FormArray;

  arrayFilesTitles = [];
  primaryBeneficaryTitles = [];
  contigentBeneficaryTitles = [];
  primaryAnotherTitle: any;
  contigentAnotherTitle: any;

  questions = questionsA;
  questionsB = questionsB;
  routeSelected = 'gastos mayores';
  isThereAWomen = false;
  isThereAMen = false;

  student = {
    name: ['', Validators.required],
    univercity: ['', Validators.required],
    univercityPhone: ['', Validators.required]
  };
  family = $family;

  sportsQuestions = [
    {
      label: 'Participado en deportes submarinos, buceo SCUBA',
      name: 'diving',
      group: ''
    },
    {
      label: 'Carreras en un “scooter”, motorizado, motocicleta, carro u otro vehículo impulsado',
      name: 'racing',
      group: ''
    },
    {
      label: 'Planeadores de mano, paracaidismo, saltos BASE, saltos en cuerda elástica (bungee jumping), paracaidismo con cometa (para-kiting), paracaidismo planeador (skydiving)',
      name: 'skydiving',
      group: ''
    },
    {
      label: 'Esquí con helicóptero, o escalar rocas o montaña',
      name: 'mountaineering',
      group: ''
    },
  ];

  yesOrNo: FieldConfig = {
    label: '',
    options: [
      {
        value: 'SI',
        viewValue: 'Si'
      },
      {
        value: 'NO',
        viewValue: 'No'
      }
    ]
  };

  requestTypeOptions: FieldConfig =
    {
      label: 'Tipo de Solicitud',
      options: [

        {
          value: 'PÓLIZA NUEVA',
          viewValue: 'PÓLIZA NUEVA',
        }
      ],
      name: 'requestType',
    };
  isJuridicaData: FieldConfig =
    {
      label: '¿Es una persona jurídica?',
      options: [
        {
          value: 'SI',
          viewValue: 'Sí',
        },
        {
          value: 'NO',
          viewValue: 'No',
        }
      ],
      name: 'idType',
    };
  isContractorData: FieldConfig =
    {
      label: '¿El asegurador y el contratante/pagador son distintos?',
      options: [
        {
          value: 'SI',
          viewValue: 'Sí',
        },
        {
          value: 'NO',
          viewValue: 'No',
        }
      ],
      name: 'idType',
    };
  idType: FieldConfig =
    {
      label: 'Tipo de documento de identidad',
      options: [
        {
          value: 'CÉDULA',
          viewValue: 'CÉDULA',
        },
        {
          value: 'PASAPORTE',
          viewValue: 'PASAPORTE',
        }
      ],
      name: 'idType',
    };

  itIsCurrentOptions: FieldConfig =
    {
      label: 'Se encuentra vigente en la actualidad',
      options: [
        {
          value: 'SI',
          viewValue: 'Si'
        },
        {
          value: 'NO',
          viewValue: 'No'
        }
      ],
    };

  didReclamationOptions: FieldConfig =
    {
      label: '¿Tuvo alguna reclamación?',
      options: [
        {
          value: 'SI',
          viewValue: 'Si'
        },
        {
          value: 'NO',
          viewValue: 'No'
        }
      ],
    };
  payments: FieldConfig = {
    label: 'Frecuencia de Pago',
    options: [
      {
        value: 'ANUAL',
        viewValue: 'ANUAL'
      },
      {
        value: 'SEMESTRAL',
        viewValue: 'SEMESTRAL'
      },
      {
        value: 'TRIMESTRAL',
        viewValue: 'TRIMESTRAL'
      },
    ]
  };
  deducibles: FieldConfig = {
    label: 'Deducibles',
    options: [
      {
        value: '1000',
        viewValue: 'RD$1,000'
      },
      {
        value: '3000',
        viewValue: 'RD$3,000'
      },
      {
        value: '5000',
        viewValue: 'RD$5,000'
      },
      {
        value: 'OTRO',
        viewValue: 'Otro'
      },
    ]
  };
  plans: FieldConfig = {
    label: 'Planes',
    options: [
      {
        value: 'SIGNATURE SPECIAL',
        viewValue: 'SIGNATURE SPECIAL',
      },
      {
        value: 'EXCELLENCE SPECIAL',
        viewValue: 'EXCELLENCE SPECIAL',
      },
      {
        value: 'DISTINCTION PREMIUM',
        viewValue: 'DISTINCTION PREMIUM',
      },
      {
        value: 'SIGNATURE',
        viewValue: 'SIGNATURE',
      },
      {
        value: 'EXCELLENCE',
        viewValue: 'EXCELLENCE',
      },
      {
        value: 'DISTINCTION',
        viewValue: 'DISTINCTION',
      },
      {
        value: 'PLAN ESTUDIANTIL',
        viewValue: 'PLAN ESTUDIANTIL',
      },
      {
        value: 'OTRO',
        viewValue: 'OTRO',
      }
    ],
    name: 'plans',
  };
  // tslint:disable-next-line: max-line-length
  titles = FormValidationsConstant.titlesForMajorExpenses;

  country = {
    label: 'País',
    options: $country,
    name: 'country',
  };

  countryOfResidence = {
    options: $country,
    name: 'countryOfResidence',
    label: 'País de Residencia'
  };

  countryOfBirth = {
    options: $country,
    name: 'countryOfBirth',
    label: 'País de Nacimiento'
  };

  nationality = {
    label: 'Nacionalidad',
    options: $country,
    name: 'nationality',
  };

  status = {
    label: 'Estado Civil',
    options: [
      {
        value: 'SOLTERO',
        viewValue: 'SOLTERO'
      },
      {
        value: 'CASADO',
        viewValue: 'CASADO'
      },
      {
        value: 'UNIÓN LIBRE',
        viewValue: 'UNIÓN LIBRE'
      }
    ],
    name: 'status'
  };
  year = {
    label: 'Seleccione',
    options: $time,
    name: 'time'
  };
  mony = {
    options: [
      {
        value: 'MENOS DE 10 MIL US$',
        viewValue: 'MENOS DE 10 MIL US$'
      },
      {
        value: '10 MIL A 30 MIL US$',
        viewValue: '10 MIL A 30 MIL US$'
      },
      {
        value: '30 MIL A 50 MIL US$',
        viewValue: '30 MIL A 50 MIL US$'
      },
      {
        value: 'MÁS DE 50 MIL US$',
        viewValue: 'MÁS DE 50 MIL US$'
      },
    ]
  };
  dependentFormGroup = {
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    family: ['', Validators.required],
    weightUnit: ['', Validators.required],
    heightUnit: ['', Validators.required],
    weight: ['', [Validators.required, Validators.min(0)]],
    date: ['', Validators.required],
    height: ['', [Validators.required, Validators.min(0)]],
    sex: ['', Validators.required],
    id2: ['', Validators.required],
    idType: ['', Validators.required],
    nationality: ['', Validators.required],
    age: [{ value: '', disabled: true }, Validators.required],
    bmi: [{ value: '', disabled: true }, Validators.required],
    haveMusculoskeletal: [false, Validators.required],
    haveCerebrovascular: [false, Validators.required],
    haveNervousSystem: [false, Validators.required],
    haveVisionHearing: [false, Validators.required],
    haveCardiovascularSystem: [false, Validators.required],
    haveRespiratorySystem: [false, Validators.required],
    haveDigestiveSystem: [false, Validators.required],
    haveUrinarySystem: [false, Validators.required],
    haveMaleReproductiveOrgans: [false, Validators.required],
    haveBloodDisorders: [false, Validators.required],
    haveEndocrineDisorders: [false, Validators.required],
    haveAlternateTreatment: [false, Validators.required],
    haveFunctionalLimitation: [false, Validators.required],
    haveDeformity: [false, Validators.required],
    haveBloodTransfusion: [false, Validators.required],
    haveAlcoholicDependence: [false, Validators.required],
    haveNicotine: [false, Validators.required],
    haveStd: [false, Validators.required],
    havePhysiologicalDisorder: [false, Validators.required],
    haveHighRiskSport: [false, Validators.required],
    havePregnant: [false, Validators.required],
    haveReproductiveOrganDisorders: [false, Validators.required],
    isBmiEventAssigned: [false, Validators.required]
  };
  questionsGroup = {
    question: ['', Validators.required],
    answer: [false, Validators.required],
  };
  familyControl = new FormControl('', Validators.required);
  reasonControl = new FormControl('', Validators.required);

  timeQuestionGroup = {
    question: ['', Validators.required],
    answer: [false, Validators.required],
    dailyAmount: ['', Validators.required],
    numberTime: ['', Validators.required],
    time: ['', Validators.required],
  };
  DateQuestionGroup = {
    question: ['', Validators.required],
    answer: [false, Validators.required],
    date: ['', Validators.required],
    description: ['', Validators.required],
  };
  pregnant = {
    question: ['', Validators.required],
    answer: [false, Validators.required],
    time: ['', Validators.required],
  };
  procedures;
  formGroupProcedure = {
    patientsName: ['', Validators.required],
    procedures: ['', Validators.required],
    date: ['', Validators.required],
    treatment: ['', Validators.required],
    duration: ['', Validators.required],
    time: ['', Validators.required],
    providerName: ['', Validators.required],
    providerDirection: ['', Validators.required]
  };
  primaryBenefits = {
    name: ['', Validators.required],
    date: ['', Validators.required],
    id2: ['', Validators.required],
    idType: ['', Validators.required],
    id2Attached: [''],
    nationality: ['', Validators.required],
    ocupation: ['', Validators.required],
    family: ['', Validators.required],
    quantity: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
  };

  contigentBenefits = {
    name: [''],
    date: [''],
    id2: [''],
    idType: [''],
    id2Attached: [''],
    nationality: [''],
    ocupation: [''],
    family: [''],
    quantity: ['', [Validators.min(1), Validators.max(100)]]
  };

  musculoSkeletalAilment = $musculoSkeletalAilment;
  cardiovascularSystemAilment = $cardiovascularSystemAilment;
  nervousSystemAilment = $nervousSystemAilment;
  visionHearingAilment = $visionHearingAilment;
  respiratorySystemAilment = $respiratorySystemAilment;
  digestiveSystemAilment = $digestiveSystemAilment;
  maleReproductiveOrgansAilment = $maleReproductiveOrgansAilment;
  bloodDisordersAilment = $bloodDisordersAilment;
  endocrineDisordersAilment = $endocrineDisordersAilment;
  alternateTreatmentAilment = $alternateTreatmentAilment;
  functionalLimitationAilment = $functionalLimitationAilment;
  deformityAilment = $deformityAilment;
  stdAilment = $stdAilment;
  urinarySystemAilment = $urinarySystemAilment;
  cerebroVascularAilment = $cerebroVascularAilment;
  reproductiveOrganDisordersAilment = $reproductiveOrganDisordersAilment;

  isActualSmoker: FieldConfig = {
    label: '¿Es fumador o ex-fumador?',
    options: [
      {
        value: 'FUMADOR',
        viewValue: 'FUMADOR'
      },
      {
        value: 'EX-FUMADOR',
        viewValue: 'EX-FUMADOR'
      }
    ]
  };

  whichStudyArray = {
    label: '¿Cuál?',
    options: [
      {
        value: 'HEMOGRAMA',
        viewValue: 'HEMOGRAMA'
      },
      {
        value: 'ELECTROCARDIOGRAMA',
        viewValue: 'ELECTROCARDIOGRAMA'
      },
      {
        value: 'RAYOS X',
        viewValue: 'RAYOS X'
      },
      {
        value: 'ENDOSCOPIA',
        viewValue: 'ENDOSCOPIA'
      },
      {
        value: 'ULTRASONIDO',
        viewValue: 'ULTRASONIDO'
      },
      {
        value: 'SCAN',
        viewValue: 'SCAN'
      },
      {
        value: 'RESONANCIA MAGNÉTICA',
        viewValue: 'RESONANCIA MAGNÉTICA'
      },
      {
        value: 'OTROS',
        viewValue: 'OTROS'
      }
    ],
    name: 'whichStudy'
  };

  allFamily = $allFamily;
  TitleConozcaClienteAsegurado = 'Conoca Su Cliente (Asegurado)';
  TitleConozcaClienteContratante = 'Conoca Su Cliente (Contratante)';
  haveSomeone = {
    haveMusculoskeletal: '',
    haveCerebrovascular: '',
    haveNervousSystem: '',
    haveVisionHearing: '',
    haveCardiovascularSystem: '',
    haveRespiratorySystem: '',
    haveDigestiveSystem: '',
    haveUrinarySystem: '',
    haveMaleReproductiveOrgans: '',
    haveBloodDisorders: '',
    haveEndocrineDisorders: '',
    haveAlternateTreatment: '',
    haveFunctionalLimitation: '',
    haveDeformity: '',
    haveBloodTransfusion: '',
    haveAlcoholicDependence: '',
    haveNicotine: '',
    haveStd: '',
    havePhysiologicalDisorder: '',
    haveHighRiskSport: '',
    havePregnant: '',
    haveReproductiveOrganDisorders: '',
  };

  ID = null;
  noCotizacion = null;
  policy: FormGroup;
  isFormValidToFill = false;
  isNotValidToSearch = true;
  role = '';

  isContractor = true;
  isJuridica = false;
  isSolicitantePep = true;
  isContractorPep = true;
  notFoundQuote = false;

  filesDocumentsKnowClientArray: FormArray;
  arrayFilesTitlesDocumentsKnowClient = [];
  filesCopyIdArray: FormArray;
  arrayFilesTitlesCopyId = [];
  mercantileRegisterArray: FormArray;
  arrayFilesTitlesMercantile = [];

  @ViewChild('form', { static: false }) ogForm;
  step: number;

  searchQuote(noCotizacion) {
    if (noCotizacion !== undefined && noCotizacion !== '') {
      this.getDataCotizaciones(noCotizacion);
    }
  }
  ngOnInit() {
    // this.userService.getWholeQuotes()
    //   .subscribe(res => {
    //     console.log(res);
    //   });

    // this.role = this.userService.getRoleCotizador();
    this.isFormValidToFill = false;
    this.route.params.subscribe(res => {
      this.ID = res.key;
    });
    this.route.params.subscribe(res => {
      this.noCotizacion = res.noCotizacion;
    });
    console.log(this.noCotizacion);

    this.procedures = this.fb.array([this.formMethods.createItem(this.formGroupProcedure)]);

    this.newRequest = this.fb.group({

      noC: [{ value: this.noCotizacion, disabled: (this.noCotizacion === null ? false : true) }, Validators.required],
      isComplete: [false, Validators.required],
      deducibles: [{ value: '', disabled: false }, Validators.required],
      payment: [{ value: '', disabled: false }, Validators.required],
      plans: [{ value: '', disabled: false }, Validators.required],
      requestType: ['', Validators.required],
      person: this.fb.group({
        // conozcaSuClientePersona: this.fb.group({}),
        firstName: ['', Validators.required],
        secondName: [''],
        lastName: ['', Validators.required],
        weightUnit: ['', Validators.required],
        heightUnit: ['', Validators.required],
        date: [{ value: '', disabled: false }, Validators.required],
        sex: [{ value: '', disabled: false }, Validators.required],
        pep_radio_insured: ['', Validators.required],
        isContractor: ['', Validators.required],
        // isJuridica: ['', Validators.required],
        nationality: ['', Validators.required],
        idType: ['', Validators.required],
        id2: ['', Validators.required],
        age: [{ value: '', disabled: false }, Validators.required],
        weight: ['', Validators.required],
        height: ['', Validators.required],
        bmi: [{ value: '', disabled: true }, Validators.required],
        status: ['', Validators.required],
        countryOfResidence: ['', Validators.required],
        countryOfBirth: ['', Validators.required],
        city: ['', Validators.required],
        direction: ['', Validators.required],
        tel: [''],
        cel: ['', Validators.required],
        officeTel: [''],
        email: ['', [Validators.required, Validators.email]],
        office: this.fb.group({
          company: [''],
          position: [''],
          direction: [''],
          economicActivity: [''],
          sector: [''],
          city: [''],
          country: [''],
        })
      }),
      contractor: this.fb.group({
        // conozcaSuClientePersonaJuridica: this.fb.group({}),
        // conozcaSuClientePersona: this.fb.group({}),
        firstName: ['', Validators.required],
        secondName: [''],
        lastName: ['', Validators.required],
        date: ['', Validators.required],
        sex: ['', Validators.required],
        nationality: ['', Validators.required],
        idType: ['', Validators.required],
        id2: ['', Validators.required],
        age: [{ value: '', disabled: false }, Validators.required],
        weight: ['', Validators.required],
        height: ['', Validators.required],
        weightUnit: ['', Validators.required],
        heightUnit: ['', Validators.required],
        bmi: [{ value: '', disabled: true }, Validators.required],
        status: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
        direction: ['', Validators.required],
        tel: [''],
        cel: ['', Validators.required],
        officeTel: [''],
        fax: [''],
        email: ['', [Validators.required, Validators.email]],
        office: this.fb.group({
          company: [''],
          position: [''],
          direction: [''],
          economicActivity: [''],
          sector: [''],
          city: [''],
          country: [''],
        })
        /*societyName: ['', Validators.required],
        commercialName: [''],
        taxpayerNumber: ['', Validators.required],
        socialHome: [''],
        tel: ['', Validators.required],
        email: ['', Validators.required],
        commercialActivity: ['', Validators.required],
        // requestType: ['', Validators.required],
        legalRepresentation: this.fb.group({
          name: ['', Validators.required],
          position: ['', Validators.required],
          nationality: ['', Validators.required],
          idType: ['', Validators.required],
          id2: ['', Validators.required],
          policy: [''],
          email: ['', Validators.required]
        })*/
      }),
      exposedPerson: this.fb.group({
        headLine: ['', Validators.required],

      }),
      incomes: this.fb.group({
        principalIncome: ['', Validators.required],
        otherIncomes: ['', Validators.required],
      }),
      dependents: this.fb.group({
        allDependents: this.fb.array([]),
        students: this.fb.array([]),
      }),
      questionsA: this.fb.group({
        haveMusculoskeletal: [false, Validators.required],
        haveCerebrovascular: [false, Validators.required],
        haveNervousSystem: [false, Validators.required],
        haveVisionHearing: [false, Validators.required],
        haveCardiovascularSystem: [false, Validators.required],
        haveRespiratorySystem: [false, Validators.required],
        haveDigestiveSystem: [false, Validators.required],
        haveUrinarySystem: [false, Validators.required],
        haveMaleReproductiveOrgans: [false, Validators.required],
        haveBloodDisorders: [false, Validators.required],
        haveEndocrineDisorders: [false, Validators.required],
        haveAlternateTreatment: [false, Validators.required],
        haveFunctionalLimitation: [false, Validators.required],
        haveDeformity: [false, Validators.required],
        haveBloodTransfusion: [false, Validators.required],
        haveAlcoholicDependence: [false, Validators.required],
        haveNicotine: [false, Validators.required],
        haveStd: [false, Validators.required],
        havePhysiologicalDisorder: [false, Validators.required],
        haveHighRiskSport: [false, Validators.required],
        havePregnant: [false, Validators.required],
        haveReproductiveOrganDisorders: [false, Validators.required],
        questionnairesGastosMayores: this.fb.group({}),
      }),
      questionsB: this.fb.group({
        haveConsultedForUnmentioned: ['', Validators.required],
        haveAlterationForUnmentioned: ['', Validators.required],
        haveHadExamStudiesTests: ['', Validators.required],
        // hasFamilyWithHeartKidneyDisease: ['', Validators.required],
        hasDeclinedInsuranceCompany: ['', Validators.required],
        haveHadMedicalHealthInsurance: ['', Validators.required],
        information: this.fb.array([]),
      }),
      primaryBenefits: this.fb.group({
        dependentsC: this.fb.array([this.formMethods.createItem(this.primaryBenefits)]),
        personBenefited: this.fb.group({
          name: [''],
          family: [''],
          id2: [''],
          id2Attached: [''],
          idType: [''],
        })
      }),
      contingentBeneficiary: this.fb.group({
        dependentsC: this.fb.array([this.formMethods.createItem(this.contigentBenefits)]),
        personBenefited: this.fb.group({
          name: [''],
          family: [''],
          id2: [''],
          id2Attached: [''],
          idType: [''],
        })
      }),
      files: this.fb.group({
        studies: this.fb.array([]),
      }),
      comentary: [''],
      sectionAHelper: this.fb.group({
        haveMusculoskeletal: ['', Validators.required],
        haveCerebrovascular: ['', Validators.required],
        haveNervousSystem: ['', Validators.required],
        haveVisionHearing: ['', Validators.required],
        haveCardiovascularSystem: ['', Validators.required],
        haveRespiratorySystem: ['', Validators.required],
        haveDigestiveSystem: ['', Validators.required],
        haveUrinarySystem: ['', Validators.required],
        haveMaleReproductiveOrgans: [''],
        haveBloodDisorders: ['', Validators.required],
        haveEndocrineDisorders: ['', Validators.required],
        haveAlternateTreatment: ['', Validators.required],
        haveFunctionalLimitation: ['', Validators.required],
        haveDeformity: ['', Validators.required],
        haveBloodTransfusion: ['', Validators.required],
        haveAlcoholicDependence: ['', Validators.required],
        haveNicotine: ['', Validators.required],
        haveStd: ['', Validators.required],
        havePhysiologicalDisorder: ['', Validators.required],
        haveHighRiskSport: ['', Validators.required],
        havePregnant: [''],
        haveReproductiveOrganDisorders: [''],
      })


    });

    this.contingentBeneficiaryArray = this.newRequest.get('contingentBeneficiary').get('dependentsC') as FormArray;
    this.primaryBenefitsArray = this.newRequest.get('primaryBenefits').get('dependentsC') as FormArray;
    this.studentDependents = this.newRequest.get('dependents').get('students') as FormArray;
    this.dependentsFormArray = this.newRequest.get('dependents').get('allDependents') as FormArray;
    this.questionsFormArray = this.newRequest.get('questionsA') as FormArray;
    this.questionsBFormArray = this.newRequest.get('questionsB') as FormArray;
    this.informationList = this.newRequest.get('questionsB').get('information') as FormArray;
    this.filesStudiesArray = this.newRequest.get('files').get('studies') as FormArray;

    // this.setQuestionsA();

    this.addEventChange();


    if (this.ID != null) {
      console.log('El ID es ' + this.ID);
      this.getData(this.ID);
    } else if (this.ID == null) {
      console.log('ID esta vacio');
    }

    if (this.noCotizacion != null) {
      this.getDataCotizaciones(this.noCotizacion);
      console.log('El noCotizacion es ' + this.noCotizacion);
      // this.getData(this.ID);
    } else if (this.noCotizacion == null) {
      console.log('noCotizacion esta vacio');
      this.noCotizacion = '';
    }

    this.thereIsAWomenOnTheRequest();
    this.thereIsAMenOnTheRequest();
  }

  getBmiUpdated(Form) {
    const form = Form as FormGroup;
    const weightUnit = form.get('weightUnit').value;
    const heightUnit = form.get('heightUnit').value;

    let weight = form.get('weight').value;
    let height = form.get('height').value;
    let inches;

    if (form.get('inches')) { inches = form.get('inches').value; }

    if (weightUnit === 'LIBRAS') { weight = weight / 2.205; }
    if (heightUnit === 'PIE') {
      height = (((height * 12) + inches) * 2.54) / 100;
    }
    const bmi = weight / ((height / 100) * (height * 100));

    if (bmi !== Infinity && !isNaN(bmi)) {
      const value = parseFloat(`${bmi}`).toFixed(2);
      form.get('bmi').setValue(value);
    }
  }

  onHeightUnitChange(evento, form) {
    const realForm = form as FormGroup;
    if (evento.valor === 'PIE') {
      realForm.addControl('inches', this.fb.control('', [Validators.required, Validators.min(0), Validators.max(11)]));
    } else {
      realForm.removeControl('inches');
    }

    this.getBmiUpdated(form);
  }

  onWeightUnitChange(form) {
    this.getBmiUpdated(form);
  }

  ageInputChange(event) {
    console.log(event);
  }

  whichStudyWatcher(form, event) {
    console.log(form, event.valor);

    if (event.valor === 'OTROS') {
      form.addControl('specifyStudy', this.fb.control('', Validators.required));
    } else {
      form.removeControl('specifyStudy');
    }
  }

  addEventChange() {
    this.newRequest.get('person').get('weightUnit').valueChanges.subscribe(value => {
      this.getBmi(this.newRequest.get('person').value.height, this.newRequest.get('person').value.weight);
    });
    this.newRequest.get('person').get('heightUnit').valueChanges.subscribe(value => {
      this.getBmi(this.newRequest.get('person').value.height, this.newRequest.get('person').value.weight);
    });
    this.newRequest.get('person').get('weight').valueChanges.subscribe(value => {
      this.getBmi(this.newRequest.get('person').value.height, value);
    });
    this.newRequest.get('noC').valueChanges.subscribe(value => {
      if (value !== '' && value !== undefined) {
        this.isNotValidToSearch = false;
      } else {
        this.isNotValidToSearch = true;
      }
    });
    this.newRequest.get('person').get('height').valueChanges.subscribe(value => {
      this.getBmi(value, this.newRequest.get('person').value.weight);
    });

    this.newRequest.get('person').get('date').valueChanges.subscribe(value => {
      const timeDiff = Math.abs(Date.now() - new Date(value).getTime());
      const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      if (value !== '' && value !== undefined && value !== null) {
        this.newRequest.get('person').get('age').setValue(age);
      }
    });

    this.newRequest.get('person').get('age').valueChanges.subscribe(value => {
      if (value >= 50 && this.newRequest.get('person').get('sex').value === 'MASCULINO') {
        this.questionnairesGastosMayores.addControl('solicitudProstatica', this.fb.group({}));
      } else {
        this.questionnairesGastosMayores.removeControl('solicitudProstatica');
      }
    });

    this.newRequest.get('person').get('sex').valueChanges.subscribe(value => {
      if (value === 'MASCULINO' && this.newRequest.get('person').get('age').value >= 50) {
        this.questionnairesGastosMayores.addControl('solicitudProstatica', this.fb.group({}));
      } else {
        this.questionnairesGastosMayores.removeControl('solicitudProstatica');
      }
    });

    this.isContractor = false;
    this.newRequest.get('person').get('isContractor').valueChanges.subscribe(value => {

      this.isContractor = true;
      if (value === 'SI') {
        this.isContractor = false;
        this.titles = FormValidationsConstant.titlesForMajorExpenses;
      } else {
        this.titles = FormValidationsConstant.titlesForMajorExpensesComplete;
      }
    });
    this.isContractorPep = false;
    // this.newRequest.get('exposedPerson').get('contractor').valueChanges.subscribe(value => {

    //   this.isContractorPep = false;
    //   if (value === 'SI') {
    //     this.isContractorPep = true;
    //   }

    // });

    this.isSolicitantePep = false;
    this.newRequest.get('exposedPerson').get('headLine').valueChanges.subscribe(value => {

      this.isSolicitantePep = false;
      if (value === 'SI') {
        this.isSolicitantePep = true;
      }

    });
    if (this.newRequest.get('person').get('isJuridica')) {
      this.isJuridica = false;
      this.newRequest.get('person').get('isJuridica').valueChanges.subscribe(value => {
        this.isJuridica = false;
        console.log(value);
        if (value === 'SI') {

        } else {
        }

      });
    }

  }
  searchIdNumber(idNumber: string) {
    this.appComponent.showOverlay = true;

    this.quotesService.returnDataSalud(idNumber).subscribe(data => {
      this.appComponent.showOverlay = false;

      if (data !== undefined && data.data !== null && data.data !== undefined && data.data.nombre !== undefined) {
        const dialogRef = this.dialog.open(BaseDialogComponent, {
          data: this.dialogOption.noCFound(data.data),
          minWidth: 385,
        });
        setTimeout(() => {
          dialogRef.close();
        }, 4000);
        this.isFormValidToFill = true;
        this.notFoundQuote = false;

        this.newRequest.get('payment').setValue(this.currencyPipe.transform(data.data.monto));
        this.newRequest.get('plans').setValue(data.data.plan);
        this.newRequest.get('deducibles').setValue(data.data.deducible);
        this.newRequest.get('person').get('date').setValue(data.data.fecha_nacimiento);
        this.newRequest.get('person').get('firstName').setValue(data.data.nombre);
        this.newRequest.get('person').get('lastName').setValue(data.data.apellidos);

        switch (data.data.sexo) {
          case 'M':
            this.newRequest.get('person').get('sex').setValue('MASCULINO');
            break;

          case 'F':
            this.newRequest.get('person').get('sex').setValue('FEMENINO');
            break;

          default:
            break;
        }

      } else {
        this.notFoundQuote = true;

        this.newRequest.get('payment').reset();
        this.newRequest.get('plans').reset();
        this.newRequest.get('deducibles').reset();
        this.newRequest.get('person').get('date').reset();
        this.newRequest.get('person').get('firstName').reset();
        this.newRequest.get('person').get('sex').reset();

        const dialogRef = this.dialog.open(BaseDialogComponent, {
          data: this.dialogOption.noCNotFound,
          minWidth: 385,
        });
        setTimeout(() => {
          dialogRef.close();
        }, 4000);
      }
    });


  }

  newQuote() {
    if (this.userService.getRoleCotizador() === 'WWS') {
      window.open(`${environment.urlCotizadoresSalud}?cia=wws`, '_blank');
    } else if (this.userService.getRoleCotizador() === 'WMA') {
      window.open(`${environment.urlCotizadoresSalud}?cia=wwm`, '_blank');
    }
  }
  canDeactivate(): Observable<boolean> | boolean {
    if (this.ogForm.submitted) {
      return true;
    }

    if (this.newRequest.dirty && !this.ogForm.submitted) {
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

  onStudiesChange(event, i) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.newRequest.get('files').get('studies').get(i.toString()).patchValue({
          ['study']: reader.result
        });

        this.cd.markForCheck();
      };
    }
  }

  onStudiesChange2(event, i, name) {

    if (name == 'documentsKnowClient') {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.newRequest.get('files').get('documentsKnowClient').get(i.toString()).patchValue({
            ['document']: reader.result
          });

          // this.markForCheck();
        };
      }
    } else if (name == 'copyId') {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.newRequest.get('files').get('copyId').get(i.toString()).patchValue({
            ['idId']: reader.result
          });

          // this.markForCheck();
        };
      }
    } else if (name == 'mercantile') {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.newRequest.get('files').get('mercantile').get(i.toString()).patchValue({
            ['register']: reader.result
          });

          // this.markForCheck();
        };
      }
    }
  }

  onBeneficiaryFileChangeOnArray(event, formName, i?: number, group?: string) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (i !== null) {
          this.newRequest.get(group).get('dependentsC').get(i.toString()).patchValue({
            [formName]: reader.result
          });
        } else {
          this.newRequest.get(group).get('personBenefited').patchValue({
            [formName]: reader.result
          });
        }

        this.cd.markForCheck();
      };
    }
  }

  canShow(questionName: string) {
    if (questionName === 'havePregnant' && this.isThereAWomen === true) {
      return true;
    } else if (questionName === 'haveReproductiveOrganDisorders' && this.isThereAWomen === true) {
      return true;
    } else if ((questionName === 'havePregnant' || questionName === 'haveReproductiveOrganDisorders') && this.isThereAWomen === false) {
      return false;
    } else {
      return true;
    }
  }

  canPersonOptionShow(questionName: string) {
    const isWomen = this.newRequest.get('person').value.sex === 'FEMENINO';

    if (questionName === 'havePregnant' && isWomen === true) {
      return true;
    } else if (questionName === 'haveReproductiveOrganDisorders' && isWomen === true) {
      return true;
    } else if ((questionName === 'havePregnant' || questionName === 'haveReproductiveOrganDisorders') && isWomen === false) {
      return false;
    } else {
      return true;
    }
  }

  canDependentOptionShow(questionName: string, id: number) {
    const isWomen = this.newRequest.get('dependents').get('allDependents').value[id].sex === 'FEMENINO';
    if (questionName === 'havePregnant' && isWomen === true) {
      return true;
    } else if (questionName === 'haveReproductiveOrganDisorders' && isWomen === true) {
      return true;
    } else if ((questionName === 'havePregnant' || questionName === 'haveReproductiveOrganDisorders') && isWomen === false) {
      return false;
    } else {
      return true;
    }
  }

  thereIsAWomenOnTheRequest() {
    console.log('thereIsAMenOnTheRequest');

    let womenCount = 0;
    this.cd.detectChanges();

    setTimeout(() => {
      for (const idx in this.newRequest.get('dependents').get('allDependents').value) {
        if (this.newRequest.get('dependents').get('allDependents').value.hasOwnProperty(idx)) {
          const element = this.newRequest.get('dependents').get('allDependents').value[idx];
          console.log(element.sex);
          if (element.sex === 'FEMENINO') {
            womenCount += 1;
          }
        }
      }

      console.log(this.newRequest.value.person.sex);
      if (this.newRequest.get('person').get('sex').value === 'FEMENINO') {
        womenCount += 1;
      }

      if (womenCount > 0) {
        console.log('Hay mujer');
        this.isThereAWomen = true;
      } else {
        this.isThereAWomen = false;
      }
    }, 1500);

  }

  thereIsAMenOnTheRequest() {
    console.log('thereIsAMenOnTheRequest');
    let menCount = 0;
    this.cd.detectChanges();

    setTimeout(() => {
      for (const idx in this.newRequest.get('dependents').get('allDependents').value) {
        if (this.newRequest.get('dependents').get('allDependents').value.hasOwnProperty(idx)) {
          const element = this.newRequest.get('dependents').get('allDependents').value[idx];
          console.log(element.sex);
          if (element.sex === 'MASCULINO') {
            menCount += 1;
          }
        }
      }

      console.log(this.newRequest.value.person.sex);
      if (this.newRequest.get('person').get('sex').value === 'MASCULINO') {
        menCount += 1;
      }

      if (menCount > 0) {
        console.log('Hay men');
        this.isThereAMen = true;
      } else {
        this.isThereAMen = false;
      }
    }, 1500);

  }

  relationWatcher(event, realForm) {
    console.log('event: ', event.valor, 'form: ', realForm);
    const form = realForm as FormGroup;
    if (event.valor === 'OTROS') {
      form.addControl('specifyRelationship', this.fb.control('', Validators.required));
    } else {
      form.removeControl('specifyRelationship');
    }
  }

  showWarningDot(Form: any): boolean {
    if (!this.ID) {
      if (!Form.valid && this.ogForm.submitted) {
        return true;
      } else {
        return false;
      }
    } else {
      if (Form.valid) {
        return false;
      } else {
        return true;
      }
    }
  }

  ngDoCheck() { }

  add(dependentsFormArray, group) {

    const increment = dependentsFormArray.length + 1;
    dependentsFormArray = this.formMethods.addElement(dependentsFormArray, increment, group).formArray;


    this.AddEventOnEachDependentVariable();
  }
  AddEventOnEachDependentVariable() {
    /*for(let index = 0;index < this.newRequest.get('dependents').get('allDependents').length;index++)
    {
      console.log(index);
    }*/
    // for(let index in this.dependentsFormArray.controls)
    if (this.newRequest.get('dependents').get('allDependents') !== undefined && this.newRequest.get('dependents').get('allDependents') !== null) {
      const arrayElement = this.newRequest.get('dependents').get('allDependents') as FormArray;
      for (let index = 0; index < arrayElement.length; index++) {

        // tslint:disable-next-line: max-line-length
        const isBmiEventAssigned = this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('isBmiEventAssigned').value;

        if (isBmiEventAssigned == false) {
          this.newRequest
            .get('dependents')
            .get('allDependents')
            .get(index.toString())
            .get('isBmiEventAssigned')
            .setValue(true);
          this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('date').valueChanges.subscribe(value => {
            const timeDiff = Math.abs(Date.now() - new Date(value).getTime());
            const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
            this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('age').setValue(age);
            // questionnaire.addControl('solicitudProstatica', this.fb.group({}));

            const form = this.newRequest.get('dependents').get('allDependents').get(index.toString()) as FormGroup;
            if (age >= 50 && form.get('sex').value === 'MASCULINO') {
              form.addControl('solicitudProstatica', this.fb.group({}));
            } else {
              form.removeControl('solicitudProstatica');
            }
          });
          this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('sex').valueChanges.subscribe(value => {
            const form = this.newRequest.get('dependents').get('allDependents').get(index.toString()) as FormGroup;
            if (form.get('age').value >= 50 && value === 'MASCULINO') {
              form.addControl('solicitudProstatica', this.fb.group({}));
            } else {
              form.removeControl('solicitudProstatica');
            }
          });
          this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('height').valueChanges.subscribe(value => {
            const weight = this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('weight').value;
            const heightUnit = this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('heightUnit').value;
            const weightUnit = this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('weightUnit').value;

            const result = this.getBmiValue(value, weight, weightUnit, heightUnit);
            this.newRequest
              .get('dependents')
              .get('allDependents')
              .get(index.toString())
              .get('bmi')
              .setValue(result);

          });
          this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('weight').valueChanges.subscribe(value => {
            const height = this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('height').value;
            const heightUnit = this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('heightUnit').value;
            const weightUnit = this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('weightUnit').value;
            const result = this.getBmiValue(height, value, weightUnit, heightUnit);
            this.newRequest
              .get('dependents')
              .get('allDependents')
              .get(index.toString())
              .get('bmi')
              .setValue(result);

          });

          this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('heightUnit').valueChanges.subscribe(value => {
            const height = this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('height').value;
            const weight = this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('weight').value;
            const weightUnit = this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('weightUnit').value;
            const result = this.getBmiValue(height, weight, weightUnit, value);
            this.newRequest
              .get('dependents')
              .get('allDependents')
              .get(index.toString())
              .get('bmi')
              .setValue(result);

          });

          this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('weightUnit').valueChanges.subscribe(value => {
            const height = this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('height').value;
            const weight = this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('weight').value;
            const heightUnit = this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('heightUnit').value;
            const result = this.getBmiValue(height, weight, value, heightUnit);
            this.newRequest
              .get('dependents')
              .get('allDependents')
              .get(index.toString())
              .get('bmi')
              .setValue(result);

          });
        } else {
          this.newRequest
            .get('dependents')
            .get('allDependents')
            .get(index.toString())
            .get('isBmiEventAssigned')
            .setValue(true);
        }
      }

    }
  }
  getBmiValue(height: any, weight: any, typeWeight: any, typeHeight: any) {
    if (height !== '' && weight !== '') {
      if (typeWeight === 'LIBRAS') { weight = weight / 2.205; }
      if (typeHeight === 'PIE') {
        height = height / 3.281;
      }
      const bmi = weight / ((height / 100) * (height / 100));

      if (bmi !== Infinity) {
        const value = parseFloat(`${bmi}`).toFixed(2);
        return value;
      }

    }
    return 0;
  }
  isBenefitMinorThan100(group: string, subgroup: string): boolean {
    const form = this.newRequest.get(group).get(subgroup) as FormGroup;

    if (this.benefitFor(form).total < 100 && this.benefitFor(form).isDirty) { return true; } else { return false; }
  }

  isBenefitMajorThan100(group: string, subgroup: string): boolean {
    const form = this.newRequest.get(group).get(subgroup) as FormGroup;

    if (this.benefitFor(form).total > 100 && this.benefitFor(form).isDirty) { return true; } else { return false; }
  }

  benefitFor(form: FormGroup) {
    let total = 0;
    let isDirty = false;

    // tslint:disable-next-line: forin
    for (const dpd in form.value) {
      if (form.controls[dpd].dirty) { isDirty = true; }
      total += form.value[dpd].quantity;

    }
    return { total, isDirty };
  }

  // setQuestionsA(){
  //   this.questions.forEach((question,index)=> {
  //     if(index > 0){
  //       if(question.time){
  //         this.add(this.questionsFormArray,this.timeQuestionGroup);
  //       }
  //       else if(question.date){
  //         this.add(this.questionsFormArray,this.DateQuestionGroup);

  //       }else if(question.pregnant){
  //         this.add(this.questionsFormArray,this.pregnant);
  //       }
  //       else{
  //         this.add(this.questionsFormArray,this.questionsGroup);
  //       }
  //     }
  //   });
  // }

  proceduresFormGroup(index, i) {
    return this.newRequest.get('questionsB').get(index.toString()).get('procedures').get(i.toString()) as FormGroup;
  }

  form(): FormGroup {
    return this.fb.group(this.formGroupProcedure);
  }
  addprocedures() {
    this.proceduresArray.push(this.form());
    this.proceduresArray.updateValueAndValidity();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep(panel?: string) {
    this.step++;
  }

  selectChange(event) {
    const formGeneral = this.newRequest as FormGroup;
    const formContractor = this.newRequest.get('contractor') as FormGroup;
    const questionsForm = this.newRequest.get('questionsA') as FormGroup;
    const questionsBForm = this.newRequest.get('questionsB') as FormGroup;
    const mhiForm = this.newRequest.get('questionsB').get('medicalHealthInsurance') as FormGroup;
    const exposedPersonForm = this.newRequest.get('exposedPerson') as FormGroup;
    const formP = this.newRequest.get('person') as FormGroup;
    const formEP = this.newRequest.get('exposedPerson') as FormGroup;
    const formFiles = this.newRequest.get('files') as FormGroup;
    console.log(event);
    this.isJuridica = false;

    if (event.valor === 'SI' || event.valor === 'SI') {
      switch (event.name) {
        case 'isContractor':
          // formP.removeControl('isJuridica');
          // formEP.removeControl('contractor');

          // if (formContractor.get('conozcaSuClientePersona')) {
          //   formContractor.removeControl('conozcaSuClientePersona');
          // }
          // if (formGeneral.get('contractor')) {
          //   formGeneral.removeControl('contractor');
          // }
          // if (formContractor.get('conozcaSuClientePersonaJuridica')) {
          //   formContractor.removeControl('conozcaSuClientePersonaJuridica');
          // }

          formP.addControl('isJuridica', this.fb.control('', Validators.required));
          if (formEP) {
            formEP.addControl('contractor', this.fb.control('', Validators.required));
          }
          if (!formGeneral.get('contractor')) {
            formGeneral.addControl('contractor', this.fb.group({
              // conozcaSuClientePersonaJuridica: this.fb.group({}),
              // conozcaSuClientePersona: this.fb.group({}),
              firstName: ['', Validators.required],
              secondName: [''],
              lastName: ['', Validators.required],
              date: ['', Validators.required],
              sex: ['', Validators.required],
              nationality: ['', Validators.required],
              idType: ['', Validators.required],
              id2: ['', Validators.required],
              age: [{ value: '', disabled: false }, Validators.required],
              weight: ['', Validators.required],
              height: ['', Validators.required],
              weightUnit: ['', Validators.required],
              heightUnit: ['', Validators.required],
              bmi: [{ value: '', disabled: true }, Validators.required],
              status: ['', Validators.required],
              country: ['', Validators.required],
              city: ['', Validators.required],
              direction: ['', Validators.required],
              tel: [''],
              cel: ['', Validators.required],
              officeTel: [''],
              fax: [''],
              email: ['', [Validators.required, Validators.email]],
              office: this.fb.group({
                company: [''],
                position: [''],
                direction: [''],
                economicActivity: [''],
                sector: [''],
                city: [''],
                country: [''],
              })
              /*societyName: ['', Validators.required],
              commercialName: [''],
              taxpayerNumber: ['', Validators.required],
              socialHome: [''],
              tel: ['', Validators.required],
              email: ['', Validators.required],
              commercialActivity: ['', Validators.required],
              // requestType: ['', Validators.required],
              legalRepresentation: this.fb.group({
                name: ['', Validators.required],
                position: ['', Validators.required],
                nationality: ['', Validators.required],
                idType: ['', Validators.required],
                id2: ['', Validators.required],
                policy: [''],
                email: ['', Validators.required]
              })*/
            }));
          } else {
            console.log('Ya existe, por tanto no hay que crear a contractor de nuevo.');
          }

          this.newRequest.get('person').get('office').get('company').clearValidators();
          this.newRequest.get('person').get('office').get('company').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('company').markAsUntouched();

          this.newRequest.get('person').get('office').get('position').clearValidators();
          this.newRequest.get('person').get('office').get('position').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('position').markAsUntouched();

          this.newRequest.get('person').get('office').get('direction').clearValidators();
          this.newRequest.get('person').get('office').get('direction').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('direction').markAsUntouched();

          this.newRequest.get('person').get('office').get('economicActivity').clearValidators();
          this.newRequest.get('person').get('office').get('economicActivity').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('economicActivity').markAsUntouched();

          this.newRequest.get('person').get('office').get('sector').clearValidators();
          this.newRequest.get('person').get('office').get('sector').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('sector').markAsUntouched();

          this.newRequest.get('person').get('office').get('city').clearValidators();
          this.newRequest.get('person').get('office').get('city').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('city').markAsUntouched();

          this.newRequest.get('person').get('office').get('country').clearValidators();
          this.newRequest.get('person').get('office').get('country').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('country').markAsUntouched();

          break;

        case 'isJuridica':

          if (formGeneral.get('contractor')) {
            formGeneral.removeControl('contractor');
          }
          if (this.newRequest.get('conozcaSuClientePersonaContratante')) {
            formGeneral.removeControl('conozcaSuClientePersonaContratante');
          }
          if (!(this.newRequest.get('conozcaSuClientePersonaJuridica'))) {
            formGeneral.addControl('conozcaSuClientePersonaJuridica', this.fb.group({}));
          }
          // formContractor.addControl('conozcaSuClientePersonaJuridica', this.fb.group({}));

          if (this.newRequest.get('files').get('copyId')) {
            formFiles.removeControl('copyId');
          }
          formP.addControl('mandatorySubject', this.fb.control('', Validators.required));

          console.log('entro');
          this.isJuridica = true;
          this.titles = FormValidationsConstant.titlesForMajorExpenses;
          break;

        case 'contractor':
          exposedPersonForm.addControl('contractorExposedInfo', this.fb.group({
            lastPosition: ['', Validators.required],
            time: ['', Validators.required],
            timeNumber: ['', [Validators.required, Validators.min(1)]]
          }));
          formGeneral.addControl('conozcaSuClientePersonaContratante', this.fb.group({}));
          break;
        // Si
        case 'headLine':
          exposedPersonForm.addControl('headLineExposedInfo', this.fb.group({
            lastPosition: ['', Validators.required],
            time: ['', Validators.required],
            timeNumber: ['', [Validators.required, Validators.min(1)]]
          }));

          formGeneral.addControl('conozcaSuClientePersona', this.fb.group({}));
          break;

        case 'hasDeclinedInsuranceCompany':
          questionsBForm.addControl('declinedInsuranceInformation', this.fb.group({
            reason: ['', Validators.required],
          }));
          break;

        case 'didReclamation':
          mhiForm.addControl('reclamationInfo', this.fb.control('', Validators.required));
          break;

        case 'haveHadMedicalHealthInsurance':
          questionsBForm.addControl('medicalHealthInsurance', this.fb.group({
            companyName: ['', Validators.required],
            policeNo: ['', Validators.required],
            insureName: ['', Validators.required],
            insuranceCompany: ['', Validators.required],
            policeType: ['', Validators.required],
            emitionDate: ['', Validators.required],
            isItCurrent: ['', Validators.required],
            didReclamation: ['', Validators.required],
          }));
          break;

        case 'hasFamilyWithHeartKidneyDisease':
          questionsBForm.addControl('familyWithDiseases', this.fb.array([this.createFormArray('haveDisease')]));
          this.familyWithDiseasesList = questionsBForm.get('familyWithDiseases') as FormArray;
          break;

        case 'haveConsultedForUnmentioned':
          questionsBForm.addControl('consultedForUnmentioned', this.fb.array([this.createFormArray('medicInformation')]));
          break;

        case 'haveAlterationForUnmentioned':
          questionsBForm.addControl('alterationForUnmentioned', this.fb.array([this.createFormArray('medicInformation')]));
          break;

        case 'haveHadExamStudiesTests':
          questionsBForm.addControl('specializedTests', this.fb.array([this.createFormArray('specializedTests')]));
          break;

        case 'pep_radio_insured':

          this.newRequest.addControl('exposedPerson', this.fb.group({
            headLine: ['', Validators.required],

          }));
          if (formContractor) {
            const formEP2 = this.newRequest.get('exposedPerson') as FormGroup;

            formEP2.addControl('contractor', this.fb.control('', Validators.required));
          }
          if (!(this.newRequest.get('files').get('documentsKnowClient'))) {
            formFiles.addControl('documentsKnowClient', this.fb.array([this.createFormArray('filesDocumentsKnowClient')]));
            this.filesDocumentsKnowClientArray = this.newRequest.get('files').get('documentsKnowClient') as FormArray;
          } else if (this.newRequest.get('files').get('documentsKnowClient')) {
            formFiles.removeControl('documentsKnowClient');
            formFiles.addControl('documentsKnowClient', this.fb.array([this.createFormArray('filesDocumentsKnowClient')]));
            this.filesDocumentsKnowClientArray = this.newRequest.get('files').get('documentsKnowClient') as FormArray;
          }

          break;

        case 'mandatorySubject':
          /* if (!(this.newRequest.get('conozcaSuClientePersonaJuridica'))) {
             formGeneral.addControl('conozcaSuClientePersonaJuridica', this.fb.group({}));
           }*/
          if (!(this.newRequest.get('files').get('mercantile'))) {
            formFiles.addControl('mercantile', this.fb.array([this.createFormArray('mercantileRegister')]));
            this.mercantileRegisterArray = this.newRequest.get('files').get('mercantile') as FormArray;
          } else if (this.newRequest.get('files').get('mercantile')) {
            formFiles.removeControl('mercantile');
            formFiles.addControl('mercantile', this.fb.array([this.createFormArray('mercantileRegister')]));
            this.mercantileRegisterArray = this.newRequest.get('files').get('mercantile') as FormArray;
          }
          formGeneral.addControl('antiLaundering', this.fb.group({}));
          break;

        default:
          break;
      }
    } else if (event.valor === 'NO' || event.valor === 'NO') {
      switch (event.name) {
        case 'isContractor':
          if (this.newRequest.get('conozcaSuClientePersonaContratante')) {
            formGeneral.removeControl('conozcaSuClientePersonaContratante');
          }

          // formP.addControl('isJuridica', this.fb.control('', Validators.required));
          // formEP.addControl('contractor', this.fb.control('', Validators.required));

          // if (!formGeneral.get('contractor')) {
          //   formGeneral.addControl('contractor', this.fb.group({
          //     // conozcaSuClientePersonaJuridica: this.fb.group({}),
          //     // conozcaSuClientePersona: this.fb.group({}),
          //     firstName: ['', Validators.required],
          //     secondName: [''],
          //     lastName: ['', Validators.required],
          //     date: ['', Validators.required],
          //     sex: ['', Validators.required],
          //     nationality: ['', Validators.required],
          //     idType: ['', Validators.required],
          //     id2: ['', Validators.required],
          //     age: [{ value: '', disabled: false }, Validators.required],
          //     weight: ['', Validators.required],
          //     height: ['', Validators.required],
          //     weightUnit: ['', Validators.required],
          //     heightUnit: ['', Validators.required],
          //     bmi: [{ value: '', disabled: true }, Validators.required],
          //     status: ['', Validators.required],
          //     country: ['', Validators.required],
          //     city: ['', Validators.required],
          //     direction: ['', Validators.required],
          //     tel: [''],
          //     cel: ['', Validators.required],
          //     officeTel: [''],
          //     fax: [''],
          //     email: ['', [Validators.required, Validators.email]],
          //     office: this.fb.group({
          //       company: [''],
          //       position: [''],
          //       direction: [''],
          //       economicActivity: [''],
          //       sector: [''],
          //       city: [''],
          //       country: [''],
          //     })
          //     /*societyName: ['', Validators.required],
          //     commercialName: [''],
          //     taxpayerNumber: ['', Validators.required],
          //     socialHome: [''],
          //     tel: ['', Validators.required],
          //     email: ['', Validators.required],
          //     commercialActivity: ['', Validators.required],
          //     // requestType: ['', Validators.required],
          //     legalRepresentation: this.fb.group({
          //       name: ['', Validators.required],
          //       position: ['', Validators.required],
          //       nationality: ['', Validators.required],
          //       idType: ['', Validators.required],
          //       id2: ['', Validators.required],
          //       policy: [''],
          //       email: ['', Validators.required]
          //     })*/
          //   }));

          /* if (this.newRequest.get('conozcaSuClientePersona')) {
             formGeneral.removeControl('conozcaSuClientePersona');
           }*/
          if (this.newRequest.get('files').get('copyId')) {
            formFiles.removeControl('copyId');
          }
          if ((this.newRequest.get('antiLaundering'))) {
            formGeneral.removeControl('antiLaundering');
          }
          if ((this.newRequest.get('conozcaSuClientePersonaJuridica'))) {
            formGeneral.removeControl('conozcaSuClientePersonaJuridica');
          }
          if (this.newRequest.get('person').get('mandatorySubject')) {
            formP.removeControl('mandatorySubject');
          }
          formP.removeControl('isJuridica');
          if (formEP) {
            formEP.removeControl('contractor');
            formEP.removeControl('contractorExposedInfo');
          }
          if (this.newRequest.get('files').get('mercantile')) {
            formFiles.removeControl('mercantile');
          }
          if (formGeneral.get('contractor')) {
            formGeneral.removeControl('contractor');
          }

          this.newRequest.get('person').get('office').get('company').setValidators(Validators.required);
          this.newRequest.get('person').get('office').get('company').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('company').markAsUntouched();

          this.newRequest.get('person').get('office').get('position').setValidators(Validators.required);
          this.newRequest.get('person').get('office').get('position').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('position').markAsUntouched();

          this.newRequest.get('person').get('office').get('direction').setValidators(Validators.required);
          this.newRequest.get('person').get('office').get('direction').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('direction').markAsUntouched();

          this.newRequest.get('person').get('office').get('economicActivity').setValidators(Validators.required);
          this.newRequest.get('person').get('office').get('economicActivity').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('economicActivity').markAsUntouched();

          this.newRequest.get('person').get('office').get('sector').setValidators(Validators.required);
          this.newRequest.get('person').get('office').get('sector').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('sector').markAsUntouched();

          this.newRequest.get('person').get('office').get('city').setValidators(Validators.required);
          this.newRequest.get('person').get('office').get('city').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('city').markAsUntouched();

          this.newRequest.get('person').get('office').get('country').setValidators(Validators.required);
          this.newRequest.get('person').get('office').get('country').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('country').markAsUntouched();

          break;

        case 'isJuridica':

          // formContractor.removeControl('conozcaSuClientePersonaJuridica');
          this.titles = FormValidationsConstant.titlesForMajorExpensesComplete;

          if ((this.newRequest.get('antiLaundering'))) {
            formGeneral.removeControl('antiLaundering');
          }
          if ((this.newRequest.get('conozcaSuClientePersonaJuridica'))) {
            formGeneral.removeControl('conozcaSuClientePersonaJuridica');
          }
          if (this.newRequest.get('person').get('mandatorySubject')) {
            formP.removeControl('mandatorySubject');
          }
          if (this.newRequest.get('files').get('mercantile')) {
            formFiles.removeControl('mercantile');
          }
          // formGeneral.addControl('conozcaSuClientePersona', this.fb.group({}));
          if (!(this.newRequest.get('copyId'))) {
            formFiles.addControl('copyId', this.fb.array([this.createFormArray('filesCopyId')]));
            this.filesCopyIdArray = this.newRequest.get('files').get('copyId') as FormArray;
          }
          if (!formGeneral.get('contractor')) {
            formGeneral.addControl('contractor', this.fb.group({
              // conozcaSuClientePersonaJuridica: this.fb.group({}),
              // conozcaSuClientePersona: this.fb.group({}),
              firstName: ['', Validators.required],
              secondName: [''],
              lastName: ['', Validators.required],
              date: ['', Validators.required],
              sex: ['', Validators.required],
              nationality: ['', Validators.required],
              idType: ['', Validators.required],
              id2: ['', Validators.required],
              age: [{ value: '', disabled: false }, Validators.required],
              weight: ['', Validators.required],
              height: ['', Validators.required],
              weightUnit: ['', Validators.required],
              heightUnit: ['', Validators.required],
              bmi: [{ value: '', disabled: true }, Validators.required],
              status: ['', Validators.required],
              country: ['', Validators.required],
              city: ['', Validators.required],
              direction: ['', Validators.required],
              tel: [''],
              cel: ['', Validators.required],
              officeTel: [''],
              fax: [''],
              email: ['', [Validators.required, Validators.email]],
              office: this.fb.group({
                company: [''],
                position: [''],
                direction: [''],
                economicActivity: [''],
                sector: [''],
                city: [''],
                country: [''],
              })
              /*societyName: ['', Validators.required],
              commercialName: [''],
              taxpayerNumber: ['', Validators.required],
              socialHome: [''],
              tel: ['', Validators.required],
              email: ['', Validators.required],
              commercialActivity: ['', Validators.required],
              // requestType: ['', Validators.required],
              legalRepresentation: this.fb.group({
                name: ['', Validators.required],
                position: ['', Validators.required],
                nationality: ['', Validators.required],
                idType: ['', Validators.required],
                id2: ['', Validators.required],
                policy: [''],
                email: ['', Validators.required]
              })*/
            }));
          }
          break;

        case 'havePregnant':
          questionsForm.removeControl('pregnant');
          break;
        case 'haveHighRiskSport':
          questionsForm.removeControl('highRiskSport');
          break;

        case 'haveNicotine':
          questionsForm.removeControl('nicotine');
          break;

        case 'contractor':
          exposedPersonForm.removeControl('contractorExposedInfo');
          if (this.newRequest.get('conozcaSuClientePersonaContratante')) {
            formGeneral.removeControl('conozcaSuClientePersonaContratante');
          }
          break;

        case 'headLine':
          exposedPersonForm.removeControl('headLineExposedInfo');

          if (this.newRequest.get('conozcaSuClientePersona')) {
            formGeneral.removeControl('conozcaSuClientePersona');
          }
          break;

        case 'hasDeclinedInsuranceCompany':
          questionsBForm.removeControl('declinedInsuranceInformation');
          break;

        case 'haveHadMedicalHealthInsurance':
          questionsBForm.removeControl('medicalHealthInsurance');
          break;

        case 'didReclamation':
          mhiForm.removeControl('reclamationInfo');
          break;

        case 'haveMusculoskeletal':
          this.makeFalseAll(event.name);
          break;

        case 'haveCerebrovascular':
          this.makeFalseAll(event.name);
          break;

        case 'haveNervousSystem':
          this.makeFalseAll(event.name);
          break;

        case 'haveVisionHearing':
          this.makeFalseAll(event.name);
          break;

        case 'haveCardiovascularSystem':
          this.makeFalseAll(event.name);
          break;

        case 'haveRespiratorySystem':
          this.makeFalseAll(event.name);
          break;

        case 'haveDigestiveSystem':
          this.makeFalseAll(event.name);
          break;

        case 'haveUrinarySystem':
          this.makeFalseAll(event.name);
          break;

        case 'haveMaleReproductiveOrgans':
          this.makeFalseAll(event.name);
          break;

        case 'haveBloodDisorders':
          this.makeFalseAll(event.name);
          break;

        case 'haveEndocrineDisorders':
          this.makeFalseAll(event.name);
          break;

        case 'haveAlternateTreatment':
          this.makeFalseAll(event.name);
          break;

        case 'haveFunctionalLimitation':
          this.makeFalseAll(event.name);
          break;

        case 'haveDeformity':
          this.makeFalseAll(event.name);
          break;

        case 'haveBloodTransfusion':
          this.makeFalseAll(event.name);
          break;

        case 'haveAlcoholicDependence':
          this.makeFalseAll(event.name);
          break;

        case 'haveNicotine':
          this.makeFalseAll(event.name);
          break;

        case 'haveStd':
          this.makeFalseAll(event.name);
          break;

        case 'havePhysiologicalDisorder':
          this.makeFalseAll(event.name);
          break;

        case 'haveHighRiskSport':
          this.makeFalseAll(event.name);
          break;

        case 'havePregnant':
          this.makeFalseAll(event.name);
          break;

        case 'haveReproductiveOrganDisorders':
          this.makeFalseAll(event.name);
          break;


        case 'hasFamilyWithHeartKidneyDisease':
          questionsBForm.removeControl('familyWithDiseases');
          this.familyWithDiseasesList = undefined;
          break;
        // No
        case 'pep_radio_insured':

          if (this.newRequest.get('conozcaSuClientePersona')) {
            formGeneral.removeControl('conozcaSuClientePersona');
          }
          if (this.newRequest.get('conozcaSuClientePersonaContratante')) {
            formGeneral.removeControl('conozcaSuClientePersonaContratante');
          }
          this.newRequest.removeControl('exposedPerson');
          if (!(this.newRequest.get('files').get('documentsKnowClient'))) {
            formFiles.addControl('documentsKnowClient', this.fb.array([this.createFormArray('filesDocumentsKnowClient')]));
            this.filesDocumentsKnowClientArray = this.newRequest.get('files').get('documentsKnowClient') as FormArray;
          } else if (this.newRequest.get('files').get('documentsKnowClient')) {
            formFiles.removeControl('documentsKnowClient');
            formFiles.addControl('documentsKnowClient', this.fb.array([this.createFormArray('filesDocumentsKnowClient')]));
            this.filesDocumentsKnowClientArray = this.newRequest.get('files').get('documentsKnowClient') as FormArray;
          }
          break;

        case 'mandatorySubject':

          if (!(this.newRequest.get('files').get('mercantile'))) {
            formFiles.addControl('mercantile', this.fb.array([this.createFormArray('mercantileRegister')]));
            this.mercantileRegisterArray = this.newRequest.get('files').get('mercantile') as FormArray;
          } else if (this.newRequest.get('files').get('mercantile')) {
            formFiles.removeControl('mercantile');
            formFiles.addControl('mercantile', this.fb.array([this.createFormArray('mercantileRegister')]));
            this.mercantileRegisterArray = this.newRequest.get('files').get('mercantile') as FormArray;
          }
          if ((this.newRequest.get('antiLaundering'))) {
            formGeneral.removeControl('antiLaundering');
          }

          break;

        case 'haveConsultedForUnmentioned':
          questionsBForm.removeControl('consultedForUnmentioned');
          break;

        case 'haveHadExamStudiesTests':
          questionsBForm.removeControl('medicalHealthInsurance');
          break;



        default:
          break;
      }
    }
  }

  radioChange(event) {
    console.log(`value: ${event.value}, name: ${event.source.name}`);

  }

  ailmentSelected(type, form, watcherForm) {
    switch (type) {
      case 'musculoSkeletal':
        this.checkIfHaveAilment(type, form, watcherForm);
        break;

      case 'cardiovascularSystem':
        this.checkIfHaveAilment(type, form, watcherForm);
        break;

      case 'endocrineDisorders':
        this.checkIfHaveAilment(type, form, watcherForm);
        break;

      case 'urinarySystem':
        this.checkIfHaveAilment(type, form, watcherForm);
        break;

      default:
        break;
    }
  }

  // tslint:disable: forin
  checkIfHaveAilment(type, form, watcherForm) {
    const stay = [];

    for (const key in watcherForm.get(type).value) {
      const element = watcherForm.get(type).value[key].ailment;
      stay.push(element);
    }

    switch (type) {
      case 'musculoSkeletal':
        this.ailmentMusculoskeletalGenerator(stay, form);
        break;

      case 'cardiovascularSystem':
        this.ailmentCardiovascularGenerator(stay, form);
        break;

      case 'endocrineDisorders':
        this.ailmentEndocrineGenerator(stay, form);
        break;

      case 'urinarySystem':
        this.ailmentUrinaryGenerator(stay, form);
        break;

    }
  }
  isFormReadyToRender() {
    const validation = this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudHipertensionArterial') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudCardioVasculares') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudDiabetes') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudArtitris') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('columnaVertebralColumnaVertebral') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudMusculoesqueleticos') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudRenales') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudProstatica');
    return validation;
  }

  isGoToTopRender() {
    const validation = this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudHipertensionArterial') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudCardioVasculares') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudDiabetes') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudArtitris') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('columnaVertebralColumnaVertebral') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudMusculoesqueleticos') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudRenales') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudProstatica') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudBuceo') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudMoto') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudAviacion') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudMontanismo');

    let dependentValidation;

    // tslint:disable: forin
    for (const key in this.allDependents.controls) {
      const element = this.allDependents.controls[key] as FormGroup;

      dependentValidation = element.get('solicitudHipertensionArterial') ||
        element.get('solicitudCardioVasculares') ||
        element.get('solicitudDiabetes') ||
        element.get('solicitudArtitris') ||
        element.get('columnaVertebralColumnaVertebral') ||
        element.get('solicitudMusculoesqueleticos') ||
        element.get('solicitudRenales') ||
        element.get('solicitudProstatica') ||
        element.get('solicitudBuceo') ||
        element.get('solicitudMoto') ||
        element.get('solicitudAviacion') ||
        element.get('solicitudMontanismo');
    }

    return (validation || dependentValidation);
  }

  isActivityReadyToRender() {
    const validation = this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudBuceo') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudMoto') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudAviacion') ||
      this.newRequest.get('questionsA').get('questionnairesGastosMayores').get('solicitudMontanismo');
    return validation;
  }
  // tslint:disable: max-line-length
  ailmentMusculoskeletalGenerator(stay, form) {
    let arthritisCounter = 0;
    let spineCounter = 0;
    let musculoSkeletal = 0;

    for (const key in stay) {
      if (Object.prototype.hasOwnProperty.call(stay, key)) {
        const element = stay[key];
        if (element) {
          switch (element) {
            case 'ARTRITIS':
              arthritisCounter++;
              break;

            case 'LUMBAGO':
              spineCounter++;
              break;

            case 'HERNIA DISCAL':
              spineCounter++;
              break;

            case 'ESCOLIOSIS':
              spineCounter++;
              break;

            case 'OTRO PADECIMIENTOS DE LA COLUMNA VERTEBRAL':
              spineCounter++;
              break;

            case 'OTRO TRASTORNO MÚSCULO ESQUELÉTICOS':
              musculoSkeletal++;
              break;
          }
        }
      }
    }

    if (arthritisCounter > 0) {
      if (!form.get('solicitudArtitris')) {
        form.addControl('solicitudArtitris', this.fb.group({}));
      }
    } else {
      if (form.get('solicitudArtitris')) {
        form.removeControl('solicitudArtitris');
      }
    }

    if (spineCounter > 0) {
      if (!form.get('columnaVertebralColumnaVertebral')) {
        form.addControl('columnaVertebralColumnaVertebral', this.fb.group({}));
      }
    } else {
      if (form.get('columnaVertebralColumnaVertebral')) {
        form.removeControl('columnaVertebralColumnaVertebral');
      }
    }

    if (musculoSkeletal > 0) {
      if (!form.get('solicitudMusculoesqueleticos')) {
        form.addControl('solicitudMusculoesqueleticos', this.fb.group({}));
      }
    } else {
      if (form.get('solicitudMusculoesqueleticos')) {
        form.removeControl('solicitudMusculoesqueleticos');
      }
    }
  }

  ailmentCardiovascularGenerator(stay, form) {
    let hypertensionCounter = 0;
    let cardiovascularCounter = 0;

    for (const key in stay) {
      if (Object.prototype.hasOwnProperty.call(stay, key)) {
        const element = stay[key];
        if (element) {
          // switch (element) {
          //   case 'PRESIÓN ARTERIAL ALTA':
          //     hypertensionCounter++;
          //     break;

          //   case 'OTROS PADECIMIENTO DEL SISTEMA CARDIOVASCULAR':
          //     cardiovascularCounter++;
          //     break;
          // }
          if (element === 'PRESIÓN ARTERIAL ALTA') {
            hypertensionCounter++;
          } else {
            cardiovascularCounter++;
          }
        }
      }
    }

    if (hypertensionCounter > 0) {
      if (!form.get('solicitudHipertensionArterial')) {
        console.warn('CREO EL FORMULARIO: solicitudHipertensionArterial');
        form.addControl('solicitudHipertensionArterial', this.fb.group({}));
      }
    } else {
      if (form.get('solicitudHipertensionArterial')) {
        console.warn('ELIMINO EL FORMULARIO: solicitudHipertensionArterial');
        form.removeControl('solicitudHipertensionArterial');
      }
    }

    if (cardiovascularCounter > 0) {
      if (!form.get('solicitudCardioVasculares')) {
        console.warn('CREO EL FORMULARIO: solicitudCardioVasculares');
        form.addControl('solicitudCardioVasculares', this.fb.group({}));
      }
    } else {
      if (form.get('solicitudCardioVasculares')) {
        console.warn('ELIMINO EL FORMULARIO: solicitudCardioVasculares');
        form.removeControl('solicitudCardioVasculares');
      }
    }
  }

  ailmentEndocrineGenerator(stay, form) {
    let diabetesCounter = 0;

    for (const key in stay) {
      if (Object.prototype.hasOwnProperty.call(stay, key)) {
        const element = stay[key];
        if (element === 'DIABETES') {
          switch (element) {
            case 'DIABETES':
              diabetesCounter++;
              break;
          }
        }
      }
    }
    if (diabetesCounter > 0) {
      if (!form.get('solicitudDiabetes')) {
        form.addControl('solicitudDiabetes', this.fb.group({}));
      }
    } else {
      if (form.get('solicitudDiabetes')) {
        form.removeControl('solicitudDiabetes');
      }
    }
  }

  ailmentUrinaryGenerator(stay, form) {
    let renalCounter = 0;

    for (const key in stay) {
      if (Object.prototype.hasOwnProperty.call(stay, key)) {
        const element = stay[key];
        if (element) {
          // switch (element) {
          //   case 'CÁLCULO RENALES':
          //     break;
          //   }
          renalCounter++;
        }
      }
    }
    if (renalCounter > 0) {
      if (!form.get('solicitudRenales')) {
        console.log('OKIDOKI IN');
        form.addControl('solicitudRenales', this.fb.group({}));
      }
    } else {
      if (form.get('solicitudRenales')) {
        console.log('OKIDOKI OUT');
        form.removeControl('solicitudRenales');
      }
    }
  }


  valueChange($event, question, typeOrIndex) {
    const questionsA = this.newRequest.get('questionsA') as FormGroup;
    const questionsANicotine = this.newRequest.get('questionsA').get('nicotine') as FormGroup;

    console.log('tipo/index: ', typeOrIndex, 'event:', $event, 'question: ', question);
    if (typeOrIndex === 'solicitante') {
      if ($event.checked === true || $event.valor === 'SI') {
        switch (question) {
          case 'havePregnant':
            this.questionsA.addControl('pregnant', this.fb.group({
              time: ['', Validators.required]
            }));
            break;

          case 'haveHighRiskSport':
            this.questionsA.addControl('highRiskSport', this.fb.group({
              diving: ['', Validators.required],
              racing: ['', Validators.required],
              skydiving: ['', Validators.required],
              mountaineering: ['', Validators.required],
            }));
            break;

          case 'haveNicotine':
            this.questionsA.addControl('nicotine', this.fb.group({
              quantity: ['', Validators.required],
              timerange: ['', Validators.required],
              time: ['', Validators.required],
              isActualSmoker: ['', Validators.required],
            }));
            break;

          case 'diving':
            this.questionnairesGastosMayores.addControl('solicitudBuceo', this.fb.group({}));
            break;

          case 'racing':
            this.questionnairesGastosMayores.addControl('solicitudMoto', this.fb.group({}));
            break;

          case 'skydiving':
            this.questionnairesGastosMayores.addControl('solicitudAviacion', this.fb.group({}));
            break;

          case 'mountaineering':
            this.questionnairesGastosMayores.addControl('solicitudMontanismo', this.fb.group({}));
            break;

          case 'haveEndocrineDisorders':
            // this.questionnairesGastosMayores.addControl('solicitudDiabetes', this.fb.group({}));
            questionsA.addControl('endocrineDisorders', this.fb.array([this.createFormArray('questionsAInformation')]));
            this.endocrineDisordersList = questionsA.get('endocrineDisorders') as FormArray;
            break;
            break;

          case 'haveUrinarySystem':
            // this.questionnairesGastosMayores.addControl('solicitudRenales', this.fb.group({}));
            questionsA.addControl('urinarySystem', this.fb.array([this.createFormArray('questionsAInformation')]));
            this.urinarySystemList = questionsA.get('urinarySystem') as FormArray;
            break;
            break;

          case 'haveMusculoskeletal':
            // this.questionnairesGastosMayores.addControl('solicitudArtitris', this.fb.group({}));
            // this.questionnairesGastosMayores.addControl('columnaVertebralColumnaVertebral', this.fb.group({}));
            // this.questionnairesGastosMayores.addControl('solicitudMusculoesqueleticos', this.fb.group({}));

            questionsA.addControl('musculoSkeletal', this.fb.array([this.createFormArray('questionsAInformation')]));
            this.musculoSkeletalList = questionsA.get('musculoSkeletal') as FormArray;
            break;

          case 'haveCardiovascularSystem':
            // this.questionnairesGastosMayores.addControl('solicitudHipertensionArterial', this.fb.group({}));
            // this.questionnairesGastosMayores.addControl('solicitudCardioVasculares', this.fb.group({}));
            questionsA.addControl('cardiovascularSystem', this.fb.array([this.createFormArray('questionsAInformation')]));
            this.cardiovascularSystemList = questionsA.get('cardiovascularSystem') as FormArray;
            break;

          case 'haveCerebrovascular':
            questionsA.addControl('cerebroVascular', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveNervousSystem':
            questionsA.addControl('nervousSystem', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveVisionHearing':
            questionsA.addControl('visionHearing', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveRespiratorySystem':
            questionsA.addControl('respiratorySystem', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveDigestiveSystem':
            questionsA.addControl('digestiveSystem', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveMaleReproductiveOrgans':
            questionsA.addControl('maleReproductiveOrgans', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveBloodDisorders':
            questionsA.addControl('bloodDisorders', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveAlternateTreatment':
            questionsA.addControl('alternateTreatment', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveFunctionalLimitation':
            questionsA.addControl('functionalLimitation', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveDeformity':
            questionsA.addControl('deformity', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveStd':
            questionsA.addControl('std', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'havePhysiologicalDisorder':
            questionsA.addControl('physiologicalDisorder', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveBloodTransfusion':
            questionsA.addControl('bloodTransfusion', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveReproductiveOrganDisorders':
            questionsA.addControl('reproductiveOrganDisorders', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveAlcoholicDependence':
            questionsA.addControl('alcoholicDependence', this.fb.group({
              date: ['', Validators.required],
              substance: ['', Validators.required],
              threatment: ['', Validators.required],
            }));
            break;

          default:
            break;
        }
      } else if ($event.checked === false || $event.valor === 'NO') {
        switch (question) {
          case 'havePregnant':
            this.questionsA.removeControl('pregnant');
            break;

          case 'diving':
            this.questionnairesGastosMayores.removeControl('solicitudBuceo');
            break;

          case 'racing':
            this.questionnairesGastosMayores.removeControl('solicitudMoto');
            break;

          case 'skydiving':
            this.questionnairesGastosMayores.removeControl('solicitudAviacion');
            break;

          case 'mountaineering':
            this.questionnairesGastosMayores.removeControl('solicitudMontanismo');
            break;

          case 'haveHighRiskSport':
            this.questionsA.removeControl('highRiskSport');
            break;

          case 'haveNicotine':
            this.questionsA.removeControl('nicotine');
            break;

          case 'haveEndocrineDisorders':
            this.questionnairesGastosMayores.removeControl('solicitudDiabetes');
            questionsA.removeControl('endocrineDisorders');
            this.endocrineDisordersList = undefined;
            break;

          case 'haveUrinarySystem':
            this.questionnairesGastosMayores.removeControl('solicitudRenales');
            questionsA.removeControl('urinarySystem');
            this.urinarySystemList = undefined;
            break;

          case 'haveMusculoskeletal':
            this.questionnairesGastosMayores.removeControl('solicitudArtitris');
            this.questionnairesGastosMayores.removeControl('columnaVertebralColumnaVertebral');
            this.questionnairesGastosMayores.removeControl('solicitudMusculoesqueleticos');
            questionsA.removeControl('musculoSkeletal');
            this.musculoSkeletalList = undefined;
            break;

          case 'haveCardiovascularSystem':
            this.questionnairesGastosMayores.removeControl('solicitudHipertensionArterial');
            this.questionnairesGastosMayores.removeControl('solicitudCardioVasculares');
            questionsA.removeControl('cardiovascularSystem');
            this.cardiovascularSystemList = undefined;
            break;

          case 'haveCerebrovascular':
            questionsA.removeControl('cerebroVascular');
            break;

          case 'haveNervousSystem':
            questionsA.removeControl('nervousSystem');
            break;

          case 'haveVisionHearing':
            questionsA.removeControl('visionHearing');
            break;

          case 'haveRespiratorySystem':
            questionsA.removeControl('respiratorySystem');
            break;

          case 'haveDigestiveSystem':
            questionsA.removeControl('digestiveSystem');
            break;

          case 'haveMaleReproductiveOrgans':
            questionsA.removeControl('maleReproductiveOrgans');
            break;

          case 'haveBloodDisorders':
            questionsA.removeControl('bloodDisorders');
            break;

          case 'haveAlternateTreatment':
            questionsA.removeControl('alternateTreatment');
            break;

          case 'haveFunctionalLimitation':
            questionsA.removeControl('functionalLimitation');
            break;

          case 'haveDeformity':
            questionsA.removeControl('deformity');
            break;

          case 'haveStd':
            questionsA.removeControl('std');
            break;

          case 'havePhysiologicalDisorder':
            questionsA.removeControl('physiologicalDisorder');
            break;

          case 'haveBloodTransfusion':
            questionsA.removeControl('bloodTransfusion');
            break;

          case 'haveAlcoholicDependence':
            questionsA.removeControl('alcoholicDependence');
            break;

          case 'haveReproductiveOrganDisorders':
            questionsA.removeControl('reproductiveOrganDisorders');
            break;

          default:
            break;
        }
      }

      if (questionsANicotine) {
        if ($event.valor === 'EX-FUMADOR') {
          questionsANicotine.addControl('lastTimeSmoked', this.fb.control('', Validators.required));
          console.log(questionsANicotine);
        } else {
          questionsANicotine.removeControl('lastTimeSmoked');
        }
      }
    } else {
      const dependents = this.allDependents;
      const questionnaire = dependents.at(typeOrIndex) as FormGroup;
      // const questionnaireNicotine = questionnaire['controls']['nicotine'] as FormGroup;

      // const questionnaire = dependent.get('questionnairesGastosMayores') as FormGroup;

      if ($event.checked === true || $event.valor === 'SI') {
        console.log('true');
        switch (question) {
          case 'haveEndocrineDisorders':
            // questionnaire.addControl('solicitudDiabetes', this.fb.group({}));
            questionnaire.addControl('endocrineDisorders', this.fb.array([this.createFormArray('questionsAInformation')]));

            break;

          case 'havePregnant':
            questionnaire.addControl('pregnant', this.fb.group({
              time: ['', Validators.required]
            }));
            break;

          case 'haveNicotine':
            questionnaire.addControl('nicotine', this.fb.group({
              quantity: ['', Validators.required],
              timerange: ['', Validators.required],
              time: ['', Validators.required],
              isActualSmoker: ['', Validators.required],
              lastTimeSmoked: [''],
            }));
            break;

          case 'haveHighRiskSport':
            questionnaire.addControl('highRiskSport', this.fb.group({
              diving: ['', Validators.required],
              racing: ['', Validators.required],
              skydiving: ['', Validators.required],
              mountaineering: ['', Validators.required],
            }));
            break;

          case 'diving':
            console.log('entrodondee');
            questionnaire.addControl('solicitudBuceo', this.fb.group({}));
            break;

          case 'racing':
            questionnaire.addControl('solicitudMoto', this.fb.group({}));
            break;

          case 'skydiving':
            questionnaire.addControl('solicitudAviacion', this.fb.group({}));
            break;

          case 'mountaineering':

            questionnaire.addControl('solicitudMontanismo', this.fb.group({}));
            break;

          case 'haveUrinarySystem':
            questionnaire.addControl('urinarySystem', this.fb.array([this.createFormArray('questionsAInformation')]));

            // questionnaire.addControl('solicitudRenales', this.fb.group({}));
            break;

          case 'haveMusculoskeletal':
            // questionnaire.addControl('solicitudArtitris', this.fb.group({}));
            // questionnaire.addControl('columnaVertebralColumnaVertebral', this.fb.group({}));
            // questionnaire.addControl('solicitudMusculoesqueleticos', this.fb.group({}));
            questionnaire.addControl('musculoSkeletal', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveCardiovascularSystem':
            questionnaire.addControl('cardiovascularSystem', this.fb.array([this.createFormArray('questionsAInformation')]));

            // questionnaire.addControl('solicitudHipertensionArterial', this.fb.group({}));
            // questionnaire.addControl('solicitudCardioVasculares', this.fb.group({}));
            break;

          case 'haveCerebrovascular':
            questionnaire.addControl('cerebroVascular', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveNervousSystem':
            questionnaire.addControl('nervousSystem', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveVisionHearing':
            questionnaire.addControl('visionHearing', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveRespiratorySystem':
            questionnaire.addControl('respiratorySystem', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveDigestiveSystem':
            questionnaire.addControl('digestiveSystem', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveMaleReproductiveOrgans':
            questionnaire.addControl('maleReproductiveOrgans', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveBloodDisorders':
            questionnaire.addControl('bloodDisorders', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveAlternateTreatment':
            questionnaire.addControl('alternateTreatment', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveFunctionalLimitation':
            questionnaire.addControl('functionalLimitation', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveDeformity':
            questionnaire.addControl('deformity', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveStd':
            questionnaire.addControl('std', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'havePhysiologicalDisorder':
            questionnaire.addControl('physiologicalDisorder', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveBloodTransfusion':
            questionnaire.addControl('bloodTransfusion', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveReproductiveOrganDisorders':
            questionnaire.addControl('reproductiveOrganDisorders', this.fb.array([this.createFormArray('questionsAInformation')]));
            break;

          case 'haveAlcoholicDependence':
            questionnaire.addControl('alcoholicDependence', this.fb.group({
              date: ['', Validators.required],
              substance: ['', Validators.required],
              threatment: ['', Validators.required],
            }));
            break;


          default:
            break;
        }
      } else if ($event.checked === false || $event.valor === 'NO') {
        console.log('false');

        switch (question) {
          case 'haveEndocrineDisorders':
            questionnaire.removeControl('endocrineDisorders');

            questionnaire.removeControl('solicitudDiabetes');
            break;

          case 'havePregnant':
            questionnaire.removeControl('pregnant');
            break;

          case 'haveNicotine':
            questionnaire.removeControl('nicotine');
            break;

          case 'haveHighRiskSport':
            questionnaire.removeControl('highRiskSport');
            break;

          case 'haveUrinarySystem':
            questionnaire.removeControl('solicitudRenales');
            questionnaire.removeControl('urinarySystem');

            break;

          case 'diving':
            questionnaire.removeControl('solicitudBuceo');
            break;

          case 'racing':
            questionnaire.removeControl('solicitudMoto');
            break;

          case 'skydiving':
            questionnaire.removeControl('solicitudAviacion');
            break;

          case 'mountaineering':
            questionnaire.removeControl('solicitudMontanismo');
            break;

          case 'haveMusculoskeletal':
            questionnaire.removeControl('solicitudArtitris');
            questionnaire.removeControl('columnaVertebralColumnaVertebral');
            questionnaire.removeControl('solicitudMusculoesqueleticos');

            questionnaire.removeControl('musculoSkeletal');
            break;

          case 'haveCardiovascularSystem':
            questionnaire.removeControl('cardiovascularSystem');

            questionnaire.removeControl('solicitudHipertensionArterial');
            questionnaire.removeControl('solicitudCardioVasculares');
            break;

          case 'haveCerebrovascular':
            questionnaire.removeControl('cerebroVascular');
            break;

          case 'haveNervousSystem':
            questionnaire.removeControl('nervousSystem');
            break;

          case 'haveVisionHearing':
            questionnaire.removeControl('visionHearing');
            break;

          case 'haveRespiratorySystem':
            questionnaire.removeControl('respiratorySystem');
            break;

          case 'haveDigestiveSystem':
            questionnaire.removeControl('digestiveSystem');
            break;

          case 'haveMaleReproductiveOrgans':
            questionnaire.removeControl('maleReproductiveOrgans');
            break;

          case 'haveBloodDisorders':
            questionnaire.removeControl('bloodDisorders');
            break;

          case 'haveAlternateTreatment':
            questionnaire.removeControl('alternateTreatment');
            break;

          case 'haveFunctionalLimitation':
            questionnaire.removeControl('functionalLimitation');
            break;

          case 'haveDeformity':
            questionnaire.removeControl('deformity');
            break;

          case 'haveStd':
            questionnaire.removeControl('std');
            break;

          case 'havePhysiologicalDisorder':
            questionnaire.removeControl('physiologicalDisorder');
            break;

          case 'haveBloodTransfusion':
            questionnaire.removeControl('bloodTransfusion');
            break;

          case 'haveAlcoholicDependence':
            questionnaire.removeControl('alcoholicDependence');
            break;

          case 'haveReproductiveOrganDisorders':
            questionnaire.removeControl('reproductiveOrganDisorders');
            break;

          default:
            break;
        }


      }

      // console.log(questionnaireNicotine)
      // if (questionnaireNicotine) {
      //   if ($event.valor === 'EX-FUMADOR') {
      //     console.log('klk');
      //     questionnaireNicotine.addControl('lastTimeSmoked', this.fb.control('', Validators.required));
      //     console.log(questionnaireNicotine);
      //   } else {
      //     questionnaireNicotine.removeControl('lastTimeSmoked');
      //   }
      // }
      // console.log(questionnaire.value.name, questionnaire.value);

    }
  }

  makeFalseAll(name) {
    this.newRequest.get('questionsA').get(name).setValue(false);
    this.valueChange({ checked: false }, name, 'solicitante');

    const dpd = this.newRequest.get('dependents').get('allDependents') as FormArray;
    // tslint:disable-next-line: forin
    for (const element in this.dependentsFormArray.value) {
      // tslint:disable-next-line: radix
      const dependent = dpd.at(parseInt(element));

      dependent.get(name).setValue(false);
      this.valueChange({ checked: false }, name, element);
    }
  }

  selectChangeUrl(event) {
    switch (event) {
      case 'vida':
        this.router.navigateByUrl('dashboard/requests/new-requests/vida');
        break;

      case 'disability':
        this.router.navigateByUrl('dashboard/requests/new-requests/disability');
        break;

      case 'gastos mayores':
        this.router.navigateByUrl('dashboard/requests/new-requests/salud');
        break;

      default:
        break;
    }
  }

  getBmi(height: any, weight: any) {
    const weightUnit = this.newRequest.get('person').get('weightUnit').value;
    const heightUnit = this.newRequest.get('person').get('heightUnit').value;
    if (weight !== '' && height !== '') {
      if (weightUnit === 'LIBRAS') { weight = weight / 2.205; }
      if (heightUnit === 'PIE') {
        height = height / 3.281; // (((height * 12) + inches) * 2.54);
      }

      const bmi = weight / ((height / 100) * (height / 100));
      if (bmi !== Infinity) {
        const value = parseFloat(`${bmi}`).toFixed(2);
        this.newRequest.get('person').get('bmi').setValue(value);
      }

    }
  }

  print() {
    console.log('solicitante: ', this.newRequest.get('questionsA'));
    console.log('dependientes: ', this.newRequest.get('dependents').value.allDependents);
  }

  arrayStudiesWatcher(i: number) {
    if (this.arrayFilesTitles) {
      if (this.arrayFilesTitles[i] && this.newRequest.get('files').get('studies').get(i.toString()).value.study !== '') {
        return this.arrayFilesTitles[i].studyUrl;
      }
    }
  }

  // tslint:disable: max-line-length
  id2AttachedViewValue(i: number, group: string) {
    if (group === 'primaryBenefits') {
      if (i !== null) {
        if (this.primaryBeneficaryTitles) {
          if (this.primaryBeneficaryTitles[i] && this.newRequest.get('primaryBenefits').get('dependentsC').get(i.toString()).value.id2Attached !== '') {
            return this.primaryBeneficaryTitles[i].id2AttachedUrl;
          }
        }
      } else {
        if (this.primaryAnotherTitle) {
          if (this.primaryAnotherTitle && this.newRequest.get('primaryBenefits').get('personBenefited').value.id2Attached !== '') {
            return this.primaryAnotherTitle.id2AttachedUrl;
          }
        }
      }
    } else {
      if (i !== null) {
        if (this.contigentBeneficaryTitles) {
          if (this.contigentBeneficaryTitles[i] && this.newRequest.get('contingentBeneficiary').get('dependentsC').get(i.toString()).value.id2Attached !== '') {
            return this.contigentBeneficaryTitles[i].id2AttachedUrl;
          }
        }
      } else {
        if (this.contigentAnotherTitle) {
          if (this.contigentAnotherTitle && this.newRequest.get('contingentBeneficiary').get('personBenefited').value.id2Attached !== '') {
            return this.contigentAnotherTitle.id2AttachedUrl;
          }
        }
      }
    }
  }

  createFormArray(type: string): FormGroup {
    switch (type) {
      case 'medicInformation':
        return this.fb.group({
          name: [''],
          ailment: ['', Validators.required],
          date: ['', Validators.required],
          threatment: ['', Validators.required],
          time: [''],
          duration: ['', Validators.min(1)],
          medicCenterName: [''],
          medicCenterAddress: [''],
        });

      case 'questionsAInformation':
        return this.fb.group({
          name: [{ value: '', disabled: true }],
          ailment: ['', Validators.required],
          date: ['', Validators.required],
          threatment: ['', Validators.required],
          time: [''],
          duration: ['', Validators.min(1)],
          medicCenterName: [''],
          medicCenterAddress: [''],
        });

      case 'specializedTests':
        return this.fb.group({
          date: ['', Validators.required],
          whichStudy: ['', Validators.required],
          results: ['', Validators.required],
        });

      case 'haveDisease':
        return this.fb.group({
          family: ['', Validators.required],
        });
        break;

      case 'filesStudies':
        return this.fb.group({
          study: ['', Validators.required],
        });

      case 'filesDocumentsKnowClient':
        return this.fb.group({
          document: ['', Validators.required],
        });

      case 'filesCopyId':
        return this.fb.group({
          idId: ['', Validators.required],
        });

      case 'mercantileRegister':
        return this.fb.group({
          register: ['', Validators.required],
        });
      default:
        break;
    }
  }

  addToList(list: any, type: string) {
    list.push(this.createFormArray(type));
  }

  SaveForm(newRequestReq: FormGroup) {
    this.formHandler.sendForm(newRequestReq, 'major-expenses', 'send');
  }
  getDataCotizaciones(id) {
    this.quotesService.returnDataSalud(id).subscribe(data => {

      if (data !== undefined && data.data !== null && data.data !== undefined && data.data.nombre !== undefined) {
        const dialogRef = this.dialog.open(BaseDialogComponent, {
          data: this.dialogOption.noCFound(data.data),
          minWidth: 385,
        });
        setTimeout(() => {
          dialogRef.close();
        }, 4000);
        this.isFormValidToFill = true;
        this.notFoundQuote = false;

        this.newRequest.get('payment').setValue(this.currencyPipe.transform(data.data.monto));
        this.newRequest.get('plans').setValue(data.data.plan);
        this.newRequest.get('deducibles').setValue(data.data.deducible);
        this.newRequest.get('person').get('date').setValue(data.data.fecha_nacimiento);
        this.newRequest.get('person').get('firstName').setValue(data.data.nombre);
        this.newRequest.get('person').get('lastName').setValue(data.data.apellidos);

        switch (data.data.sexo) {
          case 'M':
            this.newRequest.get('person').get('sex').setValue('MASCULINO');
            break;

          case 'F':
            this.newRequest.get('person').get('sex').setValue('FEMENINO');
            break;

          default:
            break;
        }

      } else {
        this.notFoundQuote = true;

        this.newRequest.get('payment').reset();
        this.newRequest.get('plans').reset();
        this.newRequest.get('deducibles').reset();
        this.newRequest.get('person').get('date').reset();
        this.newRequest.get('person').get('firstName').reset();
        this.newRequest.get('person').get('sex').reset();

        const dialogRef = this.dialog.open(BaseDialogComponent, {
          data: this.dialogOption.noCNotFound,
          minWidth: 385,
        });
        setTimeout(() => {
          dialogRef.close();
        }, 4000);
      }
    });

  }

  arrayDocumentsKnowClientWatcher(i: number) {
    if (this.arrayFilesTitlesDocumentsKnowClient) {
      if (this.newRequest.get('files').get('documentsKnowClient')) {
        // tslint:disable-next-line: max-line-length
        if (this.arrayFilesTitlesDocumentsKnowClient[i] && this.newRequest.get('files').get('documentsKnowClient').get(i.toString()).value.document !== '') {
          return this.arrayFilesTitlesDocumentsKnowClient[i].documentUrl;
        }
      }
    }
  }

  arrayCopyIdWatcher(i: number) {
    if (this.arrayFilesTitlesCopyId) {
      if (this.newRequest.get('files').get('copyId')) {
        // tslint:disable-next-line: max-line-length
        if (this.arrayFilesTitlesCopyId[i] && this.newRequest.get('files').get('copyId').get(i.toString()).value.idId !== '') {
          return this.arrayFilesTitlesCopyId[i].idIdUrl;
        }
      }
    }
  }

  arrayRegisterWatcher(i: number) {
    if (this.arrayFilesTitlesMercantile) {
      if (this.newRequest.get('files').get('mercantile')) {
        // tslint:disable-next-line: max-line-length
        if (this.arrayFilesTitlesMercantile[i] && this.newRequest.get('files').get('mercantile').get(i.toString()).value.register !== '') {
          return this.arrayFilesTitlesMercantile[i].registerUrl;
        }
      }
    }
  }

  getData(key) {
    /*setTimeout(() => {
      this.appComponent.showOverlay = true;
    });*/
    this.appComponent.showOverlay = true;
    this.requestService.getRequestData('salud', key).subscribe((data: any) => {
      // console.log(data);
      // console.log( this.newRequest);
      if (data !== undefined && data.data !== null &&
        data.data !== undefined) {
        this.ID = data.data.id;
        console.log(data.data);
        this.dataMappingFromApi.iterateThroughtAllObject(data.data, this.newRequest);
        this.AddEventOnEachDependentVariable();

        const formP = this.newRequest.get('person') as FormGroup;
        const formPO = this.newRequest.get('person').get('office') as FormGroup;
        const formQA = this.newRequest.get('questionsA') as FormGroup;
        const formQB = this.newRequest.get('questionsB') as FormGroup;
        const formEP = this.newRequest.get('exposedPerson') as FormGroup;
        const formSAH = this.newRequest.get('sectionAHelper') as FormGroup;
        const formGeneral = this.newRequest as FormGroup;
        const formContractor = this.newRequest.get('contractor') as FormGroup;
        const formFiles = this.newRequest.get('files') as FormGroup;


        if (this.newRequest.get('questionsB').get('familyWithDiseases') !== undefined && this.newRequest.get('questionsB').get('familyWithDiseases') !== null) {
          this.familyWithDiseasesList = this.newRequest.get('questionsB').get('familyWithDiseases') as FormArray;
        } else {
          this.familyWithDiseasesList = undefined;
        }

        if (formP.get('isContractor').value === 'NO') {
          // formP.removeControl('isJuridica');
          if (formGeneral.get('contractor')) {
            formGeneral.removeControl('contractor');
          }
          if (this.newRequest.get('conozcaSuClientePersonaContratante')) {
            formGeneral.removeControl('conozcaSuClientePersonaContratante');
          }
          if (this.newRequest.get('files').get('copyId')) {
            formFiles.removeControl('copyId');
          }
          if ((this.newRequest.get('antiLaundering'))) {
            formGeneral.removeControl('antiLaundering');
          }
          if ((this.newRequest.get('conozcaSuClientePersonaJuridica'))) {
            formGeneral.removeControl('conozcaSuClientePersonaJuridica');
          }
          if (this.newRequest.get('person').get('mandatorySubject')) {
            formP.removeControl('mandatorySubject');
          }
          formP.removeControl('isJuridica');
          if (formEP) {
            formEP.removeControl('contractor');
            formEP.removeControl('contractorExposedInfo');
          }
          if (this.newRequest.get('files').get('mercantile')) {
            formFiles.removeControl('mercantile');
          }
          if (formGeneral.get('contractor')) {
            formGeneral.removeControl('contractor');
          }

          this.newRequest.get('person').get('office').get('company').setValidators(Validators.required);
          this.newRequest.get('person').get('office').get('company').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('company').markAsUntouched();

          this.newRequest.get('person').get('office').get('position').setValidators(Validators.required);
          this.newRequest.get('person').get('office').get('position').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('position').markAsUntouched();

          this.newRequest.get('person').get('office').get('direction').setValidators(Validators.required);
          this.newRequest.get('person').get('office').get('direction').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('direction').markAsUntouched();

          this.newRequest.get('person').get('office').get('economicActivity').setValidators(Validators.required);
          this.newRequest.get('person').get('office').get('economicActivity').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('economicActivity').markAsUntouched();

          this.newRequest.get('person').get('office').get('sector').setValidators(Validators.required);
          this.newRequest.get('person').get('office').get('sector').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('sector').markAsUntouched();

          this.newRequest.get('person').get('office').get('city').setValidators(Validators.required);
          this.newRequest.get('person').get('office').get('city').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('city').markAsUntouched();

          this.newRequest.get('person').get('office').get('country').setValidators(Validators.required);
          this.newRequest.get('person').get('office').get('country').updateValueAndValidity();
          this.newRequest.get('person').get('office').get('country').markAsUntouched();


          if (this.newRequest.get('files').get('copyId')) {
            formFiles.removeControl('copyId');
          }
          if ((this.newRequest.get('antiLaundering'))) {
            formGeneral.removeControl('antiLaundering');
          }
          if ((this.newRequest.get('conozcaSuClientePersonaJuridica'))) {
            formGeneral.removeControl('conozcaSuClientePersonaJuridica');
          }
          if (this.newRequest.get('person').get('mandatorySubject')) {
            formP.removeControl('mandatorySubject');
          }
          formP.removeControl('isJuridica');
          if (formEP) {
            formEP.removeControl('contractor');
            formEP.removeControl('contractorExposedInfo');
          }
          if (this.newRequest.get('files').get('mercantile')) {
            formFiles.removeControl('mercantile');
          }
        }

        if (formP.get('isContractor').value !== 'SI') {
          if (formEP) {
            formEP.removeControl('contractorExposedInfo');
            formEP.removeControl('contractor');
          }
        }

        if (formP.get('heightUnit').value !== 'PIE') {
          formP.removeControl('inches');
        }

        if (formP.get('mandatorySubject')) {
          if (formP.get('mandatorySubject').value !== 'SI') {
            formGeneral.removeControl('antiLaundering');
          }
        }

        if (formP.get('isJuridica')) {
          if (formP.get('isJuridica').value !== 'SI') {
            formP.removeControl('mandatorySubject');
          } else {
            if (formGeneral.get('contractor')) {
              formGeneral.removeControl('contractor');
            }
            if (this.newRequest.get('conozcaSuClientePersonaContratante')) {
              formGeneral.removeControl('conozcaSuClientePersonaContratante');
            }
            if (this.newRequest.get('files').get('copyId')) {
              formFiles.removeControl('copyId');
            }
          }
        } else {
          // formGeneral.removeControl('conozcaSuClientePersona');
          formGeneral.removeControl('conozcaSuClientePersonaJuridica');
          if (formGeneral.get('contractor')) {
            formGeneral.removeControl('contractor');
          }
          if (this.newRequest.get('conozcaSuClientePersonaContratante')) {
            formGeneral.removeControl('conozcaSuClientePersonaContratante');
          }
          if (!(this.newRequest.get('conozcaSuClientePersonaJuridica'))) {
            formGeneral.addControl('conozcaSuClientePersonaJuridica', this.fb.group({}));
          }
          // formContractor.addControl('conozcaSuClientePersonaJuridica', this.fb.group({}));

          if (this.newRequest.get('files').get('copyId')) {
            formFiles.removeControl('copyId');
          }
        }

        if (formP.get('isContractor').value !== 'SI') {
          formGeneral.removeControl('conozcaSuClientePersonaContratante');
          formGeneral.removeControl('conozcaSuClientePersonaJuridica');
        }

        if (formEP && formEP.get('headLine').value !== 'SI') {
          formEP.removeControl('headLineExposedInfo');
          formEP.removeControl('headLineExposedInfo');

          if (this.newRequest.get('conozcaSuClientePersona')) {
            formGeneral.removeControl('conozcaSuClientePersona');
          }
        }

        if (formEP && formEP.get('contractor')) {
          if (formEP.get('contractor').value !== 'SI') {
            formEP.removeControl('contractorExposedInfo');
          }
          formEP.removeControl('contractorExposedInfo');
          if (this.newRequest.get('conozcaSuClientePersonaContratante')) {
            formEP.removeControl('conozcaSuClientePersonaContratante');
          }
        }

        if (formQA.get('haveHighRiskSport').value !== true) {
          formQA.removeControl('highRiskSport');
        }

        if (formQA.get('haveNicotine').value !== true) {
          formQA.removeControl('nicotine');
        }

        if (formQA.get('nicotine')) {
          if (formQA.get('nicotine').get('isActualSmoker').value !== 'EX-FUMADOR') {
            const formQAC = formQA.get('nicotine') as FormGroup;

            formQAC.removeControl('lastTimeSmoked');
          }
        }

        if (formQA.get('havePregnant').value !== true) {
          formQA.removeControl('pregnant');
        }

        formSAH.removeControl('haveSpine');
        formQA.removeControl('haveSpine');
        formQB.removeControl('hasFamilyWithHeartKidneyDisease');

        if (this.newRequest.get('person').get('conozcaSuClientePersona')) {
          formP.removeControl('conozcaSuClientePersona');
        }
        if ((this.newRequest.get('person').get('antiLaundering'))) {
          formP.removeControl('antiLaundering');
        }
        if ((this.newRequest.get('person').get('conozcaSuClientePersonaJuridica'))) {
          formP.removeControl('conozcaSuClientePersonaJuridica');
        }

        if (this.newRequest.get('contractor')) {
          if (this.newRequest.get('contractor').get('conozcaSuClientePersona')) {
            formContractor.removeControl('conozcaSuClientePersona');
          }
        }


        this.contingentBeneficiaryArray = this.newRequest.get('contingentBeneficiary').get('dependentsC') as FormArray;
        this.primaryBenefitsArray = this.newRequest.get('primaryBenefits').get('dependentsC') as FormArray;
        this.studentDependents = this.newRequest.get('dependents').get('students') as FormArray;
        this.dependentsFormArray = this.newRequest.get('dependents').get('allDependents') as FormArray;
        this.questionsFormArray = this.newRequest.get('questionsA') as FormArray;
        this.questionsBFormArray = this.newRequest.get('questionsB') as FormArray;
        if (this.newRequest.get('questionsB')) {
          this.informationList = this.newRequest.get('questionsB').get('information') as FormArray;
        }
        this.filesStudiesArray = this.newRequest.get('files').get('studies') as FormArray;

        this.arrayFilesTitles = data.data.files.studies;
        this.primaryBeneficaryTitles = data.data.primaryBenefits.dependentsC;
        this.contigentBeneficaryTitles = data.data.contingentBeneficiary.dependentsC;
        this.primaryAnotherTitle = data.data.primaryBenefits.personBenefited;
        this.contigentAnotherTitle = data.data.contingentBeneficiary.personBenefited;

        if (this.newRequest.get('files') && this.newRequest.get('files').get('documentsKnowClient')) {
          this.filesDocumentsKnowClientArray = this.newRequest.get('files').get('documentsKnowClient') as FormArray;
        }
        if (this.newRequest.get('files') && this.newRequest.get('files').get('copyId')) {
          this.filesCopyIdArray = this.newRequest.get('files').get('copyId') as FormArray;
        }
        if (this.newRequest.get('files') && this.newRequest.get('files').get('mercantile')) {
          this.mercantileRegisterArray = this.newRequest.get('files').get('mercantile') as FormArray;
        }
        this.arrayFilesTitlesDocumentsKnowClient = data.data.files.documentsKnowClient;
        this.arrayFilesTitlesCopyId = data.data.files.copyId;
        this.arrayFilesTitlesMercantile = data.data.files.mercantile;

        for (const dependent in this.dependentsFormArray.controls) {
          if (Object.prototype.hasOwnProperty.call(this.dependentsFormArray.controls, dependent)) {
            const element = this.dependentsFormArray.controls[dependent] as FormGroup;
            console.log('dependentsFormArray element', element);

            if (element.get('haveHighRiskSport').value !== true) {
              element.removeControl('highRiskSport');
            }

            if (element.get('haveNicotine').value !== true) {
              element.removeControl('nicotine');
            }

            if (element.get('havePregnant').value !== true) {
              element.removeControl('pregnant');
            }

            if (element.get('heightUnit').value !== 'PIE') {
              element.removeControl('inches');
            }

            element.removeControl('haveSpine');
          }
        }

        // tslint:disable: no-string-literal
        if (formQB.get('specializedTests')) {
          for (const key in formQB.get('specializedTests')['controls']) {
            if (Object.prototype.hasOwnProperty.call(formQB.get('specializedTests')['controls'], key)) {
              const element = formQB.get('specializedTests')['controls'][key] as FormGroup;
              if (element.value.whichStudy !== 'OTROS') {
                element.removeControl('specifyStudy');
              }
            }
          }
        }

        if (formP.get('pep_radio_insured')) {
          if (formP.get('pep_radio_insured').value !== 'SI') {
            this.newRequest.removeControl('exposedPerson');
          }
        }

        if (formP.get('isContractor')) {
          if (formP.get('isContractor').value !== 'NO') {
            formPO.get('company').setValidators(null);
            formPO.get('position').setValidators(null);
            formPO.get('direction').setValidators(null);
            formPO.get('economicActivity').setValidators(null);
            formPO.get('sector').setValidators(null);
            formPO.get('city').setValidators(null);
            formPO.get('country').setValidators(null);
          }
        }

        this.isFormValidToFill = true;


        this.newRequest.markAllAsTouched();
        this.newRequest.updateValueAndValidity();

      }
      this.appComponent.showOverlay = false;

    });
  }

}

