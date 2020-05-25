import { Component, OnInit, DoCheck, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { $sex, $country, $res, $time, $family } from 'src/app/core/form/objects';
import { DiseaseService } from '../../../shared/components/disease/shared/disease/disease.service';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { UserService } from '../../../../../core/services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LifeService } from './services/life.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { map, first } from 'rxjs/operators';
import { KnowYourCustomerComponent } from '../../../shared/components/disease/know-your-customer/know-your-customer.component';
// tslint:disable: one-line
// tslint:disable: max-line-length

@Component({
  selector: 'app-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.scss']
})
export class LifeComponent implements OnInit, DoCheck {
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

  mainActivity = {
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
      },
      {
        value: 'Mensual',
        viewValue: 'Mensual',
      },
      {
        value: 'Cheque',
        viewValue: 'Cheque',
      },
      {
        value: 'T.L.C',
        viewValue: 'T.L.C',
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
    'Empleador (Datos laborales)',
    'Contratante (completar sólo si no fuese el asegurado. De ser una Persona Jurídica, completar el Formulario Persona Jurídica.)',
    'Pagador (completar sólo si no fuese el contratante. De ser una Persona Jurídica, completar el Formulario Persona Jurídica.)',
    'Persona políticamente expuesta',
    'Perfil Financiero',
    'Información pertinente al plan',
    'Información pertinente al pago de la prima',
    'Designación de los Beneficiario(s) Primario(s)',
    'Beneficiario(s) Contingente(s)', 'Información general', 'Historial Médico', 'Firmas', 'Reporte del agente'];

