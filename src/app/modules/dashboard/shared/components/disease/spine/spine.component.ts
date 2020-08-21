import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';

@Component({
  selector: 'app-spine',
  templateUrl: './spine.component.html',
  styles: []
})
export class SpineComponent implements OnInit, DoCheck {
  @Input() form: FormGroup;
  @Input() showWarningDot: boolean;
  @Input() affected: string;

  step: number;

  accordionTitle = ['Datos'];

  appliedStudiesList: FormArray;

  medicationList: FormArray;
  physiotherapyList: FormArray;
  surgeryList: FormArray;
  affectedSegmentList: FormArray;

  todayDate = new Date();

  segments: FieldConfig = {
    name: 'segment',
    label: 'Segmento Afectado',
    options: [
      { viewValue: 'Cervical', value: 'CERVICAL' },
      { viewValue: 'Torácico', value: 'TORACICO' },
      { viewValue: 'Lumbar', value: 'LUMBAR' },
      { viewValue: 'Sacro', value: 'SACRO' },

    ]
  };

  studiesType: FieldConfig = {
    name: 'type',
    label: 'Tipo de Estudio',
    options: [
      { viewValue: 'Radiografía', value: 'RADIOGRAFIA' },
      { viewValue: 'Tomografía', value: 'TOMOGRAFIA' },
      { viewValue: 'Resonancia Magnética', value: 'RESONANCIA MAGNETICA' },
      { viewValue: 'Otro', value: 'OTRO' },

    ]
  };

  yesOrNo: FieldConfig = {
    label: '¿Ha tenido episodios en los últimos 2 años?',
    options: [
      {
        value: 'SI',
        viewValue: 'Si'
      },
      {
        value: 'NO',
        viewValue: 'No'
      }
    ]
  };

  yesOrNoOriginal: FieldConfig = {
    label: '',
    options: [
      {
        value: 'SI',
        viewValue: 'Si'
      },
      {
        value: 'NO',
        viewValue: 'No'
      }
    ]
  };

  questions: any[];

  xSpineValidator = 0;

  constructor(private fb: FormBuilder) { }

