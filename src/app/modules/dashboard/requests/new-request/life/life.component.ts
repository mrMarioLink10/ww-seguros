import { Component, OnInit, DoCheck, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { $sex, $country, $res, $time, $family } from 'src/app/core/form/objects';
import { DiseaseService } from '../../../shared/components/disease/shared/disease/disease.service';

@Component({
  selector: 'app-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.scss']
})
export class LifeComponent implements OnInit, DoCheck {

  maxWidth: any;
  primaryBenefitsArray: FormArray;
  contingentBeneficiaryArray: FormArray;
  dependentsFormArray: FormArray;
  existingCoveragesList: FormArray;
  changingCoveragesList: FormArray;
  insuranceProposedList: FormArray;

  coveragesQuestions: any[];
  generalInfoQuestions: any[];
  sportsQuestions: any[];
  medicQuestions: any[];

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

  primaryBenefits = {
    name: ['', Validators.required],
    id: ['', Validators.required],
    nationality: ['', Validators.required],
    ocupation: ['', Validators.required],
    family: ['', Validators.required],
    quantity: ['', Validators.required]
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

  options: FieldConfig =
    {
      label: 'Tipo de Solicitud',
      options: this.requestType,
      name: 'requestType',
      type: 'select'
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

  country = $country;
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

      {
        value: 'Balboa',
        viewValue: 'Balboa'
      }
    ],
  };


  status = {
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
    // 'Información pertinente al plan',
    'Información pertinente al pago de la prima',
    'Designación de los Beneficiario(s) Primario(s)',
    'Beneficiario(s) Contingente(s)', 'Información general', 'Historial Médico', 'Firmas', 'Reporte del agente'];

  newRequest: FormGroup;

  dependentsNumber = 0;

  constructor(
    private fb: FormBuilder,
    public formMethods: FormArrayGeneratorService,
    public diseaseService: DiseaseService
  ) { }