  newRequest: FormGroup;
  noCotizacion;
  dependentsNumber = 0;

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
    private life:LifeService,
    private know:KnowYourCustomerComponent
  ) { }

  ID = null;
  ngOnInit() {

    this.route.params.subscribe(res => {
			this.ID = res.id;
		});
    this.route.params.subscribe(res => {
			this.noCotizacion = res.noCotizacion;
    });

		if (this.ID != null) {
			console.log("El ID es " + this.ID);
			this.getData(this.ID)
		}
		else if (this.ID == null) {
			console.log("ID esta vacio")
		}
    if (this.noCotizacion != null) {
			//this.getDataCotizaciones(this.noCotizacion);
			console.log('El noCotizacion es ' + this.noCotizacion);
		} else if (this.noCotizacion == null) {
      console.log('noCotizacion esta vacio');
      this.noCotizacion = '';
		}
    this.role = this.userService.getRoleCotizador();

    this.newRequest = this.fb.group({
      NoC: ['', Validators.required],
      isComplete: [false, Validators.required],

      person: this.fb.group({
        firstName: ['', Validators.required],
        secondName: ['', Validators.required],
        lastName: ['', Validators.required],
        date: [new Date(), Validators.required],
        sex: ['', Validators.required],
        nationality: ['', Validators.required],
        id2: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(1)]],
        weight: ['', Validators.required],
        height: ['', Validators.required],
        status: ['', Validators.required],
        annualIncome: ['', [Validators.required, Validators.min(1)]],
        currency: ['', Validators.required],
        countryOfResidence: ['', Validators.required],
        countryOfBirth: ['', Validators.required],
        direction: ['', Validators.required],
        tel: ['', Validators.required],
        cel: ['', Validators.required],
        officeTel: ['', Validators.required],
        email: ['', Validators.required],
        isExposed: ['', Validators.required],
      }),
      employer: this.fb.group({
        CompanyName: ['', Validators.required],
        profession: ['', Validators.required],
        economicActivity: ['', Validators.required],
        years: ['', Validators.required],
        jobDuties: ['', Validators.required],
        countryOfResidence: ['', Validators.required],
      }),
      contractor: this.fb.group({
        firstName: ['', Validators.required],
        secondName: ['', Validators.required],
        lastName: ['', Validators.required],
        date: [new Date(), Validators.required],
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
      }),
      payer: this.fb.group({
        firstName: ['', Validators.required],
        secondName: ['', Validators.required],
        lastName: ['', Validators.required],
        date: [new Date(), Validators.required],
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
        }),
      }),
      financialProfile: this.fb.group({
        annualIncome: ['', Validators.required],
        othersAnnualIncome: ['', Validators.required],
        paymentOrigin: ['', Validators.required],
      }),
      releventPlanInformation: this.fb.group({
        type: ['', Validators.required],
        timeAmount: ['', [Validators.required, Validators.min(1)]],
        time: ['', Validators.required],
        nicotineEstandar: ['', Validators.required],
        coverages: this.fb.group({
          basicLifeAssuredAmount: ['', Validators.required],
          basicLifeAmountCurrency: ['', Validators.required],
          basicLifeBonus: ['', Validators.required],
          basicLifeBonusCurrency: ['', Validators.required],
          survivalAssuredAmount: ['', Validators.required],
          survivalAmountCurrency: ['', Validators.required],
          survivalBonus: ['', Validators.required],
          survivalBonusCurrency: ['', Validators.required],
        })
      }),
      IncomeMainActivity: ['', Validators.required],
      primaryBenefits: this.fb.group({
        dependentsC: this.fb.array([this.formMethods.createItem(this.primaryBenefits)]),
        personBenefited: this.fb.group({
          name: [''],
          family: [''],
          id2: ['']
        })
      }),
      contingentBeneficiary: this.fb.group({
        dependentsC: this.fb.array([this.formMethods.createItem(this.primaryBenefits)]),
        personBenefited: this.fb.group({
          name: [''],
          family: [''],
          id2: ['']
        }),
        bankTransfer: this.fb.group({
          family: [''],
          amount: ['', Validators.min(0)],
          contact: ['']
        }),
        hasAnotherCoverage: ['', Validators.required],
        changeAnotherCoverage: ['', Validators.required],
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
  }

  x=0;
  ngDoCheck(): void {
    this.maxWidth = window.matchMedia('(max-width: 11270px)');

    if(this.ID!=null){
      if(this.x<30){
        if(this.newRequest.get('questionnaires').get('solicitudHipertensionArterial')){
          // console.log("EXIIIIIISSTEEEEEEEEEEEEEE!!!!!")
          this.getDataSubFormsHypertension(this.ID, 'solicitudHipertensionArterial')
        }
        else {
          // console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOoo  EXIIIIIISSTEEEEEEEEEEEEEE!!!!!")
        }

        if(this.newRequest.get('contractorQuestionnaires').get('knowYourCustomer')){
          // console.log("EXIIIIIISSTEEEEEEEEEEEEEE!!!!!")
          this.getDataSubFormsHypertension(this.ID, 'knowYourCustomer')
          // this.know.addBasicControls();
        }
        else {
          // console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOoo  EXIIIIIISSTEEEEEEEEEEEEEE!!!!!")
        }

        if(this.newRequest.get('questionnaires').get('solicitudEstadoFinancieroConfidencial')){
          // console.log("EXIIIIIISSTEEEEEEEEEEEEEE!!!!!")
          this.getDataSubFormsHypertension(this.ID, 'solicitudEstadoFinancieroConfidencial')
        }
        else {
          // console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOoo  EXIIIIIISSTEEEEEEEEEEEEEE!!!!!")
        }
        this.x++;
      }
    }
    else {
      // console.log("this.ID es igual a " + this.ID + ", por tanto, no se va hacer lo de ngDoCheck()")
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
    const formAR = this.newRequest.get('agentReport') as FormGroup;
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
        case 'isExposed':
          this.newRequest.addControl('exposedPerson', this.fb.group({
            contractor: ['', Validators.required],
            payer: ['', Validators.required],
            insured: ['', Validators.required],
            lastPosition: ['', Validators.required],
            time: ['', Validators.required],
            timeNumber: ['', Validators.required]
          }));
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
        case 'isExposed':
          this.newRequest.removeControl('exposedPerson');
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
    const currency = this.newRequest.get('releventPlanInformation').get('coverages').value.basicLifeAmountCurrency;
    const formQ = this.newRequest.get('questionnaires') as FormGroup;

    if ((quantity >= 500000 && currency === 'usd') || (quantity >= 27370000 && currency === 'dop')) {
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
      if (this.role === 'WMA') { getForm.addControl('knowYourClient', this.fb.group({})); }
      else if (this.role === 'WWS') { getForm.addControl('knowYourCustomer', this.fb.group({})); }

      return true;
    } else {
      if (this.role === 'WMA') { getForm.removeControl('knowYourClient'); }
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

  getDataSubFormsHypertension(id, name) {
    this.life.returnData(id).subscribe(data => {
      // console.log(data)
      // if(data.data.person.city){
      //   delete data.data.person.city;
      // }
      // console.log(data.data.person)
      // console.log(data.data.employer)
      // console.log(data.data.contractor).get('personInfo')
      // console.log(data.data.contractor.company)
      // let res= data;
      // console.log("res: ", res.data.person)
      if(name=="solicitudHipertensionArterial"){
        if(this.newRequest.get('questionnaires').get('solicitudHipertensionArterial')){
          // console.log("MYYYYYYYYYYYYY NAMEEEEEEEEEEEEEEE IS YOKOTO MASAKA ONI WAAAAAAA!!!")
        this.newRequest['controls'].questionnaires['controls'].solicitudHipertensionArterial['controls'].personInfo['controls'].name.setValue('Rhailin Amable Made Puello');
        }
        else {
          // console.log("NAAAAAAAAAAAAAADA que ver aqui, sigan en lo que estaban.")
        }
      }
      //
      if(name=="solicitudEstadoFinancieroConfidencial"){
        if(this.newRequest.get('questionnaires').get('solicitudEstadoFinancieroConfidencial')){
          // console.log("MYYYYYYYYYYYYY NAMEEEEEEEEEEEEEEE IS YOKOTO MASAKA ONI WAAAAAAA!!!")
        // this.newRequest['controls'].questionnaires['controls'].solicitudEstadoFinancieroConfidencial['controls'].name.setValue('Rhailin Amable Made Puello');
        }
        else {
          // console.log("NAAAAAAAAAAAAAADA que ver aqui, sigan en lo que estaban.")
        }
      }

      if(name=="knowYourCustomer"){
        if(this.newRequest.get('contractorQuestionnaires').get('knowYourCustomer')){
          // console.log("EXIIIIIISSTEEEEEEEEEEEEEE!!!!!")
          this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].request.setValue(data.data.contractorQuestionnaires.knowYourCustomer.request);
          // this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].general_data['controls'].first_name.setValue(data.data.contractorQuestionnaires.knowYourCustomer.general_data.first_name);
          const controlsForms32 = this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].general_data['controls'];
          console.log(controlsForms32)

          for(const nameControls in controlsForms32){

            const dataControls = data.data.contractorQuestionnaires.knowYourCustomer.general_data;
            for(const nameDataControls in dataControls){

              if (nameDataControls != nameControls ) {
                // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                // console.log("No debe de setearse.")
              }
              else if(nameDataControls == nameControls){
                // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                controlsForms32[nameControls].setValue(dataControls[nameDataControls])
              }
              // console.log(nameDataControls)
              // console.log(nameControls);
            }
            // console.log(controles[nameControles]);
          }

          const controlsForms33 = this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].professional_data['controls'];
          console.log(controlsForms33)

          for(const nameControls in controlsForms33){

            const dataControls = data.data.contractorQuestionnaires.knowYourCustomer.professional_data;
            for(const nameDataControls in dataControls){

              if (nameDataControls != nameControls ) {
                // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                // console.log("No debe de setearse.")
              }
              else if(nameDataControls == nameControls){
                // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                controlsForms33[nameControls].setValue(dataControls[nameDataControls])
              }
              // console.log(nameDataControls)
              // console.log(nameControls);
            }
            // console.log(controles[nameControles]);
          }

          this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].exposed['controls'].exposed_person_radio.setValue(data.data.contractorQuestionnaires.knowYourCustomer.exposed.exposed_person_radio);

          if(this.newRequest.get('contractorQuestionnaires').get('knowYourCustomer').get('exposed').get('position')){
            this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].exposed['controls'].position['controls'].info.setValue(data.data.contractorQuestionnaires.knowYourCustomer.exposed.position.info);
          }

          this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].policy['controls'].total_policy_radio.setValue(data.data.contractorQuestionnaires.knowYourCustomer.policy.total_policy_radio);
          // const varPolicy = {
          //   valor: data.data.contractorQuestionnaires.knowYourCustomer.policy.total_policy_radio,
          //   name:'total_policy_radio'
          // };
          // if(this.newRequest.get('contractorQuestionnaires').get('knowYourCustomer')){
          //   if(this.newRequest.get('contractorQuestionnaires').get('knowYourCustomer').get('exposed')){
              // if(varPolicy!=null){
              //   this.know.selectChange(varPolicy);
              // }
          //   }
          // }
          if(this.newRequest.get('contractorQuestionnaires').get('knowYourCustomer').get('questions')){
            this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].questions['controls'].transaction['controls'].details.setValue(data.data.contractorQuestionnaires.knowYourCustomer.questions.transaction.details);
            this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].questions['controls'].transaction['controls'].investigation_radio.setValue(data.data.contractorQuestionnaires.knowYourCustomer.questions.transaction.investigation_radio);

            if(this.newRequest.get('contractorQuestionnaires').get('knowYourCustomer').get('questions').get('transaction').get('investigation')){
              this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].questions['controls'].transaction['controls'].investigation['controls'].info.setValue(data.data.contractorQuestionnaires.knowYourCustomer.questions.transaction.investigation.info);
            }

            if(this.newRequest.get('contractorQuestionnaires').get('knowYourCustomer').get('questions').get('finance')){
              this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].questions['controls'].finance['controls'].main_annual_income.setValue(data.data.contractorQuestionnaires.knowYourCustomer.questions.finance.main_annual_income);
              this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].questions['controls'].finance['controls'].annual_income_others.setValue(data.data.contractorQuestionnaires.knowYourCustomer.questions.finance.annual_income_others);
            }

            if(this.newRequest.get('contractorQuestionnaires').get('knowYourCustomer').get('questions').get('bank')){
              for (let xx = 0; xx < data.data.contractorQuestionnaires.knowYourCustomer.questions.bank.bank_array.length; xx++) {
                console.log("hola, esto es data.data.contractorQuestionnaires.knowYourCustomer.questions.bank.bank_array, y soy id numero "+data.data.contractorQuestionnaires.knowYourCustomer.questions.bank.bank_array[xx].id)
                if (xx >= 1) {
                  console.log('Hola, esto es data.data.contractorQuestionnaires.knowYourCustomer.questions.bank.bank_array, y soy yo, ' + xx)
                 this.know.bankFormArray = this.newRequest.get('contractorQuestionnaires').get('knowYourCustomer').get('questions').get('bank').get('bank_array') as FormArray;
                  this.know.addFormArray(this.know.bankFormArray,'bank_array');
                  if(this.know.bankFormArray.length >data.data.contractorQuestionnaires.knowYourCustomer.questions.bank.bank_array.length){
                    this.know.removeFormArray((this.know.bankFormArray.length-1) , this.know.bankFormArray)
                  }
                  // const increment = this.know.bankFormArray.length + 1;
                  // this.know.bankFormArray = this.know.formMethods.addElement(this.know.bankFormArray, increment, this.know.createFormArray('bank_array')).formArray;
                  // addFormArray(bankFormArray,'bank_array')
                }

                const controlsForms34 = this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].questions['controls'].bank['controls'].bank_array['controls'][xx]['controls'];
                  console.log(controlsForms34)

                  for(const nameControls in controlsForms34){

                    const dataControls = data.data.contractorQuestionnaires.knowYourCustomer.questions.bank.bank_array[xx];
                    for(const nameDataControls in dataControls){

                      if (nameDataControls != nameControls ) {
                        // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                        console.log("No debe de setearse.")
                      }
                      else if(nameDataControls == nameControls){
                        // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                        controlsForms34[nameControls].setValue(dataControls[nameDataControls])
                      }
                      // console.log(nameDataControls)
                      // console.log(nameControls);
                    }
                    // console.log(controles[nameControles]);
                  }
                // this.newRequest['controls'].generalInformation['controls'].insuranceProposed['controls'][x]['controls'].name.setValue(res.data.primaryBenefits.dependentsC[x].name)

                // const formID7 = this.claimForm.get('reclamados').get([x]) as FormGroup;
                // formID7.addControl('id', this.fb.control(data.data.reclamados[x].id, Validators.required));
              }
            }

            if(this.newRequest.get('contractorQuestionnaires').get('knowYourCustomer').get('questions').get('commercial')){
              for (let xx = 0; xx < data.data.contractorQuestionnaires.knowYourCustomer.questions.commercial.commercial_array.length; xx++) {
                console.log("hola, esto es data.data.contractorQuestionnaires.knowYourCustomer.questions.commercial.commercial_array, y soy id numero "+data.data.contractorQuestionnaires.knowYourCustomer.questions.commercial.commercial_array[xx].id)
                if (xx >= 1) {
                  console.log('Hola, esto es data.data.contractorQuestionnaires.knowYourCustomer.questions.commercial.commercial_array, y soy yo, ' + xx)
                 this.know.commercialFormArray = this.newRequest.get('contractorQuestionnaires').get('knowYourCustomer').get('questions').get('commercial').get('commercial_array') as FormArray;
                  this.know.addFormArray(this.know.commercialFormArray,'commercial_array');
                  if(this.know.commercialFormArray.length >data.data.contractorQuestionnaires.knowYourCustomer.questions.commercial.commercial_array.length){
                    this.know.removeFormArray((this.know.commercialFormArray.length-1) , this.know.commercialFormArray)
                  }
                  // const increment = this.know.commercialFormArray.length + 1;
                  // this.know.commercialFormArray = this.know.formMethods.addElement(this.know.commercialFormArray, increment, this.know.createFormArray('commercial_array')).formArray;
                  // addFormArray(commercialFormArray,'commercial_array')
                }

                const controlsForms35 = this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].questions['controls'].commercial['controls'].commercial_array['controls'][xx]['controls'];
                  console.log(controlsForms35)

                  for(const nameControls in controlsForms35){

                    const dataControls = data.data.contractorQuestionnaires.knowYourCustomer.questions.commercial.commercial_array[xx];
                    for(const nameDataControls in dataControls){

                      if (nameDataControls != nameControls ) {
                        // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                        console.log("No debe de setearse.")
                      }
                      else if(nameDataControls == nameControls){
                        // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                        controlsForms35[nameControls].setValue(dataControls[nameDataControls])
                      }
                      // console.log(nameDataControls)
                      // console.log(nameControls);
                    }
                    // console.log(controles[nameControles]);
                  }
                // this.newRequest['controls'].generalInformation['controls'].insuranceProposed['controls'][x]['controls'].name.setValue(res.data.primaryBenefits.dependentsC[x].name)

                // const formID7 = this.claimForm.get('reclamados').get([x]) as FormGroup;
                // formID7.addControl('id', this.fb.control(data.data.reclamados[x].id, Validators.required));
              }
            }

            if(this.newRequest.get('contractorQuestionnaires').get('knowYourCustomer').get('questions').get('personal')){
              for (let xx = 0; xx < data.data.contractorQuestionnaires.knowYourCustomer.questions.personal.personal_array.length; xx++) {
                console.log("hola, esto es data.data.contractorQuestionnaires.knowYourCustomer.questions.personal.personal_array, y soy id numero "+data.data.contractorQuestionnaires.knowYourCustomer.questions.personal.personal_array[xx].id)
                if (xx >= 1) {
                  console.log('Hola, esto es data.data.contractorQuestionnaires.knowYourCustomer.questions.personal.personal_array, y soy yo, ' + xx)
                 this.know.personalFormArray = this.newRequest.get('contractorQuestionnaires').get('knowYourCustomer').get('questions').get('personal').get('personal_array') as FormArray;
                  this.know.addFormArray(this.know.personalFormArray,'personal_array');
                  if(this.know.personalFormArray.length >data.data.contractorQuestionnaires.knowYourCustomer.questions.personal.personal_array.length){
                    this.know.removeFormArray((this.know.personalFormArray.length-1) , this.know.personalFormArray)
                  }
                  // const increment = this.know.personalFormArray.length + 1;
                  // this.know.personalFormArray = this.know.formMethods.addElement(this.know.personalFormArray, increment, this.know.createFormArray('personal_array')).formArray;
                  // addFormArray(personalFormArray,'personal_array')
                }

                const controlsForms36 = this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].questions['controls'].personal['controls'].personal_array['controls'][xx]['controls'];
                  console.log(controlsForms36)

                  for(const nameControls in controlsForms36){

                    const dataControls = data.data.contractorQuestionnaires.knowYourCustomer.questions.personal.personal_array[xx];
                    for(const nameDataControls in dataControls){

                      if (nameDataControls != nameControls ) {
                        // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                        console.log("No debe de setearse.")
                      }
                      else if(nameDataControls == nameControls){
                        // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                        controlsForms36[nameControls].setValue(dataControls[nameDataControls])
                      }
                      // console.log(nameDataControls)
                      // console.log(nameControls);
                    }
                    // console.log(controles[nameControles]);
                  }
                // this.newRequest['controls'].generalInformation['controls'].insuranceProposed['controls'][x]['controls'].name.setValue(res.data.primaryBenefits.dependentsC[x].name)

                // const formID7 = this.claimForm.get('reclamados').get([x]) as FormGroup;
                // formID7.addControl('id', this.fb.control(data.data.reclamados[x].id, Validators.required));
              }
            }

            if(this.newRequest.get('contractorQuestionnaires').get('knowYourCustomer').get('questions').get('documents')){
              const controlsForms37 = this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].questions['controls'].documents['controls'];
                  console.log(controlsForms37)

                  for(const nameControls in controlsForms37){

                    const dataControls = data.data.contractorQuestionnaires.knowYourCustomer.questions.documents;
                    for(const nameDataControls in dataControls){

                      if (nameDataControls != nameControls ) {
                        // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                        console.log("No debe de setearse.")
                      }
                      else if(nameDataControls == nameControls){
                        // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                        controlsForms37[nameControls].setValue(dataControls[nameDataControls])
                      }
                      // console.log(nameDataControls)
                      // console.log(nameControls);
                    }
                    // console.log(controles[nameControles]);
                  }
              }
          }

          const controlsForms38 = this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].broker['controls'];
          console.log(controlsForms38)

          for(const nameControls in controlsForms38){

            const dataControls = data.data.contractorQuestionnaires.knowYourCustomer.broker;
            for(const nameDataControls in dataControls){

              if (nameDataControls != nameControls ) {
                // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                // console.log("No debe de setearse.")
              }
              else if(nameDataControls == nameControls){
                // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                controlsForms38[nameControls].setValue(dataControls[nameDataControls])
              }
              // console.log(nameDataControls)
              // console.log(nameControls);
            }
            // console.log(controles[nameControles]);
          }

          const controlsForms39 = this.newRequest['controls'].contractorQuestionnaires['controls'].knowYourCustomer['controls'].info_for_the_insurance_carrier['controls'];
          console.log(controlsForms39)

          for(const nameControls in controlsForms39){

            const dataControls = data.data.contractorQuestionnaires.knowYourCustomer.info_for_the_insurance_carrier;
            for(const nameDataControls in dataControls){

              if (nameDataControls != nameControls ) {
                // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                // console.log("No debe de setearse.")
              }
              else if(nameDataControls == nameControls){
                // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                controlsForms39[nameControls].setValue(dataControls[nameDataControls])
              }
              // console.log(nameDataControls)
              // console.log(nameControls);
            }
            // console.log(controles[nameControles]);
          }
        }
        // else {
        //   // console.log("NAAAAAAAAAAAAAADA que ver aqui, sigan en lo que estaban.")
        // }
      }

    })
  }

  getData(id) {
		this.life.returnData(id).subscribe(data => {
			// console.log(data.data.asegurado.documentoIdentidad)
      console.log(data)

      if(data.data.person.city){
        delete data.data.person.city;
      }
      // console.log(data.data.person)
      // console.log(data.data.employer)
      // console.log(data.data.contractor)
      // console.log(data.data.contractor.company)

      let res= data;
      // console.log("res: ", res.data.person)

      this.newRequest['controls'].NoC.setValue(data.data.noC)
      // console.log(data.data.noC)

      // const formID1 = this.newRequest.get('person') as FormGroup;
      // formID1.addControl('id', this.fb.control(''));
      // formID1.addControl('city', this.fb.control(''));
      const controlsForms = this.newRequest['controls'].person['controls'];
      console.log(controlsForms)

			for(const nameControls in controlsForms){

				const dataControls = res.data.person;
				for(const nameDataControls in dataControls){

          if (nameDataControls != nameControls ) {
            // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
						console.log("No debe de setearse.")
          }
				  else if(nameDataControls == nameControls){
            // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
            controlsForms[nameControls].setValue(dataControls[nameDataControls])
					}
					// console.log(nameDataControls)
					// console.log(nameControls);
				}
				// console.log(controles[nameControles]);
      }

      const controlsForms2 = this.newRequest['controls'].employer['controls'];
      console.log(controlsForms2)

      this.newRequest['controls'].employer['controls'].CompanyName.setValue( res.data.employer.companyName);
      for(const nameControls in controlsForms2){

				const dataControls = res.data.employer;
				for(const nameDataControls in dataControls){

          if (nameDataControls != nameControls ) {
            // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
						console.log("No debe de setearse.")
          }
				  else if(nameDataControls == nameControls){
            // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
            controlsForms2[nameControls].setValue(dataControls[nameDataControls])
					}
					// console.log(nameDataControls)
					// console.log(nameControls);
				}
				// console.log(controles[nameControles]);
      }

      // res.data.contractor['status']= res.data.contractor.statusStr

      // delete res.data.contractor.statusStr

      // console.log("res.data.contractor['status'] es igual a " + res.data.contractor['status'])

      // console.log("Se borro statusStr, la nueva data ahora es igual a ", res.data.contractor)

      const controlsForms3 = this.newRequest['controls'].contractor['controls'];
      console.log(controlsForms3)

      for(const nameControls in controlsForms3){

				const dataControls = res.data.contractor;
				for(const nameDataControls in dataControls){

          if (nameDataControls != nameControls ) {
            // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
						console.log("No debe de setearse.")
          }
				  else if(nameDataControls == nameControls && nameControls!='company'){
            // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
            controlsForms3[nameControls].setValue(dataControls[nameDataControls])
					}
					// console.log(nameDataControls)
					// console.log(nameControls);
				}
				// console.log(controles[nameControles]);
      }

      const controlsForms4 = this.newRequest['controls'].contractor['controls'].company['controls'];
      console.log(controlsForms4)

      for(const nameControls in controlsForms4){

				const dataControls = res.data.contractor.company;
				for(const nameDataControls in dataControls){

          if (nameDataControls != nameControls ) {
            // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
						console.log("No debe de setearse.")
          }
				  else if(nameDataControls == nameControls){
            // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
            controlsForms4[nameControls].setValue(dataControls[nameDataControls])
					}
					// console.log(nameDataControls)
					// console.log(nameControls);
				}
				// console.log(controles[nameControles]);
      }

      // res.data.payer['status']= res.data.payer.statusStr

      // delete res.data.payer.statusStr

      // console.log("res.data.payer['status'] es igual a " + res.data.payer['status'])

      // console.log("Se borro statusStr, la nueva data ahora es igual a ", res.data.payer)

      const controlsForms5 = this.newRequest['controls'].payer['controls'];
      console.log(controlsForms5)

      for(const nameControls in controlsForms5){

				const dataControls = res.data.payer;
				for(const nameDataControls in dataControls){

          if (nameDataControls != nameControls ) {
            // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
						console.log("No debe de setearse.")
          }
				  else if(nameDataControls == nameControls && nameControls!='company'){
            // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
            controlsForms5[nameControls].setValue(dataControls[nameDataControls])
					}
					// console.log(nameDataControls)
					// console.log(nameControls);
				}
				// console.log(controles[nameControles]);
      }

      const controlsForms6 = this.newRequest['controls'].payer['controls'].company['controls'];
      console.log(controlsForms6)

      for(const nameControls in controlsForms6){

				const dataControls = res.data.payer.company;
				for(const nameDataControls in dataControls){

          if (nameDataControls != nameControls ) {
            // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
						console.log("No debe de setearse.")
          }
				  else if(nameDataControls == nameControls){
            // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
            controlsForms6[nameControls].setValue(dataControls[nameDataControls])
					}
					// console.log(nameDataControls)
					// console.log(nameControls);
				}
				// console.log(controles[nameControles]);
      }

      const sd = {
        valor: res.data.person.isExposed,
        name:'isExposed'
			};

			if (sd.valor != null) {
				this.selectChange(sd);
				if (this.newRequest.get('exposedPerson')) {

          if(res.data.exposedPerson.contractor=='true'){
            res.data.exposedPerson.contractor=true;
          }
          else if(res.data.exposedPerson.contractor=='false'){
            res.data.exposedPerson.contractor=false;
          }
          console.log("res.data.exposedPerson.contractor es igual a " + res.data.exposedPerson.contractor)

          if(res.data.exposedPerson.insured=='true'){
            res.data.exposedPerson.insured=true;
          }
          else if(res.data.exposedPerson.insured=='false'){
            res.data.exposedPerson.insured=false;
          }
          console.log("res.data.exposedPerson.insured es igual a " + res.data.exposedPerson.insured)

          if(res.data.exposedPerson.payer=='true'){
            res.data.exposedPerson.payer=true;
          }
          else if(res.data.exposedPerson.payer=='false'){
            res.data.exposedPerson.payer=false;
          }
          console.log("res.data.exposedPerson.payer es igual a " + res.data.exposedPerson.payer)

          const controlsForms7 = this.newRequest['controls'].exposedPerson['controls'];
          console.log(controlsForms7)

          for(const nameControls in controlsForms7){

			    	const dataControls = res.data.exposedPerson;
			    	for(const nameDataControls in dataControls){

              if (nameDataControls != nameControls ) {
                // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
			    			console.log("No debe de setearse.")
              }
			    	  else if(nameDataControls == nameControls){
                // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                controlsForms7[nameControls].setValue(dataControls[nameDataControls])
			    		}
			    		// console.log(nameDataControls)
			    		// console.log(nameControls);
			    	}
			    	// console.log(controles[nameControles]);
          }

          console.log('Control exposedPerson CREADOOOOOOOO!');
				}
			} else if (sd.valor == null || sd.valor == "no") {
				console.log('No hay que crear el control exposedPerson');
			}

      const controlsForms8 = this.newRequest['controls'].financialProfile['controls'];
          console.log(controlsForms8)

          for(const nameControls in controlsForms8){

			    	const dataControls = res.data.financialProfile;
			    	for(const nameDataControls in dataControls){

              if (nameDataControls != nameControls ) {
                // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
			    			console.log("No debe de setearse.")
              }
			    	  else if(nameDataControls == nameControls){
                // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                controlsForms8[nameControls].setValue(dataControls[nameDataControls])
			    		}
			    		// console.log(nameDataControls)
			    		// console.log(nameControls);
			    	}
			    	// console.log(controles[nameControles]);
          }

          //ESTO   LO   HICE   MANUAL (y automatico el sub grupo),   POR   TANTO   IGNORAR   ESTOS   FOR   INs!

          // const controlsForms9 = this.newRequest['controls'].releventPlanInformation['controls'];
          // console.log(controlsForms9)

          // for(const nameControls in controlsForms9){

			    // 	const dataControls = res.data.releventPlanInformation;
			    // 	for(const nameDataControls in dataControls){

          //     if (nameDataControls != nameControls ) {
          //       // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
			    // 			console.log("No debe de setearse.")
          //     }
			    // 	  else if(nameDataControls == nameControls){
          //       // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
          //       controlsForms9[nameControls].setValue(dataControls[nameDataControls])
			    // 		}
			    // 		// console.log(nameDataControls)
			    // 		// console.log(nameControls);
			    // 	}
			    // 	// console.log(controles[nameControles]);
          // }

          // const formID9 = this.newRequest.get('releventPlanInformation') as FormGroup;
          // formID9.addControl('id', this.fb.control(''));
          this.newRequest['controls'].releventPlanInformation['controls'].type.setValue(res.data.releventPlanInformation.type)
          this.newRequest['controls'].releventPlanInformation['controls'].timeAmount.setValue(res.data.releventPlanInformation.timeAmount)
          this.newRequest['controls'].releventPlanInformation['controls'].time.setValue(res.data.releventPlanInformation.time)
          this.newRequest['controls'].releventPlanInformation['controls'].nicotineEstandar.setValue(res.data.releventPlanInformation.nicotineEstandar)

          const controlsForms10 = this.newRequest['controls'].releventPlanInformation['controls'].coverages['controls'];
          console.log(controlsForms10)

          for(const nameControls in controlsForms10){

			    	const dataControls = res.data.releventPlanInformation.coverages;
			    	for(const nameDataControls in dataControls){

              if (nameDataControls != nameControls ) {
                // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
			    			console.log("No debe de setearse.")
              }
			    	  else if(nameDataControls == nameControls){
                // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                controlsForms10[nameControls].setValue(dataControls[nameDataControls])
			    		}
			    		// console.log(nameDataControls)
			    		// console.log(nameControls);
			    	}
			    	// console.log(controles[nameControles]);
          }
          this.needFinancialStatusCalculator()

          this.newRequest['controls'].IncomeMainActivity.setValue(res.data.incomeMainActivity)

          for (let x = 0; x < res.data.primaryBenefits.dependentsC.length; x++) {
            console.log("hola, esto es res.data.primaryBenefits.dependentsC, y soy id numero "+res.data.primaryBenefits.dependentsC[x].id)
            if (x >= 1) {
              console.log('Hola, esto es res.data.primaryBenefits.dependentsC, y soy yo, ' + x)
              this.add(this.primaryBenefitsArray,this.primaryBenefits);
            }

            const controlsForms11 = this.newRequest['controls'].primaryBenefits['controls'].dependentsC['controls'][x]['controls'];
              console.log(controlsForms11)

              for(const nameControls in controlsForms11){

                const dataControls = res.data.primaryBenefits.dependentsC[x];
                for(const nameDataControls in dataControls){

                  if (nameDataControls != nameControls ) {
                    // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                    console.log("No debe de setearse.")
                  }
                  else if(nameDataControls == nameControls){
                    // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                    controlsForms11[nameControls].setValue(dataControls[nameDataControls])
                  }
                  // console.log(nameDataControls)
                  // console.log(nameControls);
                }
                // console.log(controles[nameControles]);
              }
            // this.newRequest['controls'].primaryBenefits['controls'].dependentsC['controls'][x]['controls'].name.setValue(res.data.primaryBenefits.dependentsC[x].name)

            // const formID7 = this.claimForm.get('reclamados').get([x]) as FormGroup;
            // formID7.addControl('id', this.fb.control(data.data.reclamados[x].id, Validators.required));
          }

          const controlsForms12 = this.newRequest['controls'].primaryBenefits['controls'].personBenefited['controls'];
          console.log(controlsForms12)

          for(const nameControls in controlsForms12){

			    	const dataControls = res.data.primaryBenefits.personBenefited;
			    	for(const nameDataControls in dataControls){

              if (nameDataControls != nameControls ) {
                // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
			    			console.log("No debe de setearse.")
              }
			    	  else if(nameDataControls == nameControls){
                // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                controlsForms12[nameControls].setValue(dataControls[nameDataControls])
			    		}
			    		// console.log(nameDataControls)
			    		// console.log(nameControls);
			    	}
			    	// console.log(controles[nameControles]);
          }

      // console.log("Si veo esto, me vale verga esa propiedad city igual a null. Y si no, bueno, que puedo hacer? Hay que resolver, xD!")

      for (let x = 0; x < res.data.contingentBeneficiary.dependentsC.length; x++) {
        console.log("hola, esto es res.data.contingentBeneficiary.dependentsC, y soy id numero "+res.data.contingentBeneficiary.dependentsC[x].id)
        if (x >= 1) {
          console.log('Hola, esto es res.data.contingentBeneficiary.dependentsC, y soy yo, ' + x)
          this.add(this.contingentBeneficiaryArray,this.primaryBenefits);
        }

        const controlsForms13 = this.newRequest['controls'].contingentBeneficiary['controls'].dependentsC['controls'][x]['controls'];
          console.log(controlsForms13)

          for(const nameControls in controlsForms13){

            const dataControls = res.data.contingentBeneficiary.dependentsC[x];
            for(const nameDataControls in dataControls){

              if (nameDataControls != nameControls ) {
                // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                console.log("No debe de setearse.")
              }
              else if(nameDataControls == nameControls){
                // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                controlsForms13[nameControls].setValue(dataControls[nameDataControls])
              }
              // console.log(nameDataControls)
              // console.log(nameControls);
            }
            // console.log(controles[nameControles]);
          }
        // this.newRequest['controls'].contingentBeneficiary['controls'].dependentsC['controls'][x]['controls'].name.setValue(res.data.primaryBenefits.dependentsC[x].name)

        // const formID7 = this.claimForm.get('reclamados').get([x]) as FormGroup;
        // formID7.addControl('id', this.fb.control(data.data.reclamados[x].id, Validators.required));
      }

      const controlsForms14 = this.newRequest['controls'].contingentBeneficiary['controls'].personBenefited['controls'];
          console.log(controlsForms14)

          for(const nameControls in controlsForms14){

			    	const dataControls = res.data.contingentBeneficiary.personBenefited;
			    	for(const nameDataControls in dataControls){

              if (nameDataControls != nameControls ) {
                // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
			    			console.log("No debe de setearse.")
              }
			    	  else if(nameDataControls == nameControls){
                // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                controlsForms14[nameControls].setValue(dataControls[nameDataControls])
			    		}
			    		// console.log(nameDataControls)
			    		// console.log(nameControls);
			    	}
			    	// console.log(controles[nameControles]);
          }

          const controlsForms15 = this.newRequest['controls'].contingentBeneficiary['controls'].bankTransfer['controls'];
          console.log(controlsForms15)

          for(const nameControls in controlsForms15){

			    	const dataControls = res.data.contingentBeneficiary.bankTransfer;
			    	for(const nameDataControls in dataControls){

              if (nameDataControls != nameControls ) {
                // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
			    			console.log("No debe de setearse.")
              }
			    	  else if(nameDataControls == nameControls){
                // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                controlsForms15[nameControls].setValue(dataControls[nameDataControls])
			    		}
			    		// console.log(nameDataControls)
			    		// console.log(nameControls);
			    	}
			    	// console.log(controles[nameControles]);
          }

          this.newRequest['controls'].contingentBeneficiary['controls'].hasAnotherCoverage.setValue(res.data.contingentBeneficiary.hasAnotherCoverage)
          this.newRequest['controls'].contingentBeneficiary['controls'].changeAnotherCoverage.setValue(res.data.contingentBeneficiary.changeAnotherCoverage)

          const var1 = {
            valor: res.data.contingentBeneficiary.hasAnotherCoverage,
            name:'hasAnotherCoverage'
          };

          if (var1.valor != null) {
            this.selectChange(var1);
            if (this.newRequest.get('contingentBeneficiary').get('anotherCoverages')) {

              for (let x = 0; x < res.data.contingentBeneficiary.anotherCoverages.length; x++) {
                console.log("hola, esto es res.data.contingentBeneficiary.anotherCoverages, y soy id numero "+res.data.contingentBeneficiary.anotherCoverages[x].id)
                if (x >= 1) {
                  console.log('Hola, esto es res.data.contingentBeneficiary.anotherCoverages, y soy yo, ' + x)
                  this.addToList(this.existingCoveragesList, 'coverages');
                }

                const controlsForms16 = this.newRequest['controls'].contingentBeneficiary['controls'].anotherCoverages['controls'][x]['controls'];
                  console.log(controlsForms16)

                  for(const nameControls in controlsForms16){

                    const dataControls = res.data.contingentBeneficiary.anotherCoverages[x];
                    for(const nameDataControls in dataControls){

                      if (nameDataControls != nameControls ) {
                        // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                        console.log("No debe de setearse.")
                      }
                      else if(nameDataControls == nameControls){
                        // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                        controlsForms16[nameControls].setValue(dataControls[nameDataControls])
                      }
                      // console.log(nameDataControls)
                      // console.log(nameControls);
                    }
                    // console.log(controles[nameControles]);
                  }
                // this.newRequest['controls'].contingentBeneficiary['controls'].anotherCoverages['controls'][x]['controls'].name.setValue("Holaaaaaaaaaaaaaaaaaa")
              }
              // this.newRequest['controls'].contingentBeneficiary['controls'].anotherCoverages['controls'][0]['controls'].name.setValue("Holaaaaaaaaaaaaaaaaaa")
              console.log('Control anotherCoverages CREADOOOOOOOO!');
            }
          } else if (var1.valor == null || var1.valor == "no") {
            console.log('No hay que crear el control anotherCoverages');
          }

          const var2 = {
            valor: res.data.contingentBeneficiary.changeAnotherCoverage,
            name:'changeAnotherCoverage'
          };

          if (var2.valor != null) {
            this.selectChange(var2);
            if (this.newRequest.get('contingentBeneficiary').get('changingCoverages')) {

              for (let x = 0; x < res.data.contingentBeneficiary.changingCoverages.length; x++) {
                console.log("hola, esto es res.data.contingentBeneficiary.changingCoverages, y soy id numero "+res.data.contingentBeneficiary.changingCoverages[x].id)
                if (x >= 1) {
                  console.log('Hola, esto es res.data.contingentBeneficiary.changingCoverages, y soy yo, ' + x)
                  this.addToList(this.changingCoveragesList, 'coverages');
                }

                const controlsForms17 = this.newRequest['controls'].contingentBeneficiary['controls'].changingCoverages['controls'][x]['controls'];
                  console.log(controlsForms17)

                  for(const nameControls in controlsForms17){

                    const dataControls = res.data.contingentBeneficiary.changingCoverages[x];
                    for(const nameDataControls in dataControls){

                      if (nameDataControls != nameControls ) {
                        // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                        console.log("No debe de setearse.")
                      }
                      else if(nameDataControls == nameControls){
                        // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                        controlsForms17[nameControls].setValue(dataControls[nameDataControls])
                      }
                      // console.log(nameDataControls)
                      // console.log(nameControls);
                    }
                    // console.log(controles[nameControles]);
                  }
                // this.newRequest['controls'].contingentBeneficiary['controls'].changingCoverages['controls'][x]['controls'].name.setValue("Holaaaaaaaaaaaaaaaaaa")
              }
              // this.newRequest['controls'].contingentBeneficiary['controls'].changingCoverages['controls'][0]['controls'].name.setValue("Holaaaaaaaaaaaaaaaaaa")
              console.log('Control changingCoverages CREADOOOOOOOO!');
            }
          } else if (var2.valor == null || var2.valor == "no") {
            console.log('No hay que crear el control changingCoverages');
          }

          const controlsForms18 = this.newRequest['controls'].generalInformation['controls'];
          console.log(controlsForms18)

          for(const nameControls in controlsForms18){

			    	const dataControls = res.data.generalInformation;
			    	for(const nameDataControls in dataControls){

              if (nameDataControls != nameControls ) {
                // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
			    			console.log("No debe de setearse.")
              }
			    	  else if(nameDataControls == nameControls){
                // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                controlsForms18[nameControls].setValue(dataControls[nameDataControls])
			    		}
			    		// console.log(nameDataControls)
              // console.log(nameControls);
              const var3 = {
                valor: dataControls[nameDataControls],
                name: nameDataControls
              };

              if (var3.valor != null) {
                if (!this.newRequest.get('generalInformation').get('smoked') ||
                !this.newRequest.get('generalInformation').get('alcohol') ||
                !this.newRequest.get('generalInformation').get('travelInformation') ||
                !this.newRequest.get('generalInformation').get('alcoholTreatment') ||
                !this.newRequest.get('generalInformation').get('diseaseCoverageInformation') ||
                !this.newRequest.get('generalInformation').get('arrestedInformation') ||
                !this.newRequest.get('generalInformation').get('lostDriveLicense') ||
                !this.newRequest.get('generalInformation').get('xtremeSports') ||
                !this.newRequest.get('generalInformation').get('insuranceProposed')) {

                  this.selectChange(var3);
              }
              else{
                console.log(`No hay que crear el control ${nameDataControls} porque ya existe.`);
              }

            }

            else {
              console.log(`No se va a crear ningun control porque no es necesario.`);
            }
			    	// console.log(controles[nameControles]);
          }
        }

        if(this.newRequest.get('generalInformation').get('smoked')){
          this.newRequest['controls'].generalInformation['controls'].smoked.setValue(res.data.generalInformation.smoked)
          console.log('Control smoked CREADOOOOOOOO!');
        }
        if(this.newRequest.get('generalInformation').get('alcohol')){
          this.newRequest['controls'].generalInformation['controls'].alcohol['controls'].quantity.setValue(res.data.generalInformation.alcohol.quantity)
          this.newRequest['controls'].generalInformation['controls'].alcohol['controls'].frequency.setValue(res.data.generalInformation.alcohol.frequency)
          console.log('Control alcohol CREADOOOOOOOO!');
        }
        if(this.newRequest.get('generalInformation').get('travelInformation')){
          this.newRequest['controls'].generalInformation['controls'].travelInformation.setValue(res.data.generalInformation.travelInformation)
          console.log('Control travelInformation CREADOOOOOOOO!');
        }
        if(this.newRequest.get('generalInformation').get('alcoholTreatment')){
          this.newRequest['controls'].generalInformation['controls'].alcoholTreatment.setValue(res.data.generalInformation.alcoholTreatment)
          console.log('Control alcoholTreatment CREADOOOOOOOO!');
        }
        if(this.newRequest.get('generalInformation').get('diseaseCoverageInformation')){
          this.newRequest['controls'].generalInformation['controls'].diseaseCoverageInformation.setValue(res.data.generalInformation.diseaseCoverageInformation)
          console.log('Control diseaseCoverageInformation CREADOOOOOOOO!');
        }
        if(this.newRequest.get('generalInformation').get('arrestedInformation')){
          this.newRequest['controls'].generalInformation['controls'].arrestedInformation.setValue(res.data.generalInformation.arrestedInformation)
          console.log('Control arrestedInformation CREADOOOOOOOO!');
        }
        if(this.newRequest.get('generalInformation').get('lostDriveLicense')){
          console.log('Control lostDriveLicense CREADOOOOOOOO!');

          const controlsForms19 = this.newRequest['controls'].generalInformation['controls'].lostDriveLicense['controls'];
             console.log(controlsForms19)

             for(const nameControls in controlsForms19){

               const dataControls = res.data.generalInformation.lostDriveLicense;
               for(const nameDataControls in dataControls){

                 if (nameDataControls != nameControls ) {
                   // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                   console.log("No debe de setearse.")
                 }
                 else if(nameDataControls == nameControls){
                   // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                   controlsForms19[nameControls].setValue(dataControls[nameDataControls])
                 }
                 // console.log(nameDataControls)
                 // console.log(nameControls);
               }
               // console.log(controles[nameControles]);
             }
        }
        if(this.newRequest.get('generalInformation').get('xtremeSports')){
          console.log('Control xtremeSports CREADOOOOOOOO!');

          const controlsForms20 = this.newRequest['controls'].generalInformation['controls'].xtremeSports['controls'];
             console.log(controlsForms20)

             for(const nameControls in controlsForms20){

               const dataControls = res.data.generalInformation.xtremeSports;
               for(const nameDataControls in dataControls){

                 if (nameDataControls != nameControls ) {
                   // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                   console.log("No debe de setearse.")
                 }
                 else if(nameDataControls == nameControls){
                   // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                   controlsForms20[nameControls].setValue(dataControls[nameDataControls])
                 }
                 // console.log(nameDataControls)
                 // console.log(nameControls);
               }
               // console.log(controles[nameControles]);
             }
        }

        if(this.newRequest.get('generalInformation').get('insuranceProposed')){
          console.log('Control insuranceProposed CREADOOOOOOOO!');

          for (let x = 0; x < res.data.generalInformation.insuranceProposed.length; x++) {
                console.log("hola, esto es res.data.generalInformation.insuranceProposed, y soy id numero "+res.data.generalInformation.insuranceProposed[x].id)
                if (x >= 1) {
                  console.log('Hola, esto es res.data.generalInformation.insuranceProposed, y soy yo, ' + x)
                  this.addToList(this.insuranceProposedList, 'insurance');
                }

                const controlsForms21 = this.newRequest['controls'].generalInformation['controls'].insuranceProposed['controls'][x]['controls'];
                  console.log(controlsForms21)

                  for(const nameControls in controlsForms21){

                    const dataControls = res.data.generalInformation.insuranceProposed[x];
                    for(const nameDataControls in dataControls){

                      if (nameDataControls != nameControls ) {
                        // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                        console.log("No debe de setearse.")
                      }
                      else if(nameDataControls == nameControls){
                        // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                        controlsForms21[nameControls].setValue(dataControls[nameDataControls])
                      }
                      // console.log(nameDataControls)
                      // console.log(nameControls);
                    }
                    // console.log(controles[nameControles]);
                  }
                // this.newRequest['controls'].generalInformation['controls'].insuranceProposed['controls'][x]['controls'].name.setValue(res.data.primaryBenefits.dependentsC[x].name)

                // const formID7 = this.claimForm.get('reclamados').get([x]) as FormGroup;
                // formID7.addControl('id', this.fb.control(data.data.reclamados[x].id, Validators.required));
              }
        }

        const controlsForms22 = this.newRequest['controls'].medicalHistory['controls'];
          console.log(controlsForms22)

          for(const nameControls in controlsForms22){

			    	const dataControls = res.data.medicalHistory;
			    	for(const nameDataControls in dataControls){

              if (nameDataControls != nameControls ) {
                // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
			    			console.log("No debe de setearse.")
              }
			    	  else if(nameDataControls == nameControls && nameControls!="informations"){
                // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                controlsForms22[nameControls].setValue(dataControls[nameDataControls])
			    		}
			    		// console.log(nameDataControls)
              // console.log(nameControls);
              const var4 = {
                valor: dataControls[nameDataControls],
                name: nameDataControls
              };
              // informations: this.fb.group({}),
              if (var4.valor != null) {
                  this.selectChange(var4);
            }
            else {
              console.log(`No se va a crear ningun control porque no es necesario.`);
            }

			    	}
			    	// console.log(controles[nameControles]);
          }

          const prove =['heartPain','respiratoryDisorder','mentalNervousDisorder','stomachDisorder',
          'endocrineDisorder','spineDisorder','unexplainedDisease','renalDisorder','eyesNoseThroatProblem',
          'bloodDisorder','birthDefect','medicalProcedures','beenAPatient','hadSpecializedTests','notCarriedOut',
          'takenInLast12Months','planToObtainMedicalTreatment','testedPositiveForHIV','diabetesDiagnosis']

        //   console.log(prove[4])
        //   for(let x=0; x< prove.length; x++){
        //   console.log(res.data.medicalHistory.informations[prove[x]])
        // }
          // console.log(res.data.medicalHistory.informations[prove[4]])
          // this.newRequest['controls'].medicalHistory['controls'].informations['controls'][prove[4]]['controls'][0]['controls'].condition.setValue("Rhailin enfermo");;

          for(let y = 0; y < prove.length; y++){
            // console.log(prove[y])
            if (this.newRequest.get('medicalHistory').get('informations').get(prove[y])) {

              for (let x = 0; x < res.data.medicalHistory.informations[prove[y]].length; x++) {
                console.log("hola, esto es res.data.medicalHistory.informations.prove[y], y soy id numero "+res.data.medicalHistory.informations[prove[y]][x].id)
                if (x >= 1) {
                  console.log('Hola, esto es res.data.medicalHistory.informations.prove[y], y soy yo, ' + x)
                  this.addToList(this[prove[y]+'List'], 'medicalInfo');
                }

                const controlsForms23 = this.newRequest['controls'].medicalHistory['controls'].informations['controls'][prove[y]]['controls'][x]['controls'];
                  console.log(controlsForms23)
              // this.newRequest['controls'].medicalHistory['controls'].informations['controls'].heartPain['controls'][0]['controls'].condition.setValue("Rhailin enfermo");
                  for(const nameControls in controlsForms23){

                    const dataControls = res.data.medicalHistory.informations[prove[y]][x];
                    for(const nameDataControls in dataControls){

                      if (nameDataControls != nameControls ) {
                        // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                        console.log("No debe de setearse.")
                      }
                      else if(nameDataControls == nameControls){
                        // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                        controlsForms23[nameControls].setValue(dataControls[nameDataControls])
                      }
                      // console.log(nameDataControls)
                      // console.log(nameControls);
                    }
                    // console.log(controles[nameControles]);
                  }
                // this.newRequest['controls'].contingentBeneficiary['controls'].changingCoverages['controls'][x]['controls'].name.setValue(res.data.primaryBenefits.dependentsC[x].name)

                // const formID7 = this.claimForm.get('reclamados').get([x]) as FormGroup;
                // formID7.addControl('id', this.fb.control(data.data.reclamados[x].id, Validators.required));
              }
              console.log(`Control formArray ${prove[y]} CREADOOOOOOOO!`);
            }
            else {
              console.log(`Control formArray ${prove[y]} NO HA SIDO creado!`);
            }
          }
          // this.newRequest['controls'].medicalHistory['controls'].informations['controls'].heartPain['controls'][0]['controls'].condition.setValue("Rhailin enfermo");

          if(this.newRequest.get('medicalHistory').get('informations').get('weightChanges')){
            console.log(`Control weightChanges CREADOOOOOOOO!`);
            this.newRequest['controls'].medicalHistory['controls'].informations['controls'].weightChanges['controls'].type.setValue(res.data.medicalHistory.informations.weightChanges.type)
            this.newRequest['controls'].medicalHistory['controls'].informations['controls'].weightChanges['controls'].detail.setValue(res.data.medicalHistory.informations.weightChanges.detail)
            // this.newRequest['controls'].medicalHistory['controls'].informations['controls'].weightChanges['controls'].detail.setValue("Hola, quiero pizza")
          }
          else {
            console.log(`Control weightChanges NO HA SIDO creado!`);
          }

          if(this.newRequest.get('medicalHistory').get('informations').get('womenInformation')){
            console.log(`Control womenInformation CREADOOOOOOOO!`);
            this.newRequest['controls'].medicalHistory['controls'].informations['controls'].womenInformation['controls'].haveDisorder.setValue(res.data.medicalHistory.informations.womenInformation.haveDisorder)
            this.newRequest['controls'].medicalHistory['controls'].informations['controls'].womenInformation['controls'].isPregnant.setValue(res.data.medicalHistory.informations.womenInformation.isPregnant)
            // this.newRequest['controls'].medicalHistory['controls'].informations['controls'].womenInformation['controls'].haveDisorder.setValue('si')
            // this.newRequest['controls'].medicalHistory['controls'].informations['controls'].womenInformation['controls'].isPregnant.setValue('si')
            const var5 = {
              valor: res.data.medicalHistory.informations.womenInformation.haveDisorder,
              name: 'haveDisorder'
            };

            if (var5.valor != null) {
                this.selectChange(var5);
            }
            else {
              console.log(`No se va a crear ningun control porque no es necesario.`);
            }

            const var6 = {
              valor: res.data.medicalHistory.informations.womenInformation.isPregnant,
              name: 'isPregnant'
            };

            if (var6.valor != null) {
                this.selectChange(var6);
            }
            else {
              console.log(`No se va a crear ningun control porque no es necesario.`);
            }

            if(this.newRequest.get('medicalHistory').get('informations').get('womenInformation').get('pregnantInformation')){
              this.newRequest['controls'].medicalHistory['controls'].informations['controls'].womenInformation['controls'].pregnantInformation['controls'].quantity.setValue(res.data.medicalHistory.informations.womenInformation.pregnantInformation.quantity)
              this.newRequest['controls'].medicalHistory['controls'].informations['controls'].womenInformation['controls'].pregnantInformation['controls'].time.setValue(res.data.medicalHistory.informations.womenInformation.pregnantInformation.time)
              console.log(`Control pregnantInformation HA SIDO creado!`);
            }

            if(this.newRequest.get('medicalHistory').get('informations').get('womenInformation').get('disorders')){

              for (let x = 0; x < res.data.medicalHistory.informations.womenInformation.disorders.length; x++) {
                  console.log("hola, esto es res.data.medicalHistory.informations.womenInformation.disorders, y soy id numero "+res.data.medicalHistory.informations.womenInformation.disorders[x].id)
                  if (x >= 1) {
                    console.log('Hola, esto es res.data.medicalHistory.informations.womenInformation.disorders, y soy yo, ' + x)
                    this.addToList(this.womenDisordersList, 'medicalInfo');
                  }

                  const controlsForms24 = this.newRequest['controls'].medicalHistory['controls'].informations['controls'].womenInformation['controls'].disorders['controls'][x]['controls'];
                    console.log(controlsForms24)

                    for(const nameControls in controlsForms24){

                      const dataControls = res.data.medicalHistory.informations.womenInformation.disorders[x];
                      for(const nameDataControls in dataControls){

                        if (nameDataControls != nameControls ) {
                          // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                          console.log("No debe de setearse.")
                        }
                        else if(nameDataControls == nameControls){
                          // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                          controlsForms24[nameControls].setValue(dataControls[nameDataControls])
                        }
                        // console.log(nameDataControls)
                        // console.log(nameControls);
                      }
                      // console.log(controles[nameControles]);
                    }
                  // const formID7 = this.claimForm.get('reclamados').get([x]) as FormGroup;
                  // formID7.addControl('id', this.fb.control(data.data.reclamados[x].id, Validators.required));
                }
              console.log('el grupo array disorders existe');
              // this.newRequest['controls'].medicalHistory['controls'].informations['controls'].womenInformation['controls'].disorders['controls'][0]['controls'].condition.setValue("Rhailin enfermo 2.0")
              // this.newRequest['controls'].medicalHistory['controls'].informations['controls'].womenInformation['controls'].disorders['controls'][0]['controls'].condition.setValue("Hola, tengo asma");
            }

          }
          else {
            console.log(`Control womenInformation NO HA SIDO creado!`);
          }
          // ME QUEDE REVISANDO EL DE ABAJO, EL ultimo que revise FUE this.newRequest['controls'].medicalHistory['controls'].informations['controls'].womenInformation['controls']

          if(this.newRequest.get('medicalHistory').get('informations').get('doctors')){
            for (let x = 0; x < res.data.medicalHistory.informations.doctors.length; x++) {
                console.log("hola, esto es res.data.medicalHistory.informations.doctors, y soy id numero "+res.data.medicalHistory.informations.doctors[x].id)
                if (x >= 1) {
                  console.log('Hola, esto es res.data.medicalHistory.informations.doctors, y soy yo, ' + x)
                  this.addToList(this.doctorList, 'doctorInfo');
                }

                const controlsForms25 = this.newRequest['controls'].medicalHistory['controls'].informations['controls'].doctors['controls'][x]['controls'];
                  console.log(controlsForms25)

                  for(const nameControls in controlsForms25){

                    const dataControls = res.data.medicalHistory.informations.doctors[x];
                    for(const nameDataControls in dataControls){

                      if (nameDataControls != nameControls ) {
                        // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                        console.log("No debe de setearse.")
                      }
                      else if(nameDataControls == nameControls){
                        // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                        controlsForms25[nameControls].setValue(dataControls[nameDataControls])
                      }
                      // console.log(nameDataControls)
                      // console.log(nameControls);
                    }
                    // console.log(controles[nameControles]);
                  }
                // const formID7 = this.claimForm.get('reclamados').get([x]) as FormGroup;
                // formID7.addControl('id', this.fb.control(data.data.reclamados[x].id, Validators.required));
              }
            console.log('el grupo array doctors existe');
            // this.newRequest['controls'].medicalHistory['controls'].informations['controls'].doctors['controls'][0]['controls'].name.setValue("Hola, soy Rhailin");
          }

          const controlsForms26 = this.newRequest['controls'].agentReport['controls'];
            console.log(controlsForms26)

            for(const nameControls in controlsForms26){

              const dataControls = res.data.agentReport;
              for(const nameDataControls in dataControls){

                if (nameDataControls != nameControls ) {
                  // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                  console.log("No debe de setearse.")
                }

                else if(nameDataControls == nameControls && nameControls!= 'amountProposed' && nameControls!= 'idInformation' && nameControls!= 'agentInformation'){
                  // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                  controlsForms26[nameControls].setValue(dataControls[nameDataControls])
                }
                // console.log(nameDataControls)
                // console.log(nameControls);
              }
              // console.log(controles[nameControles]);
            }

              const var7 = {
                valor: res.data.agentReport.connectionType,
                name: 'connectionType'
              };
              if (var7.valor != null) {
                  this.selectChange(var7);
              }
              else {
                console.log(`No se va a crear ningun control porque no es necesario.`);
              }

              const var8 = {
                valor: res.data.agentReport.isMarried,
                name: 'isMarried'
              };
              if (var8.valor != null) {
                  this.selectChange(var8);
              }
              else {
                console.log(`No se va a crear ningun control porque no es necesario.`);
              }

              const var9 = {
                valor: res.data.agentReport.isLessThan21,
                name: 'isLessThan21'
              };
              if (var9.valor != null) {
                  this.selectChange(var9);
              }
              else {
                console.log(`No se va a crear ningun control porque no es necesario.`);
              }

              if(this.newRequest['controls'].agentReport['controls'].familyInsurances){
              for (let x = 0; x < res.data.agentReport.familyInsurances.length; x++) {
                console.log("hola, esto es res.data.agentReport.familyInsurances, y soy id numero "+res.data.agentReport.familyInsurances[x].id)
                if (x >= 1) {
                  console.log('Hola, esto es res.data.agentReport.familyInsurances, y soy yo, ' + x)
                  this.addToList(this.familyRelationshipInsurances, 'familyInsurances');
                }

                const controlsForms27 = this.newRequest['controls'].agentReport['controls'].familyInsurances['controls'][x]['controls'];
                  console.log(controlsForms27)

                  for(const nameControls in controlsForms27){

                    const dataControls = res.data.agentReport.familyInsurances[x];
                    for(const nameDataControls in dataControls){

                      if (nameDataControls != nameControls ) {
                        // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                        console.log("No debe de setearse.")
                      }
                      else if(nameDataControls == nameControls){
                        // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                        controlsForms27[nameControls].setValue(dataControls[nameDataControls])
                      }
                      // console.log(nameDataControls)
                      // console.log(nameControls);
                    }
                    // console.log(controles[nameControles]);
                  }
              //   // const formID7 = this.claimForm.get('reclamados').get([x]) as FormGroup;
              //   // formID7.addControl('id', this.fb.control(data.data.reclamados[x].id, Validators.required));
              }
            }

            const controlsForms28 = this.newRequest['controls'].agentReport['controls'].amountProposed['controls'];
            console.log(controlsForms28)

            for(const nameControls in controlsForms28){

              const dataControls = res.data.agentReport.amountProposed;
              for(const nameDataControls in dataControls){

                if (nameDataControls != nameControls ) {
                  // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                  console.log("No debe de setearse.")
                }

                else if(nameDataControls == nameControls){
                  // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                  controlsForms28[nameControls].setValue(dataControls[nameDataControls])
                }
                // console.log(nameDataControls)
                // console.log(nameControls);
              }
              // console.log(controles[nameControles]);
            }

            const controlsForms29 = this.newRequest['controls'].agentReport['controls'].idInformation['controls'];
            console.log(controlsForms29)

            for(const nameControls in controlsForms29){

              const dataControls = res.data.agentReport.idInformation;
              for(const nameDataControls in dataControls){

                if (nameDataControls != nameControls ) {
                  // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                  console.log("No debe de setearse.")
                }

                else if(nameDataControls == nameControls){
                  // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                  controlsForms29[nameControls].setValue(dataControls[nameDataControls])
                }
                // console.log(nameDataControls)
                // console.log(nameControls);
              }
              // console.log(controles[nameControles]);
            }

            const controlsForms30 = this.newRequest['controls'].agentReport['controls'].agentInformation['controls'];
            console.log(controlsForms30)

            for(const nameControls in controlsForms30){

              const dataControls = res.data.agentReport.agentInformation;
              for(const nameDataControls in dataControls){

                if (nameDataControls != nameControls ) {
                  // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
                  console.log("No debe de setearse.")
                }

                else if(nameDataControls == nameControls){
                  // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
                  controlsForms30[nameControls].setValue(dataControls[nameDataControls])
                }
                // console.log(nameDataControls)
                // console.log(nameControls);
              }
              // console.log(controles[nameControles]);
            }

            if(this.newRequest.get('agentReport').get('connectionTypeInfo') && res.data.agentReport.connectionType=="familia"){
              this.newRequest['controls'].agentReport['controls'].connectionTypeInfo['controls'].relationship.setValue(res.data.agentReport.connectionTypeInfo.relationship);
            }
            else if(this.newRequest.get('agentReport').get('connectionTypeInfo') && res.data.agentReport.connectionType=="amigo"){
              this.newRequest['controls'].agentReport['controls'].connectionTypeInfo['controls'].friendship.setValue(res.data.agentReport.connectionTypeInfo.friendship);
              this.newRequest['controls'].agentReport['controls'].connectionTypeInfo['controls'].amount.setValue(res.data.agentReport.connectionTypeInfo.amount);
              this.newRequest['controls'].agentReport['controls'].connectionTypeInfo['controls'].time.setValue(res.data.agentReport.connectionTypeInfo.time);
            }
            else if(this.newRequest.get('agentReport').get('connectionTypeInfo') && res.data.agentReport.connectionType=="cliente"){
              this.newRequest['controls'].agentReport['controls'].connectionTypeInfo['controls'].amount.setValue(res.data.agentReport.connectionTypeInfo.amount);
              this.newRequest['controls'].agentReport['controls'].connectionTypeInfo['controls'].time.setValue(res.data.agentReport.connectionTypeInfo.time);
            }
            else if(this.newRequest.get('agentReport').get('connectionTypeInfo') && res.data.agentReport.connectionType=="acabado de conocer"){
              this.newRequest['controls'].agentReport['controls'].connectionTypeInfo['controls'].how.setValue(res.data.agentReport.connectionTypeInfo.how);
            }

            if(this.newRequest.get('agentReport').get('marriedInformation')){
              this.newRequest['controls'].agentReport['controls'].marriedInformation['controls'].spouseName.setValue(res.data.agentReport.marriedInformation.spouseName);
              this.newRequest['controls'].agentReport['controls'].marriedInformation['controls'].spouseInsuranceAmount.setValue(res.data.agentReport.marriedInformation.spouseInsuranceAmount);
            }
          //  if(this.newRequest.get('questionnaires').get('solicitudHipertensionArterial')){
          //   // this.newRequest['controls'].questionnaires['controls'].solicitudHipertensionArterial['controls'].personInfo['controls'].name.setValue('Rhailin Amable Made Puello');
          //   console.log('HOOOOOOLLAAAAAAA, MMMGGGGGGGGGGGG!!!!')
          //   // this.pruebaLoop(this.newRequest['controls'].questionnaires['controls'].solicitudHipertensionArterial['controls'])
          //   // console.log(this.newRequest['controls']['questionnaires']['controls']['solicitudHipertensionArterial']['controls']['diagnosticStudies']['controls'])
          //   console.log(res.data.agentReport)
          //   this.life.captureData(res.data.agentReport);
          //   console.log("retorno data capturada:",this.life.dataCapturedProperty)
          //   console.log("retorno data capturada amountProposed.occupation:",this.life.dataCapturedProperty.amountProposed.occupation)
          // }

          // const controlsForms31 = this.newRequest['controls'].questionnaires['controls'].solicitudHipertensionArterial['controls'];
          //   console.log(controlsForms31.diagnosticStudies)
          //   for(const nameControls in controlsForms31){

          //     // const dataControls = res.data.agentReport.agentInformation;
          //     // for(const nameDataControls in dataControls){

          //     //   if (nameDataControls != nameControls ) {
          //     //     // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
          //     //     console.log("No debe de setearse.")
          //     //   }

          //     //   else if(nameDataControls == nameControls){
          //     //     // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
          //     //     controlsForms31[nameControls].setValue(dataControls[nameDataControls])
          //     //   }
          //     //   // console.log(nameDataControls)
          //     //   // console.log(nameControls);
          //     // }
          //     console.log("controlesssss",nameControls);
          //   }

			// this.claimForm['controls'].asegurado['controls'].documentoIdentidad.setValue(data.data.asegurado.documentoIdentidad)
			// this.claimForm['controls'].asegurado['controls'].edad.setValue(data.data.asegurado.edad)
			// this.claimForm['controls'].asegurado['controls'].idNumero.setValue(data.data.asegurado.idNumero)
			// this.claimForm['controls'].asegurado['controls'].nombre.setValue(data.data.asegurado.nombre)
			// this.claimForm['controls'].asegurado['controls'].numero.setValue(data.data.asegurado.numero)
			// this.claimForm['controls'].asegurado['controls'].numeroPoliza.setValue(data.data.asegurado.numeroPoliza)
			// this.claimForm['controls'].asegurado['controls'].tipo.setValue(data.data.asegurado.tipo)
			// this.claimForm['controls'].reclamacion['controls'].diagnostico.setValue(data.data.reclamacion.diagnostico)
			// this.claimForm['controls'].reclamacion['controls'].tipoServicio.setValue(data.data.reclamacion.tipoServicio)
			// this.claimForm['controls'].reclamacion['controls'].autorizadoNo.setValue(data.data.reclamacion.autorizadoNo)
			// this.claimForm['controls'].reclamacion['controls'].autorizadoPor.setValue(data.data.reclamacion.autorizadoPor)
			// this.claimForm['controls'].reclamacion['controls'].fechaDiagnostico.setValue(data.data.reclamacion.fechaDiagnostico)
			// this.claimForm['controls'].proveedor['controls'].nombre.setValue(data.data.proveedor.nombre)
			// this.claimForm['controls'].proveedor['controls'].correo.setValue(data.data.proveedor.correo)
			// this.claimForm['controls'].proveedor['controls'].codigo.setValue(data.data.proveedor.codigo)
			// this.claimForm['controls'].proveedor['controls'].noContrato.setValue(data.data.proveedor.noContrato)
			// this.claimForm['controls'].casoHospitalizacion['controls'].ingreso.setValue(data.data.casoHospitalizacion.ingreso)
			// this.claimForm['controls'].casoHospitalizacion['controls'].egreso.setValue(data.data.casoHospitalizacion.egreso)
			// this.claimForm['controls'].observaciones['controls'].observacion.setValue(data.data.observaciones.observacion)
			// console.log("El largo es "+ data.data.reclamados.length)
			// console.log(data.data.id)
			// console.log(data.data.asegurado.id)
			// console.log(data.data.casoHospitalizacion.id)
			// console.log(data.data.observaciones.id)
			// console.log(data.data.proveedor.id)
			// console.log(data.data.reclamacion.id)
			// const formID1 = this.claimForm as FormGroup;
			// formID1.addControl('id', this.fb.control(data.data.id, Validators.required));

			// const formID2 = this.claimForm.get('asegurado') as FormGroup;
			// formID2.addControl('id', this.fb.control(data.data.asegurado.id, Validators.required));

			// const formID3 = this.claimForm.get('casoHospitalizacion') as FormGroup;
			// formID3.addControl('id', this.fb.control(data.data.casoHospitalizacion.id, Validators.required));

			// const formID4 = this.claimForm.get('observaciones') as FormGroup;
			// formID4.addControl('id', this.fb.control(data.data.observaciones.id, Validators.required));

			// const formID5 = this.claimForm.get('proveedor') as FormGroup;
			// formID5.addControl('id', this.fb.control(data.data.proveedor.id, Validators.required));

			// const formID6 = this.claimForm.get('reclamacion') as FormGroup;
			// formID6.addControl('id', this.fb.control(data.data.reclamacion.id, Validators.required));

			// console.log(JSON.stringify(this.claimForm.value))
		})
		this.life.id = null;
		console.log("this.life.id es igual a " + this.life.id);
  }

  pruebaLoop(group:FormGroup){

		Object.keys(group.controls).forEach((key)=>{

			const abstractControl = group.get(key);
			if(abstractControl instanceof FormGroup){
				this.pruebaLoop(abstractControl)
			}
			else{
				console.log('key = ' + key + ', value = ' + abstractControl.value)
			}
		})

	  }

}
