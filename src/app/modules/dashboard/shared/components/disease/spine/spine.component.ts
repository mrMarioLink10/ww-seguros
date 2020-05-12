import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';

@Component({
  selector: 'app-spine',
  templateUrl: './spine.component.html',
  styles: []
})
export class SpineComponent implements OnInit {
  @Input() form: FormGroup;

  accordionTitle = ['Datos'];

  appliedStudiesList: FormArray;

  medicationList: FormArray;
  physiotherapyList: FormArray;
  surgeryList: FormArray;

  segments: FieldConfig = {
    name: 'affectedSegment',
    label: 'Segmento Afectado',
    options: [
      { viewValue: 'Cervical', value: 'cervical' },
      { viewValue: 'Torácico', value: 'toracico' },
      { viewValue: 'Lumbar', value: 'lumbar' },
      { viewValue: 'Sacro', value: 'sacro' },

    ]
  };

  studiesType: FieldConfig = {
    name: 'type',
    label: 'Tipo de Estudio',
    options: [
      { viewValue: 'Radiografía', value: 'radiografia' },
      { viewValue: 'Tomografía', value: 'tomografia' },
      { viewValue: 'Resonancia Magnética', value: 'resonancia magnetica' },
      { viewValue: 'Otro', value: 'otro' },

    ]
  };

  yesOrNo: FieldConfig = {
    label: '¿Ha tenido episodios en los últimos 2 años?',
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

  yesOrNoOriginal: FieldConfig = {
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

  questions: any[];

  constructor(private fb: FormBuilder) { }

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
    this.form.addControl('affectedSegment', this.fb.control('', Validators.required));
    this.form.addControl('affectedVertebra', this.fb.control('', Validators.required));
    this.form.addControl('dateLastSymptoms', this.fb.control('', Validators.required));
    this.form.addControl('frequencySymptoms', this.fb.control('', Validators.required));
    this.form.addControl('lastTwoYears', this.fb.control('', Validators.required));
    this.form.addControl('aditionalInfo', this.fb.control('', Validators.required));

    this.form.addControl('appliedStudies', this.fb.array([this.createFormArray('appliedStudies')]));
    this.appliedStudiesList = this.form.get('appliedStudies') as FormArray;

    this.form.addControl('useMedication', this.fb.control('', Validators.required));
    this.form.addControl('usePhysiotherapy', this.fb.control('', Validators.required));
    this.form.addControl('useSurgery', this.fb.control('', Validators.required));


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
    list.push(this.createFormArray(type));
  }

  removeToList(index, list: any) {
    list.removeAt(index);
  }

  selectChange(event) {
    console.log(event);
    if (event.valor === 'si') {
      switch (event.name) {
        case 'useSurgery':
          this.form.addControl('surgeries', this.fb.array([this.createFormArray('surgeries')]));
          this.surgeryList = this.form.get('surgeries') as FormArray;
          break;

        case 'usePhysiotherapy':
          this.form.addControl('physiotherapies', this.fb.array([this.createFormArray('physiotherapies')]));
          this.physiotherapyList = this.form.get('physiotherapies') as FormArray;
          break;

        case 'useMedication':
          this.form.addControl('medications', this.fb.array([this.createFormArray('medications')]));
          this.medicationList = this.form.get('medications') as FormArray;
          break;

        default:
          break;
      }
    } else if (event.valor === 'no') {
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
