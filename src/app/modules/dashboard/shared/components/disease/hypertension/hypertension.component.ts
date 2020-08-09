import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { DiseaseService } from '../shared/disease/disease.service';

@Component({
  selector: 'app-hypertension',
  templateUrl: './hypertension.component.html',
  styles: []
})
export class HypertensionComponent implements OnInit, DoCheck {
  @Input() form: FormGroup;
  @Input() showWarningDot: boolean;
  @Input() affected: string;
  step: number;
  medicationList: FormArray;
  changedMedicationList: FormArray;

  relatedQuestions: any[];
  studiesQuestions: any[];

  todayDate = new Date();

  constructor(private fb: FormBuilder, public diseaseService: DiseaseService) { }

  ngOnInit() {
    this.addBasicControls();

    this.medicationList = this.getDIAsFormGroup().get('medicationUsing') as FormArray;
    try {
      this.changedMedicationList = this.getDIAsFormGroup().get('changedMedications') as FormArray;
    }
    catch (e) {

    }
    this.relatedQuestions = [
      {
        label: 'Enfermedad renal',
        name: 'haveRenalDisease',
        group: 'renalDiseaseInfo'
      },
      {
        label: 'Enfermedad coronaria',
        name: 'haveCoronaryHeart',
        group: 'coronaryHeartInfo'
      },
      {
        label: 'Insuficiencia cardíaca',
        name: 'haveHeartFailure',
        group: 'heartFailureInfo'
      },
      {
        label: 'Derrames cerebrales',
        name: 'haveStrokes',
        group: 'strokesInfo'
      },
      {
        label: 'Otro',
        name: 'haveOther',
        group: 'otherInfo'
      }
    ];

    this.studiesQuestions = [
      {
        label: 'Electrocardiograma',
        name: 'electrocardiogram',
        group: 'electrocardiogramInfo'
      },
      {
        label: 'Radiografía de tórax',
        name: 'chestXray',
        group: 'chestXrayInfo'
      },
      {
        label: 'Ecocardiograma',
        name: 'echocardiogram',
        group: 'echocardiogramInfo'
      },
      {
        label: 'Control de azúcar',
        name: 'sugarControl',
        group: 'sugarControlInfo'
      },
      {
        label: 'Control de lípidos en la sangre',
        name: 'bloodLipidsControl',
        group: 'bloodLipidsControlInfo'
      },
      {
        label: 'Otro',
        name: 'other',
        group: 'otherInfo'
      },
    ];

  }
  x = 0;
  ngDoCheck(): void {

    if (this.form.get('diseaseInfo').get('changedMedicationInLast12Months').value == 'si' &&
      this.x == 0 && !this.form.get('diseaseInfo').get('changedMedications')) {
      this.x++;
      // tslint:disable-next-line: align
      const var12Months = {
        valor: 'si',
        name: 'changedMedicationInLast12Months'
      };
      // tslint:disable-next-line: align
      this.selectChange(var12Months);
      // tslint:disable-next-line: align
      console.log('HolAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA changedMedications');
    }

    if (this.form.get('relatedHealthComplication').get('haveRenalDisease').value == 'si' &&
      !this.form.get('relatedHealthComplication').get('renalDiseaseInfo')) {
      const varrelatedHealthComplication1 = {
        valor: 'si',
        name: 'haveRenalDisease'
      };
      // tslint:disable-next-line: align
      this.selectChange(varrelatedHealthComplication1);
      console.log('HolAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA renalDiseaseInfo');
    }
    if (this.form.get('relatedHealthComplication').get('haveCoronaryHeart').value == 'si' &&
      !this.form.get('relatedHealthComplication').get('coronaryHeartInfo')) {
      const varrelatedHealthComplication2 = {
        valor: 'si',
        name: 'haveCoronaryHeart'
      };
      // tslint:disable-next-line: align
      this.selectChange(varrelatedHealthComplication2);
      console.log('HolAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA coronaryHeartInfo');
    }
    if (this.form.get('relatedHealthComplication').get('haveHeartFailure').value == 'si' &&
      !this.form.get('relatedHealthComplication').get('heartFailureInfo')) {
      const varrelatedHealthComplication3 = {
        valor: 'si',
        name: 'haveHeartFailure'
      };
      // tslint:disable-next-line: align
      this.selectChange(varrelatedHealthComplication3);
      console.log('HolAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA heartFailureInfo');
    }
    if (this.form.get('relatedHealthComplication').get('haveStrokes').value == 'si' &&
      !this.form.get('relatedHealthComplication').get('strokesInfo')) {
      const varrelatedHealthComplication4 = {
        valor: 'si',
        name: 'haveStrokes'
      };
      // tslint:disable-next-line: align
      this.selectChange(varrelatedHealthComplication4);
      console.log('HolAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA strokesInfo');
    }
    if (this.form.get('relatedHealthComplication').get('haveOther').value == 'si' &&
      !this.form.get('relatedHealthComplication').get('otherInfo')) {
      const varrelatedHealthComplication5 = {
        valor: 'si',
        name: 'haveOther'
      };
      // tslint:disable-next-line: align
      this.selectChange(varrelatedHealthComplication5);
      console.log('HolAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA otherInfo');
    }

    if (this.form.get('diagnosticStudies').get('electrocardiogram').value == 'si' &&
      !this.form.get('diagnosticStudies').get('electrocardiogramInfo')) {
      const vardiagnosticStudies1 = {
        valor: 'si',
        name: 'electrocardiogram'
      };
      // tslint:disable-next-line: align
      this.selectChange(vardiagnosticStudies1);
      console.log('HolAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA electrocardiogramInfo');
    }
    if (this.form.get('diagnosticStudies').get('chestXray').value == 'si' &&
      !this.form.get('diagnosticStudies').get('chestXrayInfo')) {
      const vardiagnosticStudies2 = {
        valor: 'si',
        name: 'chestXray'
      };
      // tslint:disable-next-line: align
      this.selectChange(vardiagnosticStudies2);
      console.log('HolAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA chestXrayInfo');
    }
    if (this.form.get('diagnosticStudies').get('echocardiogram').value == 'si' &&
      !this.form.get('diagnosticStudies').get('echocardiogramInfo')) {
      const vardiagnosticStudies3 = {
        valor: 'si',
        name: 'echocardiogram'
      };
      // tslint:disable-next-line: align
      this.selectChange(vardiagnosticStudies3);
      console.log('HolAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA echocardiogramInfo');
    }
    if (this.form.get('diagnosticStudies').get('sugarControl').value == 'si' &&
      !this.form.get('diagnosticStudies').get('sugarControlInfo')) {
      const vardiagnosticStudies4 = {
        valor: 'si',
        name: 'sugarControl'
      };
      // tslint:disable-next-line: align
      this.selectChange(vardiagnosticStudies4);
      console.log('HolAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA sugarControlInfo');
    }
    if (this.form.get('diagnosticStudies').get('bloodLipidsControl').value == 'si' &&
      !this.form.get('diagnosticStudies').get('bloodLipidsControlInfo')) {
      const vardiagnosticStudies5 = {
        valor: 'si',
        name: 'bloodLipidsControl'
      };
      // tslint:disable-next-line: align
      this.selectChange(vardiagnosticStudies5);
      console.log('HolAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA bloodLipidsControlInfo');
    }
    if (this.form.get('diagnosticStudies').get('other').value == 'si' &&
      !this.form.get('diagnosticStudies').get('otherInfo')) {
      const vardiagnosticStudies5 = {
        valor: 'si',
        name: 'other'
      };
      // tslint:disable-next-line: align
      this.selectChange(vardiagnosticStudies5);
      console.log('HolAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA otherInfo2');
    }
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep(panel?: string) {
    this.step++;
  }
  addBasicControls() {
    this.form.addControl('personInfo', this.fb.group({
      doctorName: ['', Validators.required],
      healthCenter: ['', Validators.required],
      hcNumber: ['', Validators.required],
    }));
    this.form.addControl('diseaseInfo', this.fb.group({
      dateDiagnostic: ['', Validators.required],
      changedMedicationInLast12Months: ['', Validators.required],
      neededHospitalization: ['', Validators.required],
      consultationFrequency: ['', Validators.required],
      lastConsultationDate: ['', Validators.required],
      lastConsultationResults: ['', Validators.required],
      aditionalInfo: ['', Validators.required],
      medicationUsing: this.fb.array([this.createFormArray('medication')])
    }));
    this.form.addControl('relatedHealthComplication', this.fb.group({
      haveRenalDisease: ['', Validators.required],
      haveCoronaryHeart: ['', Validators.required],
      haveHeartFailure: ['', Validators.required],
      haveStrokes: ['', Validators.required],
      haveOther: ['', Validators.required],
    }));
    this.form.addControl('diagnosticStudies', this.fb.group({
      electrocardiogram: ['', Validators.required],
      chestXray: ['', Validators.required],
      echocardiogram: ['', Validators.required],
      sugarControl: ['', Validators.required],
      bloodLipidsControl: ['', Validators.required],
      other: ['', Validators.required],
    }));
  }

  createFormArray(type: string): FormGroup {
    switch (type) {
      case 'medication':
        return this.fb.group({
          medication: ['', Validators.required],
          dose: ['', Validators.required],
        });
        break;

      default:
        break;
    }
  }

  selectChange(event) {
    if (event.valor === 'SI') {
      switch (event.name) {
        case 'changedMedicationInLast12Months':
          this.getDIAsFormGroup().addControl('changedMedications', this.fb.array([this.createFormArray('medication')]));
          this.changedMedicationList = this.getDIAsFormGroup().get('changedMedications') as FormArray;
          break;

        case 'haveRenalDisease':
          this.getRHCAsFormGroup().addControl('renalDiseaseInfo', this.relatedHealthGroup());
          break;

        case 'haveCoronaryHeart':
          this.getRHCAsFormGroup().addControl('coronaryHeartInfo', this.relatedHealthGroup());
          break;

        case 'haveHeartFailure':
          this.getRHCAsFormGroup().addControl('heartFailureInfo', this.relatedHealthGroup());
          break;

        case 'haveStrokes':
          this.getRHCAsFormGroup().addControl('strokesInfo', this.relatedHealthGroup());
          break;

        case 'haveOther':
          this.getRHCAsFormGroup().addControl('otherInfo', this.relatedHealthGroupOther());
          break;

        case 'electrocardiogram':
          this.getDSAsFormGroup().addControl('electrocardiogramInfo', this.diagnoticStudiesGroup());
          break;

        case 'chestXray':
          this.getDSAsFormGroup().addControl('chestXrayInfo', this.diagnoticStudiesGroup());
          break;

        case 'echocardiogram':
          this.getDSAsFormGroup().addControl('echocardiogramInfo', this.diagnoticStudiesGroup());
          break;

        case 'sugarControl':
          this.getDSAsFormGroup().addControl('sugarControlInfo', this.diagnoticStudiesGroup());
          break;

        case 'bloodLipidsControl':
          this.getDSAsFormGroup().addControl('bloodLipidsControlInfo', this.diagnoticStudiesGroup());
          break;

        case 'other':
          this.getDSAsFormGroup().addControl('otherInfo', this.diagnoticStudiesGroupOther());
          break;
        default:
          break;
      }
    } else if (event.valor === 'NO') {
      switch (event.name) {

        case 'changedMedicationInLast12Months':
          this.getDIAsFormGroup().removeControl('changedMedications');
          this.changedMedicationList = undefined;
          break;

        case 'haveRenalDisease':
          this.getRHCAsFormGroup().removeControl('renalDiseaseInfo');
          break;

        case 'haveCoronaryHeart':
          this.getRHCAsFormGroup().removeControl('coronaryHeartInfo');
          break;

        case 'haveHeartFailure':
          this.getRHCAsFormGroup().removeControl('heartFailureInfo');
          break;

        case 'haveStrokes':
          this.getRHCAsFormGroup().removeControl('strokesInfo');
          break;

        case 'haveOther':
          this.getRHCAsFormGroup().removeControl('otherInfo');
          break;

        case 'electrocardiogram':
          this.getDSAsFormGroup().removeControl('electrocardiogramInfo');
          break;

        case 'chestXray':
          this.getDSAsFormGroup().removeControl('chestXrayInfo');
          break;

        case 'echocardiogram':
          this.getDSAsFormGroup().removeControl('echocardiogramInfo');
          break;

        case 'sugarControl':
          this.getDSAsFormGroup().removeControl('sugarControlInfo');
          break;

        case 'bloodLipidsControl':
          this.getDSAsFormGroup().removeControl('bloodLipidsControlInfo');
          break;

        case 'other':
          this.getDSAsFormGroup().removeControl('otherInfo');
          break;

        default:
          break;
      }
    }
  }

  relatedHealthGroup() {
    return this.fb.group({
      specify: ['', Validators.required]
    });
  }

  relatedHealthGroupOther() {
    return this.fb.group({
      type: ['', Validators.required],
      specify: ['', Validators.required]
    });
  }

  diagnoticStudiesGroup() {
    return this.fb.group({
      date: ['', Validators.required],
      results: ['', Validators.required],
    });
  }

  diagnoticStudiesGroupOther() {
    return this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      results: ['', Validators.required],
    });
  }

  addToList(list: any, type: string) {
    list.push(this.createFormArray(type));
  }


  getRHCAsFormGroup() {
    const form = this.form.get('relatedHealthComplication') as FormGroup;

    return form;
  }

  getDIAsFormGroup() {
    const form = this.form.get('diseaseInfo') as FormGroup;

    return form;
  }

  getDSAsFormGroup() {
    const form = this.form.get('diagnosticStudies') as FormGroup;

    return form;
  }
}
