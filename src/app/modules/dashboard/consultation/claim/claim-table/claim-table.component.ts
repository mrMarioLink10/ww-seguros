import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { ClaimService } from '../services/claim.service';
import { ActivatedRoute } from '@angular/router';
import { PolicyService } from '../../../services/consultation/policy.service';
import { AppComponent } from '../../../../../app.component';
import { UserService } from '../../../../../core/services/user/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-claim-table',
  templateUrl: './claim-table.component.html',
  styleUrls: ['./claim-table.component.scss']
})
export class ClaimTableComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  claimFilter;
  // @Output() pendingBillsEmitter = new EventEmitter<number>();
  @Input() policyId;
  @Input() set filters(claimFilter) {
    if (claimFilter) {
      this.claimFilter = claimFilter;
      this.loadData();
    } else {
      this.claimFilter = {
        certificado: ''
      };
    }
  }

  // certifi2;
  dataSource;
  data = [];
  displayedColumns: string[] = ['certificado', 'patientId', 'patientName', 'authorization', 'serviceDate', 'paymentState',
    'paymentType', 'paymentDocument', 'paymentDate', 'actions'];


  constructor(private claimService: ClaimService, private activatedRoute: ActivatedRoute,
    private policyService: PolicyService, private appComponent: AppComponent, private userService: UserService) {
    // this.policyId = this.activatedRoute.snapshot.paramMap.get('policyId');
  }

  userRole: string;
  ngOnInit() {
    this.userRole = this.userService.getRoleCotizador();
  }
  BASE_URL: any = `${environment.fileUrl}`;
  getBillDownloadLink(billId, poliza) {
    switch (this.userRole) {
      case 'WWS':
        return `${this.BASE_URL}/InvoiceView/ExportToPDF/ReclamosData/${billId}/${poliza}/?location=true`;
      case 'WMA':
        return `${this.BASE_URL}/InvoiceView/ExportToPDF/ReclamosData/${billId}/${poliza}/?location=false`;
      default:
        return '';
    }
  }
  loadData() {
    // this.policyService.getPolicyDetails(this.policyId).subscribe((res: any) => {
    //   this.certifi2 = res.data.certificates;
    //   console.log(this.certifi2);
    // });

    // console.log(this.policyId);

    let httpParams = this.constructQueryParams();

    if (this.userService.getRoles().includes('WWS') && this.userService.getRoles().includes('WMA')) {
      httpParams = httpParams.append('country', localStorage.getItem('countryCode'));
    }

    this.claimService.getClaims(httpParams, this.policyId).subscribe((res: any) => {
      this.data = res.data || [];
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(res);
      // console.log(this.certifi);
      this.appComponent.showOverlay = false;

    });
  }

  constructQueryParams(): HttpParams {
    let httpParams = new HttpParams();
    if (this.claimFilter.certificado && this.claimFilter.certificado !== '') {
      httpParams = httpParams.append('certificado', this.claimFilter.certificado.toString());
    }

    return httpParams;
  }

}
