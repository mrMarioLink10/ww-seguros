import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-subscription-request',
  templateUrl: './new-subscription-request.component.html',
  styleUrls: ['./new-subscription-request.component.scss']
})
export class NewSubscriptionRequestComponent implements OnInit {
  requestType = [
    {
      value: 'Cambio de plan',
      viewValue: 'Cambio de plan',
    }
  ];
  requestTypeOptions: FieldConfig =
   {
    label: 'Tipo de Solicitud',
    options: this.requestType,
    name: 'requestType',
    type: 'select'
   };

   costNumber: FieldConfig = {
    label: 'Tipo de Solicitud',
    options: this.requestType
   }

   newRequest: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.newRequest = this.fb.group({
      requestType: [''],
      NoC: [''],
      // name:  ['', Validators.required],
      // lastName:   [''],
      // id:         [''],
      // weight:     [''],
      // sex:        [''],
      // height:     [''],
      // company:    [''],
      // position:   [''],
      // direction:  [''],
      // city:       [''],
      // dependentsNumber: ['']

    });
  }
}
