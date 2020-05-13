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

  dependentsNumber = 0;

  constructor(
    private fb: FormBuilder,
    public formMethods: FormArrayGeneratorService,
    public diseaseService: DiseaseService,
    public formHandler: FormHandlerService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private life:LifeService
  ) { }

  ID=null;
  ngOnInit() {

    this.ID = this.life.id;
		if (this.ID != null) {
			console.log("El ID es " + this.ID);
			this.getData(this.ID)
		}
		else if (this.ID == null) {
			console.log("ID esta vacio")
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
        HaveMedicalProcedures: ['', Validators.required],
        haveBeenAPatient: ['', Validators.required],
        haveHadSpecializedTests: ['', Validators.required],
        haveNotCarriedOut: ['', Validators.required],
        haveTakenInLast12Months: ['', Validators.required],
        haveTestedPositiveForHIV: ['', Validators.required],
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
        name: 'HaveMedicalProcedures',
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
        name: 'haveTestedPositiveForHIV',
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
  ngDoCheck(): void {
    this.maxWidth = window.matchMedia('(max-width: 11270px)');
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
          formQ.addControl('hypertension', this.fb.group({}));

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
          formQ.addControl('diabetes', this.fb.group({}));

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

        case 'HaveMedicalProcedures':
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

        case 'haveTestedPositiveForHIV':
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
          formQ.removeControl('hypertension');

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
          formQ.removeControl('diabetes');


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

        case 'HaveMedicalProcedures':
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

        case 'haveTestedPositiveForHIV':
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
          ADBQuantity: ['', [Validators.required, Validators.min(0)]],
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
    if (this.newRequest.get('questionnaires').get('financialStatus')) {
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
      formQ.addControl('financialStatus', this.fb.group({}));
    } else {
      formQ.removeControl('financialStatus');
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

  getData(id) {
		this.life.returnData(id).subscribe(data => {
			// console.log(data.data.asegurado.documentoIdentidad)
      console.log(data)
      delete data.data.person.city;
      console.log(data.data.person)
      console.log(data.data.employer)
      console.log(data.data.contractor)
      console.log(data.data.contractor.company)

      let res= data;
      console.log("res: ", res.data.person)

      this.newRequest['controls'].NoC.setValue(data.data.noC)
      // console.log(data.data.noC)

      const formID1 = this.newRequest.get('person') as FormGroup;
      formID1.addControl('id', this.fb.control(''));
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

      // res.data.contractor['status']= res.data.contractor.statusStr

      // delete res.data.contractor.statusStr

      // console.log("res.data.contractor['status'] es igual a " + res.data.contractor['status'])

      // console.log("Se borro statusStr, la nueva data ahora es igual a ", res.data.contractor)

      // const controlsForms3 = this.newRequest['controls'].contractor['controls'];
      // console.log(controlsForms3)

      // for(const nameControls in controlsForms3){
				
			// 	const dataControls = res.data.contractor;
			// 	for(const nameDataControls in dataControls){
          
      //     if (nameDataControls != nameControls ) {
      //       // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
			// 			console.log("No debe de setearse.")
      //     }
			// 	  else if(nameDataControls == nameControls){
      //       // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
      //       controlsForms3[nameControls].setValue(dataControls[nameDataControls])  
			// 		}
			// 		// console.log(nameDataControls)
			// 		// console.log(nameControls);
			// 	}
			// 	// console.log(controles[nameControles]);
      // }

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

      // const controlsForms5 = this.newRequest['controls'].payer['controls'];
      // console.log(controlsForms5)

      // for(const nameControls in controlsForms5){
				
			// 	const dataControls = res.data.payer;
			// 	for(const nameDataControls in dataControls){
          
      //     if (nameDataControls != nameControls ) {
      //       // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
			// 			console.log("No debe de setearse.")
      //     }
			// 	  else if(nameDataControls == nameControls){
      //       // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
      //       controlsForms5[nameControls].setValue(dataControls[nameDataControls])  
			// 		}
			// 		// console.log(nameDataControls)
			// 		// console.log(nameControls);
			// 	}
			// 	// console.log(controles[nameControles]);
      // }

      const sd = {
        valor: res.data.person.isExposed,
        name:'isExposed'
			};

			if (sd.valor != null) {
				this.selectChange(sd);
				if (this.newRequest.get('exposedPerson')) {

          // const controlsForms7 = this.newRequest['controls'].exposedPerson['controls'];
          // console.log(controlsForms7)

          // for(const nameControls in controlsForms7){
          
			    // 	const dataControls = res.data.exposedPerson;
			    // 	for(const nameDataControls in dataControls){

          //     if (nameDataControls != nameControls ) {
          //       // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
			    // 			console.log("No debe de setearse.")
          //     }
			    // 	  else if(nameDataControls == nameControls){
          //       // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
          //       controlsForms7[nameControls].setValue(dataControls[nameDataControls])  
			    // 		}
			    // 		// console.log(nameDataControls)
			    // 		// console.log(nameControls);
			    // 	}
			    // 	// console.log(controles[nameControles]);
          // }
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
    
              // for (let x = 0; x < res.data.contingentBeneficiary.anotherCoverages.length; x++) {
              //   console.log("hola, esto es res.data.contingentBeneficiary.anotherCoverages, y soy id numero "+res.data.contingentBeneficiary.anotherCoverages[x].id)
              //   if (x >= 1) {
              //     console.log('Hola, esto es res.data.contingentBeneficiary.anotherCoverages, y soy yo, ' + x)
              //     this.addToList(this.existingCoveragesList, 'coverages');
              //   }
                
              //   const controlsForms16 = this.newRequest['controls'].contingentBeneficiary['controls'].anotherCoverages['controls'][x]['controls'];
              //     console.log(controlsForms16)
        
              //     for(const nameControls in controlsForms16){
                  
              //       const dataControls = res.data.contingentBeneficiary.anotherCoverages[x];
              //       for(const nameDataControls in dataControls){
        
              //         if (nameDataControls != nameControls ) {
              //           // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
              //           console.log("No debe de setearse.")
              //         }
              //         else if(nameDataControls == nameControls){
              //           // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
              //           controlsForms16[nameControls].setValue(dataControls[nameDataControls])  
              //         }
              //         // console.log(nameDataControls)
              //         // console.log(nameControls);
              //       }
              //       // console.log(controles[nameControles]);
              //     }
              //   // this.newRequest['controls'].contingentBeneficiary['controls'].anotherCoverages['controls'][x]['controls'].name.setValue(res.data.primaryBenefits.dependentsC[x].name)
        
              //   // const formID7 = this.claimForm.get('reclamados').get([x]) as FormGroup;
              //   // formID7.addControl('id', this.fb.control(data.data.reclamados[x].id, Validators.required));
              // }
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
    
              // for (let x = 0; x < res.data.contingentBeneficiary.changingCoverages.length; x++) {
              //   console.log("hola, esto es res.data.contingentBeneficiary.changingCoverages, y soy id numero "+res.data.contingentBeneficiary.changingCoverages[x].id)
              //   if (x >= 1) {
              //     console.log('Hola, esto es res.data.contingentBeneficiary.changingCoverages, y soy yo, ' + x)
              //     this.addToList(this.changingCoveragesList, 'coverages');
              //   }
                
              //   const controlsForms17 = this.newRequest['controls'].contingentBeneficiary['controls'].changingCoverages['controls'][x]['controls'];
              //     console.log(controlsForms17)
        
              //     for(const nameControls in controlsForms17){
                  
              //       const dataControls = res.data.contingentBeneficiary.changingCoverages[x];
              //       for(const nameDataControls in dataControls){
        
              //         if (nameDataControls != nameControls ) {
              //           // console.log(`No, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) no son iguales`)
              //           console.log("No debe de setearse.")
              //         }
              //         else if(nameDataControls == nameControls){
              //           // console.log(`Si, ${nameDataControls} (nameDataControls) y ${nameControls} (nameControls) son iguales`)
              //           controlsForms17[nameControls].setValue(dataControls[nameDataControls])  
              //         }
              //         // console.log(nameDataControls)
              //         // console.log(nameControls);
              //       }
              //       // console.log(controles[nameControles]);
              //     }
              //   // this.newRequest['controls'].contingentBeneficiary['controls'].changingCoverages['controls'][x]['controls'].name.setValue(res.data.primaryBenefits.dependentsC[x].name)
        
              //   // const formID7 = this.claimForm.get('reclamados').get([x]) as FormGroup;
              //   // formID7.addControl('id', this.fb.control(data.data.reclamados[x].id, Validators.required));
              // }
              console.log('Control changingCoverages CREADOOOOOOOO!');
            }
          } else if (var2.valor == null || var2.valor == "no") {
            console.log('No hay que crear el control changingCoverages');
          }
      
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

}
