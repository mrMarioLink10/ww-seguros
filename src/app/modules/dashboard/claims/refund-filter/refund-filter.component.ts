import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../../consultation/models/date-format';
import { FormBuilder } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-refund-filter',
  templateUrl: './refund-filter.component.html',
  styleUrls: ['./refund-filter.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class RefundFilterComponent implements OnInit {

  @Output() filters = new EventEmitter<any>();
  todayDate = new Date();

  filterForm = this.fb.group({
    nroPoliza: [''],
    status: [''],
    name: [''],
    from: [''],
    to: ['']
  });

  statusTypes = [
    { value: 1, view: 'Enviado' },
    { value: 2, view: 'En Evaluación' },
    { value: 3, view: 'Devuelto' },
    { value: 4, view: 'Completivo' },
    { value: 5, view: 'Asignado' },
    { value: 6, view: 'Declinado' },
    { value: 7, view: 'Falta Información' },
    { value: 8, view: 'Evaluado' },
    { value: 9, view: 'Pagado' },
    { value: 11, view: 'Incompleto' },
    { value: 12, view: 'Completo' },
    { value: 13, view: 'Cancelado' },
    { value: 14, view: 'Adjuntar Expediente' },
  ];

  constructor(private fb: FormBuilder, private appComponent: AppComponent) { }

  ngOnInit() {
  }

  sendFormToParent() {
    const formValue = this.filterForm.value;

    const from = formValue.from;
    const to = formValue.to;

    const filter = {
      nroPoliza: formValue.nroPoliza ? formValue.nroPoliza : '',
      status: formValue.status ? formValue.status : '',
      name: formValue.name ? formValue.name : '',
      from: from ? `${from._i.year}-${from._i.month + 1}-${from._i.date}` : '',
      to: to ? `${to._i.year}-${to._i.month + 1}-${to._i.date}` : ''
    };

    this.filters.emit(filter);
  }

  // resetForm() {
  //   this.appComponent.showOverlay = true;
  //   this.filterForm.reset();
  //   this.sendFormToParent();
  // }

  // loader() {
  //   this.appComponent.showOverlay = true;
  //   // console.log(this.filterForm.get('from').value);
  // }

}
