import { Component, OnInit, DoCheck, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit, DoCheck {

  maxWidth: any;
  dependentsFormArray: FormArray;
  requestType = [
    {
      value: 'Suscripción para Colectivos',
      viewValue: 'Suscripción para Colectivos'
    },
    {
      value: 'Suscripción para Colectivos',
      viewValue: 'Suscripción para Colectivos'
    },
    {
      value: 'Suscripción para Colectivos',
      viewValue: 'Suscripción para Colectivos'
    }
  ];
  dependentFormGroup = {
    name:  [''],
    lastName:   [''],
    family: [''],
    weight:     [''],
    height:     [''],
    sex:        [''],
    birtday:       [''],
    student: [false],
    telUnivercity: ['']
  };

  titles =['Datos del Asegurado', 'Sección A', 'Sección B', 'Sección c']
  newRequest: FormGroup;
  dependentsNumber = 0;
  constructor(private fb: FormBuilder, public formMethods: FormArrayGeneratorService ) { }

  ngOnInit() {
    this.newRequest = this.fb.group({
      name:  [''],
      lastName:   [''],
      id:         [''],
      weight:     [''],
      sex:        [''],
      height:     [''],
      company:    [''],
      position:   [''],
      direction:  [''],
      city:       [''],
      dependentsNumber: [''],
      dependents: this.fb.array([ this.formMethods.createItem(this.dependentFormGroup)])

    });

    this.dependentsFormArray = this.newRequest.get('dependents') as FormArray;
  }
  ngDoCheck(): void {
    this.maxWidth = window.matchMedia( '(max-width: 11270px)' );
  }

  onChangeDependents() {
    const dependent = parseInt(this.newRequest.get('dependentsNumber').value, 10);
    this.dependentsFormArray = this.formMethods.onChangeForms(dependent, this.dependentFormGroup, this.dependentsFormArray );
  }

  delete(id) {
    this.dependentsFormArray = this.formMethods.deleteOneElement(this.dependentsFormArray , id).formArray;
    this.newRequest.get('dependentsNumber').setValue(this.dependentsFormArray.length);
  }
}