  ngOnInit() {
    this.newRequest = this.fb.group({
      requestType: [''],
      person: this.fb.group({
        firstName: ['', Validators.required],
        secondName: ['', Validators.required],
        lastName: ['', Validators.required],
        date: [new Date(), Validators.required],
        sex: ['', Validators.required],
        nationality: ['', Validators.required],
        id: ['', Validators.required],
        age: ['', Validators.required],
        weight: ['', Validators.required],
        height: ['', Validators.required],
        status: ['', Validators.required],
        annualIncome: ['', Validators.required],
        currency: ['', Validators.required],
        countryOfResidence: ['', Validators.required],
        countryOfBirth: ['', Validators.required],
        city: ['', Validators.required],
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
        youAre: ['', Validators.required],
      }),
      contractor: this.fb.group({
        firstName: ['', Validators.required],
        secondName: ['', Validators.required],
        lastName: ['', Validators.required],
        date: [new Date(), Validators.required],
        sex: ['', Validators.required],
        nationality: ['', Validators.required],
        id: ['', Validators.required],
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
        })
      }),
      payer: this.fb.group({
        firstName: ['', Validators.required],
        secondName: ['', Validators.required],
        lastName: ['', Validators.required],
        date: [new Date(), Validators.required],
        sex: ['', Validators.required],
        nationality: ['', Validators.required],
        id: ['', Validators.required],
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
      }),
      financialProfile: this.fb.group({
        annualIncome: ['', Validators.required],
        othersAnnualIncome: ['', Validators.required],
        paymentOrigin: ['', Validators.required],
      }),
      IncomeMainActivity: ['', Validators.required],
      dependentsNumber: [''],
      primaryBenefits: this.fb.group({
        dependentsC: this.fb.array([this.formMethods.createItem(this.primaryBenefits)]),
        personBenefited: this.fb.group({
          name: [''],
          family: [''],
          id: ['']
        })
      }),
      contingentBeneficiary: this.fb.group({
        dependentsC: this.fb.array([this.formMethods.createItem(this.primaryBenefits)]),
        personBenefited: this.fb.group({
          name: [''],
          family: [''],
          id: ['']
        }),
        bankTransfer: this.fb.group({
          family: [''],
          amount: [''],
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
      }),
      dependents: this.fb.array([this.formMethods.createItem(this.dependentFormGroup)])

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
        group: ''
      },
      {
        label: 'b. ¿Ahogos, ronquera, tos persistente, esputos de sangre, bronquitis, pleuresía, asma, enfisema, tuberculosis o trastornos respiratorios crónicos?',
        name: 'haveRespiratoryDisorder',
        group: ''
      },
      {
        label: 'c. ¿Mareos, desmayos, epilepsia, convulsiones, dolor de cabeza, afección del habla, parálisis, apoplejía, trastorno mental o nervioso?',
        name: 'haveMentalNervousDisorder',
        group: ''
      },
      {
        label: 'd. ¿Ictericia, hemorragia intestinal, úulcera, hernia, apendicitis, colitis, diverticulitis, hemorroides, indigestión recurrente u otro desorden del estómago, intestino, hígado, hepatitis B o C y vesícula biliar?',
        name: 'haveStomachDisorder',
        group: ''
      },
      {
        label: 'e. ¿Diabetes, tiroides u otro trastorno endocrino?',
        name: 'haveEndocrineDisorder',
        group: ''
      },
      {
        label: 'f. ¿Neuritis, ciática, reumatismo, artritis, gota o desorden de los músculos o huesos, incluso de la columna vertebral, ¿la espalda y las articulaciones?',
        name: 'haveSpineDisorder',
        group: ''
      },
      {
        label: 'g. ¿Enfermedad de la piel, ganglios linfáticos, quiste, tumor, cáncer, sudores nocturnos, fatiga o fiebre sin explicación?',
        name: 'haveUnexplainedDisease',
        group: ''
      },
      {
        label: 'h. ¿Albúmina, azúcar, sangre o pus en la orina, enfermedades venéreas, cálculos renales u otros trastornos renales, de la vejiga, próstata u órganos reproductivos?',
        name: 'haveRenalDisorder',
        group: ''
      },
      {
        label: 'i. ¿Cualquier problema de los ojos, oídos, nariz o garganta?',
        name: 'haveEyesNoseThroatProblem',
        group: ''
      },
      {
        label: 'j. ¿Alergias, anemia u otro desorden sanguíneo?',
        name: 'haveBloodDisorder',
        group: ''
      },
      {
        label: 'k. ¿Ha tenido alguna deformidad, enfermedad o defecto congénito?',
        name: 'haveBirthDefect',
        group: ''
      },
      {
        label: 'l. ¿Ha tenido un examen médico, consulta, enfermedad, lesión o procedimientos médicos ambulatorios o intrahospitalarios?',
        name: 'HaveMedicalProcedures',
        group: ''
      },
      {
        label: 'm. ¿Ha sido paciente en un hospital, clínica, sanatorio u otra institución médica?',
        name: 'haveBeenAPatient',
        group: ''
      },
      {
        label: 'n. ¿Se ha hecho un electrocardiograma, radiografía u otras pruebas especializadas?',
        name: 'haveHadSpecializedTests',
        group: ''
      },
      {
        label: 'o. ¿Se le aconsejó alguna prueba diagnóstica, hospitalización o cirugía que no se ha llevado a cabo?',
        name: 'haveNotCarriedOut',
        group: ''
      },
      {
        label: '3. ¿Ha tomado el Propuesto Asegurado en los últimos 12 meses algún medicamento prescrito, o ha recibido tratamiento que haya excedido 14 días?',
        name: 'haveTakenInLast12Months',
        group: ''
      },
      {
        label: '4. ¿Tiene provisto a obtener tratamiento y opinión médica en los próximos 6 meses?',
        name: 'havePlanToObtainMedicalTreatment',
        group: ''
      },
      {
        label: '5. ¿Ha tenido resultado positivos por haber sido expuesto a la infección del VIH o ha sido diagnosticado con el complejo relacionado con el SIDA por causa de infección VIH u otra enfermedad o condición derivada de dicha infección?',
        name: 'haveTestedPositiveForHIV',
        group: ''
      },
      {
        label: '6. ¿Existe un historial de muertes por enfermedad coronaria arterial, embolia, cáncer o enfermedades de los riñones, ya sea de un padre o hermano natural antes de la edad de 60 años, o un diagnóstico de diabetes mellitus antes de la edad de 50 años?',
        name: 'haveDiabetesDiagnosis',
        group: ''
      },
      {
        label: '7. ¿Ha tenido algún cambio de peso durante los últimos doce meses?',
        name: 'haveHadWeightChanges',
        group: ''
      },
      {
        label: '8. ¿Es una mujer el Asegurado Propuesto?',
        name: 'isWomen',
        group: ''
      },
      {
        label: '9. Liste los nombres y direcciones de los médicos que usted ha consultado recientemente por cualquier razón y el médico de cabecera, si fuera diferente.',
        name: 'listDoctors',
        group: ''
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
    const formGI = this.newRequest.get('generalInformation') as FormGroup;

    if (event.valor === 'si') {
      switch (event.name) {
        case 'isExposed':
          this.newRequest.addControl('exposedPerson', this.fb.group({
            contractor: [false, Validators.required],
            payer: [false, Validators.required],
            insured: [false, Validators.required],
            lastPosition: ['', Validators.required],
            time: ['', Validators.required],
            timeNumber: ['', Validators.required]
          }));
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

        default:
          break;
      }
    } else if (event.valor === 'no') {
      switch (event.name) {
        case 'isExposed':
          this.newRequest.removeControl('exposedPerson');
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
          policeNo: ['', Validators.required],
          ADBQuantity: ['', Validators.required],
          date: ['', Validators.required],
        });
        break;

      case 'insurance':
        return this.fb.group({
          name: ['', Validators.required],
          detail: ['', Validators.required],
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

  print() {
    console.log(this.newRequest);
  }
}
