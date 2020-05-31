import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BillFilter} from '../../models/bill';

@Component({
  selector: 'app-bills-filter',
  templateUrl: './bills-filter.component.html',
  styleUrls: ['./bills-filter.component.scss']
})
export class BillsFilterComponent implements OnInit {
  @Output() filters = new EventEmitter<BillFilter>();

  filterForm = this.fb.group({
    billId: [''],
    policyId: [''],
    paymentState: [''],
    initialDate: [''],
    endDate: [''],
    clientName: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  sendFormToParent() {
    const formValue = this.filterForm.value;

    const initialDate = formValue.initialDate;
    const endDate = formValue.endDate;

    const filter: BillFilter = {
      policyId: formValue.policyId ? formValue.policyId : '',
      billId: formValue.billId ? formValue.billId : '',
      clientName: formValue.clientName ? formValue.clientName : '',
      paymentState: formValue.paymentState ? formValue.paymentState : '',
      initialDate: initialDate ? `${initialDate._i.date}/${initialDate._i.month + 1}/${initialDate._i.year}` : '',
      endDate: endDate ? `${endDate.date}/${endDate.month + 1}/${endDate.year}` : ''
    };

    this.filters.emit(filter);
  }

  resetForm() {
    this.filterForm.reset();
    this.sendFormToParent();
  }

}
