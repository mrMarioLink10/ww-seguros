import { Component, OnInit, DoCheck } from '@angular/core';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {$sex, $res, $country, $time, $family, $allFamily} from '../../../../../core/form/objects';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { questionsA, questionsB } from './questions';
@Component({
  selector: 'app-new-subscription-request',
  templateUrl: './new-subscription-request.component.html',
  styleUrls: ['./new-subscription-request.component.scss']
})

export class NewSubscriptionRequestComponent implements OnInit, DoCheck {
  
  newRequest: FormGroup;
  sex = $sex;
  res = $res;
  dependentsFormArray: FormArray;
  questionsFormArray: FormArray;
  questionsBFormArray: FormArray;
  questions = questionsA;
  questionsB = questionsB;

  family = $family
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
  titles = ['Contratante','Solicitante', 'Persona políticamente expuesta','Perfil Financiero', 'Dependientes', 'Sección A','Sección B','Sección C Beneficiarios Primarios','Beneficiario(s) Contingente(s)','Comentarios adicionales'];
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
  }
  year = {
    label: 'Tiempo',
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
    name:  [''],
    lastName:   [''],
    family: [''],
    weight:     [''],
    date:     [''],
    height:     [''],
    sex:        [''],
    birtday:       [''],
    student: [false],
    telUnivercity: [''],
    id: [''],
    nationality: [''],
  };
  questionsGroup = {
    question: ['', Validators.required],
    answer: [false, Validators.required],
  }
  familyGroup = {
    question: ['', Validators.required],
    answer: [false, Validators.required],
    family:  [false, Validators.required],
  }
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
    date: ['', Validators.required],
    description: ['', Validators.required],
  }
  pregnant = {
    question: ['', Validators.required],
    answer: [false, Validators.required],
    time: ['', Validators.required],
  }
  procedure;
  formGroupProcedure = {
    patientsName: [''],
    procedures: [''],
    date: [''],
    treatment: [''],
    duration: [''],
    time: [''],
    providerName: [''],
    providerDirection: ['']
  }
  primaryBenefits = {
    name: [''],
    date: [''],
    id: [''],
    nationality:  [''],
    ocupation: [''],
    family:  [''],
    quantity: ['']

  }
  allFamily= $allFamily;
  constructor(private fb: FormBuilder, public formMethods: FormArrayGeneratorService) { }
  
  ngOnInit() {

    this.procedure = {
      question: [''],
      answer: [false],
      procedures:  this.fb.array([ this.formMethods.createItem(this.formGroupProcedure)])
    }

   this.newRequest = this.fb.group({
      requestType: [''],
      NoC:         [''],
      deducibles:   [''],
      payment:     [''],
      plans:       [''],
      person: this.fb.group({
        firstName:    ['', Validators.required],
        secondName:   [''],
        lastName:     ['', Validators.required],
        date:         [''],
        sex:          [''],
        nationality:  [''],
        id:           [''],
        age:          [''],
        weight:       [''],
        height:       [''],
        status:       [''],
        country:      [''],
        city:         [''],
        direction:    [''],
        tel:          [''],
        cel:          [''],
        officeTel:    [''],
        fax:          [''],
        email:        [''],
        office: this.fb.group({
          company:            [''],
          position:           [''],
          direction:          [''],
          economicActivity:   [''],
          sector:             [''],
          city:               [''],
          country:            [''],
        })
      }),
      contractor: this.fb.group({
        societyName:        [''],
        commercialName:     [''],
        taxpayerNumber:     [''],
        socialHome:         [''],
        tel:                [''],
        email:              [''],
        commercialActivity: [''],
        requestType:        [''],
        legalRepresentation: this.fb.group({
          name:             [''],
          position:         [''],
          nationality:      [''],
          id:               [''],
          policy:           [''],
          email:            ['']
        })
      }),
      exposedPerson: this.fb.group({
        contractor:     [false],
        headLine:       [false],
        lastPosition:   [''],
        time:           [''],
        timeNumber:     ['']
      }),
      prinsipalIncome:  [''],
      otherIncomes:     [''],
      dependents: this.fb.array([ this.formMethods.createItem(this.dependentFormGroup)]),
      questionsA:this.fb.array([ this.formMethods.createItem(this.questionsGroup)]),
      questionsB:this.fb.array([ this.formMethods.createItem(this.questionsGroup)]),
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
      comentary: ['']
      
    });


    this.dependentsFormArray = this.newRequest.get('dependents') as FormArray;
    this.questionsFormArray = this.newRequest.get('questionsA') as FormArray;
    this.questionsBFormArray = this.newRequest.get('questionsB') as FormArray;
    this.setQuestionsA();
    this.setQuestionsB();
    
  }
  ngDoCheck(){
  // console.log(this.newRequest);
  }
  add(dependentsFormArray,group){
    const increment = dependentsFormArray.length + 1;
    dependentsFormArray =  this.formMethods.addElement( dependentsFormArray, increment, group).formArray;
  }
  setQuestionsA(){
    this.questions.forEach((question,index)=> {
      if(index > 0){
        if(question.time){
          this.add(this.questionsFormArray,this.timeQuestionGroup);
        }
        else if(question.date){
          this.add(this.questionsFormArray,this.DateQuestionGroup);
          
        }else if(question.pregnant){
          this.add(this.questionsFormArray,this.pregnant);
        }
        else{
          this.add(this.questionsFormArray,this.questionsGroup);
        }
      }
    });
  }
  setQuestionsB(){
    this.questionsB.forEach((question,index)=> {
      if(index > 0){
        if(question.procedures){
          this.add(this.questionsBFormArray,this.procedure);
          console.log(this.newRequest.get('questionsB').get(index.toString()).get('procedures').get('0'))
        }else if(index === 3){
          this.add(this.questionsBFormArray,this.familyGroup);
          
        }
        }else{
          this.add(this.questionsBFormArray,this.questionsGroup);
        }
    });
  }
  proceduresFormGroup(id){
   //console.log(id)
  // console.log(this.newRequest.get('questionsB').get(index.toString()).get('procedures').get('0'))
    console.log(this.newRequest.get('questionsB').get('0').get('procedures').get('0'));
   //return this.newRequest.get('questionsB').get(id.toString()).get('procedures').get(id.toString());
  }
  
}

