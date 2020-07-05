import {Component, Input, OnInit, EventEmitter,Output, ViewChild, ElementRef } from '@angular/core';
import {Bill, BillFilter} from '../../models/bill';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {BillsService} from '../../../services/consultation/bills.service';
import {UserService} from '../../../../../core/services/user/user.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-bills-table',
  templateUrl: './bills-table.component.html',
  styleUrls: ['./bills-table.component.scss']
})
export class BillsTableComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

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
  displayedColumns: string[] = ['policyId', 'billId' , 'clientName', 'expirationDate',  'totalBalance', 'actions'];
  emitPendingBills(policies: Bill[]) {
    const filteredPolicies = policies.filter( p => p.paymentState === 'P');
    this.pendingBillsEmitter.emit(filteredPolicies.length);
  }
  constructor(private billsService: BillsService, private userService: UserService) { }

  ngOnInit() {
    this.userRole = this.userService.getRoleCotizador();
    this.canUserDownloadBills();
    this.loadData();
  }

  loadData() {
    const httpParams = this.constructQueryParams();
    this.billsService.getBills(httpParams).subscribe((res: any) => {
      this.data = res.data || [];
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      //this.emitPendingBills(this.data);
    });

    this.billsService.getBillsInfo().subscribe((res: any) => {
      this.data = res.data || [];

      this.emitPendingBills(this.data);
    });


  }

  canUserDownloadBills() {
    return this.userRole === 'WWS' || this.userRole === 'WMA';
  }

  getBillDownloadLink(billId) {
    switch (this.userRole) {
      case 'WWS':
        return `http://wwsdevportalbackend.azurewebsites.net/InvoiceView/ExportRDToPDF/${billId}`;
      case 'WMA':
        return `http://wwsdevportalbackend.azurewebsites.net/InvoiceView/ExportPMToPDF/${billId}`;
      default:
        return'';
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

    /*if (this.billsFilter.paymentState && this.billsFilter.paymentState !== '') {
      httpParams = httpParams.append('paymentState', this.billsFilter.paymentState.toString());
    }*/

    if (this.billsFilter.initialDate && this.billsFilter.initialDate !== '') {
      httpParams = httpParams.append('initialDate', this.billsFilter.initialDate.toString());
    }

    if (this.billsFilter.endDate && this.billsFilter.endDate !== '') {
      httpParams = httpParams.append('endDate', this.billsFilter.endDate.toString());
    }

    return httpParams;
  }

}
