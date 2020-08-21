import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { DiseaseService } from '../shared/disease/disease.service';

@Component({
  selector: 'app-arthritis',
  templateUrl: './arthritis.component.html',
  styles: []
})
export class ArthritisComponent implements OnInit, DoCheck {
  @Input() form: FormGroup;
  @Input() affected: string;

  xValidators = 0;

  constructor(private fb: FormBuilder, public diseaseService: DiseaseService) { }

  questions: any[];
  @Input() showWarningDot: boolean;
  step: number;

  threatmentList: FormArray;
  surgeriesList: FormArray;

  ngDoCheck() {

    // if (this.form.get('threatments') && (this.threatmentList != null || this.threatmentList != undefined)) {
      if (this.xValidators == 0) {
        // tslint:disable-next-line: prefer-for-of
        for (let x = 0; x < this.threatmentList.length; x++) {
          (this.form.get('threatments').get(x.toString()) as FormGroup).get('name').setValidators(Validators.required);
          (this.form.get('threatments').get(x.toString()) as FormGroup).get('name').updateValueAndValidity();

          (this.form.get('threatments').get(x.toString()) as FormGroup).get('info').clearValidators();
          (this.form.get('threatments').get(x.toString()) as FormGroup).get('info').updateValueAndValidity();
        }
        this.form.get('symptons').clearValidators();
        this.form.get('symptons').updateValueAndValidity();
        this.xValidators = 1;
      }
    // }
  }

  ngOnInit() {
    this.addBasicControls();

    this.questions = [
      {
        label: '¿Sigue teniendo usted síntomas?',
        name: 'stillHaveSymptons',
        group: 'symptoms'
      },
      {
        label: '¿Ha sido operado debido a este padecimiento o está considerando ser intervenido quirúrgicamente?',
        name: 'hasBeenOperated',
        group: 'surgeries'
      }
    ];
    if (this.form.get('threatments')) {
      this.threatmentList = this.form.get('threatments') as FormArray;
    }
    if (this.form.get('surgeries')) {
      this.surgeriesList = this.form.get('surgeries') as FormArray;
    }
  }

  addBasicControls() {
    this.form.addControl('name', this.fb.control('', Validators.required));
    this.form.addControl('age', this.fb.control('', [Validators.required, Validators.min(1)]));
    this.form.addControl('doctorName', this.fb.control('', Validators.required));
    this.form.addControl('healthCenter', this.fb.control('', Validators.required));
    this.form.addControl('hcNumber', this.fb.control('', Validators.required));
    this.form.addControl('arthritisType', this.fb.control('', Validators.required));
    this.form.addControl('symptons', this.fb.control(''));
    this.form.addControl('jointsMostAffected', this.fb.control('', Validators.required));
    this.form.addControl('firstDiagnostic', this.fb.control('', Validators.required));
    this.form.addControl('stillHaveSymptons', this.fb.control('', Validators.required));
    this.form.addControl('hasBeenOperated', this.fb.control('', Validators.required));
    this.form.addControl('needAssistance', this.fb.control('', Validators.required));
    this.form.addControl('aditionalInfo', this.fb.control('', Validators.required));

    this.form.addControl('threatments', this.fb.array([this.createFormArray('threatments')]));
    this.threatmentList = this.form.get('threatments') as FormArray;
  }

  selectChange(event) {
    console.log(event);
    if (event.valor === 'SI') {
      switch (event.name) {
        case 'stillHaveSymptons':
          this.form.addControl('symptoms', this.fb.group({
            information: ['', Validators.required],
            date: ['', Validators.required],
          }));
          break;
        case 'hasBeenOperated':
          if (this.form.get('surgeries')) {
            this.form.removeControl('surgeries');
          }
          this.form.addControl('surgeries', this.fb.array([this.createFormArray('surgeries')]));
          this.surgeriesList = this.form.get('surgeries') as FormArray;
          break;

        default:
          break;
      }
    } else if (event.valor === 'NO') {
      switch (event.name) {
        case 'stillHaveSymptons':
          this.form.removeControl('symptoms');
          break;

        case 'hasBeenOperated':
          this.form.removeControl('surgeries');
          this.surgeriesList = undefined;
          break;


        default:
          break;
      }
    }
  }

  createFormArray(type: string): FormGroup {
    switch (type) {
      case 'surgeries':
        return this.fb.group({
          date: ['', Validators.required],
          surgeonName: ['', Validators.required],
          healthCenter: ['', Validators.required],
          laborLicenseTime: ['', Validators.required],
        });
        break;

      case 'threatments':
        return this.fb.group({
          name: ['', Validators.required],
          medication: ['', Validators.required],
          dose: ['', Validators.required],
          info: [''],
        });
        break;
      default:
        break;
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep(panel?: string) {
    this.step++;
  }

  addToList(list: any, type: string) {
    list.push(this.createFormArray(type));
  }

  removeToList(index, list: any) {
    list.removeAt(index);
  }
}
