import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { DiseaseService } from '../shared/disease/disease.service';

@Component({
  selector: 'app-arthritis',
  templateUrl: './arthritis.component.html',
  styles: []
})
export class ArthritisComponent implements OnInit {
  @Input() form: FormGroup;

  constructor(private fb: FormBuilder, public diseaseService: DiseaseService) { }

  questions: any[];

  threatmentList: FormArray;
  surgeriesList: FormArray;

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
    if (event.valor === 'si') {
      switch (event.name) {
        case 'stillHaveSymptons':
          this.form.addControl('symptoms', this.fb.group({
            information: ['', Validators.required],
            date: ['', Validators.required],
          }));
          break;
        case 'hasBeenOperated':
          this.form.addControl('surgeries', this.fb.array([this.createFormArray('surgeries')]));
          this.surgeriesList = this.form.get('surgeries') as FormArray;
          break;

        default:
          break;
      }
    } else if (event.valor === 'no') {
      switch (event.name) {
        case 'stillHaveSymptons':
          this.form.removeControl('symptoms');
          break;

        case 'stillHaveSymptons':
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
          info: ['', Validators.required],
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
}
