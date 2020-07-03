import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from 'src/app/shared/components/form-components/date-picker/date-picker-onlymonth.component';
import {FormBuilder} from '@angular/forms';
import { AppComponent } from '../../../../../app.component';

@Component({
  selector: 'app-claim-filter',
  templateUrl: './claim-filter.component.html',
  styleUrls: ['./claim-filter.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class ClaimFilterComponent implements OnInit {
  @Output() filters = new EventEmitter<any>();
  // @Input() certifi;

  filterForm = this.fb.group({
    certificado: [''],
  });

  constructor(private fb: FormBuilder, private appComponent: AppComponent) { }

  ngOnInit() {
  }

  sendFormToParent() {
    const formValue = this.filterForm.value;

    const filter = {
      certificado: formValue.certificado ? formValue.certificado : '',
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
  }

}
