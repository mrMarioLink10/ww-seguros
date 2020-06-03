import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { DiseaseService } from '../shared/disease/disease.service';

@Component({
  selector: 'app-mellitus-diabetes',
  templateUrl: './mellitus-diabetes.component.html',
  styles: []
})
export class MellitusDiabetesComponent implements OnInit {
  @Input() form: FormGroup;

  oralMedicationList: FormArray;
  insulinList: FormArray;
  bloodGlucoseAnalysisList: FormArray;
  orineGlucoseAnalysisList: FormArray;
  hbA1cResultsList: FormArray;
  hospitalizedList: FormArray;

  threatmentQuestions: any[];
  disordersQuestions: any[];

  diabetesType = {
    label: 'Tipo de diabetes',
    options: [
      {
        value: 'Diabetes mellitus Tipo 1',
        viewValue: 'Diabetes mellitus Tipo 1'
      },
      {
        value: 'Diabetes mellitus Tipo 2 ',
        viewValue: 'Diabetes mellitus Tipo 2 '
      },
      {
        value: 'Intolerancia a la glucosa',
        viewValue: 'Intolerancia a la glucosa'
      },
      {
        value: 'Diabetes gestacional',
        viewValue: 'Diabetes gestacional'
      },
      {
        value: 'Diabetes secundaria',
        viewValue: 'Diabetes secundaria'
      },
      {
        value: 'Otra',
        viewValue: 'Otra'
      }
    ],
    name: 'diabetesType'
  };

  informationGroup() {
    return this.fb.group({
      information: ['', Validators.required],
    });
  }
  constructor(private fb: FormBuilder, public diseaseService: DiseaseService) { }

  ngOnInit() {
    this.addBasicControls();

    this.threatmentQuestions = [
      {
        label: 'a. ¿Toma Ud. medicamentos orales?',
        name: 'takeOralMedication',
        group: 'oralMedications',
        list: this.oralMedicationList
      },
      {
        label: 'b. ¿Usa Ud. insulina?',
        name: 'useInsulin',
        group: 'insulin',
        list: this.insulinList
      }
    ];

    this.disordersQuestions = [
      {
        label: 'a. Proteinuria o albuminuria',
        name: 'haveProteinuriaAlbuminuria',
        group: 'proteinuriaAlbuminuria',
      },
      {
        label: 'b. Problemas de los ojos',
        name: 'haveEyesProblems',
        group: 'eyesProblems',
      },
      {
        label: 'c. Entumecimiento u hormigueo en los brazos, manos, piernas o pies',
        name: 'haveNumbness',
        group: 'numbness',
      },
      {
        label: 'd. Tensión arterial alta',
        name: 'haveHighBloodPressure',
        group: 'highBloodPressure',
      },
      {
        label: 'e. Problemas cardíacos o circulatorios',
        name: 'haveHeartCirculatory',
        group: 'heartCirculatory',
      },
      {
        label: 'f. Problemas renales',
        name: 'haveRenalProblems',
        group: 'renalProblems',
      }
    ];
  }

