import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from 'src/app/shared/components/form-components/date-picker/date-picker-onlymonth.component';
import {FormBuilder} from '@angular/forms';
import { AppComponent } from '../../../../../app.component';

@Component({
  selector: 'app-receipt-filter',
  templateUrl: './receipt-filter.component.html',
  styleUrls: ['./receipt-filter.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class ReceiptFilterComponent implements OnInit {

  @Output() filters = new EventEmitter<any>();

  filterForm = this.fb.group({
    numeroFactura: [''],
    nombre: [''],
    from: [''],
    to: [''],

  });

  constructor(private fb: FormBuilder, private appComponent: AppComponent) { }

  ngOnInit() {
  }

  sendFormToParent() {
    const formValue = this.filterForm.value;

    const from = formValue.from;
    const to = formValue.to;

    const filter = {
      numeroFactura: formValue.numeroFactura ? formValue.numeroFactura : '',
      nombre: formValue.nombre ? formValue.nombre : '',
      from: from ? `${from._i.date}/${from._i.month + 1}/${from._i.year}` : '',
      to: to ? `${to._i.date}/${to._i.month + 1}/${to._i.year}` : ''
    };

    this.filters.emit(filter);
  }

  resetForm() {
    this.appComponent.showOverlay = true;
    this.filterForm.reset();
    this.sendFormToParent();
  }

  loader() {
    this.appComponent.showOverlay = true;
    // console.log(this.filterForm.get('from').value);
  }

}
