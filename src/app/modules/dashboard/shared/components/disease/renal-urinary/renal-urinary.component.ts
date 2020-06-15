import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';

@Component({
  selector: 'app-renal-urinary',
  templateUrl: './renal-urinary.component.html',
  styles: []
})
export class RenalUrinaryComponent implements OnInit {

  @Input() form: FormGroup;

  todayDate = new Date();

  accordionTitles = ["Datos"];

  yes_no: FieldConfig = {
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

  // form:FormGroup;
  analysisFormArray: FormArray;
  medicineOperationFormArray: FormArray;
  analysis_property;
  medicine_property;

  selectChange(event: any) {

    const form = this.form.get('data').get('analysis') as FormGroup;
    const formM = this.form.get('data').get('medicine') as FormGroup;
    const formD = this.form.get('data') as FormGroup;


    if (event.valor === 'si') {
      switch (event.name) {

        case 'analysis_radio':

          form.addControl('analysis_array', this.analysis_property);
          this.analysisFormArray = this.form.get('data').get('analysis').get('analysis_array') as FormArray;
          console.log(JSON.stringify(this.form.value));

          break;

        case 'medication_radio':

          formM.addControl('medicine_array', this.medicine_property);
          this.medicineOperationFormArray = this.form.get('data').get('medicine').get('medicine_array') as FormArray;
          console.log(JSON.stringify(this.form.value));

          break;

        case 'medical_consultation_radio':

          formD.addControl('medical_consultation', this.fb.group({
            date: [new Date(), Validators.required],
            frequency: ['', Validators.required],
          }));
          console.log(JSON.stringify(this.form.value));

          break;

      }

    }
    else if (event.valor === 'no') {

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

          formD.removeControl('medical_consultation')
          break;

      }

    }

  }

  analysisGroup = {
    type: ['', Validators.required],
    date: [new Date(), Validators.required],
    results: ['', Validators.required]
  }

  medicineGroup = {

    medicine: ['', Validators.required],
    dose: ['', Validators.required],
    medical_procedure: ['', Validators.required],
    date: ['', Validators.required],

  }

  createFormArray(name: string) {

    switch (name) {

      case 'analysis_array':

        return this.analysisGroup;
        break;

      case 'medicine_array':

        return this.medicineGroup;
        break;

    }

  }

  constructor(private fb: FormBuilder, public formMethods: FormArrayGeneratorService,) { }

  ngOnInit() {

    this.analysis_property = this.fb.array([this.formMethods.createItem(this.analysisGroup)]);
    this.medicine_property = this.fb.array([this.formMethods.createItem(this.medicineGroup)])

    this.addBasicControls();

    // this.form= this.fb.group({
    //   full_name: ['', Validators.required],
    //   age:['',[ Validators.required, Validators.min(1)] ],
    //   doctor_name: ['', Validators.required],
    //   hospital_name:['', Validators.required],
    //   hospital_telephone:['', Validators.required],

    //   data: this.fb.group({

    //     diagnosis: this.fb.group({
    //       input: ['', Validators.required],
    //       date:[new Date(), Validators.required]
    //     }),

    //     symptom: this.fb.group({
    //       input: ['', Validators.required],
    //       date:[new Date(), Validators.required],
    //       duration:['', Validators.required]
    //     }),

    //     last_time_symptom: this.fb.group({

    //       date: [new Date(), Validators.required]

    //     }),

    //     analysis_radio: [''],
    //     analysis:  this.fb.group({

    //         analysis_array: this.fb.array([this.formMethods.createItem(this.analysisGroup)])

    //     }),

    //     medication_radio: [''],
    //     medicine: this.fb.group({ 

    //       medicine_array: this.fb.array([this.formMethods.createItem(this.medicineGroup)])

    //     }),

    //     medical_consultation_radio:['']

    //   })

    // })

    // console.log(JSON.stringify(this.form.value));

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

        analysis_array: this.fb.array([this.formMethods.createItem(this.analysisGroup)])

      }),

      medication_radio: [''],
      medicine: this.fb.group({

        medicine_array: this.fb.array([this.formMethods.createItem(this.medicineGroup)])

      }),

      medical_consultation_radio: ['']

    })

    );

  }

  addFormArray(array: any, name: string) {

    const increment = array.length + 1;
    array = this.formMethods.addElement(array, increment, this.createFormArray(name)).formArray;

    console.log(JSON.stringify(this.form.value));
    // array.push(this.createFormArray(name));

  }

  removeFormArray(index, array: any) {
    array.removeAt(index);
  }

}