  addBasicControls() {
    this.form.addControl('name', this.fb.control('', Validators.required));
    this.form.addControl('dateFirstDiagnostic', this.fb.control('', Validators.required));
    this.form.addControl('diabetesType', this.fb.control('', Validators.required));
    this.form.addControl('diabetesOther', this.fb.control('', Validators.required));
    this.form.addControl('takeOralMedication', this.fb.control('', Validators.required));
    this.form.addControl('useInsulin', this.fb.control('', Validators.required));
    this.form.addControl('bloodGlucoseChecking', this.fb.control('', Validators.required));
    this.form.addControl('medicChecking', this.fb.control('', Validators.required));
    this.form.addControl('dateLastConsultation', this.fb.control('', Validators.required));
    this.form.addControl('doctorName', this.fb.control('', Validators.required));
    this.form.addControl('doctorCenter', this.fb.control('', Validators.required));
    this.form.addControl('doctorCenterAdress', this.fb.control(''));
    this.form.addControl('everHospitalized', this.fb.control('', Validators.required));
    this.form.addControl('haveProteinuriaAlbuminuria', this.fb.control('', Validators.required));
    this.form.addControl('haveEyesProblems', this.fb.control('', Validators.required));
    this.form.addControl('haveNumbness', this.fb.control('', Validators.required));
    this.form.addControl('haveHighBloodPressure', this.fb.control('', Validators.required));
    this.form.addControl('haveHeartCirculatory', this.fb.control('', Validators.required));
    this.form.addControl('haveRenalProblems', this.fb.control('', Validators.required));
    this.form.addControl('haveSickLeave', this.fb.control('', Validators.required));
    this.form.addControl('aditionalInfo', this.fb.control('', Validators.required));

    this.form.addControl('bloodGlucoseAnalysis', this.fb.array([this.createFormArray('analysis')]));
    this.bloodGlucoseAnalysisList = this.form.get('bloodGlucoseAnalysis') as FormArray;

    this.form.addControl('orineGlucoseAnalysis', this.fb.array([this.createFormArray('analysis')]));
    this.orineGlucoseAnalysisList = this.form.get('orineGlucoseAnalysis') as FormArray;

    this.form.addControl('hbA1cResults', this.fb.array([this.createFormArray('analysis')]));
    this.hbA1cResultsList = this.form.get('hbA1cResults') as FormArray;
  }

  selectChange(event) {
    console.log(event);
    if (event.valor === 'si') {
      switch (event.name) {
        case 'haveProteinuriaAlbuminuria':
          this.form.addControl('proteinuriaAlbuminuria', this.informationGroup());
          break;

        case 'haveEyesProblems':
          this.form.addControl('eyesProblems', this.informationGroup());
          break;

        case 'haveNumbness':
          this.form.addControl('numbness', this.informationGroup());
          break;

        case 'haveHighBloodPressure':
          this.form.addControl('highBloodPressure', this.informationGroup());
          break;

        case 'haveHeartCirculatory':
          this.form.addControl('heartCirculatory', this.informationGroup());
          break;

        case 'haveRenalProblems':
          this.form.addControl('renalProblems', this.informationGroup());
          break;

        case 'takeOralMedication':
          this.form.addControl('oralMedications', this.fb.array([this.createFormArray('threatment')]));
          this.oralMedicationList = this.form.get('oralMedications') as FormArray;
          break;

        case 'useInsulin':
          this.form.addControl('insulin', this.fb.array([this.createFormArray('threatment')]));
          this.insulinList = this.form.get('insulin') as FormArray;
          break;

        case 'everHospitalized':
          this.form.addControl('hospitalizedInfo', this.fb.array([this.createFormArray('hospitalized')]));
          this.hospitalizedList = this.form.get('hospitalizedInfo') as FormArray;
          break;
        default:
          break;
      }
    } else if (event.valor === 'no') {
      switch (event.name) {
        case 'haveProteinuriaAlbuminuria':
          this.form.removeControl('proteinuriaAlbuminuria');
          break;

        case 'haveEyesProblems':
          this.form.removeControl('eyesProblems');
          break;

        case 'haveNumbness':
          this.form.removeControl('numbness');
          break;

        case 'haveHighBloodPressure':
          this.form.removeControl('highBloodPressure');
          break;

        case 'haveHeartCirculatory':
          this.form.removeControl('heartCirculatory');
          break;

        case 'haveRenalProblems':
          this.form.removeControl('renalProblems');
          break;

        case 'takeOralMedication':
          this.form.removeControl('oralMedications');
          this.oralMedicationList = undefined;
          break;

        case 'useInsulin':
          this.form.removeControl('insulin');
          this.insulinList = undefined;
          break;

        case 'everHospitalized':
          this.form.removeControl('hospitalizedInfo');
          this.hospitalizedList = undefined;
          break;
        default:
          break;
      }
    }
  }

  createFormArray(type: string): FormGroup {
    switch (type) {
      case 'threatment':
        return this.fb.group({
          medication: ['', Validators.required],
          dose: ['', Validators.required],
          quantity: ['', [Validators.required, Validators.min(1)]],
        });
        break;

      case 'analysis':
        return this.fb.group({
          results: ['', Validators.required],
          date: ['', Validators.required],
        });
        break;

      case 'hospitalized':
        return this.fb.group({
          date: ['', Validators.required],
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
