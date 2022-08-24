import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../../models/date-format';
import { FormBuilder } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { UserService } from '../../../../../core/services/user/user.service';
import { environment } from 'src/environments/environment';
import {CountryRoleTypes} from '../../../../../shared/utils/keys/country-role-types';
import {CountryRolesService} from '../../../../../shared/services/country-roles.service';


@Component({
  selector: 'app-account-status-filter',
  templateUrl: './account-status-filter.component.html',
  styleUrls: ['./account-status-filter.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class AccountStatusFilterComponent implements OnInit {

  @Output() filters = new EventEmitter<any>();
  @Input() polizaId = "";
  filterForm = this.fb.group({
    numeroDocument: [''],
    concepto: [''],
    initialDate: [''],
    endDate: [''],

  });
  BASE_URL: any = `${environment.fileUrlHttps}`;

  constructor(
    private fb: FormBuilder,
    private appComponent: AppComponent,
    private userService: UserService,
    private countryRolesService: CountryRolesService) { }
  userRole = "";
  ngOnInit() {
    this.userRole = this.userService.getRoleCotizador();
  }

  sendFormToParent() {
    const formValue = this.filterForm.value;

    const initialDate = formValue.initialDate;
    const endDate = formValue.endDate;

    const filter = {
      numeroDocument: formValue.numeroDocument ? formValue.numeroDocument : '',
      concepto: formValue.concepto ? formValue.concepto : '',
      initialDate: initialDate ? `${initialDate._i.year}-${initialDate._i.month + 1}-${initialDate._i.date}` : '',
      endDate: endDate ? `${endDate._i.year}-${endDate._i.month + 1}-${endDate._i.date}` : ''
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

  download() {
    const country = this.countryRolesService.getLocalStorageCountry();
    window.open(`${this.BASE_URL}/InvoiceView/ExportToPDF/${country.codigoPortal}/EstadoDeCuentas/${this.polizaId}`, '_blank');
  }

}
