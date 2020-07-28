import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BillFilter } from '../../models/bill';
import { MY_FORMATS } from '../../models/date-format';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-bills-filter-consult',
  templateUrl: './bills-filter-consult.component.html',
  styleUrls: ['./bills-filter-consult.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class BillsFilterConsultComponent implements OnInit {
  @Output() filters = new EventEmitter<BillFilter>();

  policyId;

  filterFormConsult = this.fb.group({
    billId: [''],
    policyId: [''],
    paymentState: [''],
    initialDate: [''],
    endDate: [''],
    clientName: ['']
  });


  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.policyId = this.activatedRoute.snapshot.paramMap.get('policyId');
  }

  ngOnInit() {
    this.filterFormConsult.get('policyId').setValue(this.policyId);
    this.filterFormConsult.get('policyId').disable();
    this.sendFormToParent();
  }

  sendFormToParent() {
    const formValue = this.filterFormConsult.value;

    const initialDate = formValue.initialDate;
    const endDate = formValue.endDate;

    const filter: BillFilter = {
      policyId: this.policyId ? this.policyId : this.policyId,
      billId: formValue.billId ? formValue.billId : '',
      clientName: formValue.clientName ? formValue.clientName : '',
      paymentState: formValue.paymentState ? formValue.paymentState : '',
      initialDate: initialDate ? `${initialDate._i.year}-${initialDate._i.month + 1}-${initialDate._i.date}` : '',
      endDate: endDate ? `${endDate._i.year}-${endDate._i.month + 1}-${endDate._i.date}` : ''
    };

    this.filters.emit(filter);
  }

  resetForm() {
    this.filterFormConsult.reset();
    this.filterFormConsult.get('policyId').setValue(this.policyId);
    this.sendFormToParent();
  }
}
