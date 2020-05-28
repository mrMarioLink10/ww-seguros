import { Component, OnInit, DoCheck, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { $sex, $country, $res, $time, $family, $weightTypes, $heightTypes } from 'src/app/core/form/objects';
import { DiseaseService } from '../../../shared/components/disease/shared/disease/disease.service';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { UserService } from '../../../../../core/services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LifeService } from './services/life.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { map, first } from 'rxjs/operators';
import { KnowYourCustomerComponent } from '../../../shared/components/disease/know-your-customer/know-your-customer.component';
import { AppComponent } from 'src/app/app.component';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
// tslint:disable: one-line
// tslint:disable: max-line-length

@Component({
  selector: 'app-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.scss']
})
export class LifeComponent implements OnInit, DoCheck {
  step: number;

  role: string;
  maxWidth: any;
  primaryBenefitsArray: FormArray;
  contingentBeneficiaryArray: FormArray;
  dependentsFormArray: FormArray;
  existingCoveragesList: FormArray;
  changingCoveragesList: FormArray;
  insuranceProposedList: FormArray;
  routeSelected = 'vida';
  heartPainList: FormArray;
  respiratoryDisorderList: FormArray;
  mentalNervousDisorderList: FormArray;
  stomachDisorderList: FormArray;
  endocrineDisorderList: FormArray;
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

  needFinancialStatus = false;
  showNewQuoteRequest = false;

  payMethod = {
    label: 'Método de pago',
    name: 'method',
    options: [
      {
        value: 'Anual',
        viewValue: 'Anual',
      },
      {
        value: 'Semestral',
        viewValue: 'Semestral',
      },
      {
        value: 'Trimestral',
        viewValue: 'Trimestral',
      }
    ]
  };

