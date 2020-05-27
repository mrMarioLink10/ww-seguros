import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-policy-filter',
  templateUrl: './policy-filter.component.html',
  styleUrls: ['./policy-filter.component.scss']
})
export class PolicyFilterComponent implements OnInit {

  filterForm = this.fb.group({
    clientName: [''],
    policy: [''],
    paymentState: [''],
    initialDate: [''],
    endDate: [''],
    insuranceType: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  sendFormToParent() {
    console.log('FORM VALUE: ', this.filterForm.value);
  }

}