  ngDoCheck() {

    if (this.xSpineValidator == 0) {
      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < this.affectedSegmentList.length; x++) {
        // tslint:disable-next-line: prefer-for-of
        for (let y = 0; y < (this.form.get('affectedSegment').get(x.toString()).get('affectedVertebra') as
        FormArray).length; y++) {
          (this.form.get('affectedSegment').get(x.toString()).get('affectedVertebra').get(y.toString()) as
          FormGroup).get('vertebra').clearValidators();
          (this.form.get('affectedSegment').get(x.toString()).get('affectedVertebra').get(y.toString()) as
          FormGroup).get('vertebra').updateValueAndValidity();
        }
      }
      if (this.form.get('surgeries') && (this.surgeryList != null || this.surgeryList != undefined)
      && this.form.get('useSurgery').value == 'SI') {
        // tslint:disable-next-line: prefer-for-of
        for (let x = 0; x < this.surgeryList.length; x++) {
            (this.form.get('surgeries').get(x.toString()) as FormGroup).get('name').setValidators(Validators.required);
            (this.form.get('surgeries').get(x.toString()) as FormGroup).get('name').updateValueAndValidity();
        }
      }
      if (this.form.get('medications') && (this.medicationList != null || this.medicationList != undefined)
      && this.form.get('useMedication').value == 'SI') {
        // tslint:disable-next-line: prefer-for-of
        for (let x = 0; x < this.medicationList.length; x++) {
          (this.form.get('medications').get(x.toString()) as FormGroup).get('name').setValidators(Validators.required);
          (this.form.get('medications').get(x.toString()) as FormGroup).get('name').updateValueAndValidity();
        }
      }
      this.xSpineValidator = 1;
    }
  }

  ngOnInit() {
    this.addBasicControls();

    this.questions = [
      {
        label: 'Medicación',
        name: 'useMedication',
        group: 'medications'
      },
      {
        label: 'Fisioterapia',
        name: 'usePhysiotherapy',
        group: 'physiotherapys'
      },
      {
        label: 'Cirugía',
        name: 'useSurgery',
        group: 'surgeries'
      }
    ];
  }

  addBasicControls() {
    this.form.addControl('nombre', this.fb.control('', Validators.required));
    this.form.addControl('edad', this.fb.control('', [Validators.required, Validators.min(1)]));
    this.form.addControl('nombreMedico', this.fb.control('', Validators.required));
    this.form.addControl('centroSalud', this.fb.control('', Validators.required));
    this.form.addControl('telefonoCentro', this.fb.control('', Validators.required));
    this.form.addControl('dateFirstSymptoms', this.fb.control('', Validators.required));
    this.form.addControl('infoFirstSymptoms', this.fb.control('', Validators.required));
    this.form.addControl('dateFirstDiagnosis', this.fb.control('', Validators.required));

    this.form.addControl('dateLastSymptoms', this.fb.control('', Validators.required));
    this.form.addControl('frequencySymptoms', this.fb.control('', Validators.required));
    this.form.addControl('lastTwoYears', this.fb.control('', Validators.required));
    this.form.addControl('aditionalInfo', this.fb.control('', Validators.required));

    this.form.addControl('affectedSegment', this.fb.array([this.createFormArray('affectedSegment')]));
    this.affectedSegmentList = this.form.get('affectedSegment') as FormArray;

    this.form.addControl('appliedStudies', this.fb.array([this.createFormArray('appliedStudies')]));
    this.appliedStudiesList = this.form.get('appliedStudies') as FormArray;

    this.form.addControl('useMedication', this.fb.control('', Validators.required));
    this.form.addControl('usePhysiotherapy', this.fb.control('', Validators.required));
    this.form.addControl('useSurgery', this.fb.control('', Validators.required));

    if (this.form.get('medications')) {
      this.medicationList = this.form.get('medications') as FormArray;
    }

    if (this.form.get('appliedStudies')) {
      this.appliedStudiesList = this.form.get('appliedStudies') as FormArray;
    }

    if (this.form.get('physiotherapies')) {
      this.physiotherapyList = this.form.get('physiotherapies') as FormArray;
    }

    if (this.form.get('surgeries')) {
      this.surgeryList = this.form.get('surgeries') as FormArray;
    }
    if (this.form.get('affectedSegment')) {
      this.affectedSegmentList = this.form.get('affectedSegment') as FormArray;
    }

    // this.form.addControl('typeTreatment', this.fb.array([this.createFormArray('typeTreatment')]));
    // this.typesTreatmentList = this.form.get('typeTreatment') as FormArray;
  }

  createFormArray(type: string): FormGroup {
    switch (type) {
      case 'appliedStudies':
        return this.fb.group({
          type: ['', Validators.required],
          date: ['', Validators.required],
          result: ['', Validators.required],
        });
        break;

      case 'affectedSegment':
        return this.fb.group({
          segment: ['', Validators.required],
          affectedVertebra: this.fb.array([this.createFormArray('affectedVertebra')])
        });
        break;

      case 'affectedVertebra':
        return this.fb.group({
          vertebra: [''],
        });
        break;

      case 'surgeries':
        return this.fb.group({
          name: ['', Validators.required],
          segment: ['', Validators.required],
        });
        break;

      case 'physiotherapies':
        return this.fb.group({
          date: ['', Validators.required],
          quantity: ['', Validators.required],
        });
        break;

      case 'medications':
        return this.fb.group({
          name: ['', Validators.required],
          dose: ['', Validators.required],
        });
        break;

      default:
        break;
    }
  }

  addToList(list: any, type: string) {
    console.log('list: ', list);
    console.log('ADD LIST');
    list.push(this.createFormArray(type));
  }

  removeToList(index, list: any) {
    list.removeAt(index);
  }

  returnAsFormArray(formArray: any) {
    return formArray as FormArray;

  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep(panel?: string) {
    this.step++;
  }

  selectChange(event) {

    if (event.valor === 'SI') {
      switch (event.name) {
        case 'useSurgery':
          if (this.form.get('surgeries')) {
            this.form.removeControl('surgeries');
          }
          this.form.addControl('surgeries', this.fb.array([this.createFormArray('surgeries')]));
          this.surgeryList = this.form.get('surgeries') as FormArray;
          break;

        case 'usePhysiotherapy':
          if (this.form.get('physiotherapies')) {
            this.form.removeControl('physiotherapies');
          }
          this.form.addControl('physiotherapies', this.fb.array([this.createFormArray('physiotherapies')]));
          this.physiotherapyList = this.form.get('physiotherapies') as FormArray;
          break;

        case 'useMedication':
          if (this.form.get('medications')) {
            this.form.removeControl('medications');
          }
          this.form.addControl('medications', this.fb.array([this.createFormArray('medications')]));
          this.medicationList = this.form.get('medications') as FormArray;
          break;

        default:
          break;
      }
    } else if (event.valor === 'NO') {
      switch (event.name) {
        case 'useSurgery':
          this.form.removeControl('surgeries');
          this.surgeryList = undefined;
          break;

        case 'usePhysiotherapy':
          this.form.removeControl('physiotherapies');
          this.physiotherapyList = undefined;
          break;


        case 'useMedication':
          this.form.removeControl('medications');
          this.medicationList = undefined;
          break;


        default:
          break;
      }
    }
  }

}
