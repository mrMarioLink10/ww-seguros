import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';

@Component({
  selector: 'app-renal-urinary',
  templateUrl: './renal-urinary.component.html',
  styles: []
})
// tslint:disable: variable-name
export class RenalUrinaryComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() showWarningDot: boolean;
  @Input() affected: string;

  step: number;

  todayDate = new Date();

  accordionTitles = ['Datos'];

  yes_no: FieldConfig = {
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

  // form:FormGroup;
  analysisFormArray: FormArray;
  medicineOperationFormArray: FormArray;
  analysis_property;
  medicine_property;

  selectChange(event: any) {

    const form = this.form.get('data').get('analysis') as FormGroup;
    const formM = this.form.get('data').get('medicine') as FormGroup;
    const formD = this.form.get('data') as FormGroup;

    if (event.valor === 'SI') {
      switch (event.name) {
        case 'medical_consultation_radio':
          formD.addControl('medical_consultation', this.fb.group({
            date: [new Date(), Validators.required],
            frequency: ['', Validators.required],
          }));
          console.log(JSON.stringify(this.form.value));
          break;

        case 'analysis_radio':
          form.addControl('analysis_array', this.fb.array([this.createFormArray('analysis_array')]));
          this.analysisFormArray = this.form.get('data').get('analysis').get('analysis_array') as FormArray;
          console.log(JSON.stringify(this.form.value));
          break;

        case 'medication_radio':
          formM.addControl('medicine_array', this.fb.array([this.createFormArray('medicine_array')]));
          this.medicineOperationFormArray = this.form.get('data').get('medicine').get('medicine_array') as FormArray;
          console.log(JSON.stringify(this.form.value));
          break;
      }
    } else if (event.valor === 'NO') {
      switch (event.name) {
        case 'analysis_radio':
          form.removeControl('analysis_array');
          this.analysisFormArray = undefined;
          break;

        case 'medication_radio':
          formM.removeControl('medicine_array');
          this.medicineOperationFormArray = undefined;
          break;

        case 'medical_consultation_radio':
          formD.removeControl('medical_consultation');
          break;
      }
    }
  }

  createFormArray(name: string) {
    switch (name) {
      case 'analysis_array':
        return this.fb.group({
          type: ['', Validators.required],
          date: [new Date(), Validators.required],
          results: ['', Validators.required]
        });
        break;

      case 'medicine_array':
        return this.fb.group({
          medicine: ['', Validators.required],
          dose: ['', Validators.required],
          medical_procedure: ['', Validators.required],
          date: ['', Validators.required],
        });
        break;
    }
  }

  constructor(private fb: FormBuilder, public formMethods: FormArrayGeneratorService) { }

  ngOnInit() {
    this.analysis_property = this.fb.array([this.createFormArray('analysis_array')]);
    this.medicine_property = this.fb.array([this.createFormArray('medicine_array')]);

    this.addBasicControls();
    if (this.form.get('data') &&
      this.form.get('data').get('analysis') &&
      this.form.get('data').get('analysis').get('analysis_array')) {
      this.analysisFormArray = this.form.get('data').get('analysis').get('analysis_array') as FormArray;
    } if (
      this.form.get('data') &&
      this.form.get('data').get('medicine') &&
      this.form.get('data').get('medicine').get('medicine_array')) {
      this.medicineOperationFormArray = this.form.get('data').get('medicine').get('medicine_array') as FormArray;
    }
  }

  addBasicControls() {

    this.form.addControl('doctor_name', this.fb.control('', Validators.required));
    this.form.addControl('hospital_name', this.fb.control('', Validators.required));
    this.form.addControl('hospital_telephone', this.fb.control('', Validators.required));

    this.form.addControl('data', this.fb.group({

      diagnosis: this.fb.group({
        input: ['', Validators.required],
        date: [new Date(), Validators.required]
      }),

      symptom: this.fb.group({
        input: ['', Validators.required],
        date: [new Date(), Validators.required],
        duration: ['', Validators.required]
      }),

      last_time_symptom: this.fb.group({
        date: [new Date(), Validators.required]
      }),

      analysis_radio: [''],
      analysis: this.fb.group({

      }),

      medication_radio: [''],
      medicine: this.fb.group({

      }),

      medical_consultation_radio: ['']

    })

    );

  }

  addFormArray(array: any, name: string) {

    // const increment = array.length + 1;
    // array = this.formMethods.addElement(array, increment, this.createFormArray(name)).formArray;
    array.push(this.createFormArray(name));
    // console.log(JSON.stringify(this.form.value));
    // array.push(this.createFormArray(name));

  }

  removeFormArray(index, array: any) {
    array.removeAt(index);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep(panel?: string) {
    this.step++;
  }

}
