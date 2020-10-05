import { Component, Input, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Bill, BillFilter } from '../../models/bill';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { BillsService } from '../../../services/consultation/bills.service';
import { UserService } from '../../../../../core/services/user/user.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-bills-table-consult',
  templateUrl: './bills-table-consult.component.html',
  styleUrls: ['./bills-table-consult.component.scss']
})
export class BillsTableConsultComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  BASE_URL: any = `${environment.fileUrl}`;
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

  constructor(private billsService: BillsService, private userService: UserService) { }

  ngOnInit() {
    this.userRole = this.userService.getRoleCotizador();
    this.canUserDownloadBills();
    this.loadData();
  }

  loadData() {
    let httpParams = this.constructQueryParams();

    if (this.userService.getRoles().includes('WWS') && this.userService.getRoles().includes('WMA')) {
      httpParams = httpParams.append('country', localStorage.getItem('countryCode'));
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

  canUserDownloadBills() {
    return this.userRole === 'WWS' || this.userRole === 'WMA';
  }

  getBillDownloadLink(billId) {
    switch (this.userRole) {
      case 'WWS':
        return `${this.BASE_URL}/InvoiceView/ExportRDToPDF/${billId}`;
      case 'WMA':
        return `${this.BASE_URL}/InvoiceView/ExportPMToPDF/${billId}`;
      default:
        return '';
    }
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
