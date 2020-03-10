import { Component, OnInit, DoCheck, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit, DoCheck {

  maxWidth: any;
  items;

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

  titles =['Datos del Asegurado', 'Sección A', 'Sección B', 'Sección c']
  newRequest: FormGroup;
  dependentsNumber = 0;
  constructor(private fb: FormBuilder) { }

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
      dependents: this.fb.array([ this.createItem() ])

    });
  }
  ngDoCheck(): void {
    this.maxWidth = window.matchMedia( '(max-width: 11270px)' );
    console.log(this.newRequest)
  }

  createItem(): FormGroup {
    return this.fb.group({
      name:  [''],
      lastName:   [''],
      family: [''],
      weight:     [''],
      height:     [''],
      sex:        [''],
      birtday:       [''],
      student: [false],
      univercity: [''],
      telUnivercity: ['']
    });
  }

  deleteDependent(id) {
    const dependent = parseInt(this.newRequest.get('dependentsNumber').value, 10);
    this.t.removeAt(id);
    if (dependent > 0) {
      this.newRequest.get('dependentsNumber').setValue(dependent - 1)
    }
  }

  get t() { return this.newRequest.get('dependents') as FormArray; }

  onChangeDependents() {
    const dependent = parseInt(this.newRequest.get('dependentsNumber').value, 10);

    if (this.t.length < dependent) {
      for (let i = this.t.length; i < dependent; i++) {
        this.t.push(this.createItem());
      }
    } else {
      for (let i = this.t.length; i >= dependent; i--) {
        this.deleteDependent(i);
      }
    }
  }
}
