import { Component, OnInit, DoCheck } from '@angular/core';
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
  
  dependents = [0];
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
    this.incrementDependent();
    this.maxWidth = window.matchMedia( '(max-width: 11270px)' );
  }

  createItem(): FormGroup {
    return this.fb.group({
      name:  [''],
      lastName:   [''],
      weight:     [''],
      height:     [''],
      univercity: [''],
      sex:        [''],
      telUnivercity: ['']
    });
  }
  dependent(): void {
    this.items = this.newRequest.get('dependents') as FormArray;
    this.items.push(this.createItem());
  }

  incrementDependent() {
    const dependent = parseInt(this.newRequest.get('dependentsNumber').value, 10);
    if (dependent !== 0) {
      this.dependents.forEach(() => {
        if (dependent < this.dependents.length ) {
          this.dependents.pop();
        } else if (dependent > this.dependents.length) {
          this.dependents.push(0);
        }
      });
    }
  }
}
