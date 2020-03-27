import { Component, OnInit, DoCheck } from '@angular/core';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { $sex, $res, $country, $time, $family, $allFamily } from '../../../../../core/form/objects';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { questionsA, questionsB } from './questions';
import { Requests } from '../../requests.component';
import { Router, ActivatedRoute } from '@angular/router';
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
  questions = questionsA;
  questionsB = questionsB;
  student = {
    name: ['', Validators.required],
    univercity: ['', Validators.required],
    univercityPhone: ['', Validators.required]
  }
  family = $family


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
    id: ['', Validators.required],
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
  }
  familyControl = new FormControl('', Validators.required);
  reasonControl = new FormControl('', Validators.required);

  timeQuestionGroup = {
    question: ['', Validators.required],
    answer: [false, Validators.required],
    dailyAmount: ['', Validators.required],
    numberTime: ['', Validators.required],
    time: ['', Validators.required],
  }
  DateQuestionGroup = {
    question: ['', Validators.required],
    answer: [false, Validators.required],
    date: [new Date(), Validators.required],
    description: ['', Validators.required],
  }
  pregnant = {
    question: ['', Validators.required],
    answer: [false, Validators.required],
    time: ['', Validators.required],
  }
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
  }
  primaryBenefits = {
    name: ['', Validators.required],
    date: [new Date(), Validators.required],
    id: ['', Validators.required],
    nationality: ['', Validators.required],
    ocupation: ['', Validators.required],
    family: ['', Validators.required],
    quantity: ['', Validators.required]

  }
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
  }

  policy: FormGroup;
  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, public formMethods: FormArrayGeneratorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.procedures = this.fb.array([this.formMethods.createItem(this.formGroupProcedure)]);

    this.newRequest = this.fb.group({
      requestType: ['', Validators.required],
      NoC: ['', Validators.required],
      deducibles: ['', Validators.required],
      payment: ['', Validators.required],
      plans: ['', Validators.required],
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
          id: ['', Validators.required],
          policy: ['', Validators.required],
          email: ['', Validators.required]
        })
      }),
      exposedPerson: this.fb.group({
        contractor: [false, Validators.required],
        headLine: [false, Validators.required],
        lastPosition: ['', Validators.required],
        time: ['', Validators.required],
        timeNumber: ['', Validators.required]
      }),
      prinsipalIncome: ['', Validators.required],
      otherIncomes: ['', Validators.required],


      dependents: this.fb.group({
        allDependents: this.fb.array([this.formMethods.createItem(this.dependentFormGroup)]),
        students: this.fb.array([this.formMethods.createItem(this.student)]),
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
      questionsB: this.fb.array([this.formMethods.createItem(this.questionsGroup)]),
      primaryBenefits: this.fb.group({
        dependentsC: this.fb.array([this.formMethods.createItem(this.primaryBenefits)]),
        personBenefited: this.fb.group({
          selection: [''],
          family: [''],
          id: ['']
        })
      }),
      contingentBeneficiary: this.fb.group({
        dependentsC: this.fb.array([this.formMethods.createItem(this.primaryBenefits)]),
        personBenefited: this.fb.group({
          selection: [''],
          family: [''],
          id: ['']
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
    // this.setQuestionsA();
    this.setQuestionsB();

  }
  ngDoCheck() { }

  add(dependentsFormArray, group) {
    const increment = dependentsFormArray.length + 1;
    dependentsFormArray = this.formMethods.addElement(dependentsFormArray, increment, group).formArray;
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

  selectChangeB(event, index) {
    let questions = this.newRequest.get('questionsB').get(index.toString()) as FormGroup;
    if (event.valor) {

      switch (index) {
        case 2:
          questions.addControl('procedures', this.procedures)
          this.proceduresArray = this.newRequest.get('questionsB').get(index.toString()).get('procedures') as FormArray;
          this.visible = true;
          break;
        case 3:
          questions.addControl('family', this.familyControl)
          break;
        case 4:
          questions.addControl('reason', this.reasonControl)
          break;
        case 5:
          questions.addControl('policy', this.policy)
          break;

      }
    } else {
      switch (index) {
        case 2:
          questions.removeControl('procedures')
          break;
        case 3:
          questions.removeControl('family')
          break;
        case 4:
          questions.removeControl('reason')
          break;
        case 5:
          questions.removeControl('policy')
          break;

      }
    }

  }

  setQuestionsB() {
    this.questionsB.forEach((question, index) => {
      if (index > 0) {
        this.add(this.questionsBFormArray, this.questionsGroup);
      }
    });
  }

  proceduresFormGroup(index, i) {
    return this.newRequest.get('questionsB').get(index.toString()).get('procedures').get(i.toString()) as FormGroup;
  }

  form(): FormGroup {
    return this.fb.group(this.formGroupProcedure)
  }
  addprocedures() {
    this.proceduresArray.push(this.form())
    this.proceduresArray.updateValueAndValidity();
  }
  print() {
    // console.log(JSON.stringify(this.newRequest.get('questions').value));
    console.log('SOLO DISEASES', this.newRequest.get('questionsA').value);
    console.log('SOLO DEPENDENTS', this.newRequest.get('dependents'));
    console.log('ENTERO', this.newRequest);
    console.log(this.newRequest.get('dependents').get('allDependents').get('0').get('questionsA'));

  }

  selectChange(event) {
    const questionsForm = this.newRequest.get('questions') as FormGroup;

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
        this.router.navigate(['../refund'], { relativeTo: this.route });
        break;

      case 'gastos mayores':
        this.router.navigate(['../major-expenses'], { relativeTo: this.route });
        break;

      default:
        break;
    }
  }
}

