import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ReceiptService } from '../services/receipt.service'

@Component({
  selector: 'app-receipt-table',
  templateUrl: './receipt-table.component.html',
  styleUrls: ['./receipt-table.component.scss']
})
export class ReceiptTableComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  claimFilter;
  // @Output() pendingBillsEmitter = new EventEmitter<number>();
  @Input() set filters(claimFilter) {
    if (claimFilter) {
      this.claimFilter = claimFilter;
      this.loadData();
    } else {
      this.claimFilter = {
        receiptNumber: '',
        client: '',
        rec: '',
        chargeDate: '',
        paymentType: '',
        amountCharge: ''
      };
    }
  }

  dataSource;
  data = [];
  displayedColumns: string[] = ['receiptNumber', 'client' , 'rec', 'chargeDate', 'paymentType', 
  'amountCharge'];

  constructor(private receiptService: ReceiptService) { }

  ngOnInit() {
  }

  loadData() {
    // const httpParams = this.constructQueryParams();
    // this.claimService.getClaims(httpParams).subscribe((res: any) => {
    //   this.data = res.data || [];
    //   this.dataSource = new MatTableDataSource(this.data);
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
    // });
  }

  // constructQueryParams(): HttpParams {
  //   let httpParams = new HttpParams();
  //   if (this.billsFilter.policyId && this.billsFilter.policyId !== '') {
  //     httpParams = httpParams.append('policyId', this.billsFilter.policyId.toString());
  //   }

  //   if (this.billsFilter.billId && this.billsFilter.billId !== '') {
  //     httpParams = httpParams.append('billId', this.billsFilter.billId.toString());
  //   }

  //   if (this.billsFilter.clientName && this.billsFilter.clientName !== '') {
  //     httpParams = httpParams.append('clientName', this.billsFilter.clientName.toString());
  //   }

  //   if (this.billsFilter.paymentState && this.billsFilter.paymentState !== '') {
  //     httpParams = httpParams.append('paymentState', this.billsFilter.paymentState.toString());
  //   }

  //   if (this.billsFilter.initialDate && this.billsFilter.initialDate !== '') {
  //     httpParams = httpParams.append('initialDate', this.billsFilter.initialDate.toString());
  //   }

  //   if (this.billsFilter.endDate && this.billsFilter.endDate !== '') {
  //     httpParams = httpParams.append('endDate', this.billsFilter.endDate.toString());
  //   }

  //   return httpParams;
  // }
}
