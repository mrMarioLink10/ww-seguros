import { Component, OnInit, DoCheck, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { $sex, $res, $country, $time, $family, $allFamily, $weightTypes, $heightTypes } from '../../../../../core/form/objects';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { questionsA, questionsB } from './questions';
import { Requests } from '../../requests.component';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../../core/services/user/user.service';
import { generate, Observable } from 'rxjs';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { DiseaseService } from '../../../shared/components/disease/shared/disease/disease.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import { MatDialog } from '@angular/material';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { map, first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { MajorExpensesService } from './services/major-expenses.service';
import { QuotesService } from '../../../services/quotes/quotes.service';
import { environment } from '../../../../../../environments/environment';
import { FormValidationsConstant } from 'src/app/shared/ShareConstant/shareConstantFile';
import { CurrencyPipe } from '@angular/common';
import { FormDataFillingService } from 'src/app/modules/dashboard/services/shared/formDataFillingService';
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
    private cd: ChangeDetectorRef
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
  arrayFilesTitles = [];
  questions = questionsA;
  questionsB = questionsB;
  routeSelected = 'gastos mayores';
  student = {
    name: ['', Validators.required],
    univercity: ['', Validators.required],
    univercityPhone: ['', Validators.required]
  };
  family = $family;


  yesOrNo: FieldConfig = {
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

  requestTypeOptions: FieldConfig =
    {
      label: 'Tipo de Solicitud',
      options: [

        {
          value: 'Poliza Nueva',
          viewValue: 'Póliza Nueva',
        }
      ],
      name: 'requestType',
    };
  isJuridicaData: FieldConfig =
    {
      label: 'Es el Contratante Persona Juridica?',
      options: [
        {
          value: 'Si',
          viewValue: 'Sí',
        },
        {
          value: 'No',
          viewValue: 'No',
        }
      ],
      name: 'idType',
    };
  isContractorData: FieldConfig =
    {
      label: 'Es el Contractante?',
      options: [
        {
          value: 'Si',
          viewValue: 'Sí',
        },
        {
          value: 'No',
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
          value: 'Cedula',
          viewValue: 'Cédula',
        },
        {
          value: 'Pasaporte',
          viewValue: 'Pasaporte',
        }
      ],
      name: 'idType',
    };

  itIsCurrentOptions: FieldConfig =
    {
      label: 'Se encuentra vigente en la actualidad',
      options: [
        {
          value: 'si',
          viewValue: 'Si'
        },
        {
          value: 'no',
          viewValue: 'No'
        }
      ],
    };

  didReclamationOptions: FieldConfig =
    {
      label: '¿Tuvo alguna reclamación?',
      options: [
        {
          value: 'si',
          viewValue: 'Si'
        },
        {
          value: 'no',
          viewValue: 'No'
        }
      ],
    };
  payments: FieldConfig = {
    label: 'Frecuencia de Pago',
    options: [
      {
        value: 'Anual',
        viewValue: 'Anual'
      },
      {
        value: 'Semestral',
        viewValue: 'Semestral'
      },
      {
        value: 'Trimestral',
        viewValue: 'Trimestral'
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
        value: 'otro',
        viewValue: 'Otro'
      },
    ]
  };
  plans: FieldConfig = {
    label: 'Planes',
    options: [
      {
        value: 'Signature Special',
        viewValue: 'Signature Special',
      },
      {
        value: 'Excellence Special',
        viewValue: 'Excellence Special',
      },
      {
        value: 'Distinction Premium',
        viewValue: 'Distinction Premium',
      },
      {
        value: 'Signature',
        viewValue: 'Signature',
      },
      {
        value: 'Excellence',
        viewValue: 'Excellence',
      },
      {
        value: 'Distinction',
        viewValue: 'Distinction',
      },
      {
        value: 'Plan Estudiantil',
        viewValue: 'Plan Estudiantil',
      },
      {
        value: 'Otro',
        viewValue: 'Otro',
      }
    ],
    name: 'plans',
  };
  // tslint:disable-next-line: max-line-length
  titles = FormValidationsConstant.titlesForMajorExpensesComplete;

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
  year = {
    label: 'Seleccione',
    options: $time,
    name: 'time'
  };
  mony = {
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
    date: [new Date(), Validators.required],
    id2: ['', Validators.required],
    nationality: ['', Validators.required],
    ocupation: ['', Validators.required],
    family: ['', Validators.required],
    quantity: ['', [Validators.required, Validators.min(1), Validators.max(100)]]

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

  @ViewChild('form', { static: false }) ogForm;


  searchQuote(noCotizacion) {
    if (noCotizacion !== undefined && noCotizacion !== '') {
      this.getDataCotizaciones(noCotizacion);
    }
  }
  ngOnInit() {
    this.userService.getWholeQuotes()
      .subscribe(res => {
        console.log(res);
      });

    this.role = this.userService.getRoleCotizador();
    this.isFormValidToFill = false;
    this.route.params.subscribe(res => {
      this.ID = res.id;
    });
    this.route.params.subscribe(res => {
      this.noCotizacion = res.noCotizacion;
    });
    console.log(this.noCotizacion);

    this.procedures = this.fb.array([this.formMethods.createItem(this.formGroupProcedure)]);

    this.newRequest = this.fb.group({

      noC: [{ value: this.noCotizacion, disabled: (this.noCotizacion === undefined ? false : true) }, Validators.required],
      isComplete: [false, Validators.required],
      deducibles: [{ value: '', disabled: true }, Validators.required],
      payment: [{ value: '', disabled: true }, Validators.required],
      plans: [{ value: '', disabled: true }, Validators.required],
      requestType: ['', Validators.required],
      person: this.fb.group({
        conozcaSuClientePersona: this.fb.group({}),
        firstName: ['', Validators.required],
        secondName: [''],
        lastName: ['', Validators.required],
        weightUnit: ['', Validators.required],
        heightUnit: ['', Validators.required],
        date: [{ value: '', disabled: true }, Validators.required],
        sex: [{ value: '', disabled: false }, Validators.required],
        isContractor: ['', Validators.required],
        isJuridica: ['', Validators.required],
        nationality: ['', Validators.required],
        idType: ['', Validators.required],
        id2: ['', Validators.required],
        age: [{ value: '', disabled: true }, Validators.required],
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
        email: ['', Validators.required],
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
        conozcaSuClientePersonaJuridica: this.fb.group({}),
        conozcaSuClientePersona: this.fb.group({}),
        firstName: ['', Validators.required],
        secondName: [''],
        lastName: ['', Validators.required],
        date: ['', Validators.required],
        sex: ['', Validators.required],
        nationality: ['', Validators.required],
        idType: ['', Validators.required],
        id2: ['', Validators.required],
        age: [{ value: '', disabled: true }, Validators.required],
        weight: ['', Validators.required],
        height: ['', Validators.required],
        bmi: [{ value: '', disabled: true }, Validators.required],
        status: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
        direction: ['', Validators.required],
        tel: [''],
        cel: ['', Validators.required],
        officeTel: [''],
        fax: [''],
        email: ['', Validators.required],
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
        contractor: ['', Validators.required],
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
        hasFamilyWithHeartKidneyDisease: ['', Validators.required],
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
          idType: [''],
        })
      }),
      contingentBeneficiary: this.fb.group({
        dependentsC: this.fb.array([this.formMethods.createItem(this.primaryBenefits)]),
        personBenefited: this.fb.group({
          name: [''],
          family: [''],
          id2: [''],
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
        haveMaleReproductiveOrgans: ['', Validators.required],
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
        havePregnant: ['', Validators.required],
        haveReproductiveOrganDisorders: ['', Validators.required],
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
  }

  getBmiUpdated(Form) {
    const form = Form as FormGroup;
    const weightUnit = form.get('weightUnit').value;
    const heightUnit = form.get('heightUnit').value;

    let weight = form.get('weight').value;
    let height = form.get('height').value;
    let inches;

    if (form.get('inches')) { inches = form.get('inches').value; }

    if (weightUnit === 'libras') { weight = weight / 2.205; }
    if (heightUnit === 'pie') {
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
    if (evento.valor === 'pie') {
      realForm.addControl('inches', this.fb.control('', Validators.required));
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
      this.newRequest.get('person').get('age').setValue(age);
    });

    this.newRequest.get('person').get('age').valueChanges.subscribe(value => {
      if (value >= 50 && this.newRequest.get('person').get('sex').value === 'Masculino') {
        this.questionnairesGastosMayores.addControl('solicitudProstatica', this.fb.group({}));
      } else {
        this.questionnairesGastosMayores.removeControl('solicitudProstatica');
      }
    });

    this.newRequest.get('person').get('sex').valueChanges.subscribe(value => {
      if (value === 'Masculino' && this.newRequest.get('person').get('age').value >= 50) {
        this.questionnairesGastosMayores.addControl('solicitudProstatica', this.fb.group({}));
      } else {
        this.questionnairesGastosMayores.removeControl('solicitudProstatica');
      }
    });

    this.isContractor = true;
    this.newRequest.get('person').get('isContractor').valueChanges.subscribe(value => {

      this.isContractor = true;
      if (value === 'Si') {
        this.isContractor = false;
        this.titles = FormValidationsConstant.titlesForMajorExpenses;
      } else {
        this.titles = FormValidationsConstant.titlesForMajorExpensesComplete;
      }
    });
    this.isContractorPep = false;
    this.newRequest.get('exposedPerson').get('contractor').valueChanges.subscribe(value => {

      this.isContractorPep = false;
      if (value === 'si') {
        this.isContractorPep = true;
      }

    });

    this.isSolicitantePep = false;
    this.newRequest.get('exposedPerson').get('headLine').valueChanges.subscribe(value => {

      this.isSolicitantePep = false;
      if (value === 'si') {
        this.isSolicitantePep = true;
      }

    });
    this.isJuridica = false;
    this.newRequest.get('person').get('isJuridica').valueChanges.subscribe(value => {
      this.isJuridica = false;
      console.log(value);
      if (value === 'Si') {
        this.isJuridica = true;
        this.titles = FormValidationsConstant.titlesForMajorExpenses;
      } else {
        this.titles = FormValidationsConstant.titlesForMajorExpensesComplete;
      }

    });

  }
  searchIdNumber(idNumber: string) {
    this.appComponent.showOverlay = true;

    this.userService.getQuotes(idNumber, 'salud')
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
          this.newRequest.get('payment').setValue(response.data.formaPago);
          this.newRequest.get('plans').setValue(response.data.plan);
          this.newRequest.get('person').get('firstName').setValue(response.data.nombre);
          this.newRequest.get('person').get('date').setValue(response.data.fecha_nacimiento);
        } else {
          this.newRequest.get('payment').reset();
          this.newRequest.get('plans').reset();
          this.newRequest.get('person').get('firstName').reset();
          this.newRequest.get('person').get('date').reset();
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

  relationWatcher(event, realForm) {
    console.log('event: ', event.valor, 'form: ', realForm);
    const form = realForm as FormGroup;
    if (event.valor === 'otros') {
      form.addControl('specifyRelationship', this.fb.control('', Validators.required));
    } else {
      form.removeControl('specifyRelationship');
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
            if (age >= 50 && form.get('sex').value === 'Masculino') {
              form.addControl('solicitudProstatica', this.fb.group({}));
            } else {
              form.removeControl('solicitudProstatica');
            }
          });
          this.newRequest.get('dependents').get('allDependents').get(index.toString()).get('sex').valueChanges.subscribe(value => {
            const form = this.newRequest.get('dependents').get('allDependents').get(index.toString()) as FormGroup;
            if (form.get('age').value >= 50 && value === 'Masculino') {
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
        }
        else {
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
      if (typeWeight === 'libras') { weight = weight / 2.205; }
      if (typeHeight === 'pie') {
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


  selectChange(event) {
    const questionsForm = this.newRequest.get('questionsA') as FormGroup;
    const questionsBForm = this.newRequest.get('questionsB') as FormGroup;
    const mhiForm = this.newRequest.get('questionsB').get('medicalHealthInsurance') as FormGroup;
    const exposedPersonForm = this.newRequest.get('exposedPerson') as FormGroup;


    if (event.valor === 'si') {
      switch (event.name) {

        case 'contractor':
          exposedPersonForm.addControl('contractorExposedInfo', this.fb.group({
            lastPosition: ['', Validators.required],
            time: ['', Validators.required],
            timeNumber: ['', [Validators.required, Validators.min(1)]]
          }));
          break;

        case 'headLine':
          exposedPersonForm.addControl('headLineExposedInfo', this.fb.group({
            lastPosition: ['', Validators.required],
            time: ['', Validators.required],
            timeNumber: ['', [Validators.required, Validators.min(1)]]
          }));
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
        default:
          break;
      }
    } else if (event.valor === 'no') {
      switch (event.name) {
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
          break;

        case 'headLine':
          exposedPersonForm.removeControl('headLineExposedInfo');
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
        default:
          break;
      }
    }
  }

  radioChange(event) {
    console.log(`value: ${event.value}, name: ${event.source.name}`);

  }

  valueChange($event, question, typeOrIndex) {
    console.log('tipo/index: ', typeOrIndex, 'event:', $event, 'question: ', question);
    if (typeOrIndex === 'solicitante') {
      if ($event.checked === true) {
        switch (question) {
          case 'havePregnant':
            this.questionsA.addControl('pregnant', this.fb.group({
              time: ['', Validators.required]
            }));
            break;

          case 'haveHighRiskSport':
            this.questionsA.addControl('highRiskSport', this.fb.group({
              date: ['', Validators.required],
              info: ['', Validators.required],
            }));
            break;

          case 'haveNicotine':
            this.questionsA.addControl('nicotine', this.fb.group({
              quantity: ['', Validators.required],
              timerange: ['', Validators.required],
              time: ['', Validators.required],
            }));
            break;
          case 'haveEndocrineDisorders':
            this.questionnairesGastosMayores.addControl('solicitudDiabetes', this.fb.group({}));
            break;

          case 'haveUrinarySystem':
            this.questionnairesGastosMayores.addControl('solicitudRenales', this.fb.group({}));
            break;

          case 'haveMusculoskeletal':
            this.questionnairesGastosMayores.addControl('solicitudArtitris', this.fb.group({}));
            this.questionnairesGastosMayores.addControl('columnaVertebralColumnaVertebral', this.fb.group({}));
            this.questionnairesGastosMayores.addControl('solicitudMusculoesqueleticos', this.fb.group({}));
            break;

          case 'haveCardiovascularSystem':
            this.questionnairesGastosMayores.addControl('solicitudHipertensionArterial', this.fb.group({}));
            this.questionnairesGastosMayores.addControl('solicitudCardioVasculares', this.fb.group({}));
            break;

          default:
            break;
        }
      } else if ($event.checked === false) {
        switch (question) {
          case 'havePregnant':
            this.questionsA.removeControl('pregnant');
            break;
          case 'haveHighRiskSport':
            this.questionsA.removeControl('highRiskSport');
            break;

          case 'haveNicotine':
            this.questionsA.removeControl('nicotine');
            break;

          case 'haveEndocrineDisorders':
            this.questionnairesGastosMayores.removeControl('solicitudDiabetes');
            break;

          case 'haveUrinarySystem':
            this.questionnairesGastosMayores.removeControl('solicitudRenales');
            break;

          case 'haveMusculoskeletal':
            this.questionnairesGastosMayores.removeControl('solicitudArtitris');
            this.questionnairesGastosMayores.removeControl('columnaVertebralColumnaVertebral');
            this.questionnairesGastosMayores.removeControl('solicitudMusculoesqueleticos');
            break;

          case 'haveCardiovascularSystem':
            this.questionnairesGastosMayores.removeControl('solicitudHipertensionArterial');
            this.questionnairesGastosMayores.removeControl('solicitudCardioVasculares');
            break;

          default:
            break;
        }
      }
    } else {
      const dependents = this.allDependents;
      const questionnaire = dependents.at(typeOrIndex) as FormGroup;
      // const questionnaire = dependent.get('questionnairesGastosMayores') as FormGroup;

      if ($event.checked === true) {
        console.log('true');
        switch (question) {
          case 'haveEndocrineDisorders':
            questionnaire.addControl('solicitudDiabetes', this.fb.group({}));
            break;

          case 'haveUrinarySystem':
            questionnaire.addControl('solicitudRenales', this.fb.group({}));
            break;

          case 'haveMusculoskeletal':
            questionnaire.addControl('solicitudArtitris', this.fb.group({}));
            questionnaire.addControl('columnaVertebralColumnaVertebral', this.fb.group({}));
            questionnaire.addControl('solicitudMusculoesqueleticos', this.fb.group({}));
            break;

          case 'haveCardiovascularSystem':
            questionnaire.addControl('solicitudHipertensionArterial', this.fb.group({}));
            questionnaire.addControl('solicitudCardioVasculares', this.fb.group({}));
            break;

          default:
            break;
        }
      } else if ($event.checked === false) {
        console.log('false');

        switch (question) {
          case 'haveEndocrineDisorders':
            questionnaire.removeControl('solicitudDiabetes');
            break;

          case 'haveUrinarySystem':
            questionnaire.removeControl('solicitudRenales');
            break;

          case 'haveMusculoskeletal':
            questionnaire.removeControl('solicitudArtitris');
            questionnaire.removeControl('columnaVertebralColumnaVertebral');
            questionnaire.removeControl('solicitudMusculoesqueleticos');
            break;

          case 'haveCardiovascularSystem':
            questionnaire.removeControl('solicitudHipertensionArterial');
            questionnaire.removeControl('solicitudCardioVasculares');
            break;

          default:
            break;
        }
      }

      console.log(questionnaire.value.name, questionnaire.value);

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

  getBmi(height: any, weight: any) {
    const weightUnit = this.newRequest.get('person').get('weightUnit').value;
    const heightUnit = this.newRequest.get('person').get('heightUnit').value;
    if (weight !== '' && height !== '') {
      if (weightUnit === 'libras') { weight = weight / 2.205; }
      if (heightUnit === 'pie') {
        height = height / 3.281;//(((height * 12) + inches) * 2.54);
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
        break;

      case 'haveDisease':
        return this.fb.group({
          family: ['', Validators.required],
        });
        break;

      case 'filesStudies':
        return this.fb.group({
          study: ['', Validators.required],
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

        switch (data.data.sexo) {
          case 'M':
            this.newRequest.get('person').get('sex').setValue('Masculino');
            break;

          case 'F':
            this.newRequest.get('person').get('sex').setValue('Femenino');
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

  getData(id) {
    this.majorExpensesService.returnData(id).subscribe(data => {
      //console.log(data);
      // console.log( this.newRequest);
      if (data !== undefined && data.data !== null &&
        data.data !== undefined) {
        this.ID = data.data.id;
        console.log(data.data);
        this.dataMappingFromApi.iterateThroughtAllObject(data.data, this.newRequest);
        console.log(this.newRequest);
        this.AddEventOnEachDependentVariable();
        if (this.newRequest.get('questionsB').get('familyWithDiseases') !== undefined && this.newRequest.get('questionsB').get('familyWithDiseases') !== null) {
          this.familyWithDiseasesList = this.newRequest.get('questionsB').get('familyWithDiseases') as FormArray;
        }
        else {
          this.familyWithDiseasesList = undefined;
        }

        this.contingentBeneficiaryArray = this.newRequest.get('contingentBeneficiary').get('dependentsC') as FormArray;
        this.primaryBenefitsArray = this.newRequest.get('primaryBenefits').get('dependentsC') as FormArray;
        this.studentDependents = this.newRequest.get('dependents').get('students') as FormArray;
        this.dependentsFormArray = this.newRequest.get('dependents').get('allDependents') as FormArray;
        this.questionsFormArray = this.newRequest.get('questionsA') as FormArray;
        this.questionsBFormArray = this.newRequest.get('questionsB') as FormArray;
        this.informationList = this.newRequest.get('questionsB').get('information') as FormArray;
        this.filesStudiesArray = this.newRequest.get('files').get('studies') as FormArray;

        this.isFormValidToFill = true;
        this.arrayFilesTitles = data.data.files.studies;

        //this.addEventChange();
        /*let person = this.newRequest.get('person');
        this.iterateThroughtObject(data.data.person, person);
/// Person
        let personOffice = this.newRequest.get('person').get('office');
        this.iterateThroughtObject(data.data.person.office, personOffice);
        let personaConozcaSuClientePersona = this.newRequest.get('person').get('conozcaSuClientePersona');
        this.iterateThroughtObject(data.data.person.conozcaSuClientePersona, personaConozcaSuClientePersona);
/// Contractor
        let contractor = this.newRequest.get('contractor');
        this.iterateThroughtObject(data.data.contractor, contractor);
        let contractorOffice = this.newRequest.get('contractor').get('office');
        this.iterateThroughtObject(data.data.contractor.office, contractorOffice);
        let ContractorConozcaSuClientePersona = this.newRequest.get('contractor').get('conozcaSuClientePersona');
        this.iterateThroughtObject(data.data.contractor.conozcaSuClientePersona, ContractorConozcaSuClientePersona);
        let ContractorConozcaSuClientePersonaJuridica = this.newRequest.get('contractor').get('conozcaSuClientePersonaJuridica');
        this.iterateThroughtObject(data.data.contractor.conozcaSuClientePersonaJuridica, ContractorConozcaSuClientePersonaJuridica);

/// ExpoxedPerson
let exposedPerson = this.newRequest.get('exposedPerson');
this.iterateThroughtObject(data.data.exposedPerson, exposedPerson);
let contractorExposedInfo = this.newRequest.get('exposedPerson').get('contractorExposedInfo');
this.iterateThroughtObject(data.data.exposedPerson.contractorExposedInfo, contractorExposedInfo);
let headLineExposedInfo = this.newRequest.get('exposedPerson').get('headLineExposedInfo');
this.iterateThroughtObject(data.data.exposedPerson.headLineExposedInfo, headLineExposedInfo);

/// Incomes
let incomes = this.newRequest.get('incomes');
this.iterateThroughtObject(data.data.incomes, incomes);
if (data.data.dependents !== null)
{
// Dependents
let dependents = this.newRequest.get('dependents');
this.iterateThroughtObject(data.data.dependents, dependents);

if(data.data.dependents.allDependents !== null && data.data.dependents.allDependents.length > 0)
{
data.data.dependents.allDependents.foreach( (element) =>{
  this.iterateThroughtObject(element, dependents)
  });
}
if(data.data.dependents.students !== null && data.data.dependents.students.length > 0)
{
data.data.dependents.students.foreach( (element) =>{
  this.iterateThroughtObject(element, dependents)
  });
}
}*/
      }


    });
  }

}

