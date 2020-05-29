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

    console.log('FORM VALUE: ', formValue);
    const initialDate = formValue.initialDate._i;
    const endDate = formValue.endDate._i;

    const filter: BillFilter = {
      policyId: formValue.policyId,
      billId: formValue.billId,
      clientName: formValue.clientName,
      paymentState: formValue.paymentState,
      initialDate: initialDate ? `${initialDate.date}/${initialDate.month + 1}/${initialDate.year}` : '',
      endDate: endDate ? `${endDate.date}/${endDate.month + 1}/${endDate.year}` : ''
    };
    console.log('FILTER VALUE: ', filter);

    this.filters.emit(filter);
  }

}
