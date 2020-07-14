import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppComponent } from '../../../../../app.component';
import { AccountStatusService } from '../service/account-status.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-account-status-table',
  templateUrl: './account-status-table.component.html',
  styleUrls: ['./account-status-table.component.scss']
})
export class AccountStatusTableComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  statusFilter;
  // @Output() pendingBillsEmitter = new EventEmitter<number>();
  @Input() policyId;
  @Input() set filters(statusFilter) {
    if (statusFilter) {
      this.statusFilter = statusFilter;
      this.loadData();
    } else {
      this.statusFilter = {
        numeroFactura: '',
        nombre: '',
        from: '',
        to: '',
      };
    }
  }

  dataSource;
  data = [];
  displayedColumns: string[] = ['type', 'noDocument' , 'docDate', 'concept', 'initialDate',
  'finalDate', 'debit', 'credit', 'balance'];

  constructor(private appComponent: AppComponent, private status: AccountStatusService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const httpParams = this.constructQueryParams();
    // this.status.getReceipts(httpParams, this.policyId).subscribe((res: any) => {
    //   this.data = res.data || [];
    //   console.log(this.policyId);
    //   console.log(res);
    //   this.dataSource = new MatTableDataSource(this.data);
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
    //   this.appComponent.showOverlay = false;
    // });
  }

  constructQueryParams(): HttpParams {
    let httpParams = new HttpParams();
    if (this.statusFilter.numeroFactura && this.statusFilter.numeroFactura !== '') {
      httpParams = httpParams.append('numeroFactura', this.statusFilter.numeroFactura.toString());
    }

    if (this.statusFilter.nombre && this.statusFilter.nombre !== '') {
      httpParams = httpParams.append('nombre', this.statusFilter.nombre.toString());
    }


    if (this.statusFilter.from && this.statusFilter.from !== '') {
      httpParams = httpParams.append('from', this.statusFilter.from.toString());
    }

    if (this.statusFilter.to && this.statusFilter.to !== '') {
      httpParams = httpParams.append('to', this.statusFilter.to.toString());
    }

    return httpParams;
  }
}
