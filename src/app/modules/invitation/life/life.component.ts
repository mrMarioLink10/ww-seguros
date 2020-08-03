import { Component, OnInit, DoCheck, ɵConsole, ChangeDetectorRef, AfterViewChecked, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { $sex, $country, $res, $time, $family, $weightTypes, $heightTypes } from 'src/app/core/form/objects';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { map, first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { FormDataFillingService } from 'src/app/modules/dashboard/services/shared/formDataFillingService';
import { DiseaseService } from '../../dashboard/shared/components/disease/shared/disease/disease.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { LifeService } from '../../dashboard/requests/new-request/life/services/life.service';
import { KnowYourCustomerComponent } from '../../dashboard/shared/components/disease/know-your-customer/know-your-customer.component';
import { RequestsService } from '../services/requests.service';
import { environment } from 'src/environments/environment';

// tslint:disable: one-line
// tslint:disable: max-line-length

@Component({
  selector: 'app-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.scss']
})
export class LifeComponent implements OnInit, DoCheck {

  constructor(
    private fb: FormBuilder,
    private dataMappingFromApi: FormDataFillingService,
    public formMethods: FormArrayGeneratorService,
    public diseaseService: DiseaseService,
    public formHandler: FormHandlerService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogModal: DialogService,
    private dialogOption: DialogOptionService,
    public dialog: MatDialog,
    private life: LifeService,
    private know: KnowYourCustomerComponent,
    private appComponent: AppComponent,
    private cd: ChangeDetectorRef,
    public requestService: RequestsService
  ) {
    var d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    this.maxDate = d;}
  step: number;
  showContent = false;

  role: string;
  maxWidth: any;
  primaryBenefitsArray: FormArray;
  contingentBeneficiaryArray: FormArray;
  filesStudiesArray: FormArray;
  dependentsFormArray: FormArray;
  existingCoveragesList: FormArray;
  changingCoveragesList: FormArray;
  insuranceProposedList: FormArray;
  lostDriveLicenseList: FormArray;
  routeSelected = 'vida';
  heartPainList: FormArray;
  hypertensionList: FormArray;
  respiratoryDisorderList: FormArray;
  mentalNervousDisorderList: FormArray;
  stomachDisorderList: FormArray;
  endocrineDisorderList: FormArray;
  diabetesList: FormArray;
  spineDisorderList: FormArray;
  unexplainedDiseaseList: FormArray;
  renalDisorderList: FormArray;
  eyesNoseThroatProblemList: FormArray;
  bloodDisorderList: FormArray;
  birthDefectList: FormArray;
  medicalProceduresList: FormArray;
  beenAPatientList: FormArray;
  hadSpecializedTestsList: FormArray;
  notCarriedOutList: FormArray;
  takenInLast12MonthsList: FormArray;
  planToObtainMedicalTreatmentList: FormArray;
  testedPositiveForHIVList: FormArray;
  diabetesDiagnosisList: FormArray;

  womenDisordersList: FormArray;
  doctorList: FormArray;

  familyRelationshipInsurances: FormArray;

  coveragesQuestions: any[];
  generalInfoQuestions: any[];
  sportsQuestions: any[];
  medicQuestions: any[];
  filesInformation: any;
  arrayFilesTitles = [];
  needFinancialStatus = false;
  showNewQuoteRequest = false;
  todayDate = new Date();
  maxDate = new Date();

  primaryBeneficaryTitles = [];
  contigentBeneficaryTitles = [];
  primaryAnotherTitle: any;
  contigentAnotherTitle: any;


  payMethod = {
    label: 'Método de pago',
    name: 'method',
    options: [
      {
        value: 'ANUAL',
        viewValue: 'ANUAL',
      },
      {
        value: 'SEMESTRAL',
        viewValue: 'SEMESTRAL',
      },
      {
        value: 'TRIMESTRAL',
        viewValue: 'TRIMESTRAL',
      },
      {
        value: 'MENSUAL',
        viewValue: 'MENSUAL',
      }
    ]
  };

  payForm = {
    label: 'Forma de pago',
    name: 'form',
    options: [
      {
        value: 'CHEQUE',
        viewValue: 'CHEQUE',
      },
      {
        value: 'TARJETA DE CREDITO',
        viewValue: 'TARJETA DE CREDITO',
      },
      {
        value: 'TRANSFERENCIA',
        viewValue: 'TRANSFERENCIA',
      },
      {
        value: 'DÉBITO AUTOMÁTICO',
        viewValue: 'DÉBITO AUTOMÁTICO',
      },

    ]
  };

  requestType = [
    {
      value: 'Suscripción para Colectivos',
      viewValue: 'Suscripción para Colectivos',
      link: '/dashboard/requests/new-requests/major-expenses'
    }
  ];

  year = {
    label: 'Seleccione',
    options: $time,
    name: 'time'
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

  nicotineStandar: FieldConfig = {
    label: 'Estándar Nicotina',
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

  planTypes = {
    label: 'Tipo de Plan',
    options: [
      {
        value: 'WWTERM',
        viewValue: 'WWTERM'
      },
      {
        value: 'WWSURVIVOR',
        viewValue: 'WWSURVIVOR'
      },
      {
        value: 'WWTERM VALUE',
        viewValue: 'WWTERM VALUE'
      },
    ],
    name: 'type'
  };

  primaryBenefits = {
    name: ['', Validators.required],
    id2: ['', Validators.required],
    id2Attached: ['', Validators.required],
    nationality: ['', Validators.required],
    ocupation: ['', Validators.required],
    family: ['', Validators.required],
    quantity: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
  };

  contigentBenefits = {
    name: [''],
    id2: [''],
    id2Attached: [''],
    nationality: [''],
    ocupation: [''],
    family: [''],
    quantity: ['', [Validators.min(1), Validators.max(100)]]
  };

  annualIncomeValues = {
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

  connectionType = {
    options: [
      {
        value: 'FAMILIA',
        viewValue: 'FAMILIA'
      },
      {
        value: 'AMIGO',
        viewValue: 'AMIGO'
      },
      {
        value: 'CLIENTE',
        viewValue: 'CLIENTE'
      },
      {
        value: '¿LO ACABA DE CONOCER?',
        viewValue: '¿LO ACABA DE CONOCER?'
      },

    ]
  };

  timeFriendship = {
    label: '¿Cuánto lo conoce?',
    options: [
      {
        value: 'MUCHO',
        viewValue: 'MUCHO'
      },
      {
        value: 'POCO',
        viewValue: 'POCO'
      },
    ]
  };

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

  options: FieldConfig =
    {
      label: 'Tipo de Solicitud',
      options: this.requestType,
      name: 'requestType',
      type: 'select'
    };

  country = {
    options: $country,
  };

  countryWithLabel = {
    label: 'País',
    options: $country,
  };

  countryOfResidence = {
    options: $country,
    name: 'countryOfResidence',
    label: 'País de Residencia'
  };

  res = $res;

  countryOfBirth = {
    options: $country,
    name: 'countryOfBirth',
    label: 'País de Nacimiento'
  };

  currency = {
    name: 'currency',
    label: 'Tipo de Moneda',
    options: [
      {
        value: 'DOLARES',
        viewValue: 'DOLARES'
      },
      {
        value: 'PESOS DOMINICANOS',
        viewValue: 'PESOS DOMINICANOS'
      },
    ],
  };

  basicLifeAmountCurrency = {
    name: 'basicLifeAmountCurrency',
    label: 'Tipo de Moneda',
    options: [
      {
        value: 'USD',
        viewValue: 'US$'
      },
      {
        value: 'DOP',
        viewValue: 'DOP$'
      },
    ],
  };

  basicLifeBonusCurrency = {
    name: 'basicLifeBonusCurrency',
    label: 'Tipo de Moneda',
    options: [
      {
        value: 'USD',
        viewValue: 'US$'
      },
      {
        value: 'DOP',
        viewValue: 'DOP$'
      },
    ],
  };

  survivalAmountCurrency = {
    name: 'survivalAmountCurrency',
    label: 'Tipo de Moneda',
    options: [
      {
        value: 'USD',
        viewValue: 'US$'
      },
      {
        value: 'DOP',
        viewValue: 'DOP$'
      },
    ],
  };

  survivalBonusCurrency = {
    name: 'survivalBonusCurrency',
    label: 'Tipo de Moneda',
    options: [
      {
        value: 'USD',
        viewValue: 'US$'
      },
      {
        value: 'DOP',
        viewValue: 'DOP$'
      },
    ],
  };

  weightChangesOptions = {
    label: 'Cambio de peso',
    options: [
      {
        value: 'AUMENTO',
        viewValue: 'AUMENTO'
      },
      {
        value: 'PÉRDIDA',
        viewValue: 'PÉRDIDA'
      }
    ],
  };

  status = {
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
    name: 'status',
    label: 'Estado Civil'
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
      name: 'id2Type',
    };
    parentescoAsegurado = {
      label: 'Parentesco con el asegurado',
      name: 'kinship',
      options: $family.options
    };
  smokingTypes = {
    options: [
      {
        value: 'CIGARILLOS',
        viewValue: 'CIGARILLOS'
      },
      {
        value: 'PIPA',
        viewValue: 'PIPA'
      },
      {
        value: 'PARCHE O CHICLE DE NICOTINA',
        viewValue: 'PARCHE O CHICLE DE NICOTINA'
      },
      {
        value: 'TABACO',
        viewValue: 'TABACO'
      },
      {
        value: 'MÁSTICA TABACO',
        viewValue: 'MÁSTICA TABACO'
      },
      {
        value: 'OTRO',
        viewValue: 'OTRO'
      }
    ],
    name: 'haveSmoked'
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

  family = $family;
  familyRelationship = {
    label: 'Parentesco',
    name: 'relationship',
    options: $family.options
  };

  // tslint:disable-next-line: max-line-length
  titles = ['Información del Propuesto Asegurado',
    'Perfil Financiero',
    'Datos laborales',
    'Contratante (completar sólo si no fuese el asegurado. De ser una Persona Jurídica, completar el Formulario Persona Jurídica.)',
    'Pagador (completar sólo si no fuese el contratante. De ser una Persona Jurídica, completar el Formulario Persona Jurídica.)',
    'Persona políticamente expuesta',
    'Información pertinente al plan',
    'Información pertinente al pago de la prima',
    'Designación de los Beneficiario(s) Primario(s)',
    'Beneficiario(s) Contingente(s)',
    'En caso de Cesión Bancaria',
    'Información general', 'Historial Médico', 'Firmas', 'Reporte del agente'];

  newRequest: FormGroup;
  noCotizacion = null;
  dependentsNumber = 0;

  ID = null;

  x = 0;

  newQuoteButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Nueva Cotización',
    buttonColor: 'accent',
    barColor: 'primary',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: true,
    customClass: 'dashboard-button'
  };

  filesDocumentsKnowClientArray: FormArray;
  arrayFilesTitlesDocumentsKnowClient = [];
  filesCopyIdArray: FormArray;
  arrayFilesTitlesCopyId = [];
  mercantileRegisterArray: FormArray;
  arrayFilesTitlesMercantile = [];

  @ViewChild('form', { static: false }) form;
  @ViewChild('matAccordion', { static: false }) matAccordion;

  ngOnInit() {
    /* this.userService.getWholeQuotes()
       .subscribe(res => {
         console.log(res);
       });*/
    this.route.params.subscribe(res => {
      console.log(res);
      this.ID = res.key;
    });
    this.route.params.subscribe(res => {
      this.noCotizacion = res.noCotizacion;
    });

    // this.role = this.userService.getRoleCotizador();
    this.newRequest = this.fb.group({
      noC: [{ value: this.noCotizacion, disabled: true }, Validators.required],
      isComplete: [false, Validators.required],
      comentary: [''],
      person: this.fb.group({
        firstName: [{ value: '', disabled: false }, [Validators.required]],
        secondName: ['', Validators.required],
        lastName: ['', Validators.required],
        date: [{ value: '', disabled: true }, [Validators.required]],
        sex: [{ value: '', disabled: true }, [Validators.required]],
        nationality: ['', Validators.required],
        id2: ['', Validators.required],
        id2Type: ['', Validators.required],
        age: [{ value: '', disabled: true }, [Validators.required]],
        weight: ['', [Validators.required, Validators.min(0)]],
        weightUnit: ['', Validators.required],
        height: ['', [Validators.required, Validators.min(0)]],
        heightUnit: ['', Validators.required],
        status: ['', Validators.required],
        bmi: [{ value: '', disabled: true }, [Validators.required]],
        annualIncome: ['', [Validators.required, Validators.min(0)]],
        countryOfResidence: ['', Validators.required],
        countryOfBirth: ['', Validators.required],
        direction: ['', Validators.required],
        tel: [''],
        cel: ['', Validators.required],
        officeTel: [''],
        email: ['', [Validators.required, Validators.email]],
        sameAsContractor: ['', Validators.required],
        // sameAsPayer: ['', Validators.required],
      }),
      exposedPerson: this.fb.group({
        isExposed: ['', Validators.required],
      }),
      employer: this.fb.group({
        companyName: ['', Validators.required],
        profession: ['', Validators.required],
        economicActivity: ['', Validators.required],
        years: ['', Validators.required],
        jobDuties: ['', Validators.required],
        countryOfResidence: ['', Validators.required],
      }),
      financialProfile: this.fb.group({
        annualIncome: ['', Validators.required],
        othersAnnualIncome: ['', Validators.required],
        paymentOrigin: ['', Validators.required],
      }),
      releventPlanInformation: this.fb.group({
        type: [{ value: '', disabled: true }, [Validators.required]],
        bonus: [{ value: '', disabled: true }, [Validators.required]],
        timeAmount: [{ value: '', disabled: true }, [Validators.required, Validators.min(1), Validators.max(90)]],
        nicotineEstandar: [{ value: '', disabled: true }, Validators.required],
        coverages: this.fb.group({
          basicLife: [{ value: '', disabled: true }, Validators.required],
          survival: [{ value: '', disabled: true }, Validators.required],
          accidentalDeathDismemberment: [{ value: '', disabled: true }, Validators.required],
          disability: [{ value: '', disabled: true }, Validators.required],
          seriousIllnesses: [{ value: '', disabled: true }, Validators.required],
          waiverPremiumPayment: [{ value: '', disabled: true }, Validators.required],
          advancePaymentOfCapital: [{ value: '', disabled: true }, Validators.required],
        })
      }),
      relevantPaymentInformation: this.fb.group({
        method: [{ value: '', disabled: true }, [Validators.required]],
        form: ['', Validators.required],
      }),
      primaryBenefits: this.fb.group({
        dependentsC: this.fb.array([this.formMethods.createItem(this.primaryBenefits)]),
        personBenefited: this.fb.group({
          name: [''],
          family: [''],
          id2: [''],
          id2Attached: [''],
        })
      }),
      contingentBeneficiary: this.fb.group({
        dependentsC: this.fb.array([this.formMethods.createItem(this.contigentBenefits)]),
        personBenefited: this.fb.group({
          name: [''],
          family: [''],
          id2: [''],
          id2Attached: ['']
        }),
      }),
      bankTransfer: this.fb.group({
        bankEntity: [''],
        amount: ['', Validators.min(0)],
        contact: ['']
      }),
      generalInformation: this.fb.group({
        hasAnotherCoverage: ['', Validators.required],
        haveSmoked: ['', Validators.required],
        consumeAlcohol: ['', Validators.required],
        thinkTravel: ['', Validators.required],
        haveAlcoholTreatment: ['', Validators.required],
        haveBeenArrestedBecauseNarcotics: ['', Validators.required],
        haveLostDriveLicense: ['', Validators.required],
        anyoneProposed: ['', Validators.required],
        infoDiseaseCoverage: ['', Validators.required],
        disabilityBenefitsRequested: ['', Validators.required],
        haveFlownNotAsPassenger: ['', Validators.required],
        doXtremeSport: ['', Validators.required],
      }),
      medicalHistory: this.fb.group({
        haveHeartPain: ['', Validators.required],
        haveHypertension: ['', Validators.required],
        haveRespiratoryDisorder: ['', Validators.required],
        haveMentalNervousDisorder: ['', Validators.required],
        haveStomachDisorder: ['', Validators.required],
        haveEndocrineDisorder: ['', Validators.required],
        haveDiabetes: ['', Validators.required],
        haveSpineDisorder: ['', Validators.required],
        haveRenalDisorder: ['', Validators.required],
        haveUnexplainedDisease: ['', Validators.required],
        haveEyesNoseThroatProblem: ['', Validators.required],
        haveBloodDisorder: ['', Validators.required],
        haveBirthDefect: ['', Validators.required],
        haveMedicalProcedures: ['', Validators.required],
        haveBeenAPatient: ['', Validators.required],
        haveHadSpecializedTests: ['', Validators.required],
        haveNotCarriedOut: ['', Validators.required],
        haveTakenInLast12Months: ['', Validators.required],
        haveTestedPositiveForHiv: ['', Validators.required],
        havePlanToObtainMedicalTreatment: ['', Validators.required],
        haveDiabetesDiagnosis: ['', Validators.required],
        haveHadWeightChanges: ['', Validators.required],
        isWomen: ['', Validators.required],
        listDoctors: ['', Validators.required],
        informations: this.fb.group({}),
      }),
      agentReport: this.fb.group({
        connectionType: ['', Validators.required],
        insurancePurpose: ['', Validators.required],
        isMarried: ['', Validators.required],
        isLessThan21: ['', Validators.required],
        amountProposed: this.fb.group({
          approximateNetWorth: ['', [Validators.required, Validators.min(0)]],
          accruedIncome: ['', [Validators.required, Validators.min(0)]],
          unearnedIncome: ['', [Validators.required, Validators.min(0)]],
          occupation: ['', Validators.required],
        }),
        idInformation: this.fb.group({
          type: ['', Validators.required],
          issuedBy: ['', Validators.required],
          issuedDate: ['', Validators.required],
          expirationDate: ['', Validators.required],
        }),
        agentInformation: this.fb.group({
          city: ['', Validators.required],
          country: ['', Validators.required],
          date: ['', Validators.required],
          name: ['', Validators.required],
        }),
        getAnswersFromInsured: ['', Validators.required],
      }),
      files: this.fb.group({
        studies: this.fb.array([]),
      }),
      questionnaires: this.fb.group({}),
      contractorQuestionnaires: this.fb.group({}),
      payerQuestionnaires: this.fb.group({}),
      activitiesQuestionnaires: this.fb.group({}),
    });

    if (this.noCotizacion) {
      console.log(this.noCotizacion);
      console.log(this.newRequest.get('noC'));
      this.newRequest.get('noC').setValue(this.noCotizacion);
      this.newRequest.get('noC').disable();

    }

    this.primaryBenefitsArray = this.newRequest.get('primaryBenefits').get('dependentsC') as FormArray;
    this.contingentBeneficiaryArray = this.newRequest.get('contingentBeneficiary').get('dependentsC') as FormArray;
    this.dependentsFormArray = this.newRequest.get('dependents') as FormArray;
    this.filesStudiesArray = this.newRequest.get('files').get('studies') as FormArray;

    this.coveragesQuestions = [
      {
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

    this.sportsQuestions = [
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

    this.medicQuestions = [
      {
        label: 'a. ¿Dolor en el pecho, palpitaciones, fiebre reumática, soplo cardiaco, ataque cardiaco, aneurismas u otra enfermedad del corazón o los vasos sanguíneos?',
        name: 'haveHeartPain',
        array: 'heartPainList',
        group: 'heartPain'
      },
      {
        label: 'a. ¿Hipertensión arterial?',
        name: 'haveHypertension',
        array: 'hypertensionList',
        group: 'hypertensionVida'
      },
      {
        label: 'b. ¿Ahogos, ronquera, tos persistente, esputos de sangre, bronquitis, pleuresía, asma, enfisema, tuberculosis o trastornos respiratorios crónicos?',
        name: 'haveRespiratoryDisorder',
        array: 'respiratoryDisorderList',
        group: 'respiratoryDisorder'
      },
      {
        label: 'c. ¿Mareos, desmayos, epilepsia, convulsiones, dolor de cabeza, afección del habla, parálisis, apoplejía, trastorno mental o nervioso?',
        name: 'haveMentalNervousDisorder',
        array: 'mentalNervousDisorderList',
        group: 'mentalNervousDisorder'
      },
      {
        label: 'd. ¿Ictericia, hemorragia intestinal, úulcera, hernia, apendicitis, colitis, diverticulitis, hemorroides, indigestión recurrente u otro desorden del estómago, intestino, hígado, hepatitis B o C y vesícula biliar?',
        name: 'haveStomachDisorder',
        array: 'stomachDisorderList',
        group: 'stomachDisorder'
      },
      {
        label: 'e. ¿Tiroides u otro trastorno endocrino?',
        name: 'haveEndocrineDisorder',
        array: 'endocrineDisorderList',
        group: 'endocrineDisorder'
      },
      {
        label: 'e. ¿Diabetes?',
        name: 'haveDiabetes',
        array: 'diabetesList',
        group: 'diabetesVida'
      },
      {
        label: 'f. ¿Neuritis, ciática, reumatismo, artritis, gota o desorden de los músculos o huesos, incluso de la columna vertebral, ¿la espalda y las articulaciones?',
        name: 'haveSpineDisorder',
        array: 'spineDisorderList',
        group: 'spineDisorder'
      },
      {
        label: 'g. ¿Enfermedad de la piel, ganglios linfáticos, quiste, tumor, cáncer, sudores nocturnos, fatiga o fiebre sin explicación?',
        name: 'haveUnexplainedDisease',
        array: 'unexplainedDiseaseList',
        group: 'unexplainedDisease'
      },
      {
        label: 'h. ¿Albúmina, azúcar, sangre o pus en la orina, enfermedades venéreas, cálculos renales u otros trastornos renales, de la vejiga, próstata u órganos reproductivos?',
        name: 'haveRenalDisorder',
        array: 'renalDisorderList',
        group: 'renalDisorder'
      },
      {
        label: 'i. ¿Cualquier problema de los ojos, oídos, nariz o garganta?',
        name: 'haveEyesNoseThroatProblem',
        array: 'eyesNoseThroatProblemList',
        group: 'eyesNoseThroatProblem'
      },
      {
        label: 'j. ¿Alergias, anemia u otro desorden sanguíneo?',
        name: 'haveBloodDisorder',
        array: 'bloodDisorderList',
        group: 'bloodDisorder'
      },
      {
        label: 'k. ¿Ha tenido alguna deformidad, enfermedad o defecto congénito?',
        name: 'haveBirthDefect',
        array: 'birthDefectList',
        group: 'birthDefect'
      },
      {
        label: 'l. ¿Ha tenido un examen médico, consulta, enfermedad, lesión o procedimientos médicos ambulatorios o intrahospitalarios?',
        name: 'haveMedicalProcedures',
        array: 'medicalProceduresList',
        group: 'medicalProcedures'
      },
      {
        label: 'm. ¿Ha sido paciente en un hospital, clínica, sanatorio u otra institución médica?',
        name: 'haveBeenAPatient',
        array: 'beenAPatientList',
        group: 'beenAPatient'
      },
      {
        label: 'n. ¿Se ha hecho un electrocardiograma, radiografía u otras pruebas especializadas?',
        name: 'haveHadSpecializedTests',
        array: 'hadSpecializedTestsList',
        group: 'hadSpecializedTests'
      },
      {
        label: 'o. ¿Se le aconsejó alguna prueba diagnóstica, hospitalización o cirugía que no se ha llevado a cabo?',
        name: 'haveNotCarriedOut',
        array: 'notCarriedOutList',
        group: 'notCarriedOut2'
      },
      {
        label: '3. ¿Ha tomado el Propuesto Asegurado en los últimos 12 meses algún medicamento prescrito, o ha recibido tratamiento que haya excedido 14 días?',
        name: 'haveTakenInLast12Months',
        array: 'takenInLast12MonthsList',
        group: 'takenInLast12Months'
      },
      {
        label: '4. ¿Tiene provisto a obtener tratamiento y opinión médica en los próximos 6 meses?',
        name: 'havePlanToObtainMedicalTreatment',
        array: 'planToObtainMedicalTreatmentList',
        group: 'planToObtainMedicalTreatment'
      },
      {
        label: '5. ¿Ha tenido resultado positivos por haber sido expuesto a la infección del VIH o ha sido diagnosticado con el complejo relacionado con el SIDA por causa de infección VIH u otra enfermedad o condición derivada de dicha infección?',
        name: 'haveTestedPositiveForHiv',
        array: 'testedPositiveForHIVList',
        group: 'testedPositiveForHiv'
      },
      {
        label: '6. ¿Existe un historial de muertes por enfermedad coronaria arterial, embolia, cáncer o enfermedades de los riñones, ya sea de un padre o hermano natural antes de la edad de 60 años, o un diagnóstico de diabetes mellitus antes de la edad de 50 años?',
        name: 'haveDiabetesDiagnosis',
        array: 'diabetesDiagnosisList',
        group: 'diabetesDiagnosis'
      },
      {
        label: '7. ¿Ha tenido algún cambio de peso durante los últimos doce meses?',
        name: 'haveHadWeightChanges',
        group: 'weightChanges'
      },
      {
        label: '8. ¿Es una mujer el Asegurado Propuesto?',
        name: 'isWomen',
        group: 'womenInformation'
      },
      {
        label: '9. Liste los nombres y direcciones de los médicos que usted ha consultado recientemente por cualquier razón y el médico de cabecera, si fuera diferente.',
        name: 'listDoctors',
        array: 'doctorList',
        group: 'doctors'
      }
    ];

    this.generalInfoQuestions = [
      {
        label: 'a. ¿Ha fumado cigarrillos, cigarros, pipas o utilizado productos de tabaco o nicotina en cualquier forma, incluyendo olido, sumergido, masticado, parches de nicotina, chicle u otros sustitutos en los últimos 24 meses?',
        name: 'haveSmoked',
        group: 'smoked'
      },
      {
        label: 'b. ¿Consume bebidas alcohólicas?',
        name: 'consumeAlcohol',
        group: 'alcohol'
      },
      {
        label: 'c. Piensa viajar fuera de su país?',
        name: 'thinkTravel',
        group: 'travelInformation'
      },
      {
        label: 'd. ¿Ha recibido tratamiento o se ha unido a una organización por motivo de dependencia o abuso del alcohol?',
        name: 'haveAlcoholTreatment',
        group: 'alcoholTreatment'
      },
      {
        label: 'e. ¿Ha sido arrestado por el uso, posesión, venta, distribución o cualquier acto delictivo relacionado de manera directa o indirecta con marihuana, narcóticos, sustancias alucinógenas o que alteren la mente no prescritas por un médico?',
        name: 'haveBeenArrestedBecauseNarcotics',
        group: 'arrested'
      },
      {
        label: 'f. ¿Se le ha suspendido o revocado alguna vez la licencia de conducir, ha sido convicto de 3 o más violaciones de vehículo automotor en movimiento, ha tenido 2 o más accidentes mientras maneja un vehículo automotor, o ha sido convicto de manejar un vehículo automotor mientras estaba bajo la influencia del alcohol o las drogas?',
        name: 'haveLostDriveLicense',
        group: 'lostDriveLicense'
      },
      {
        label: 'En los últimos tres años, ¿alguna persona propuesta para cobertura ha sido calificado, pospuesto o negado un seguro de vida o de salud?',
        name: 'anyoneProposed',
        group: 'insuranceProposed'
      },
      {
        label: '3. Favor de proporcionar detalle de su cobertura de enfermedades graves, si la tiene.',
        name: 'infoDiseaseCoverage',
        group: 'diseaseCoverageInformation'
      },
      {
        label: '¿Alguna vez ha solicitado o recibido beneficios por incapacidad?',
        name: 'disabilityBenefitsRequested',
        group: 'disabilityBenefits'
      },
      {
        label: 'a. ¿Volado en otra capacidad que no sea la de pasajero en una aerolínea comercial?',
        name: 'haveFlownNotAsPassenger',
        group: 'flowNotAsPassenger'
      },
      {
        label: 'b. ¿Participado en actividades que involucren el uso o las carreras en un “scooter”, motorizado, motocicleta, carro u otro vehículo impulsado, participado en deportes submarinos, buceo SCUBA, planeadores de mano, paracaidismo, saltos BASE, saltos en cuerda elástica (bungee jumping), paracaidismo con cometa (para-kiting), paracaidismo planeador (skydiving), esquí con helicóptero, o escalar rocas o montaña?',
        name: 'doXtremeSport',
        group: 'xtremeSport'
      },
    ];


    const ageSubscriber = this.newRequest.get('person').get('date').valueChanges.subscribe(value => {
      const form = this.newRequest.get('releventPlanInformation').get('coverages') as FormGroup;
      const questionnairesForm = this.newRequest.get('questionnaires') as FormGroup;

      const timeDiff = Math.abs(Date.now() - new Date(value).getTime());
      const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      this.newRequest.get('person').get('age').setValue(age);

      /*form.removeControl('advancePaymentOfCapital');
      form.removeControl('accidentalDeathDismemberment');
      form.removeControl('disability');
      form.removeControl('seriousIllnesses');
      form.removeControl('waiverPremiumPayment');

      if (age >= 18 && age <= 70) {
        form.addControl('advancePaymentOfCapital', this.fb.control('', [Validators.required, Validators.max(300000)]));
        form.addControl('accidentalDeathDismemberment', this.fb.control('', [Validators.required, Validators.max(400000)]));
        form.addControl('disability', this.fb.control('', [Validators.required, Validators.max(400000)]));
        form.addControl('seriousIllnesses', this.fb.control('', [Validators.required, Validators.max(400000)]));
        form.addControl('waiverPremiumPayment', this.fb.control('', [Validators.required]));
      } else if (age >= 18 && age <= 65) {
        form.addControl('accidentalDeathDismemberment', this.fb.control('', [Validators.required, Validators.max(400000)]));
        form.addControl('disability', this.fb.control('', [Validators.required, Validators.max(400000)]));
        form.addControl('seriousIllnesses', this.fb.control('', [Validators.required, Validators.max(400000)]));
        form.addControl('waiverPremiumPayment', this.fb.control('', [Validators.required]));
      } else if (age >= 18 && age <= 59) {
        form.addControl('disability', this.fb.control('', [Validators.required, Validators.max(400000)]));
        form.addControl('seriousIllnesses', this.fb.control('', [Validators.required, Validators.max(400000)]));
        form.addControl('waiverPremiumPayment', this.fb.control('', [Validators.required]));
      } else if (age >= 18 && age <= 55) {
        form.addControl('waiverPremiumPayment', this.fb.control('', [Validators.required]));
      }*/

    });

    const weightBmiSubscriber = this.newRequest.get('person').get('weight').valueChanges.subscribe(value => {
      this.getBmi();
    });

    const coveragesAmountSubscriber = this.newRequest.get('releventPlanInformation').get('coverages').valueChanges.subscribe(value => {
      let totalAmount = 0;
      const formQ = this.newRequest.get('questionnaires') as FormGroup;
      const formF = this.newRequest.get('files') as FormGroup;
      const formRPI = this.newRequest.get('releventPlanInformation').get('coverages') as FormGroup;
      const age = this.newRequest.get('person').get('age').value;

      for (const key in formRPI.getRawValue()) {
        if (formRPI.getRawValue().hasOwnProperty(key)) {
          if (key !== 'id') {
            const element = formRPI.getRawValue()[key];
            if (!isNaN(parseInt(element, 10))) {
              totalAmount += parseInt(element, 10);
            }
          }
        }
      }

      if (totalAmount >= 500000) {
        formQ.addControl('solicitudEstadoFinancieroConfidencial', this.fb.group({}));
      } else {
        formQ.removeControl('solicitudEstadoFinancieroConfidencial');
      }

      this.deleteFiles(formF);
      if (totalAmount >= 25000 && totalAmount <= 50000) {
        if (age >= 18 && age <= 35) {
          this.addFilesA(formF);
        } else if (age >= 36 && age <= 55) {
          this.addFilesA(formF);
        } else if (age >= 56 && age <= 65) {
          this.addFilesA(formF);
        } else if (age >= 66) {
          this.addFilesA(formF);
          this.addFilesB(formF);
          this.addFilesE(formF);
        }
      } else if (totalAmount >= 50001 && totalAmount <= 250000) {
        if (age >= 18 && age <= 35) {
          this.addFilesA(formF);
        } else if (age >= 36 && age <= 55) {
          this.addFilesA(formF);
        } else if (age >= 56 && age <= 65) {
          this.addFilesA(formF);
          this.addFilesB(formF);
          this.addFilesE(formF);
        } else if (age >= 66) {
          this.addFilesA(formF);
          this.addFilesB(formF);
          this.addFilesE(formF);
        }
      } else if (totalAmount >= 250001 && totalAmount <= 500000) {
        if (age >= 18 && age <= 35) {
          this.addFilesA(formF);
          this.addFilesB(formF);
          this.addFilesC(formF);
        } else if (age >= 36 && age <= 55) {
          this.addFilesA(formF);
          this.addFilesB(formF);
          this.addFilesC(formF);
          if (age >= 45) {
            this.addFilesE(formF);
          }
        } else if (age >= 56 && age <= 65) {
          this.addFilesA(formF);
          this.addFilesB(formF);
          this.addFilesC(formF);
          this.addFilesE(formF);
        } else if (age >= 66) {
          this.addFilesA(formF);
          this.addFilesB(formF);
          this.addFilesC(formF);
          this.addFilesE(formF);
        }
      } else if (totalAmount >= 500001 && totalAmount <= 750000) {
        if (age >= 18 && age <= 35) {
          this.addFilesA(formF);
          this.addFilesB(formF);
          this.addFilesC(formF);
          this.addFilesD(formF);
        } else if (age >= 36 && age <= 55) {
          this.addFilesABCDE(formF);
        } else if (age >= 56 && age <= 65) {
          this.addFilesABCDE(formF);
        } else if (age >= 66) {
          this.addFilesABCDE(formF);
        }
      } else if (totalAmount >= 750001 && totalAmount <= 1000000) {
        if (age >= 18 && age <= 35) {
          this.addFilesA(formF);
          this.addFilesB(formF);
          this.addFilesC(formF);
          this.addFilesD(formF);
        } else if (age >= 36 && age <= 55) {
          this.addFilesABCDE(formF);
        } else if (age >= 56 && age <= 65) {
          this.addFilesABCDE(formF);
        } else if (age >= 66) {
          this.addFilesABCDE(formF);
        }
      } else if (totalAmount >= 1000001) {
        if (age >= 18 && age <= 35) {
          this.addFilesABCDE(formF);
        } else if (age >= 36 && age <= 55) {
          this.addFilesABCDE(formF);
        } else if (age >= 56 && age <= 65) {
          this.addFilesABCDE(formF);
          if (totalAmount >= 2000001) {
            this.addFilesF(formF);
          }
        } else if (age >= 66) {
          this.addFilesABCDE(formF);
          if (totalAmount >= 2000001) {
            this.addFilesF(formF);
          }
        }
      }

    });

    const heightBmiSubscriber = this.newRequest.get('person').get('height').valueChanges.subscribe(value => {
      this.getBmi();
    });

    const heightUnitBmiSubscriber = this.newRequest.get('person').get('heightUnit').valueChanges.subscribe(value => {
      this.getBmi();
      if (value === 'PIE') {
        setTimeout(() => {
          const inchesBmiSubscriber = this.newRequest.get('person').get('inches').valueChanges.subscribe(response => {
            this.getBmi();
          });
        }, 2000);
      }
    });

    const weightUnitBmiSubscriber = this.newRequest.get('person').get('weightUnit').valueChanges.subscribe(value => {
      this.getBmi();
    });

    if (this.ID != null) {
      console.log('El ID es ' + this.ID);
      this.getData(this.ID);
    }
    else if (this.ID == null) {
      console.log('ID esta vacio');
    }

    if (this.noCotizacion != null) {
      this.searchIdNumber(this.noCotizacion);
      console.log('El noCotizacion es ' + this.noCotizacion);
    } else if (this.noCotizacion == null) {
      console.log('noCotizacion esta vacio');
    }


  }

  // foreignWithoutResidenceChecker(event: any, target: string, form: any, targetForm: any) {
  //   console.log(event);

  //   switch (this.role) {
  //     case 'WWS':
  //       if (form.get('countryOfResidence').value !== 'REPÚBLICA DOMINICANA' && form.get('countryOfBirth').value !== 'REPÚBLICA DOMINICANA') {
  //         if (!targetForm.get('money-laundering')) {
  //           targetForm.addControl('solucionAntiLavadoDinero', this.fb.group({}));
  //         }
  //       } else {
  //         switch (target) {
  //           case 'person':
  //             if (this.newRequest.get('exposedPerson').get('isExposed').value !== 'SI') {
  //               targetForm.removeControl('solucionAntiLavadoDinero');
  //             }
  //             break;

  //           case 'contractor':
  //             if (this.newRequest.get('exposedPerson').get('isContractorExposed').value !== 'SI' && this.newRequest.get('person').get('contractorIsLegalEntity').value !== 'SI') {
  //               targetForm.removeControl('solucionAntiLavadoDinero');
  //             }
  //             break;

  //           case 'payer':
  //             if (this.newRequest.get('exposedPerson').get('isPayerExposed').value !== 'SI' && this.newRequest.get('person').get('payerIsLegalEntity').value !== 'SI') {
  //               targetForm.removeControl('solucionAntiLavadoDinero');
  //             }
  //             break;

  //           default:
  //             break;
  //         }
  //       }
  //       break;

  //     case 'WMA':
  //       if (form.get('countryOfResidence').value !== 'PANAMÁ' && form.get('countryOfBirth').value !== 'PANAMÁ') {
  //         if (!targetForm.get('money-laundering')) {
  //           targetForm.addControl('solucionAntiLavadoDinero', this.fb.group({}));
  //         }
  //       } else {
  //         switch (target) {
  //           case 'person':
  //             if (this.newRequest.get('exposedPerson').get('isExposed').value !== 'SI') {
  //               targetForm.removeControl('solucionAntiLavadoDinero');
  //             }
  //             break;

  //           case 'contractor':
  //             if (this.newRequest.get('exposedPerson').get('isContractorExposed').value !== 'SI' && this.newRequest.get('person').get('contractorIsLegalEntity').value !== 'SI') {
  //               targetForm.removeControl('solucionAntiLavadoDinero');
  //             }
  //             break;

  //           case 'payer':
  //             if (this.newRequest.get('exposedPerson').get('isPayerExposed').value !== 'SI' && this.newRequest.get('person').get('payerIsLegalEntity').value !== 'SI') {
  //               targetForm.removeControl('solucionAntiLavadoDinero');
  //             }
  //             break;

  //           default:
  //             break;
  //         }
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  // }

  fileNameWatcher(type?: string) {
    if (this.filesInformation) {
      if (this.filesInformation[type + 'Url']) { return this.filesInformation[type + 'Url']; }
    }
  }

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

  arrayStudiesWatcher(i: number) {
    if (this.arrayFilesTitles) {
      if (this.arrayFilesTitles[i] && this.newRequest.get('files').get('studies').get(i.toString()).value.study !== '') {
        return this.arrayFilesTitles[i].studyUrl;
      }
    }
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

  onFileChange(event, formName) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.newRequest.get('files').patchValue({
          [formName]: reader.result
        });

        this.cd.markForCheck();
      };
    }
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

          //this.markForCheck();
        };
      }
    }
    else if (name == 'copyId') {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.newRequest.get('files').get('copyId').get(i.toString()).patchValue({
            ['copyId']: reader.result
          });

          //this.markForCheck();
        };
      }
    }
    else if (name == 'mercantile') {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.newRequest.get('files').get('mercantile').get(i.toString()).patchValue({
            ['register']: reader.result
          });

          //this.markForCheck();
        };
      }
    }
  }

  onFileChangeOnArray(event, formName, i?: number, group?: string) {
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

  setStep(index: number) {
    this.step = index;
  }

  nextStep(panel?: string) {
    if (panel === 'laborales') {
      console.log(!this.newRequest.get('contractor'));
      console.log(!this.newRequest.get('payer'));
      console.log((!this.newRequest.get('contractor') && !this.newRequest.get('payer')));

      if (!this.newRequest.get('contractor') && !this.newRequest.get('payer')) {
        this.step += 3;
      } else if ((!this.newRequest.get('contractor'))) {
        this.step += 2;
      } else if ((!this.newRequest.get('payer'))) {
        this.step++;
      } else {
        this.step++;
      }
    } else if (panel === 'contractor') {
      if (!this.newRequest.get('payer')) {
        this.step += 2;
      } else {
        this.step++;
      }
    } else {
      this.step++;
    }
  }

  addFilesABCDE(form: FormGroup) {
    this.addFilesA(form);
    this.addFilesB(form);
    this.addFilesC(form);
    this.addFilesD(form);
    this.addFilesE(form);
  }

  addFilesA(form: FormGroup) {
    form.addControl('healthDeclaration', this.fb.control('', Validators.required));
    form.addControl('id2', this.fb.control('', Validators.required));
  }

  addFilesB(form: FormGroup) {
    form.addControl('medicExam', this.fb.control('', Validators.required));
  }

  addFilesC(form: FormGroup) {
    form.addControl('glycemia', this.fb.control('', Validators.required));
    form.addControl('hbA1C', this.fb.control('', Validators.required));
    form.addControl('totalCholestor', this.fb.control('', Validators.required));
    form.addControl('HDL', this.fb.control('', Validators.required));
    form.addControl('triglycerides', this.fb.control('', Validators.required));
    form.addControl('creatinine', this.fb.control('', Validators.required));
    form.addControl('AST', this.fb.control('', Validators.required));
    form.addControl('ALT', this.fb.control('', Validators.required));
    form.addControl('GGT', this.fb.control('', Validators.required));
    form.addControl('HIV', this.fb.control('', Validators.required));
    form.addControl('cocaine', this.fb.control('', Validators.required));
    form.addControl('nicotine', this.fb.control('', Validators.required));
  }

  addFilesD(form: FormGroup) {
    form.addControl('urineAnalysis', this.fb.control('', Validators.required));
  }

  addFilesE(form: FormGroup) {
    form.addControl('restingElectrocardiogram', this.fb.control('', Validators.required));
  }

  addFilesF(form: FormGroup) {
    form.addControl('stressElectrocardiogram', this.fb.control('', Validators.required));
  }

  deleteFiles(form: FormGroup) {
    form.removeControl('stressElectrocardiogram');
    form.removeControl('restingElectrocardiogram');
    form.removeControl('urineAnalysis');
    form.removeControl('glycemia');
    form.removeControl('hbA1C');
    form.removeControl('totalCholestor');
    form.removeControl('HDL');
    form.removeControl('triglycerides');
    form.removeControl('creatinine');
    form.removeControl('AST');
    form.removeControl('ALT');
    form.removeControl('GGT');
    form.removeControl('HIV');
    form.removeControl('cocaine');
    form.removeControl('nicotine');
    form.removeControl('healthDeclaration');
    form.removeControl('id2');
    form.removeControl('medicExam');

  }

  getBmi() {
    const weightUnit = this.newRequest.get('person').get('weightUnit').value;
    const heightUnit = this.newRequest.get('person').get('heightUnit').value;

    let weight = this.newRequest.get('person').get('weight').value;
    let height = this.newRequest.get('person').get('height').value;
    let inches;

    if (this.newRequest.get('person').get('inches')) { inches = this.newRequest.get('person').get('inches').value; }

    if (weightUnit === 'LIBRAS') { weight = weight / 2.205; }
    if (heightUnit === 'PIE') {
      height = (((height * 12) + inches) * 2.54) / 100;
    }
    const bmi = weight / ((height / 100) * (height * 100));

    if (bmi !== Infinity && !isNaN(bmi)) {
      const value = parseFloat(`${bmi}`).toFixed(2);
      this.newRequest.get('person').get('bmi').setValue(value);
    }
  }

  onHeightUnitChange(evento) {
    const form = this.newRequest.get('person') as FormGroup;
    if (evento.valor === 'PIE') {
      form.addControl('inches', this.fb.control('', [Validators.required, Validators.min(0), Validators.max(11)]));
    } else {
      form.removeControl('inches');
    }

    this.getBmi();
  }

  onWeightUnitChange() {
    this.getBmi();

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

  ngDoCheck(): void {
    //   this.maxWidth = window.matchMedia('(max-width: 11270px)');
    if (this.newRequest.get('generalInformation').get('hasAnotherCoverage').value == 'NO' &&
      this.newRequest.get('generalInformation').get('anotherCoverages')) {

      const formQDoCheck = this.newRequest.get('generalInformation') as FormGroup;
      formQDoCheck.removeControl('anotherCoverages');
    }

    if (this.newRequest.get('generalInformation').get('hasAnotherCoverage').value == 'SI') {

      if ((this.newRequest.get('generalInformation').get('changeAnotherCoverage').value == 'NO'
        || this.newRequest.get('generalInformation').get('changeAnotherCoverage').value == ''
        || this.newRequest.get('generalInformation').get('changeAnotherCoverage').value == null
        || this.newRequest.get('generalInformation').get('changeAnotherCoverage').value == undefined) &&
        this.newRequest.get('generalInformation').get('changingCoverages')) {

        const formCBDoCheck = this.newRequest.get('generalInformation') as FormGroup;
        formCBDoCheck.removeControl('changingCoverages');
      }
    }

    if (this.newRequest.get('generalInformation').get('anyoneProposed').value == 'NO' &&
      this.newRequest.get('generalInformation').get('insuranceProposed')) {

      const formGIDoCheck = this.newRequest.get('generalInformation') as FormGroup;
      formGIDoCheck.removeControl('insuranceProposed');
    }
    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < this.medicQuestions.length; x++) {

      if (this.medicQuestions[x].name != 'haveHadWeightChanges' && this.medicQuestions[x].name != 'isWomen'
        && this.newRequest.get('medicalHistory').get(this.medicQuestions[x].name).value == 'NO' &&
        this.newRequest.get('medicalHistory').get('informations').get(this.medicQuestions[x].group)) {

        const formHMIDoCheck = this.newRequest.get('medicalHistory').get('informations') as FormGroup;
        formHMIDoCheck.removeControl(this.medicQuestions[x].group);

        this[this.medicQuestions[x].array] = undefined;
        // console.log( 'El array ' + this[this.medicQuestions[x].array] + ' es igual a ' + typeof this[this.medicQuestions[x].array]);
      }
    }

    if (this.newRequest.get('medicalHistory').get('informations').get('womenInformation')) {
      if ((this.newRequest.get('medicalHistory').get('informations').get('womenInformation').value.haveDisorder == 'NO'
        || this.newRequest.get('medicalHistory').get('informations').get('womenInformation').value.haveDisorder == ''
        || this.newRequest.get('medicalHistory').get('informations').get('womenInformation').value.haveDisorder == null
        || this.newRequest.get('medicalHistory').get('informations').get('womenInformation').value.haveDisorder == undefined)
        && this.newRequest.get('medicalHistory').get('informations').get('womenInformation').get('disorders')) {

        const formWIDoCheck = this.newRequest.get('medicalHistory').get('informations').get('womenInformation') as FormGroup;
        formWIDoCheck.removeControl('disorders');
        this.womenDisordersList = undefined;
      }
    }

    if (this.newRequest.get('agentReport').get('isLessThan21').value == 'NO' &&
      this.newRequest.get('agentReport').get('familyInsurances')) {

      const formARDoCheck = this.newRequest.get('agentReport') as FormGroup;
      formARDoCheck.removeControl('familyInsurances');
      this.familyRelationshipInsurances = undefined;
    }
  }

  searchIdNumber(idNumber: string) {
    // this.appComponent.showOverlay = true;
    this.userService.getQuotes(idNumber, 'vida')
      .subscribe((response: any) => {
        console.log(response);
        // this.appComponent.showOverlay = false;
        if (response.data !== null && response.data !== undefined) {
          this.showContent = true;

          const dialogRef = this.dialog.open(BaseDialogComponent, {
            data: this.dialogOption.noCFound(response.data),
            minWidth: 385,
          });
          setTimeout(() => {
            dialogRef.close();
          }, 4000);
          this.newRequest.get('person').get('firstName').setValue(response.data.nombre);
          this.newRequest.get('person').get('date').setValue(response.data.fecha_nacimiento);
          this.newRequest.get('relevantPaymentInformation').get('method').setValue(response.data.formaPago);



          this.newRequest.get('releventPlanInformation').get('coverages').get('accidentalDeathDismemberment').setValue(response.data.desmembramientos);
          this.newRequest.get('releventPlanInformation').get('coverages').get('disability').setValue(response.data.invalidez);
          this.newRequest.get('releventPlanInformation').get('coverages').get('seriousIllnesses').setValue(response.data.enfermedades_graves);
          this.newRequest.get('releventPlanInformation').get('coverages').get('waiverPremiumPayment').setValue(response.data.exoneracion);
          this.newRequest.get('releventPlanInformation').get('coverages').get('advancePaymentOfCapital').setValue(response.data.pago_anticipado);

          this.newRequest.get('releventPlanInformation').get('coverages').get('basicLife').setValue(response.data.suma_asegurada);
          this.newRequest.get('releventPlanInformation').get('coverages').get('survival').setValue(response.data.suma_asegurada_supervivencia);
          this.newRequest.get('releventPlanInformation').get('type').setValue(response.data.plan);
          this.newRequest.get('releventPlanInformation').get('bonus').setValue(response.data.prima);
          this.newRequest.get('releventPlanInformation').get('nicotineEstandar').setValue(response.data.nicotineStandar);
          this.newRequest.get('releventPlanInformation').get('timeAmount').setValue(response.data.periodo_cobertura);
          switch (response.data.sexo) {
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
          this.showContent = false;

          this.newRequest.get('person').get('firstName').reset();
          this.newRequest.get('person').get('date').reset();
          this.newRequest.get('relevantPaymentInformation').get('method').reset();
          this.newRequest.get('releventPlanInformation').get('type').reset();

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
      window.open(`${environment.urlCotizadores}/?cia=wws`, '_blank');
    } else if (this.userService.getRoleCotizador() === 'WMA') {
      window.open(`${environment.urlCotizadores}/?cia=wwm`, '_blank');
    }
  }

  showWarningDot(form: any): boolean {
    if (!this.ID) {
      if (!form.valid && this.form.submitted) {
        return true;
      } else {
        return false;
      }
    } else {
      if (form.valid) {
        return false;
      } else {
        return true;
      }
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.submitted) {
      return true;
    }

    if (this.newRequest.dirty && !this.form.submitted) {
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



  selectChange(event) {
    const formCB = this.newRequest.get('contingentBeneficiary') as FormGroup;
    const formQ = this.newRequest.get('questionnaires') as FormGroup;
    const formCQ = this.newRequest.get('contractorQuestionnaires') as FormGroup;
    const formPQ = this.newRequest.get('payerQuestionnaires') as FormGroup;
    const formAQ = this.newRequest.get('activitiesQuestionnaires') as FormGroup;
    const formEP = this.newRequest.get('exposedPerson') as FormGroup;
    const formAR = this.newRequest.get('agentReport') as FormGroup;
    const formP = this.newRequest.get('person') as FormGroup;
    const formC = this.newRequest.get('contractor') as FormGroup;
    const formPA = this.newRequest.get('payer') as FormGroup;
    const formGI = this.newRequest.get('generalInformation') as FormGroup;
    const formHMI = this.newRequest.get('medicalHistory').get('informations') as FormGroup;
    const formWI = this.newRequest.get('medicalHistory').get('informations').get('womenInformation') as FormGroup;
    const formFiles = this.newRequest.get('files') as FormGroup;

    console.log('SELECT CHANGE EVENT: ', event);

    if (event.name === 'connectionType') {
      switch (event.valor) {
        case 'FAMILIA':
          formAR.removeControl('connectionTypeInfo');
          formAR.addControl('connectionTypeInfo', this.fb.group({
            relationship: ['', Validators.required],
          }));
          break;

        case 'AMIGO':
          formAR.removeControl('connectionTypeInfo');
          formAR.addControl('connectionTypeInfo', this.fb.group({
            friendship: ['', Validators.required],
            amount: ['', [Validators.required, Validators.min(1)]],
            time: ['', Validators.required],
          }));
          break;

        case 'CLIENTE':
          formAR.removeControl('connectionTypeInfo');
          formAR.addControl('connectionTypeInfo', this.fb.group({
            amount: ['', [Validators.required, Validators.min(1)]],
            time: ['', Validators.required],
          }));
          break;

        case '¿LO ACABA DE CONOCER?':
          formAR.removeControl('connectionTypeInfo');
          formAR.addControl('connectionTypeInfo', this.fb.group({
            how: ['', Validators.required],
          }));
          break;

        default:
          break;
      }
    }

    if (event.name === 'smoked') {
      switch (event.valor) {
        case 'EX-FUMADOR':
          formGI.addControl('lastTimeSmoked', this.fb.control('', Validators.required));
          break;

        case 'FUMADOR':
          formGI.removeControl('lastTimeSmoked');
          break;

        default:
          break;
      }
    }

    if (event.valor === 'SI') {
      //console.log(`aqui estoy yo '${event.name}'`);
      switch (event.name) {
        case 'diving':
          formAQ.addControl('solicitudBuceo', this.fb.group({}));
          break;

        case 'racing':
          formAQ.addControl('solicitudMoto', this.fb.group({}));
          break;

        case 'skydiving':
          formAQ.addControl('solicitudAviacion', this.fb.group({}));
          break;

        case 'mountaineering':
          formAQ.addControl('solicitudMontanismo', this.fb.group({}));
          break;

        case 'isExposed':
          formEP.addControl('insured', this.fb.group({
            lastPosition: ['', Validators.required],
            timeNumber: ['', Validators.required]
          }));
          // if (!formQ.get('money-laundering')) {
          //   formQ.addControl('solucionAntiLavadoDinero', this.fb.group({}));
          // }
          break;

        case 'isPayerExposed':
          formEP.addControl('payer', this.fb.group({
            lastPosition: ['', Validators.required],
            timeNumber: ['', Validators.required]
          }));
          // if (!formPQ.get('money-laundering')) {
          //   formPQ.addControl('solucionAntiLavadoDinero', this.fb.group({}));
          // }
          break;

        case 'isContractorExposed':
          formEP.addControl('contractor', this.fb.group({
            lastPosition: ['', Validators.required],
            timeNumber: ['', Validators.required]
          }));
          // if (!formCQ.get('money-laundering')) {
          //   formCQ.addControl('solucionAntiLavadoDinero', this.fb.group({}));
          // }

          break;

        case 'sameAsPayer':
          // formEP.removeControl('payer');
          // this.newRequest.removeControl('payer');
          // formEP.removeControl('isPayerExposed');
          // formP.removeControl('payerIsLegalEntity');
          // formP.removeControl('payerLegalEntity');
          // formPQ.removeControl('solucionAntiLavadoDinero');

          if (formP.get('contractorLegalEntity')) {
            formP.removeControl('contractorLegalEntity');
          }
          if (this.newRequest.get('files').get('copyId')) {
            formFiles.removeControl('copyId');
          }
          formP.addControl('payerIsLegalEntity', this.fb.control('', Validators.required));
          break;

        case 'payerIsLegalEntity':
          // this.newRequest.removeControl('payer');
          // formP.addControl('payerLegalEntity', this.fb.group({}));
          if (!formQ.get('solucionAntiLavadoDinero')) {
            formQ.addControl('solucionAntiLavadoDinero', this.fb.group({}));
          }

          if (!(formP.get('payerLegalEntity'))) {
            formP.addControl('payerLegalEntity', this.fb.group({}));
          }
          if (!(this.newRequest.get('files').get('mercantile'))) {
            formFiles.addControl('mercantile', this.fb.array([this.createFormArray('mercantileRegister')]));
            this.mercantileRegisterArray = this.newRequest.get('files').get('mercantile') as FormArray;
          }
          else if (this.newRequest.get('files').get('mercantile')) {
            formFiles.removeControl('mercantile');
            formFiles.addControl('mercantile', this.fb.array([this.createFormArray('mercantileRegister')]));
            this.mercantileRegisterArray = this.newRequest.get('files').get('mercantile') as FormArray;
          }
          // formInsured.addControl('antiLaundering', this.fb.group({}));
          break;

        case 'sameAsContractor':
          // formEP.removeControl('contractor');
          // this.newRequest.removeControl('contractor');
          // formEP.removeControl('isContractorExposed');
          // formP.removeControl('contractorIsLegalEntity');
          // formP.removeControl('contractorLegalEntity');
          // formCQ.removeControl('solucionAntiLavadoDinero');
          if (!(formP.get('contractorIsLegalEntity'))) {
            formP.addControl('contractorIsLegalEntity', this.fb.control('', Validators.required));
          }

          if (!(this.newRequest.get('files').get('documentsKnowClient'))) {
            formFiles.addControl('documentsKnowClient', this.fb.array([this.createFormArray('filesDocumentsKnowClient')]));
            this.filesDocumentsKnowClientArray = this.newRequest.get('files').get('documentsKnowClient') as FormArray;
          }
          else if (this.newRequest.get('files').get('documentsKnowClient')) {
            formFiles.removeControl('documentsKnowClient');
            formFiles.addControl('documentsKnowClient', this.fb.array([this.createFormArray('filesDocumentsKnowClient')]));
            this.filesDocumentsKnowClientArray = this.newRequest.get('files').get('documentsKnowClient') as FormArray;
          }
          break;

        case 'contractorIsLegalEntity':
          // this.newRequest.removeControl('contractor');
          // formP.addControl('contractorLegalEntity', this.fb.group({}));
          // if (!formCQ.get('money-laundering')) {
          //   formCQ.addControl('solucionAntiLavadoDinero', this.fb.group({}));
          // }
          formEP.addControl('isPayerExposed', this.fb.control('', Validators.required));
          formEP.addControl('isContractorExposed', this.fb.control('', Validators.required));
          formP.addControl('sameAsPayer', this.fb.control('', Validators.required));

          if (!this.newRequest.get('contractor')) {
            this.newRequest.addControl('contractor', this.fb.group({
              firstName: ['', Validators.required],
              secondName: ['', Validators.required],
              lastName: ['', Validators.required],
              date: ['', Validators.required],
              sex: ['', Validators.required],
              nationality: ['', Validators.required],
              id2: ['', Validators.required],
              countryOfResidence: ['', Validators.required],
              status: ['', Validators.required],
              countryOfBirth: ['', Validators.required],
              direction: ['', Validators.required],
              tel: ['', Validators.required],
              cel: ['', Validators.required],
              officeTel: ['', Validators.required],
              fax: ['', Validators.required],
              email: ['', [Validators.required, Validators.email]],
              company: this.fb.group({
                name: ['', Validators.required],
                position: ['', Validators.required],
                direction: ['', Validators.required],
                economicActivity: ['', Validators.required],
                city: ['', Validators.required],
                country: ['', Validators.required],
                kinship: ['', Validators.required],
                insurancePurpose: ['', Validators.required],
                contractorCountry: ['', Validators.required],
              }),
            }));
          }

          if (!this.newRequest.get('payer')) {
            this.newRequest.addControl('payer', this.fb.group({
              firstName: ['', Validators.required],
              secondName: ['', Validators.required],
              lastName: ['', Validators.required],
              date: ['', Validators.required],
              sex: ['', Validators.required],
              nationality: ['', Validators.required],
              id2: ['', Validators.required],
              countryOfResidence: ['', Validators.required],
              status: ['', Validators.required],
              countryOfBirth: ['', Validators.required],
              direction: ['', Validators.required],
              tel: ['', Validators.required],
              cel: ['', Validators.required],
              officeTel: ['', Validators.required],
              fax: ['', Validators.required],
              email: ['', [Validators.required, Validators.email]],
              company: this.fb.group({
                name: ['', Validators.required],
                position: ['', Validators.required],
                direction: ['', Validators.required],
                economicActivity: ['', Validators.required],
                city: ['', Validators.required],
                country: ['', Validators.required],
                kinship: ['', Validators.required],
                insurancePurpose: ['', Validators.required],
                contractorCountry: ['', Validators.required],
              })
            }));
          }
          break;

        case 'isMarried':
          formAR.addControl('marriedInformation', this.fb.group({
            spouseName: ['', Validators.required],
            spouseInsuranceAmount: ['', [Validators.required, Validators.min(0)]],
          }));
          break;

        case 'isLessThan21':
          formAR.addControl('familyInsurances', this.fb.array([this.createFormArray('familyInsurances')]));
          this.familyRelationshipInsurances = formAR.get('familyInsurances') as FormArray;
          break;

        case 'hasAnotherCoverage':
          formGI.addControl('anotherCoverages', this.fb.array([this.createFormArray('coverages')]));
          formGI.addControl('changeAnotherCoverage', this.fb.control('', Validators.required));
          this.existingCoveragesList = formGI.get('anotherCoverages') as FormArray;
          break;

        case 'changeAnotherCoverage':
          formGI.addControl('changingCoverages', this.fb.array([this.createFormArray('coverages')]));
          this.changingCoveragesList = formGI.get('changingCoverages') as FormArray;
          break;

        case 'haveSmoked':
          formGI.addControl('smoked', this.fb.control('', Validators.required));
          formGI.addControl('isActualSmoker', this.fb.control('', Validators.required));
          break;

        case 'consumeAlcohol':
          formGI.addControl('alcohol', this.fb.group({
            quantity: ['', Validators.required],
          }));
          break;

        case 'thinkTravel':
          formGI.addControl('travelInformation', this.fb.control('', Validators.required));
          break;

        case 'haveAlcoholTreatment':
          formGI.addControl('alcoholTreatment', this.fb.control('', Validators.required));
          break;

        case 'infoDiseaseCoverage':
          formGI.addControl('diseaseCoverageInformation', this.fb.control('', Validators.required));
          break;

        case 'haveBeenArrestedBecauseNarcotics':
          formGI.addControl('arrestedInformation', this.fb.control('', Validators.required));
          break;

        case 'haveLostDriveLicense':
          formGI.addControl('lostDriveLicense', this.fb.array([this.createFormArray('lostDriveLicense')]));
          this.lostDriveLicenseList = formGI.get('lostDriveLicense') as FormArray;

          break;

        case 'doXtremeSport':
          formGI.addControl('xtremeSports', this.fb.group({
            diving: ['', Validators.required],
            racing: ['', Validators.required],
            skydiving: ['', Validators.required],
            mountaineering: ['', Validators.required],
          }));
          break;

        case 'anyoneProposed':
          formGI.addControl('insuranceProposed', this.fb.array([this.createFormArray('insurance')]));
          this.insuranceProposedList = formGI.get('insuranceProposed') as FormArray;
          break;

        /** HISTORIAL MEDICO */

        case 'isWomen':
          formHMI.addControl('womenInformation', this.fb.group({
            haveDisorder: ['', Validators.required],
            isPregnant: ['', Validators.required],
          }));
          break;

        case 'isPregnant':
          formWI.addControl('pregnantInformation', this.fb.group({
            quantity: ['', [Validators.required, Validators.min(1)]],
            time: ['', Validators.required],
          }));
          break;

        case 'haveHadWeightChanges':
          formHMI.addControl('weightChanges', this.fb.group({
            type: ['', Validators.required],
            detail: ['', Validators.required],
          }));
          break;

        case 'haveDisorder':
          formWI.addControl('disorders', this.fb.array([this.createFormArray('medicalInfo')]));
          this.womenDisordersList = formWI.get('disorders') as FormArray;
          break;


        case 'haveHeartPain':
          formHMI.addControl('heartPain', this.fb.array([this.createFormArray('medicalInfo')]));
          this.heartPainList = formHMI.get('heartPain') as FormArray;
          break;

        case 'haveHypertension':
          formQ.addControl('solicitudHipertensionArterial', this.fb.group({}));
          formHMI.addControl('hypertensionVida', this.fb.array([this.createFormArray('medicalInfo')]));
          this.hypertensionList = formHMI.get('hypertensionVida') as FormArray;
          break;

        case 'haveRespiratoryDisorder':
          formHMI.addControl('respiratoryDisorder', this.fb.array([this.createFormArray('medicalInfo')]));
          this.respiratoryDisorderList = formHMI.get('respiratoryDisorder') as FormArray;
          break;

        case 'haveMentalNervousDisorder':
          formHMI.addControl('mentalNervousDisorder', this.fb.array([this.createFormArray('medicalInfo')]));
          this.mentalNervousDisorderList = formHMI.get('mentalNervousDisorder') as FormArray;
          break;

        case 'haveStomachDisorder':
          formHMI.addControl('stomachDisorder', this.fb.array([this.createFormArray('medicalInfo')]));
          this.stomachDisorderList = formHMI.get('stomachDisorder') as FormArray;
          break;

        case 'haveEndocrineDisorder':
          formHMI.addControl('endocrineDisorder', this.fb.array([this.createFormArray('medicalInfo')]));
          this.endocrineDisorderList = formHMI.get('endocrineDisorder') as FormArray;
          break;

        case 'haveDiabetes':
          formQ.addControl('solicitudDiabetes', this.fb.group({}));

          formHMI.addControl('diabetesVida', this.fb.array([this.createFormArray('medicalInfo')]));
          this.diabetesList = formHMI.get('diabetesVida') as FormArray;
          break;

        case 'haveSpineDisorder':
          formHMI.addControl('spineDisorder', this.fb.array([this.createFormArray('medicalInfo')]));
          this.spineDisorderList = formHMI.get('spineDisorder') as FormArray;
          break;

        case 'haveUnexplainedDisease':
          formHMI.addControl('unexplainedDisease', this.fb.array([this.createFormArray('medicalInfo')]));
          this.unexplainedDiseaseList = formHMI.get('unexplainedDisease') as FormArray;
          break;

        case 'haveRenalDisorder':
          formHMI.addControl('renalDisorder', this.fb.array([this.createFormArray('medicalInfo')]));
          this.renalDisorderList = formHMI.get('renalDisorder') as FormArray;
          break;

        case 'haveEyesNoseThroatProblem':
          formHMI.addControl('eyesNoseThroatProblem', this.fb.array([this.createFormArray('medicalInfo')]));
          this.eyesNoseThroatProblemList = formHMI.get('eyesNoseThroatProblem') as FormArray;
          break;

        case 'haveBloodDisorder':
          formHMI.addControl('bloodDisorder', this.fb.array([this.createFormArray('medicalInfo')]));
          this.bloodDisorderList = formHMI.get('bloodDisorder') as FormArray;
          break;

        case 'haveBirthDefect':
          formHMI.addControl('birthDefect', this.fb.array([this.createFormArray('medicalInfo')]));
          this.birthDefectList = formHMI.get('birthDefect') as FormArray;
          break;

        case 'haveMedicalProcedures':
          formHMI.addControl('medicalProcedures', this.fb.array([this.createFormArray('medicalInfo')]));
          this.medicalProceduresList = formHMI.get('medicalProcedures') as FormArray;
          break;

        case 'haveBeenAPatient':
          formHMI.addControl('beenAPatient', this.fb.array([this.createFormArray('medicalInfo')]));
          this.beenAPatientList = formHMI.get('beenAPatient') as FormArray;
          break;

        case 'haveHadSpecializedTests':
          formHMI.addControl('hadSpecializedTests', this.fb.array([this.createFormArray('specializedTests')]));
          this.hadSpecializedTestsList = formHMI.get('hadSpecializedTests') as FormArray;
          break;

        case 'haveNotCarriedOut':
          formHMI.addControl('notCarriedOut2', this.fb.control('', Validators.required));
          break;

        case 'haveTakenInLast12Months':
          formHMI.addControl('takenInLast12Months', this.fb.array([this.createFormArray('medicalInfo')]));
          this.takenInLast12MonthsList = formHMI.get('takenInLast12Months') as FormArray;
          break;

        case 'havePlanToObtainMedicalTreatment':
          formHMI.addControl('planToObtainMedicalTreatment', this.fb.array([this.createFormArray('medicalInfo')]));
          this.planToObtainMedicalTreatmentList = formHMI.get('planToObtainMedicalTreatment') as FormArray;
          break;

        case 'haveTestedPositiveForHiv':
          formHMI.addControl('testedPositiveForHiv', this.fb.array([this.createFormArray('medicalInfo')]));
          this.testedPositiveForHIVList = formHMI.get('testedPositiveForHiv') as FormArray;
          break;

        case 'haveDiabetesDiagnosis':
          formHMI.addControl('diabetesDiagnosis', this.fb.array([this.createFormArray('medicalInfo')]));
          this.diabetesDiagnosisList = formHMI.get('diabetesDiagnosis') as FormArray;
          break;

        case 'listDoctors':
          formHMI.addControl('doctors', this.fb.array([this.createFormArray('doctorInfo')]));
          this.doctorList = formHMI.get('doctors') as FormArray;
          break;



        default:
          break;
      }
    } else if (event.valor === 'NO') {
      switch (event.name) {
        case 'diving':
          formAQ.removeControl('solicitudBuceo');
          break;

        case 'racing':
          formAQ.removeControl('solicitudMoto');
          break;

        case 'skydiving':
          formAQ.removeControl('solicitudAviacion');
          break;

        case 'mountaineering':
          formAQ.removeControl('solicitudMontanismo');
          break;

        case 'isExposed':
          formEP.removeControl('insured');
          // if ((formP.get('countryOfResidence').value === 'REPÚBLICA DOMINICANA' || formP.get('countryOfResidence').value === '') || formP.get('countryOfBirth').value === 'REPÚBLICA DOMINICANA' || formP.get('countryOfResidence').value === '') {
          //   formQ.removeControl('solucionAntiLavadoDinero');
          // }
          break;

        case 'isPayerExposed':
          formEP.removeControl('payer');
          // this.newRequest.removeControl('payer');
          // if (formPA) {
          //   if (this.role === 'WWS') {
          //     if (((formPA.get('countryOfResidence').value === 'REPÚBLICA DOMINICANA' || formPA.get('countryOfResidence').value === '') || (formPA.get('countryOfBirth').value === 'REPÚBLICA DOMINICANA' || formPA.get('countryOfBirth').value === ''))) {
          //       formPQ.removeControl('solucionAntiLavadoDinero');
          //     }
          //   } else {
          //     if (((formPA.get('countryOfResidence').value === 'PANAMÁ' || formPA.get('countryOfResidence').value === '') || (formPA.get('countryOfBirth').value === 'PANAMÁ' || formPA.get('countryOfBirth').value === ''))) {
          //       formPQ.removeControl('solucionAntiLavadoDinero');
          //     }
          //   }
          // }

          break;

        case 'isContractorExposed':
          formEP.removeControl('contractor');
          // this.newRequest.removeControl('contractor');
          // if (this.role === 'WWS') {
          //   if (formC) {
          //     if (((formC.get('countryOfResidence').value === 'REPÚBLICA DOMINICANA' || formC.get('countryOfResidence').value === '') || (formC.get('countryOfBirth').value === 'REPÚBLICA DOMINICANA' || formC.get('countryOfBirth').value === ''))) {
          //       formCQ.removeControl('solucionAntiLavadoDinero');
          //     }
          //   }
          // } else {
          //   if (formC) {
          //     if (((formC.get('countryOfResidence').value === 'PANAMÁ' || formC.get('countryOfResidence').value === '') || (formC.get('countryOfBirth').value === 'PANAMÁ' || formC.get('countryOfBirth').value === ''))) {
          //       formCQ.removeControl('solucionAntiLavadoDinero');
          //     }
          //   }
          // }
          break;

        case 'sameAsPayer':
          // formEP.addControl('isPayerExposed', this.fb.control('', Validators.required));
          // formP.addControl('payerIsLegalEntity', this.fb.control('', Validators.required));

          // this.newRequest.addControl('payer', this.fb.group({
          //   firstName: ['', Validators.required],
          //   secondName: [''],
          //   lastName: ['', Validators.required],
          //   date: ['', Validators.required],
          //   sex: ['', Validators.required],
          //   nationality: ['', Validators.required],
          //   id2: ['', Validators.required],
          //   countryOfResidence: ['', Validators.required],
          //   status: ['', Validators.required],
          //   countryOfBirth: ['', Validators.required],
          //   direction: ['', Validators.required],
          //   tel: [''],
          //   cel: [''],
          //   officeTel: [''],
          //   fax: [''],
          //   email: ['', [Validators.required, Validators.email]],
          //   company: this.fb.group({
          //     name: ['', Validators.required],
          //     position: ['', Validators.required],
          //     direction: ['', Validators.required],
          //     economicActivity: ['', Validators.required],
          //     city: ['', Validators.required],
          //     country: ['', Validators.required],
          //     kinship: ['', Validators.required],
          //     insurancePurpose: ['', Validators.required],
          //     contractorCountry: ['', Validators.required],
          //   })
          // }));
          // if ((this.newRequest.get('insured_data').get('knowYourClient'))) {
          //   formInsured.removeControl('knowYourClient');
          // }
          // if ((this.newRequest.get('insured_data').get('antiLaundering'))) {
          //   formInsured.removeControl('antiLaundering');
          // }
          if (formQ.get('solucionAntiLavadoDinero')) {
            formQ.removeControl('solucionAntiLavadoDinero');
          }
          if (formP.get('payerLegalEntity')) {
            formP.removeControl('payerLegalEntity');
          }
          if (formP.get('payerIsLegalEntity')) {
            formP.removeControl('payerIsLegalEntity');
          }
          if (this.newRequest.get('files').get('mercantile')) {
            formFiles.removeControl('mercantile');
          }
          formP.addControl('contractorLegalEntity', this.fb.group({}));

          formFiles.addControl('copyId', this.fb.array([this.createFormArray('filesCopyId')]));
          this.filesCopyIdArray = this.newRequest.get('files').get('copyId') as FormArray;
          break;

        case 'sameAsContractor':
          if (!(formP.get('contractorIsLegalEntity'))) {
            formP.addControl('contractorIsLegalEntity', this.fb.control('', Validators.required));
          }

          if (!(this.newRequest.get('files').get('documentsKnowClient'))) {
            formFiles.addControl('documentsKnowClient', this.fb.array([this.createFormArray('filesDocumentsKnowClient')]));
            this.filesDocumentsKnowClientArray = this.newRequest.get('files').get('documentsKnowClient') as FormArray;
          }
          else if (this.newRequest.get('files').get('documentsKnowClient')) {
            formFiles.removeControl('documentsKnowClient');
            formFiles.addControl('documentsKnowClient', this.fb.array([this.createFormArray('filesDocumentsKnowClient')]));
            this.filesDocumentsKnowClientArray = this.newRequest.get('files').get('documentsKnowClient') as FormArray;
          }
          // formEP.addControl('isContractorExposed', this.fb.control('', Validators.required));
          // formP.addControl('contractorIsLegalEntity', this.fb.control('', Validators.required));

          // this.newRequest.addControl('contractor', this.fb.group({
          //   firstName: ['', Validators.required],
          //   secondName: [''],
          //   lastName: ['', Validators.required],
          //   date: ['', Validators.required],
          //   sex: ['', Validators.required],
          //   nationality: ['', Validators.required],
          //   id2: ['', Validators.required],
          //   countryOfResidence: ['', Validators.required],
          //   status: ['', Validators.required],
          //   countryOfBirth: ['', Validators.required],
          //   direction: ['', Validators.required],
          //   tel: [''],
          //   cel: ['', Validators.required],
          //   officeTel: [''],
          //   fax: [''],
          //   email: ['', [Validators.required, Validators.email]],
          //   company: this.fb.group({
          //     name: ['', Validators.required],
          //     position: ['', Validators.required],
          //     direction: ['', Validators.required],
          //     economicActivity: ['', Validators.required],
          //     city: ['', Validators.required],
          //     country: ['', Validators.required],
          //     kinship: ['', Validators.required],
          //     insurancePurpose: ['', Validators.required],
          //     contractorCountry: ['', Validators.required],
          //   }),
          // }));
          break;

        case 'contractorIsLegalEntity':
          // if (!this.newRequest.get('contractor')) {
          //   this.newRequest.addControl('contractor', this.fb.group({
          //     firstName: ['', Validators.required],
          //     secondName: ['', Validators.required],
          //     lastName: ['', Validators.required],
          //     date: ['', Validators.required],
          //     sex: ['', Validators.required],
          //     nationality: ['', Validators.required],
          //     id2: ['', Validators.required],
          //     countryOfResidence: ['', Validators.required],
          //     status: ['', Validators.required],
          //     countryOfBirth: ['', Validators.required],
          //     direction: ['', Validators.required],
          //     tel: ['', Validators.required],
          //     cel: ['', Validators.required],
          //     officeTel: ['', Validators.required],
          //     fax: ['', Validators.required],
          //     email: ['', [Validators.required, Validators.email]],
          //     company: this.fb.group({
          //       name: ['', Validators.required],
          //       position: ['', Validators.required],
          //       direction: ['', Validators.required],
          //       economicActivity: ['', Validators.required],
          //       city: ['', Validators.required],
          //       country: ['', Validators.required],
          //       kinship: ['', Validators.required],
          //       insurancePurpose: ['', Validators.required],
          //       contractorCountry: ['', Validators.required],
          //     }),
          //   }));
          // }

          // formP.removeControl('contractorLegalEntity');
          // if (formEP.get('isContractorExposed').value !== 'SI') {
          //   formCQ.removeControl('solucionAntiLavadoDinero');
          // }
          formP.removeControl('sameAsPayer');
          formEP.removeControl('isPayerExposed');
          formEP.removeControl('isContractorExposed');
          this.newRequest.removeControl('payer');
          this.newRequest.removeControl('contractor');
          formEP.removeControl('contractor');
          formEP.removeControl('payer');

          // if (this.newRequest.get('insured_data').get('policyholderKnowClientRadio')) {
          //   sameAsPayer
          //   formInsured.removeControl('policyholderKnowClientRadio'); //juridica
          // }
          if (formP.get('contractorLegalEntity')) {
            formP.removeControl('contractorLegalEntity');
          }
          if (this.newRequest.get('files').get('copyId')) {
            formFiles.removeControl('copyId');
          }
          if (formQ.get('solucionAntiLavadoDinero')) {
            formQ.removeControl('solucionAntiLavadoDinero');
          }
          if (formP.get('payerLegalEntity')) {
            formP.removeControl('payerLegalEntity');
          }
          if (formP.get('payerIsLegalEntity')) {
            formP.removeControl('payerIsLegalEntity');
          }
          if (this.newRequest.get('files').get('mercantile')) {
            formFiles.removeControl('mercantile');
          }
          break;

        case 'payerIsLegalEntity':
          // if (!this.newRequest.get('payer')) {
          //   this.newRequest.addControl('payer', this.fb.group({
          //     firstName: ['', Validators.required],
          //     secondName: ['', Validators.required],
          //     lastName: ['', Validators.required],
          //     date: ['', Validators.required],
          //     sex: ['', Validators.required],
          //     nationality: ['', Validators.required],
          //     id2: ['', Validators.required],
          //     countryOfResidence: ['', Validators.required],
          //     status: ['', Validators.required],
          //     countryOfBirth: ['', Validators.required],
          //     direction: ['', Validators.required],
          //     tel: ['', Validators.required],
          //     cel: ['', Validators.required],
          //     officeTel: ['', Validators.required],
          //     fax: ['', Validators.required],
          //     email: ['', [Validators.required, Validators.email]],
          //     company: this.fb.group({
          //       name: ['', Validators.required],
          //       position: ['', Validators.required],
          //       direction: ['', Validators.required],
          //       economicActivity: ['', Validators.required],
          //       city: ['', Validators.required],
          //       country: ['', Validators.required],
          //       kinship: ['', Validators.required],
          //       insurancePurpose: ['', Validators.required],
          //       contractorCountry: ['', Validators.required],
          //     })
          //   }));
          // }

          // formP.removeControl('payerLegalEntity');
          // if (formEP.get('isPayerExposed').value !== 'SI') {
          //   formPQ.removeControl('solucionAntiLavadoDinero');
          // }
          if (!(formP.get('payerLegalEntity'))) {
            formP.addControl('payerLegalEntity', this.fb.group({}));
          }
          if (!(this.newRequest.get('files').get('mercantile'))) {
            formFiles.addControl('mercantile', this.fb.array([this.createFormArray('mercantileRegister')]));
            this.mercantileRegisterArray = this.newRequest.get('files').get('mercantile') as FormArray;
          }
          else if (this.newRequest.get('files').get('mercantile')) {
            formFiles.removeControl('mercantile');
            formFiles.addControl('mercantile', this.fb.array([this.createFormArray('mercantileRegister')]));
            this.mercantileRegisterArray = this.newRequest.get('files').get('mercantile') as FormArray;
          }
          if (formQ.get('solucionAntiLavadoDinero')) {
            formQ.removeControl('solucionAntiLavadoDinero');
          }
          // if ((this.newRequest.get('insured_data').get('antiLaundering'))) {
          //   formInsured.removeControl('antiLaundering');
          // }
          break;


        case 'isMarried':
          formAR.removeControl('marriedInformation');
          break;

        case 'isLessThan21':
          formAR.removeControl('familyInsurances');
          this.familyRelationshipInsurances = undefined;
          break;

        case 'hasAnotherCoverage':
          formGI.removeControl('anotherCoverages');
          formGI.removeControl('changeAnotherCoverage');

          this.existingCoveragesList = undefined;
          if (formGI.get('changeAnotherCoverage')) {
            formGI.get('changeAnotherCoverage').reset();
          }
          formGI.removeControl('changingCoverages');
          this.changingCoveragesList = undefined;
          break;

        case 'changeAnotherCoverage':
          formGI.removeControl('changingCoverages');
          this.changingCoveragesList = undefined;
          break;

        case 'haveSmoked':
          formGI.removeControl('smoked');
          formGI.removeControl('isActualSmoker');
          break;

        case 'isActualSmoker':
          formGI.removeControl('lastTimeSmoked');
          break;

        case 'consumeAlcohol':
          formGI.removeControl('alcohol');
          break;

        case 'thinkTravel':
          formGI.removeControl('travelInformation');
          break;

        case 'haveAlcoholTreatment':
          formGI.removeControl('alcoholTreatment');
          break;

        case 'infoDiseaseCoverage':
          formGI.removeControl('diseaseCoverageInformation');
          break;

        case 'haveBeenArrestedBecauseNarcotics':
          formGI.removeControl('arrestedInformation');
          break;

        case 'haveLostDriveLicense':
          formGI.removeControl('lostDriveLicense');
          this.lostDriveLicenseList = undefined;

          break;

        case 'doXtremeSport':
          formGI.removeControl('xtremeSports');

          if (this.newRequest.get('activitiesQuestionnaires').get('solicitudBuceo')) {
            formAQ.removeControl('solicitudBuceo');
          }
          if (this.newRequest.get('activitiesQuestionnaires').get('solicitudAviacion')) {
            formAQ.removeControl('solicitudAviacion');
          }
          if (this.newRequest.get('activitiesQuestionnaires').get('solicitudMoto')) {
            formAQ.removeControl('solicitudMoto');
          }
          if (this.newRequest.get('activitiesQuestionnaires').get('solicitudMontanismo')) {
            formAQ.removeControl('solicitudMontanismo');
          }

          break;

        case 'anyoneProposed':
          formGI.removeControl('insuranceProposed');
          this.insuranceProposedList = undefined;
          break;

        /** HISTORIAL MEDICO */
        case 'haveHadWeightChanges':
          formHMI.removeControl('weightChanges');
          break;

        case 'isWomen':
          formHMI.removeControl('womenInformation');
          break;

        case 'isPregnant':
          formWI.removeControl('pregnantInformation');
          break;

        case 'haveDisorder':
          formWI.removeControl('disorders');
          this.womenDisordersList = undefined;
          break;

        case 'haveHeartPain':
          formHMI.removeControl('heartPain');
          this.heartPainList = undefined;
          break;

        case 'haveHypertension':
          formQ.removeControl('solicitudHipertensionArterial');
          formHMI.removeControl('hypertensionVida');
          this.hypertensionList = undefined;
          break;

        case 'haveRespiratoryDisorder':
          formHMI.removeControl('respiratoryDisorder');
          this.respiratoryDisorderList = undefined;
          break;
        case 'haveMentalNervousDisorder':
          formHMI.removeControl('mentalNervousDisorder');
          this.mentalNervousDisorderList = undefined;
          break;
        case 'haveStomachDisorder':
          formHMI.removeControl('stomachDisorder');
          this.stomachDisorderList = undefined;
          break;
        case 'haveEndocrineDisorder':
          formHMI.removeControl('endocrineDisorder');
          this.endocrineDisorderList = undefined;
          break;

        case 'haveDiabetes':
          formQ.removeControl('solicitudDiabetes');
          formHMI.removeControl('diabetesVida');
          this.diabetesList = undefined;
          break;

        case 'haveSpineDisorder':
          formHMI.removeControl('spineDisorder');
          this.spineDisorderList = undefined;
          break;

        case 'haveUnexplainedDisease':
          formHMI.removeControl('unexplainedDisease');
          this.unexplainedDiseaseList = undefined;
          break;

        case 'haveRenalDisorder':
          formHMI.removeControl('renalDisorder');
          this.renalDisorderList = undefined;
          break;

        case 'haveEyesNoseThroatProblem':
          formHMI.removeControl('eyesNoseThroatProblem');
          this.eyesNoseThroatProblemList = undefined;
          break;

        case 'haveBloodDisorder':
          formHMI.removeControl('bloodDisorder');
          this.bloodDisorderList = undefined;
          break;

        case 'haveBirthDefect':
          formHMI.removeControl('birthDefect');
          this.birthDefectList = undefined;
          break;

        case 'haveMedicalProcedures':
          formHMI.removeControl('medicalProcedures');
          this.medicalProceduresList = undefined;
          break;

        case 'haveBeenAPatient':
          formHMI.removeControl('beenAPatient');
          this.beenAPatientList = undefined;
          break;

        case 'haveHadSpecializedTests':
          formHMI.removeControl('hadSpecializedTests');
          this.hadSpecializedTestsList = undefined;
          break;

        case 'haveNotCarriedOut':
          formHMI.removeControl('notCarriedOut2');
          break;

        case 'haveTakenInLast12Months':
          formHMI.removeControl('takenInLast12Months');
          this.takenInLast12MonthsList = undefined;
          break;

        case 'havePlanToObtainMedicalTreatment':
          formHMI.removeControl('planToObtainMedicalTreatment');
          this.planToObtainMedicalTreatmentList = undefined;
          break;

        case 'haveTestedPositiveForHiv':
          formHMI.removeControl('testedPositiveForHiv');
          this.testedPositiveForHIVList = undefined;
          break;

        case 'haveDiabetesDiagnosis':
          formHMI.removeControl('diabetesDiagnosis');
          this.diabetesDiagnosisList = undefined;
          break;

        case 'listDoctors':
          formHMI.removeControl('doctors');
          this.doctorList = undefined;
          break;

        default:
          break;
      }
    }
  }

  onChangeDependents() {
    const dependent = parseInt(this.newRequest.get('dependentsNumber').value, 10);
    this.dependentsFormArray = this.formMethods.onChangeForms(dependent, this.dependentFormGroup, this.dependentsFormArray);
  }

  delete(id) {
    this.dependentsFormArray = this.formMethods.deleteOneElement(this.dependentsFormArray, id).formArray;
    this.newRequest.get('dependentsNumber').setValue(this.dependentsFormArray.length);
  }
  add(dependentsFormArray, group) {
    const increment = dependentsFormArray.length + 1;
    dependentsFormArray = this.formMethods.addElement(dependentsFormArray, increment, group).formArray;
  }

  whichStudyWatcher(form, event) {
    console.log(form, event.valor);

    if (event.valor === 'OTROS') {
      form.addControl('specifyStudy', this.fb.control('', Validators.required));
    } else {
      form.removeControl('specifyStudy');
    }
  }

  createFormArray(type: string): FormGroup {
    switch (type) {
      case 'coverages':
        return this.fb.group({
          name: ['', Validators.required],
          amount: ['', Validators.required],
          policeNo: ['', [Validators.required, Validators.min(1)]],
          adbQuantity: ['', [Validators.required, Validators.min(0)]],
          date: ['', Validators.required],
        });
        break;

      case 'insurance':
        return this.fb.group({
          name: ['', Validators.required],
          detail: ['', Validators.required],
        });
        break;

      case 'medicalInfo':
        return this.fb.group({
          condition: ['', Validators.required],
          treatment: ['', Validators.required],
          hospitalNameAdress: ['', Validators.required],
          date: ['', Validators.required],
          // duration: ['', [Validators.required, Validators.min(1)]],
          // time: ['', Validators.required],
          results: ['', Validators.required],
        });
        break;

      case 'specializedTests':
        return this.fb.group({
          date: ['', Validators.required],
          whichStudy: ['', Validators.required],
          results: ['', Validators.required],
        });

      case 'doctorInfo':
        return this.fb.group({
          name: ['', Validators.required],
          address: ['', Validators.required],
          differentMedic: [''],
          ailment: ['', Validators.required],
        });
        break;

      case 'familyInsurances':
        return this.fb.group({
          family: ['', Validators.required],
          amount: ['', [Validators.required, Validators.min(0)]],
        });
        break;

      case 'lostDriveLicense':
        return this.fb.group({
          who: ['', Validators.required],
          when: ['', Validators.required],
          licenseNumber: ['', Validators.required],
          state: ['', Validators.required],
          information: ['', Validators.required],
        });

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
          copyId: ['', Validators.required],
        });

      case 'mercantileRegister':
        return this.fb.group({
          register: ['', Validators.required],
        });

      default:
        break;
    }
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
        if (this.arrayFilesTitlesCopyId[i] && this.newRequest.get('files').get('copyId').get(i.toString()).value.copyId !== '') {
          return this.arrayFilesTitlesCopyId[i].copyIdUrl;
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

  getCBForm() {
    const form = this.newRequest.get('contingentBeneficiary') as FormGroup;
    return form;
  }

  addToList(list: any, type: string) {
    list.push(this.createFormArray(type));
    console.log('json', JSON.stringify(this.newRequest.value));
  }

  questionsLength() {
    if (this.newRequest.get('questionnaires').get('solucionAntiLavadoDinero') && this.newRequest.get('questionnaires').get('solicitudEstadoFinancieroConfidencial')) {
      return Object.keys(this.newRequest.get('questionnaires').value).length - 2;
    } else if (this.newRequest.get('questionnaires').get('solucionAntiLavadoDinero')) {
      return Object.keys(this.newRequest.get('questionnaires').value).length - 1;
    } else if (this.newRequest.get('questionnaires').get('solicitudEstadoFinancieroConfidencial')) {
      return Object.keys(this.newRequest.get('questionnaires').value).length - 1;
    } else {
      return Object.keys(this.newRequest.get('questionnaires').value).length;
    }
  }

  activitiesQuestionsLength() {
    //console.log(this.newRequest.get('activitiesQuestionnaires'));
    if (this.newRequest.get('activitiesQuestionnaires').get('id')) {
      return Object.keys(this.newRequest.get('activitiesQuestionnaires').value).length > 1;
    }
    else {

      return Object.keys(this.newRequest.get('activitiesQuestionnaires').value).length > 0;
    }
  }

  isFormValid(form: string) {
    const isValid = this.newRequest.get(form).valid;
    const contractor = this.newRequest.get('contractorQuestionnaires') as FormGroup;
    const payer = this.newRequest.get('contractorQuestionnaires') as FormGroup;

    const getForm = form === 'payer' ? contractor : payer;

    if (isValid) {
      if (this.role === 'WMA') { getForm.addControl('solicitudConozcaASuCliente', this.fb.group({})); }
      else if (this.role === 'WWS') { getForm.addControl('knowYourCustomer', this.fb.group({})); }

      return true;
    } else {
      if (this.role === 'WMA') { getForm.removeControl('solicitudConozcaASuCliente'); }
      else if (this.role === 'WWS') { getForm.removeControl('knowYourCustomer'); }

      return false;
    }
  }

  selectChangeUrl(event) {
    switch (event) {
      case 'vida':
        this.router.navigateByUrl('dashboard/requests/new-requests/life');
        break;

      case 'disability':
        this.router.navigateByUrl('dashboard/requests/new-requests/disability');
        break;

      case 'gastos mayores':
        this.router.navigateByUrl('dashboard/requests/new-requests/major-expenses');
        break;

      default:
        break;
    }
  }

  print() {
    console.log(this.newRequest);
    console.log('json', JSON.stringify(this.newRequest.get('releventPlanInformation').value));
  }

  getData(key) {
    setTimeout(() => {
      this.appComponent.showOverlay = true;
    });
    this.requestService.getRequestData('vida', key).subscribe((data: any) => {
      // console.log(data.data.asegurado.documentoIdentidad)
      //console.log(data);
      if (data !== undefined && data.data !== null &&
        data.data != undefined) {
        // this.ID = data.data.id;
        // console.log(data.data);
        switch (data.data.countryCode) {
          case 'RD':
            this.role = 'WWS';
            break;
          case 'PM':
            this.role = 'WMA';
            break;
          default:
            this.role = 'WMA';
            break;
        }
        this.dataMappingFromApi.iterateThroughtAllObjectVida(data.data, this.newRequest);

        console.log(this.newRequest);
        console.log('DATA DEL GETDATA()', data.data);

        this.primaryBenefitsArray = this.newRequest.get('primaryBenefits').get('dependentsC') as FormArray;
        this.contingentBeneficiaryArray = this.newRequest.get('contingentBeneficiary').get('dependentsC') as FormArray;
        this.dependentsFormArray = this.newRequest.get('dependents') as FormArray;
        this.showContent = true;

        const formCB = this.newRequest.get('contingentBeneficiary') as FormGroup;
        const formGI = this.newRequest.get('generalInformation') as FormGroup;
        const formF = this.newRequest.get('files') as FormGroup;
        const formP = this.newRequest.get('person') as FormGroup;
        const formEP = this.newRequest.get('exposedPerson') as FormGroup;
        const formAR = this.newRequest.get('agentReport') as FormGroup;
        const formARCTI = this.newRequest.get('agentReport').get('connectionTypeInfo') as FormGroup;
        const formHMI = this.newRequest.get('medicalHistory').get('informations') as FormGroup;
        const formMH = this.newRequest.get('medicalHistory') as FormGroup;
        const formWI = this.newRequest.get('medicalHistory').get('informations').get('womenInformation') as FormGroup;

        if (formP.get('contractorIsLegalEntity').value === 'NO') {
          formEP.removeControl('isPayerExposed');
          formEP.removeControl('isContractorExposed');
          this.newRequest.removeControl('payer');
          this.newRequest.removeControl('contractor');
          formEP.removeControl('contractor');
          formEP.removeControl('payer');
          formP.removeControl('payerIsLegalEntity');
        }
        // if (formP.get('sameAsContractor').value === 'SI') {
        //   formP.removeControl('contractorIsLegalEntity');
        //   formEP.removeControl('isContractorExposed');
        //   formEP.removeControl('contractor');
        //   this.newRequest.removeControl('contractor');
        // }
        if (formP.get('sameAsPayer')) {
          if (formP.get('sameAsPayer').value === 'NO') {
            //   formP.removeControl('payerIsLegalEntity');
            //   formEP.removeControl('isPayerExposed');
            //   formEP.removeControl('payer');
            //   this.newRequest.removeControl('payer');
            if (formP.get('payerIsLegalEntity')) {
              formP.removeControl('payerIsLegalEntity');
            }
          }
        }

        if (formEP.get('isExposed').value !== 'SI') {
          formEP.removeControl('insured');
        }

        if (formEP.get('isPayerExposed').value !== 'SI') {
          formEP.removeControl('payer');
        }

        if (formEP.get('isContractorExposed').value !== 'SI') {
          formEP.removeControl('contractor');
        }

        if (formP.get('heightUnit').value !== 'PIE') {
          formP.removeControl('inches');
        }

        if (formGI.get('doXtremeSport').value !== 'SI') {
          formGI.removeControl('xtremeSports');
        }

        if (formGI.get('hasAnotherCoverage').value !== 'SI') {
          formGI.removeControl('changeAnotherCoverage');
          formGI.removeControl('changingCoverages');
        }

        if (formGI.get('changeAnotherCoverage')) {
          if (formGI.get('changeAnotherCoverage').value !== 'SI') {
            formGI.removeControl('changingCoverages');
          }
        }

        if (formGI.get('thinkTravel').value !== 'SI') {
          formGI.removeControl('travelInformation');
        }

        if (formGI.get('haveBeenArrestedBecauseNarcotics').value !== 'SI') {
          formGI.removeControl('arrestedInformation');
        }

        if (formGI.get('consumeAlcohol').value !== 'SI') {
          formGI.removeControl('alcohol');
        }

        if (formGI.get('haveSmoked').value !== 'SI') {
          formGI.removeControl('smoked');
          formGI.removeControl('isActualSmoker');
          formGI.removeControl('lastTimeSmoked');
        }

        if (formGI.get('isActualSmoker')) {
          if (formGI.get('isActualSmoker').value !== 'EX-FUMADOR') {
            formGI.removeControl('lastTimeSmoked');
          }
        }

        if (formGI.get('haveAlcoholTreatment').value !== 'SI') {
          formGI.removeControl('alcoholTreatment');
        }

        if (formGI.get('infoDiseaseCoverage').value !== 'SI') {
          formGI.removeControl('diseaseCoverageInformation');
        }

        if (formMH.get('haveHadWeightChanges').value !== 'SI') {
          formHMI.removeControl('weightChanges');
        }

        if (formMH.get('isWomen').value !== 'SI') {
          formHMI.removeControl('womenInformation');
        }

        if (formAR.get('isMarried').value !== 'SI') {
          formAR.removeControl('marriedInformation');
        }

        // if (formAR.get('infoDiseaseCoverage').value !== 'SI') {
        //   formAR.removeControl('connectionTypeInfo');
        // }

        const stay = [];
        switch (formAR.get('connectionType').value) {
          case 'FAMILIA':
            stay.push('relationship');
            break;

          case 'AMIGO':
            stay.push('friendship', 'amount', 'time');
            break;

          case 'CLIENTE':
            stay.push('amount', 'time');
            break;

          case '¿LO ACABA DE CONOCER?':
            stay.push('how');
            break;

          default:
            break;
        }

        if (formAR.get('connectionType').value !== '') {
          console.log('formAR.get(connectionTypeInfo).value 1', Object.getOwnPropertyNames(formAR.get('connectionTypeInfo').value));

          const stableCTIObject = Object.getOwnPropertyNames(formAR.get('connectionTypeInfo').value);

          // tslint:disable: forin
          for (const key in stay) {
            const stayElement = stay[key];
            const i = stableCTIObject.indexOf(stayElement);
            stableCTIObject.splice(i, 1);
          }

          for (const idx in stay) {
            const stayElement = stay[idx];
            for (const key in stableCTIObject) {
              const existingName = stableCTIObject[key];
              if (stayElement !== existingName && existingName !== 'id') {
                formARCTI.removeControl(existingName);
              }
            }
          }

          console.log('formAR.get(connectionTypeInfo).value 2', formAR.get('connectionTypeInfo').value);

        }

        formP.removeControl('isExposed');
        formP.removeControl('city');
        formP.removeControl('currency');

        this.familyRelationshipInsurances = formAR.get('familyInsurances') as FormArray;
        this.existingCoveragesList = formGI.get('anotherCoverages') as FormArray;
        this.changingCoveragesList = formGI.get('changingCoverages') as FormArray;

        if (formWI) {
          this.womenDisordersList = formWI.get('disorders') as FormArray;
        }
        this.heartPainList = formHMI.get('heartPain') as FormArray;
        this.hypertensionList = formHMI.get('hypertensionVida') as FormArray;
        this.lostDriveLicenseList = formGI.get('lostDriveLicense') as FormArray;
        this.respiratoryDisorderList = formHMI.get('respiratoryDisorder') as FormArray;
        this.mentalNervousDisorderList = formHMI.get('mentalNervousDisorder') as FormArray;
        this.stomachDisorderList = formHMI.get('stomachDisorder') as FormArray;
        this.endocrineDisorderList = formHMI.get('endocrineDisorder') as FormArray;
        this.diabetesList = formHMI.get('diabetesVida') as FormArray;
        this.spineDisorderList = formHMI.get('spineDisorder') as FormArray;
        this.unexplainedDiseaseList = formHMI.get('unexplainedDisease') as FormArray;
        this.renalDisorderList = formHMI.get('renalDisorder') as FormArray;
        this.eyesNoseThroatProblemList = formHMI.get('eyesNoseThroatProblem') as FormArray;
        this.bloodDisorderList = formHMI.get('bloodDisorder') as FormArray;
        this.birthDefectList = formHMI.get('birthDefect') as FormArray;
        this.medicalProceduresList = formHMI.get('medicalProcedures') as FormArray;
        this.beenAPatientList = formHMI.get('beenAPatient') as FormArray;
        this.hadSpecializedTestsList = formHMI.get('hadSpecializedTests') as FormArray;
        this.notCarriedOutList = formHMI.get('notCarriedOut2') as FormArray;
        this.takenInLast12MonthsList = formHMI.get('takenInLast12Months') as FormArray;
        this.planToObtainMedicalTreatmentList = formHMI.get('planToObtainMedicalTreatment') as FormArray;
        this.testedPositiveForHIVList = formHMI.get('testedPositiveForHiv') as FormArray;
        this.diabetesDiagnosisList = formHMI.get('diabetesDiagnosis') as FormArray;
        this.doctorList = formHMI.get('doctors') as FormArray;
        this.filesStudiesArray = formF.get('studies') as FormArray;
        this.lostDriveLicenseList = this.newRequest.get('generalInformation').get('lostDriveLicense') as FormArray;

        this.insuranceProposedList = this.newRequest.get('generalInformation').get('insuranceProposed') as FormArray;
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

        this.newRequest.markAllAsTouched();
        this.newRequest.updateValueAndValidity();
      }

      this.appComponent.showOverlay = false;
    });

    this.life.id = null;
    console.log('this.life.id es igual a ' + this.life.id);
    this.newRequest.markAllAsTouched();
    this.newRequest.updateValueAndValidity();
  }

  sendForm(form: FormGroup, formType: string, sendType: string, id?: number) {
    console.log(id);
    console.log(this.matAccordion);

    this.formHandler.sendForm(form, formType, sendType, this.appComponent, id, true);

  }
}
