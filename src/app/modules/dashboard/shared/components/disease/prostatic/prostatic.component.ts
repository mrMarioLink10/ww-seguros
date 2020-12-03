import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DiseaseService } from '../shared/disease/disease.service';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';

@Component({
  selector: 'app-prostatic',
  templateUrl: './prostatic.component.html',
  styles: []
})
export class ProstaticComponent implements OnInit, DoCheck {
  @Input() form: FormGroup;
  @Input() showWarningDot: boolean;
  @Input() affected: string;

  step: number;
  treatmentUndergoneList: FormArray;
  studiesList: FormArray;

  treatmentType: FieldConfig = {
    label: 'Tipo de tratamiento',
    options: [
      {
        value: 'MEDICO',
        viewValue: 'Médico'
      },
      {
        value: 'QUIRURGICO',
        viewValue: 'Quirúrgico'
      }
    ]
  };

  accordionTitle = ['Datos personales', 'Datos'];

  questions: any[];

  xTreatmentValidators = 0;

  constructor(private fb: FormBuilder, public diseaseService: DiseaseService) { }

  ngDoCheck() {
    if (this.xTreatmentValidators == 0) {
      if (this.form.get('treatments') && (this.treatmentUndergoneList != null ||
        this.treatmentUndergoneList != undefined)) {
        // tslint:disable-next-line: prefer-for-of
        for (let x = 0; x < this.treatmentUndergoneList.length; x++) {
          this.form.get('treatments').get(x.toString()).get('name').setValidators(Validators.required);
          this.form.get('treatments').get(x.toString()).get('name').updateValueAndValidity();
        }
      }
      this.xTreatmentValidators = 1;
    }
  }

  ngOnInit() {
    this.addBasicControls();

    this.form.addControl('treatments', this.fb.array([]));
    this.treatmentUndergoneList = this.form.get('treatments') as FormArray;

    this.form.addControl('studies', this.fb.array([]));
    this.studiesList = this.form.get('studies') as FormArray;

    this.questions = [
      {
        label: '¿Se ha realizado alguna evaluación prostática?',
        name: 'hasProstateEvaluation',
        group: 'prostateEvaluations',
      },
      {
        label: 'a. PSA Total',
        name: 'hasPSATotal',
        group: 'psaTotalInfo',
      },
      {
        label: 'b. Ultrasonografía prostática',
        name: 'hasProstateUltrasound',
        group: 'prostateUltrasoundInfo',
      },
      {
        label: 'c. Biopsia',
        name: 'hasBiopsy',
        group: 'biopsyInfo',
      },
      {
        label: '¿Mantiene algún tratamiento para enfermedades prostáticas?',
        name: 'hasTreatment',
      },
    ];

    if (this.form.get('firstName')) {
      this.form.get('firstName').clearValidators();
      this.form.get('firstName').updateValueAndValidity();
    }
    if (this.form.get('lastName')) {
      this.form.get('lastName').clearValidators();
      this.form.get('lastName').updateValueAndValidity();
    }
    if (this.form.get('birthdate')) {
      this.form.get('birthdate').clearValidators();
      this.form.get('birthdate').updateValueAndValidity();
    }
    if (this.form.get('policeNo')) {
      this.form.get('policeNo').clearValidators();
      this.form.get('policeNo').updateValueAndValidity();
    }
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep(panel?: string) {
    this.step++;
  }
  selectChange(event) {
    console.log(event);
    if (event.valor === 'SI') {
      switch (event.name) {
        case 'hasProstateEvaluation':
          this.form.addControl('prostateEvaluations', this.fb.group({
            doctorName: ['', Validators.required],
            institution: ['', Validators.required],
            address: ['', Validators.required],
            phone: ['', Validators.required],
          }));
          break;
        case 'hasPSATotal':
          this.form.addControl('psaTotalInfo', this.studies());
          break;

        case 'hasProstateUltrasound':
          this.form.addControl('prostateUltrasoundInfo', this.studies());
          break;

        case 'hasBiopsy':
          this.form.addControl('biopsyInfo', this.studies());
          break;

        default:
          break;
      }
    } else if (event.valor === 'NO') {
      switch (event.name) {
        case 'hasProstateEvaluation':
          this.form.removeControl('prostateEvaluations');
          break;

        case 'hasPSATotal':
          this.form.removeControl('psaTotalInfo');
          break;


        case 'hasProstateUltrasound':
          this.form.removeControl('prostateUltrasoundInfo');
          break;


        case 'hasBiopsy':
          this.form.removeControl('biopsyInfo');
          break;

        default:
          break;
      }
    }
  }

  studies() {
    return this.fb.group({
      date: ['', Validators.required],
      diagnostic: ['', Validators.required],

    });
  }

  addBasicControls() {
    this.form.addControl('firstName', this.fb.control('',));
    this.form.addControl('lastName', this.fb.control('',));
    this.form.addControl('birthdate', this.fb.control('',));
    this.form.addControl('policeNo', this.fb.control('',));
    this.form.addControl('hasProstateEvaluation', this.fb.control('', Validators.required));
    this.form.addControl('hasPSATotal', this.fb.control('', Validators.required));
    this.form.addControl('hasProstateUltrasound', this.fb.control('', Validators.required));
    this.form.addControl('hasBiopsy', this.fb.control('', Validators.required));
    this.form.addControl('hasTreatment', this.fb.control('', Validators.required));
  }

  createFormArray(type: string): FormGroup {
    switch (type) {
      case 'treatments':
        return this.fb.group({
          type: ['', Validators.required],
          name: ['', Validators.required],
        });
        break;

      case 'studies':
        return this.fb.group({
          date: ['', Validators.required],
          results: ['', Validators.required],
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
