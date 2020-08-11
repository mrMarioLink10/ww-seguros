import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldConfig } from '../models/field-config';
import { FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DiseaseService } from 'src/app/modules/dashboard/shared/components/disease/shared/disease/disease.service';
import { $time } from 'src/app/core/form/objects';

@Component({
  selector: 'app-section-a-block',
  templateUrl: './section-a-block.component.html',
  styleUrls: ['./section-a-block.component.scss']
})
export class SectionABlockComponent implements OnInit {
  @Input() newRequest: FormGroup;

  @Input() questionName: string;
  @Input() inFormName: string;

  @Input() arrayList: FormArray;
  @Input() arrayName: string;

  @Input() dependentsArrayList: FormArray;

  @Input() haveAilmentOptions: string;
  @Input() ailmentOptions: FieldConfig;

  @Input() questionnairesGastosMayores: any;

  @Output() ailmentSelected = new EventEmitter<any>();
  @Output() addToList = new EventEmitter<any>();

  todayDate = new Date();

  haveToShowMoreAilments = [
    'ARTRITIS',
    'LUMBAGO',
    'HERNIA DISCAL',
    'ESCOLIOSIS',
    'OTRO PADECIMIENTOS DE LA COLUMNA VERTEBRAL',
    'OTRO TRASTORNO MÚSCULO ESQUELÉTICOS',
    'PRESIÓN ARTERIAL ALTA',
    'PROBLEMAS DEL CORAZÓN',
    'SOPLOS',
    'VALVULOPATÍAS',
    'FIEBRE REUMÁTICA',
    'ANGINA',
    'INFARTO',
    'VARICES',
    'FLEBITIS',
    'PATOLOGÍA CARDIACA',
    'OTROS PADECIMIENTO DEL SISTEMA CARDIOVASCULAR',
    'DIABETES',
    'CÁLCULO RENALES',
    'NEFRITIS',
    'INFECCIONES URINARIAS',
    'SANGRE EN LA ORINA',
    'PADECIMIENTOS DEL RIÑÓN',
    'OTROS PADECIMIENTOS DEL SISTEMA URINARIO',
  ];

  year = {
    label: 'Seleccione',
    options: $time,
    name: 'time'
  };

  constructor(
    public diseaseService: DiseaseService
  ) { }

  ngOnInit() {
  }

  ailmentSelectedInBlock(type, form, watcherForm) {
    this.ailmentSelected.emit({ type, form, watcherForm });
  }

  addToListInBlock(array, name) {
    this.addToList.emit({ array, name });
  }

  haveToShowWhichFormComponent(inFormName: string) {


    if (inFormName === 'havePhysiologicalDisorder' || inFormName === 'haveBloodTransfusion') {
      return false;
    } else {
      return true;
    }
  }

  // tslint:disable: max-line-length
  haveToShowBasedOnAilment(ailment, index, dpdIndex?) {
    if (this.newRequest.get('questionsA').get(this.arrayName)) {
      if (this.newRequest.get('questionsA').get(this.arrayName).get(index.toString())) {
        this.newRequest.get('questionsA').get(this.arrayName).get(index.toString()).get('medicCenterName').setValidators(null);
        this.newRequest.get('questionsA').get(this.arrayName).get(index.toString()).get('medicCenterAddress').setValidators(null);
        this.newRequest.get('questionsA').get(this.arrayName).get(index.toString()).get('duration').setValidators(null);
        this.newRequest.get('questionsA').get(this.arrayName).get(index.toString()).get('time').setValidators(null);
      }
    }


    if (dpdIndex !== undefined) {
      if (this.newRequest.get('dependents').get('allDependents').get(dpdIndex.toString())) {
        if (this.newRequest.get('dependents').get('allDependents').get(dpdIndex.toString()).get(this.arrayName)) {
          if (this.newRequest.get('dependents').get('allDependents').get(dpdIndex.toString()).get(this.arrayName).get(index.toString())) {
            this.newRequest.get('dependents').get('allDependents').get(dpdIndex.toString()).get(this.arrayName).get(index.toString()).get('medicCenterName').setValidators(null);
            this.newRequest.get('dependents').get('allDependents').get(dpdIndex.toString()).get(this.arrayName).get(index.toString()).get('medicCenterAddress').setValidators(null);
            this.newRequest.get('dependents').get('allDependents').get(dpdIndex.toString()).get(this.arrayName).get(index.toString()).get('duration').setValidators(null);
            this.newRequest.get('dependents').get('allDependents').get(dpdIndex.toString()).get(this.arrayName).get(index.toString()).get('time').setValidators(null);
          }
        }
      }
    }

    for (const key in this.haveToShowMoreAilments) {
      if (Object.prototype.hasOwnProperty.call(this.haveToShowMoreAilments, key)) {
        const element = this.haveToShowMoreAilments[key];

        if (ailment === element) {
          return false;
          break;
        }
      }
    }

    return true;
  }

}
