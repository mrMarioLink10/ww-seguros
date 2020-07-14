import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Insured, PolicyDetail } from '../../models/policy-detail';
import { PolicyService } from '../../../services/consultation/policy.service';
import { AppComponent } from '../../../../../app.component';
import { BillFilter } from '../../models/bill';


@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss']
})
export class PolicyDetailsComponent implements OnInit {


  policyId;

  form = this.fb.group({
    policyId: ['', Validators.required]
  });

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['insuredId', 'certificates', 'fullName', 'validityDate', 'kinship'];
  policyDetail: PolicyDetail;
  data: Insured[] = [];
  loading = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  billsFilterConsult: BillFilter;
  pendingPoliciesConsult = 0;
  ClaimsFilter;
  ReceiptFilter;
  statusFilter;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private policyService: PolicyService,
    private appComponent: AppComponent
  ) {
    this.policyId = this.activatedRoute.snapshot.paramMap.get('policyId');
  }

  ngOnInit() {
    if (this.policyId) {
      this.searchPolicy(this.policyId);
    }
  }

  searchPolicy(policyId: string) {
    this.policyId = policyId;
    this.loading = true;
    setTimeout(() => {
      this.appComponent.showOverlay = true;
    });
    this.policyService.getPolicyDetails(policyId).subscribe((res: any) => {
      this.policyDetail = res.data;
      console.log('DETALLE DE POLIZA: ', res);
      console.log(res.data.insured[0].certificates);
      const tableData = res.data.insured;
      this.dataSource = new MatTableDataSource(tableData);
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.sort);
      console.log(this.sort);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
      this.appComponent.showOverlay = false;
    });

  }

  setBillsFiltersConsult(event) {
    this.billsFilterConsult = event;
  }

  setPendingPoliciesConsult(event) {
    this.pendingPoliciesConsult = event;
  }

  setClaimsFilters(event) {
    this.ClaimsFilter = event;
  }

  setReceiptFilters(event) {
    this.ReceiptFilter = event;
  }

  setStatusFilters(event) {
    this.statusFilter = event;
  }
}
