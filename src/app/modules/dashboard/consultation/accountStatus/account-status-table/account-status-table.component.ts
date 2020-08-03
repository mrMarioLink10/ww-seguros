import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppComponent } from '../../../../../app.component';
import { AccountStatusService } from '../service/account-status.service';
import { HttpParams } from '@angular/common/http';
import {UserService} from '../../../../../core/services/user/user.service';
import { environment } from 'src/environments/environment';

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
        numeroDocument: '',
        concepto: '',
        initialDate: '',
        endDate: '',
      };
    }
  }
  BASE_URL: any = `${environment.fileUrl}`;

  dataSource;
  data = [];
  displayedColumns: string[] = ['type', 'numeroDocument' , 'docDate', 'concepto', 'initialDate',
  'finalDate', 'debit', 'credit', 'balance'];

  constructor(private appComponent: AppComponent, private status: AccountStatusService, private userService: UserService) { }
  userRole = "";
  ngOnInit() {
    this.userRole = this.userService.getRoleCotizador();
    this.loadData();
  }

  loadData() {
    const httpParams = this.constructQueryParams();
    this.status.getStatus(httpParams, this.policyId).subscribe((res: any) => {
      this.data = res.data || [];
      console.log(this.policyId);
      console.log(res);
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.appComponent.showOverlay = false;
    });
  }
  getDownloadLink(id)
  {
    switch (this.userRole) {
      case 'WWS':
        return `${this.BASE_URL}/InvoiceView/ExportToPDF/EstadoDeCuentas/${id}/?location=true`;
      case 'WMA':
        return `${this.BASE_URL}/InvoiceView/ExportToPDF/EstadoDeCuentas/${id}/?location=false`;
      default:
        return'';
    }
  }
  constructQueryParams(): HttpParams {
    let httpParams = new HttpParams();
    if (this.statusFilter.numeroDocument && this.statusFilter.numeroDocument !== '') {
      httpParams = httpParams.append('numeroDocument', this.statusFilter.numeroDocument.toString());
    }

    if (this.statusFilter.concepto && this.statusFilter.concepto !== '') {
      httpParams = httpParams.append('concepto', this.statusFilter.concepto.toString());
    }


    if (this.statusFilter.initialDate && this.statusFilter.initialDate !== '') {

      httpParams = httpParams.append('initialDate', this.statusFilter.initialDate.toString());
    }

    if (this.statusFilter.endDate && this.statusFilter.endDate !== '') {
      httpParams = httpParams.append('endDate', this.statusFilter.endDate.toString());
    }

    return httpParams;
  }
}
