import { Component, OnInit, DoCheck } from '@angular/core';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { $sex, $res, $country, $time, $family, $allFamily } from '../../../../../core/form/objects';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { questionsA, questionsB } from './questions';
import { Requests } from '../../requests.component';
import { Router, ActivatedRoute } from '@angular/router';
import { generate } from 'rxjs';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { DiseaseService } from '../../../shared/components/disease/shared/disease/disease.service';
@Component({
  selector: 'app-major-expenses',
  templateUrl: './major-expenses.component.html',
  styleUrls: ['./major-expenses.component.scss']
})

export class MajorExpensesComponent implements OnInit, DoCheck {

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
  familyWithDiseasesList: FormArray;
  questions = questionsA;
  questionsB = questionsB;
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
          value: 'Cambio de plan',
          viewValue: 'Cambio de plan',
        }
      ],
      name: 'requestType',
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
        value: 'otro',
        viewValue: 'Otra'
      },
    ]
  };
  deducibles: FieldConfig = {
    label: 'Frecuencia de Pago',
    options: [
      {
        value: 'RD$1,000',
        viewValue: '1000'
      },
      {
        value: 'RD$3,000',
        viewValue: '3000'
      },
      {
        value: 'RD$5,000',
        viewValue: '5000'
      },
      {
        value: 'otro',
        viewValue: 'Otr0'
      },
    ]
  };
  plans: FieldConfig = {
    label: 'Planes',
    options: [
      {
        value: 'Signature Special',
        viewValue: 'Signature Special',
      }
    ],
    name: 'plans',
  };
  // tslint:disable-next-line: max-line-length
  titles = ['Contratante', 'Solicitante', 'Persona políticamente expuesta', 'Perfil Financiero', 'Dependientes', 'Sección A', 'Sección B', 'Sección C Beneficiarios Primarios', 'Beneficiario(s) Contingente(s)', 'Comentarios adicionales'];
  country = {
    label: 'País',
    options: $country,
    name: 'country',
  }
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
    weight: ['', Validators.required],
    date: [new Date(), Validators.required],
    height: ['', Validators.required],
    sex: ['', Validators.required],
    birtday: ['', Validators.required],
    student: ['', Validators.required],
    telUnivercity: ['', Validators.required],
    id2: ['', Validators.required],
    nationality: ['', Validators.required],
    questionsA: this.fb.group({
      haveMusculoskeletal: ['', Validators.required],
      haveCerebrovascular: ['', Validators.required],
      haveNervousSystem: ['', Validators.required],
      haveVisionHearing: ['', Validators.required],
      haveSpine: ['', Validators.required],
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
    }),
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
    date: [new Date(), Validators.required],
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
    date: [new Date(), Validators.required],
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
    quantity: ['', Validators.required]

  };
  allFamily = $allFamily;

  haveSomeone = {
    haveMusculoskeletal: '',
    haveCerebrovascular: '',
    haveNervousSystem: '',
    haveVisionHearing: '',
    haveSpine: '',
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

  policy: FormGroup;
  // tslint:disable-next-line: max-line-length
  constructor(
    private fb: FormBuilder,
    public formMethods: FormArrayGeneratorService,
    private router: Router,
    private route: ActivatedRoute,
    public formHandler: FormHandlerService,
    public diseaseService: DiseaseService
  ) { }

  ngOnInit() {

    this.procedures = this.fb.array([this.formMethods.createItem(this.formGroupProcedure)]);

    this.newRequest = this.fb.group({
      NoC: ['', Validators.required],
      deducibles: ['', Validators.required],
      payment: ['', Validators.required],
      plans: ['', Validators.required],
      requestType: ['', Validators.required],
      person: this.fb.group({
        firstName: ['', Validators.required],
        secondName: ['', Validators.required],
        lastName: ['', Validators.required],
        date: [new Date(), Validators.required],
        sex: ['', Validators.required],
        nationality: ['', Validators.required],
        id2: ['', Validators.required],
        age: ['', Validators.required],
        weight: ['', Validators.required],
        height: ['', Validators.required],
        status: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
        direction: ['', Validators.required],
        tel: ['', Validators.required],
        cel: ['', Validators.required],
        officeTel: ['', Validators.required],
        fax: ['', Validators.required],
        email: ['', Validators.required],
        office: this.fb.group({
          company: ['', Validators.required],
          position: ['', Validators.required],
          direction: ['', Validators.required],
          economicActivity: ['', Validators.required],
          sector: ['', Validators.required],
          city: ['', Validators.required],
          country: ['', Validators.required],
        })
      }),
      contractor: this.fb.group({
        societyName: ['', Validators.required],
        commercialName: ['', Validators.required],
        taxpayerNumber: ['', Validators.required],
        socialHome: ['', Validators.required],
        tel: ['', Validators.required],
        email: ['', Validators.required],
        commercialActivity: ['', Validators.required],
        requestType: ['', Validators.required],
        legalRepresentation: this.fb.group({
          name: ['', Validators.required],
          position: ['', Validators.required],
          nationality: ['', Validators.required],
          id2: ['', Validators.required],
          policy: ['', Validators.required],
          email: ['', Validators.required]
        })
      }),
      exposedPerson: this.fb.group({
        contractor: [false, Validators.required],
        headLine: [false, Validators.required],

      }),
      principalIncome: ['', Validators.required],
      otherIncomes: ['', Validators.required],


      dependents: this.fb.group({
        allDependents: this.fb.array([]),
        students: this.fb.array([]),
      }),
      questionsA: this.fb.group({
        haveMusculoskeletal: ['', Validators.required],
        haveCerebrovascular: ['', Validators.required],
        haveNervousSystem: ['', Validators.required],
        haveVisionHearing: ['', Validators.required],
        haveSpine: ['', Validators.required],
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
        cardiovascular: this.fb.group({}),
        spine: this.fb.group({}),
      }),
      questionsB: this.fb.group({
        haveConsultedForUnmentioned: ['', Validators.required],
        haveAlterationForUnmentioned: ['', Validators.required],
        haveHadExamStudiesTests: ['', Validators.required],
        hasFamilyWithHeartKidneyDisease: ['', Validators.required],
        hasDeclinedInsuranceCompany: ['', Validators.required],
        haveHadMedicalHealthInsurance: ['', Validators.required],
        information: this.fb.array([this.createFormArray('medicInformation')]),
      }),
      primaryBenefits: this.fb.group({
        dependentsC: this.fb.array([this.formMethods.createItem(this.primaryBenefits)]),
        personBenefited: this.fb.group({
          selection: [''],
          family: [''],
          id2: ['']
        })
      }),
      contingentBeneficiary: this.fb.group({
        dependentsC: this.fb.array([this.formMethods.createItem(this.primaryBenefits)]),
        personBenefited: this.fb.group({
          selection: [''],
          family: [''],
          id2: ['']
        })
      }),
      comentary: [''],
      sectionAHelper: this.fb.group({
        haveMusculoskeletal: ['', Validators.required],
        haveCerebrovascular: ['', Validators.required],
        haveNervousSystem: ['', Validators.required],
        haveVisionHearing: ['', Validators.required],
        haveSpine: ['', Validators.required],
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
    // this.setQuestionsA();
  }

  ngDoCheck() { }

  add(dependentsFormArray, group) {
    const increment = dependentsFormArray.length + 1;
    dependentsFormArray = this.formMethods.addElement(dependentsFormArray, increment, group).formArray;

    console.log(this.newRequest);

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

    console.log(event);
    if (event.valor === 'si') {
      switch (event.name) {
        case 'havePregnant':
          questionsForm.addControl('pregnant', this.fb.group({
            time: ['', Validators.required]
          }));
          break;

        case 'haveHighRiskSport':
          questionsForm.addControl('highRiskSport', this.fb.group({
            date: ['', Validators.required],
            info: ['', Validators.required],
          }));
          break;

        case 'haveNicotine':
          questionsForm.addControl('nicotine', this.fb.group({
            quantity: ['', Validators.required],
            timerange: ['', Validators.required],
            time: ['', Validators.required],
          }));
          break;

        case 'contractor':
          exposedPersonForm.addControl('contractorExposedInfo', this.fb.group({
            lastPosition: ['', Validators.required],
            time: ['', Validators.required],
            timeNumber: ['', Validators.required]
          }));
          break;

        case 'headLine':
          exposedPersonForm.addControl('headLineExposedInfo', this.fb.group({
            lastPosition: ['', Validators.required],
            time: ['', Validators.required],
            timeNumber: ['', Validators.required]
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

  sectionASelect(event) {
    // console.log(`value: ${event.value}, id: ${event.source.id}`);
    // console.log(`event:`, event);
    // for (const value of event.value) {
    //   if (value === 'asegurado') {
    //     this.newRequest.get('questionsA').get(event.source.id).setValue('si');
    //   } else if (value )
    // }
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
    console.log(JSON.stringify(this.newRequest.get('questionsA').get('prostatic').value));
  }

  createFormArray(type: string): FormGroup {
    switch (type) {
      case 'medicInformation':
        return this.fb.group({
          name: ['', Validators.required],
          ailment: ['', Validators.required],
          date: ['', Validators.required],
          threatment: ['', Validators.required],
          time: ['', Validators.required],
          duration: ['', Validators.required],
          medicCenterName: ['', Validators.required],
          medicCenterAddress: ['', Validators.required],
        });
        break;

      case 'haveDisease':
        return this.fb.group({
          family: ['', Validators.required],
        });
        break;

      default:
        break;
    }
  }

  addToList(list: any, type: string) {
    list.push(this.createFormArray(type));
  }

}

