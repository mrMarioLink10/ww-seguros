import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {PolicyFilter} from '../../models/policy';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-policy-filter',
  templateUrl: './policy-filter.component.html',
  styleUrls: ['./policy-filter.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
    ]
})
export class PolicyFilterComponent implements OnInit {

  @Output() filters = new EventEmitter<PolicyFilter>();

  filterForm = this.fb.group({
    clientName: [''],
    policyId: [''],
    paymentState: [''],
    initialDate: [''],
    endDate: [''],
    insuranceType: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  sendFormToParent() {
    const formValue = this.filterForm.value;

    console.log('FORM VALUE: ', formValue);
    const initialDate = formValue.initialDate._i;
    const endDate = formValue.endDate._i;

    const filter: PolicyFilter = {
      id: formValue.policyId,
      clientName: formValue.clientName,
      paymentState: formValue.paymentState,
      insuranceType: formValue.insuranceType,
      initialDate: initialDate ? `${initialDate.date}/${initialDate.month + 1}/${initialDate.year}` : '',
      endDate: endDate ? `${endDate.date}/${endDate.month + 1}/${endDate.year}` : ''
    };
    console.log('FILTER VALUE: ', filter);

    this.filters.emit(filter);
  }

}