  payForm = {
    label: 'Forma de pago',
    name: 'form',
    options: [
      {
        value: 'Cheque',
        viewValue: 'Cheque',
      },
      {
        value: 'Tarjeta Credito',
        viewValue: 'Tarjeta Credito',
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
        value: 'si',
        viewValue: 'Si'
      },
      {
        value: 'no',
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
    nationality: ['', Validators.required],
    ocupation: ['', Validators.required],
    family: ['', Validators.required],
    quantity: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
  };

  annualIncomeValues = {
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

  connectionType = {
    options: [
      {
        value: 'familia',
        viewValue: 'Familia'
      },
      {
        value: 'amigo',
        viewValue: 'Amigo'
      },
      {
        value: 'cliente',
        viewValue: 'Cliente'
      },
      {
        value: 'acabado de conocer',
        viewValue: '¿Lo acaba de conocer?'
      },

    ]
  };

  timeFriendship = {
    label: '¿Cuánto lo conoce?',
    options: [
      {
        value: 'mucho',
        viewValue: 'Mucho'
      },
      {
        value: 'poco',
        viewValue: 'Poco'
      },
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

  countryOfResidence = {
    options: $country,
    name: 'countryOfResidence',
  };

  res = $res;

  countryOfBirth = {
    options: $country,
    name: 'countryOfBirth',
  };

  currency = {
    name: 'currency',
    label: 'Tipo de Moneda',
    options: [
      {
        value: 'Dolares',
        viewValue: 'Dolares'
      },
      {
        value: 'Pesos Dominicanos',
        viewValue: 'Pesos Dominicanos'
      },
    ],
  };

  basicLifeAmountCurrency = {
    name: 'basicLifeAmountCurrency',
    label: 'Tipo de Moneda',
    options: [
      {
        value: 'usd',
        viewValue: 'US$'
      },
      {
        value: 'dop',
        viewValue: 'DOP$'
      },
    ],
  };

  basicLifeBonusCurrency = {
    name: 'basicLifeBonusCurrency',
    label: 'Tipo de Moneda',
    options: [
      {
        value: 'usd',
        viewValue: 'US$'
      },
      {
        value: 'dop',
        viewValue: 'DOP$'
      },
    ],
  };

  survivalAmountCurrency = {
    name: 'survivalAmountCurrency',
    label: 'Tipo de Moneda',
    options: [
      {
        value: 'usd',
        viewValue: 'US$'
      },
      {
        value: 'dop',
        viewValue: 'DOP$'
      },
    ],
  };

  survivalBonusCurrency = {
    name: 'survivalBonusCurrency',
    label: 'Tipo de Moneda',
    options: [
      {
        value: 'usd',
        viewValue: 'US$'
      },
      {
        value: 'dop',
        viewValue: 'DOP$'
      },
    ],
  };

  weightChangesOptions = {
    label: 'Cambio de peso',
    options: [
      {
        value: 'aumento',
        viewValue: 'Aumento'
      },
      {
        value: 'perdida',
        viewValue: 'Pérdida'
      }
    ],
  };

  status = {
    options: [
      {
        value: 'soltero',
        viewValue: 'Soltero'
      },
      {
        value: 'casado',
        viewValue: 'Casado'
      },
      {
        value: 'union Libre',
        viewValue: 'Unión Libre'
      }
    ],
    name: 'status'
  };

  smokingTypes = {
    options: [
      {
        value: 'cigarrillos',
        viewValue: 'Cigarrillos'
      },
      {
        value: 'pipa',
        viewValue: 'Pipa'
      },
      {
        value: 'parche o chicle de Nicotina',
        viewValue: 'Parche o chicle de Nicotina'
      },
      {
        value: 'tabaco',
        viewValue: 'Tabaco'
      },
      {
        value: 'mastica tabaco',
        viewValue: 'Mastica tabaco'
      },
      {
        value: 'otro',
        viewValue: 'Otro'
      }
    ],
    name: 'haveSmoked'
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
  noCotizacion;
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

  constructor(
    private fb: FormBuilder,
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
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.userService.getWholeQuotes()
      .subscribe(res => {
        console.log(res);
      });

    this.route.params.subscribe(res => {
      this.ID = res.id;
    });
    this.route.params.subscribe(res => {
      this.noCotizacion = res.noCotizacion;
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
      this.noCotizacion = '';
    }
    this.role = this.userService.getRoleCotizador();

    this.newRequest = this.fb.group({
      noC: ['', Validators.required],
      isComplete: [false, Validators.required],
      person: this.fb.group({
        firstName: [{ value: '', disabled: true }, [Validators.required]],
        secondName: ['', Validators.required],
        lastName: ['', Validators.required],
        date: [{ value: '', disabled: true }, [Validators.required]],
        sex: ['', Validators.required],
        nationality: ['', Validators.required],
        id2: ['', Validators.required],
        age: [{ value: '', disabled: true }, [Validators.required]],
        weight: ['', Validators.required],
        weightUnit: ['', Validators.required],
        height: ['', Validators.required],
        heightUnit: ['', Validators.required],
        status: ['', Validators.required],
        bmi: [{ value: '', disabled: true }, [Validators.required]],
        annualIncome: ['', [Validators.required, Validators.min(1)]],
        countryOfResidence: ['', Validators.required],
        countryOfBirth: ['', Validators.required],
        direction: ['', Validators.required],
        tel: [''],
        cel: ['', Validators.required],
        officeTel: [''],
        email: ['', Validators.required],
        sameAsContractor: ['', Validators.required],
        sameAsPayer: ['', Validators.required],
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
        bonus: ['', [Validators.required]],
        timeAmount: ['', [Validators.required, Validators.min(1), Validators.max(90)]],
        nicotineEstandar: ['', Validators.required],
        coverages: this.fb.group({
          basicLife: ['', Validators.required],
          survival: ['', Validators.required],
        })
      }),
      relevantPaymentInformation: this.fb.group({
        method: [{ value: '', disabled: true }, [Validators.required]],
        form: ['', Validators.required],
      }),
      primaryBenefits: this.fb.group({
        dependentsC: this.fb.array([this.formMethods.createItem(this.primaryBenefits)]),
        personBenefited: this.fb.group({
          name: ['', Validators.required],
          family: ['', Validators.required],
          id2: ['', Validators.required],
        })
      }),
      contingentBeneficiary: this.fb.group({
        dependentsC: this.fb.array([this.formMethods.createItem(this.primaryBenefits)]),
        personBenefited: this.fb.group({
          name: [''],
          family: [''],
          id2: ['']
        }),
        hasAnotherCoverage: ['', Validators.required],
        changeAnotherCoverage: ['', Validators.required],
      }),
      bankTransfer: this.fb.group({
        bankEntity: [''],
        amount: ['', Validators.min(0)],
        contact: ['']
      }),
      generalInformation: this.fb.group({
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
        haveRespiratoryDisorder: ['', Validators.required],
        haveMentalNervousDisorder: ['', Validators.required],
        haveStomachDisorder: ['', Validators.required],
        haveEndocrineDisorder: ['', Validators.required],
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
      questionnaires: this.fb.group({}),
      contractorQuestionnaires: this.fb.group({}),
      payerQuestionnaires: this.fb.group({}),
      activitiesQuestionnaires: this.fb.group({}),
    });

    this.primaryBenefitsArray = this.newRequest.get('primaryBenefits').get('dependentsC') as FormArray;
    this.contingentBeneficiaryArray = this.newRequest.get('contingentBeneficiary').get('dependentsC') as FormArray;
    this.dependentsFormArray = this.newRequest.get('dependents') as FormArray;

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
        label: 'a. ¿Dolor en el pecho, palpitaciones, hipertensión arterial, fiebre reumática, soplo cardiaco, ataque cardiaco, aneurismas u otra enfermedad del corazón o los vasos sanguíneos?',
        name: 'haveHeartPain',
        array: 'heartPainList',
        group: 'heartPain'
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
        label: 'e. ¿Diabetes, tiroides u otro trastorno endocrino?',
        name: 'haveEndocrineDisorder',
        array: 'endocrineDisorderList',
        group: 'endocrineDisorder'
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
        group: 'notCarriedOut'
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
        group: 'testedPositiveForHIV'
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

      const timeDiff = Math.abs(Date.now() - new Date(value).getTime());
      const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      this.newRequest.get('person').get('age').setValue(age);

      form.removeControl('advancePaymentOfCapital');
      form.removeControl('accidentalDeathDismemberment');
      form.removeControl('disability');
      form.removeControl('seriousIllnesses');
      form.removeControl('waiverPremiumPayment');

      if (age >= 18 && age <= 70) {
        form.addControl('advancePaymentOfCapital', this.fb.control('', Validators.required));
        form.addControl('accidentalDeathDismemberment', this.fb.control('', Validators.required));
        form.addControl('disability', this.fb.control('', Validators.required));
        form.addControl('seriousIllnesses', this.fb.control('', Validators.required));
        form.addControl('waiverPremiumPayment', this.fb.control('', Validators.required));
      } else if (age >= 18 && age <= 65) {
        form.addControl('accidentalDeathDismemberment', this.fb.control('', Validators.required));
        form.addControl('disability', this.fb.control('', Validators.required));
        form.addControl('seriousIllnesses', this.fb.control('', Validators.required));
        form.addControl('waiverPremiumPayment', this.fb.control('', Validators.required));
      } else if (age >= 18 && age <= 59) {
        form.addControl('disability', this.fb.control('', Validators.required));
        form.addControl('seriousIllnesses', this.fb.control('', Validators.required));
        form.addControl('waiverPremiumPayment', this.fb.control('', Validators.required));
      } else if (age >= 18 && age <= 55) {
        form.addControl('waiverPremiumPayment', this.fb.control('', Validators.required));
      }

    });

    const weightBmiSubscriber = this.newRequest.get('person').get('weight').valueChanges.subscribe(value => {
      this.getBmi();
    });

    const heightBmiSubscriber = this.newRequest.get('person').get('height').valueChanges.subscribe(value => {
      this.getBmi();
    });

    const heightUnitBmiSubscriber = this.newRequest.get('person').get('heightUnit').valueChanges.subscribe(value => {
      if (value === 'pies') {
        setTimeout(() => {
          const inchesBmiSubscriber = this.newRequest.get('person').get('inches').valueChanges.subscribe(val => {
            this.getBmi();

          });
        }, 1500);
      }
      this.getBmi();
    });

    const weightUnitBmiSubscriber = this.newRequest.get('person').get('weightUnit').valueChanges.subscribe(value => {
      this.getBmi();
    });

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

  getBmi() {
    const weightUnit = this.newRequest.get('person').get('weightUnit').value;
    const heightUnit = this.newRequest.get('person').get('heightUnit').value;

    let weight = this.newRequest.get('person').get('weight').value;
    let height = this.newRequest.get('person').get('height').value;
    let inches;

    if (this.newRequest.get('person').get('inches')) { inches = this.newRequest.get('person').get('inches').value; }

    if (weightUnit === 'libras') { weight = weight / 2.205; }
    if (heightUnit === 'pies') {
      height = (((height * 12) + inches) * 2.54);
    }

    const bmi = weight / ((height / 100) * (height / 100));

    if (bmi !== Infinity && !isNaN(bmi)) {
      const value = parseFloat(`${bmi}`).toFixed(2);
      this.newRequest.get('person').get('bmi').setValue(value);
    }
  }

  ngDoCheck(): void {
    this.maxWidth = window.matchMedia('(max-width: 11270px)');

  }

  onHeightUnitChange(evento) {
    const form = this.newRequest.get('person') as FormGroup;
    if (evento.valor === 'pies') {
      form.addControl('inches', this.fb.control('', Validators.required));
    } else {
      form.removeControl('inches');
    }
  }

  searchIdNumber(idNumber: string) {
    this.appComponent.showOverlay = true;

    this.userService.getQuotes(idNumber, 'vida')
      .subscribe((response: any) => {
        console.log(response);
        this.appComponent.showOverlay = false;
        if (response.data !== null) {
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

          switch (response.data.plan) {
            case 'Survivor':
              this.newRequest.get('releventPlanInformation').get('type').setValue('WWSURVIVOR');
              break;

            case 'Term Value':
              this.newRequest.get('releventPlanInformation').get('type').setValue('WWTERM VALUE');
              break;

            case 'Term':
              this.newRequest.get('releventPlanInformation').get('type').setValue('WWTERM');
              break;

            default:
              break;
          }

        } else {
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
      window.open('https://cotizadores.wwseguros.com.do/?cia=wws', '_blank');
    } else if (this.userService.getRoleCotizador() === 'WMA') {
      window.open('https://cotizadores.wwseguros.com.do/?cia=wwm', '_blank');
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.newRequest.dirty) {
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
    const formAQ = this.newRequest.get('activitiesQuestionnaires') as FormGroup;
    const formEP = this.newRequest.get('exposedPerson') as FormGroup;
    const formAR = this.newRequest.get('agentReport') as FormGroup;
    const formP = this.newRequest.get('person') as FormGroup;
    const formGI = this.newRequest.get('generalInformation') as FormGroup;
    const formHMI = this.newRequest.get('medicalHistory').get('informations') as FormGroup;
    const formWI = this.newRequest.get('medicalHistory').get('informations').get('womenInformation') as FormGroup;

    console.log(event);
    if (event.name === 'connectionType') {
      console.log(formAR);
      console.log(event.valor);

      switch (event.valor) {

        case 'familia':
          formAR.removeControl('connectionTypeInfo');
          formAR.addControl('connectionTypeInfo', this.fb.group({
            relationship: ['', Validators.required],
          }));
          break;

        case 'amigo':
          formAR.removeControl('connectionTypeInfo');
          formAR.addControl('connectionTypeInfo', this.fb.group({
            friendship: ['', Validators.required],
            amount: ['', [Validators.required, Validators.min(1)]],
            time: ['', Validators.required],
          }));
          break;

        case 'cliente':
          formAR.removeControl('connectionTypeInfo');
          formAR.addControl('connectionTypeInfo', this.fb.group({
            amount: ['', [Validators.required, Validators.min(1)]],
            time: ['', Validators.required],
          }));
          break;

        case 'acabado de conocer':
          formAR.removeControl('connectionTypeInfo');
          formAR.addControl('connectionTypeInfo', this.fb.group({
            how: ['', Validators.required],
          }));
          break;

        default:
          break;
      }
    }

    if (event.valor === 'si') {
      switch (event.name) {
        case 'diving':
          formAQ.addControl('diving', this.fb.group({}));
          break;

        case 'racing':
          formAQ.addControl('racing', this.fb.group({}));
          break;

        case 'skydiving':
          formAQ.addControl('skydiving', this.fb.group({}));
          break;

        case 'mountaineering':
          formAQ.addControl('mountaineering', this.fb.group({}));
          break;

        case 'isExposed':
          formEP.addControl('insured', this.fb.group({
            lastPosition: ['', Validators.required],
            time: ['', Validators.required],
            timeNumber: ['', Validators.required]
          }));
          break;

        case 'isPayerExposed':
          formEP.addControl('payer', this.fb.group({
            lastPosition: ['', Validators.required],
            time: ['', Validators.required],
            timeNumber: ['', Validators.required]
          }));
          break;

        case 'isContractorExposed':
          formEP.addControl('contractor', this.fb.group({
            lastPosition: ['', Validators.required],
            time: ['', Validators.required],
            timeNumber: ['', Validators.required]
          }));
          break;

        case 'sameAsPayer':
          formEP.removeControl('payer');
          this.newRequest.removeControl('payer');
          formEP.removeControl('isPayerExposed');
          formP.removeControl('payerIsLegalEntity');
          break;

        case 'payerIsLegalEntity':
          this.newRequest.removeControl('payer');
          formP.addControl('payerLegalEntity', this.fb.group({}));

          break;

        case 'sameAsContractor':
          formEP.removeControl('contractor');
          this.newRequest.removeControl('contractor');
          formEP.removeControl('isContractorExposed');
          formP.removeControl('contractorIsLegalEntity');
          break;

        case 'contractorIsLegalEntity':
          this.newRequest.removeControl('contractor');
          formP.addControl('contractorLegalEntity', this.fb.group({}));

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
          formCB.addControl('anotherCoverages', this.fb.array([this.createFormArray('coverages')]));
          this.existingCoveragesList = formCB.get('anotherCoverages') as FormArray;
          break;

        case 'changeAnotherCoverage':
          formCB.addControl('changingCoverages', this.fb.array([this.createFormArray('coverages')]));
          this.changingCoveragesList = formCB.get('changingCoverages') as FormArray;
          break;

        case 'haveSmoked':
          formGI.addControl('smoked', this.fb.control('', Validators.required));
          break;

        case 'consumeAlcohol':
          formGI.addControl('alcohol', this.fb.group({
            quantity: ['', Validators.required],
            frequency: ['', Validators.required],
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
          formGI.addControl('lostDriveLicense', this.fb.group({
            who: ['', Validators.required],
            when: ['', Validators.required],
            licenseNumber: ['', Validators.required],
            state: ['', Validators.required],
            information: ['', Validators.required],
          }));
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
          formQ.addControl('solicitudHipertensionArterial', this.fb.group({}));

          formHMI.addControl('heartPain', this.fb.array([this.createFormArray('medicalInfo')]));
          this.heartPainList = formHMI.get('heartPain') as FormArray;
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
          formQ.addControl('solicitudDiabetes', this.fb.group({}));

          formHMI.addControl('endocrineDisorder', this.fb.array([this.createFormArray('medicalInfo')]));
          this.endocrineDisorderList = formHMI.get('endocrineDisorder') as FormArray;
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
          formHMI.addControl('hadSpecializedTests', this.fb.array([this.createFormArray('medicalInfo')]));
          this.hadSpecializedTestsList = formHMI.get('hadSpecializedTests') as FormArray;
          break;

        case 'haveNotCarriedOut':
          formHMI.addControl('notCarriedOut', this.fb.array([this.createFormArray('medicalInfo')]));
          this.notCarriedOutList = formHMI.get('notCarriedOut') as FormArray;
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
          formHMI.addControl('testedPositiveForHIV', this.fb.array([this.createFormArray('medicalInfo')]));
          this.testedPositiveForHIVList = formHMI.get('testedPositiveForHIV') as FormArray;
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
    } else if (event.valor === 'no') {
      switch (event.name) {

        case 'diving':
          formAQ.removeControl('diving');
          break;

        case 'racing':
          formAQ.removeControl('racing');
          break;

        case 'skydiving':
          formAQ.removeControl('skydiving');
          break;

        case 'mountaineering':
          formAQ.removeControl('mountaineering');
          break;

        case 'isExposed':
          formEP.removeControl('exposedPerson');
          break;

        case 'isPayerExposed':
          formEP.removeControl('payer');
          break;

        case 'isContractorExposed':
          formEP.removeControl('contractor');
          break;

        case 'sameAsPayer':
          formEP.addControl('isPayerExposed', this.fb.control('', Validators.required));
          formP.addControl('payerIsLegalEntity', this.fb.control('', Validators.required));

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
            email: ['', Validators.required],
            company: this.fb.group({
              name: ['', Validators.required],
              position: ['', Validators.required],
              direction: ['', Validators.required],
              economicActivity: ['', Validators.required],
              city: ['', Validators.required],
              country: ['', Validators.required],
              kinship: ['', Validators.required],
              contractorCountry: ['', Validators.required],
            })
          }));
          break;

        case 'sameAsContractor':
          formEP.addControl('isContractorExposed', this.fb.control('', Validators.required));
          formP.addControl('contractorIsLegalEntity', this.fb.control('', Validators.required));

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
            email: ['', Validators.required],
            company: this.fb.group({
              name: ['', Validators.required],
              position: ['', Validators.required],
              direction: ['', Validators.required],
              economicActivity: ['', Validators.required],
              city: ['', Validators.required],
              country: ['', Validators.required],
              insurancePurpose: ['', Validators.required],
              contractorCountry: ['', Validators.required],
            }),
          }));
          break;

        case 'contractorIsLegalEntity':
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
              email: ['', Validators.required],
              company: this.fb.group({
                name: ['', Validators.required],
                position: ['', Validators.required],
                direction: ['', Validators.required],
                economicActivity: ['', Validators.required],
                city: ['', Validators.required],
                country: ['', Validators.required],
                insurancePurpose: ['', Validators.required],
                contractorCountry: ['', Validators.required],
              }),
            }));
          }

          formP.removeControl('payerLegalEntity');

          break;

        case 'payerIsLegalEntity':
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
              email: ['', Validators.required],
              company: this.fb.group({
                name: ['', Validators.required],
                position: ['', Validators.required],
                direction: ['', Validators.required],
                economicActivity: ['', Validators.required],
                city: ['', Validators.required],
                country: ['', Validators.required],
                kinship: ['', Validators.required],
                contractorCountry: ['', Validators.required],
              })
            }));
          }

          formP.removeControl('contractorLegalEntity');

          break;


        case 'isMarried':
          formAR.removeControl('marriedInformation');
          break;

        case 'isLessThan21':
          formAR.removeControl('familyInsurances');
          this.familyRelationshipInsurances = undefined;
          break;

        case 'hasAnotherCoverage':
          formCB.removeControl('anotherCoverages');
          this.existingCoveragesList = undefined;
          formCB.get('changeAnotherCoverage').reset();
          formCB.removeControl('changingCoverages');
          this.changingCoveragesList = undefined;
          break;

        case 'changeAnotherCoverage':
          formCB.removeControl('changingCoverages');
          this.changingCoveragesList = undefined;
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
          break;

        case 'doXtremeSport':
          formGI.removeControl('xtremeSport');
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
          formQ.removeControl('solicitudHipertensionArterial');

          formHMI.removeControl('heartPain');
          this.heartPainList = undefined;
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
          formQ.removeControl('solicitudDiabetes');


          formHMI.removeControl('endocrineDisorder');
          this.endocrineDisorderList = undefined;
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
          formHMI.removeControl('notCarriedOut');
          this.notCarriedOutList = undefined;
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
          formHMI.removeControl('testedPositiveForHIV');
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
          duration: ['', [Validators.required, Validators.min(1)]],
          time: ['', Validators.required],
          results: ['', Validators.required],
        });
        break;

      case 'doctorInfo':
        return this.fb.group({
          name: ['', Validators.required],
          address: ['', Validators.required],
        });
        break;

      case 'familyInsurances':
        return this.fb.group({
          family: ['', Validators.required],
          amount: ['', [Validators.required, Validators.min(0)]],
        });
        break;

      default:
        break;
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
    if (this.newRequest.get('questionnaires').get('solicitudEstadoFinancieroConfidencial')) {
      return Object.keys(this.newRequest.get('questionnaires').value).length - 1;
    } else {
      return Object.keys(this.newRequest.get('questionnaires').value).length;

    }
  }

  activitiesQuestionsLength() {
    return Object.keys(this.newRequest.get('activitiesQuestionnaires').value).length;
  }

  needFinancialStatusCalculator() {
    console.log('SI');
    const quantity = this.newRequest.get('releventPlanInformation').get('coverages').value.basicLifeAssuredAmount;
    const formQ = this.newRequest.get('questionnaires') as FormGroup;

    if (quantity >= 500000) {
      formQ.addControl('solicitudEstadoFinancieroConfidencial', this.fb.group({}));
    } else {
      formQ.removeControl('solicitudEstadoFinancieroConfidencial');
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

  print() {
    console.log(this.newRequest);
    console.log('json', JSON.stringify(this.newRequest.get('releventPlanInformation').value));
  }

  has(object: any, key : any) {
    return object ? this.hasOwnProperty.call(object, key) : false;
 }

 iterateThroughtAllObject(obj: any, groupControl: any)
 {
   const formDataGroup = groupControl as FormGroup;
   Object.keys(obj).forEach(e =>
     {
       let key = e;
       let value = obj[key];
       if (obj[key] !== null && obj[e] !== undefined && (typeof obj[e]) != "object")
       {
         if ( value !== undefined && value !== null && value !== '')
         {
           if (!this.has(formDataGroup['controls'], key))
           {
             formDataGroup.addControl(key, this.fb.control(value));
           }
           else
           {

           const valueFormControl = formDataGroup['controls'][key] as FormControl;
           valueFormControl.setValue (value);
         }
         }
       }
       else if (obj[key] !== null && obj[key] !== undefined && (typeof obj[key]) === "object")
       {
         if (Array.isArray(obj[key] ))
         {
          if (!this.has(formDataGroup['controls'], key))
          {
            formDataGroup.removeControl(key);
          }
          if(obj[key].length > 0)
          {

              let form = formDataGroup.get(key);
              let arrayForm = [];
              obj[key].forEach( (element) =>{
                let fbGroup = this.fb.group({
                  id: ['', Validators.required]
                });

                this.iterateThroughtAllObject(element,  fbGroup);
                arrayForm.push(fbGroup);
              });


              formDataGroup.addControl(key, this.fb.array(arrayForm));
          }
         }
         else
         {
          if (!this.has(formDataGroup['controls'], key))
          {
            formDataGroup.addControl(key, this.fb.group({
              id: ['', Validators.required]
            }));
          }

          let form = formDataGroup.get(key);

          this.iterateThroughtAllObject(obj[key], form);
          return form;
         }

       }

   });
 }
  getData(id) {
		this.life.returnData(id).subscribe(data => {
			// console.log(data.data.asegurado.documentoIdentidad)
      console.log(data);
      if (data !== undefined && data.data !== null &&
        data.data != undefined )
     {
       this.ID = data.data.id;
       this.iterateThroughtAllObject(data.data, this.newRequest);

      // this.disabilityGroup['controls'].num_financial_quote.setValue(data.data.num_financial_quote)
     }

    });

  this.life.id = null;
		console.log('this.life.id es igual a ' + this.life.id);
  }

}
