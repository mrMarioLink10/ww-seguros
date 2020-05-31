import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {PolicyFilter} from '../../models/policy';
import {MY_FORMATS} from '../../models/date-format';

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

    const initialDate = formValue.initialDate;
    const endDate = formValue.endDate;

    const filter: PolicyFilter = {
      id: formValue.policyId ? formValue.policyId.toString() : '',
      clientName: formValue.clientName ? formValue.clientName.toString() : '',
      paymentState: formValue.paymentState ? formValue.paymentState.toString() : '',
      insuranceType: formValue.insuranceType ? formValue.insuranceType.toString() : '',
      initialDate: initialDate ? `${initialDate._i.date}/${initialDate._i.month + 1}/${initialDate._i.year}` : '',
      endDate: endDate ? `${endDate._i.date}/${endDate._i.month + 1}/${endDate._i.year}` : ''
    };

    this.filters.emit(filter);
  }

  resetForm() {
    this.filterForm.reset();
    this.sendFormToParent();
  }

}
