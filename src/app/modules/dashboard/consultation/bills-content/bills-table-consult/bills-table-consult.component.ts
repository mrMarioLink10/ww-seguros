import { Component, Input, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Bill, BillFilter } from '../../models/bill';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { BillsService } from '../../../services/consultation/bills.service';
import { UserService } from '../../../../../core/services/user/user.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {CountryRolesService} from '../../../../../shared/services/country-roles.service';
import {CountryRoleTypes} from '../../../../../shared/utils/keys/country-role-types';


@Component({
  selector: 'app-bills-table-consult',
  templateUrl: './bills-table-consult.component.html',
  styleUrls: ['./bills-table-consult.component.scss']
})
export class BillsTableConsultComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  BASE_URL: any = `${environment.fileUrlHttps}`;
  billsFilter: BillFilter;
  @Output() pendingBillsEmitter = new EventEmitter<number>();
  @Input() set filters(billsFilter: BillFilter) {
    if (billsFilter) {
      this.billsFilter = billsFilter;
      this.loadData();
    } else {
      this.billsFilter = {
        policyId: '',
        billId: '',
        clientName: '',
        initialDate: '',
        endDate: '',
        paymentState: ''
      };
    }
  }

  userRole: string;
  dataSource;
  data: Bill[] = [];
  displayedColumns: string[] = ['policyId', 'billId', 'clientName', 'expirationDate', 'totalBalance', 'actions'];
  emitPendingBills(policies: Bill[]) {
    const filteredPolicies = policies.filter(p => p.paymentState === 'P');
    this.pendingBillsEmitter.emit(filteredPolicies.length);
  }

  constructor(
    private billsService: BillsService,
    private userService: UserService,
    private countryRolesService: CountryRolesService, ) { }

  ngOnInit() {
    this.userRole = this.countryRolesService.getLocalStorageCountry().dominio;
    this.loadData();
  }

  loadData() {
    let httpParams = this.constructQueryParams();

    if (this.countryRolesService.userHasMoreThanOneRole()) {
      const country = this.countryRolesService.getLocalStorageCountry();
      httpParams = httpParams.append('country', country.codigoPortal);
    }

    this.billsService.getBills(httpParams).subscribe((res: any) => {
      this.data = res.data || [];
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.emitPendingBills(this.data);
      console.log(this.dataSource);
    });
  }

  getBillDownloadLink(billId) {
    const country = this.countryRolesService.getLocalStorageCountry();
    return `${this.BASE_URL}/InvoiceView/ExportToPDF/${country.codigoPortal}/${billId}`;
  }

  constructQueryParams(): HttpParams {
    let httpParams = new HttpParams();
    if (this.billsFilter.policyId && this.billsFilter.policyId !== '') {
      httpParams = httpParams.append('policyId', this.billsFilter.policyId.toString());
    }

    if (this.billsFilter.billId && this.billsFilter.billId !== '') {
      httpParams = httpParams.append('billId', this.billsFilter.billId.toString());
    }

    if (this.billsFilter.clientName && this.billsFilter.clientName !== '') {
      httpParams = httpParams.append('clientName', this.billsFilter.clientName.toString());
    }

    if (this.billsFilter.paymentState && this.billsFilter.paymentState !== '') {
      httpParams = httpParams.append('paymentState', this.billsFilter.paymentState.toString());
    }

    if (this.billsFilter.initialDate && this.billsFilter.initialDate !== '') {
      httpParams = httpParams.append('initialDate', this.billsFilter.initialDate.toString());
    }

    if (this.billsFilter.endDate && this.billsFilter.endDate !== '') {
      httpParams = httpParams.append('endDate', this.billsFilter.endDate.toString());
    }

    return httpParams;
  }

}
