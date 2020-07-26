import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
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

  oldPolicyId;
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

  claimsCondition = false;
  spinnerValue = true;

  recharge;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private policyService: PolicyService,
    private appComponent: AppComponent,
    private router: Router
  ) {
    this.policyId = this.activatedRoute.snapshot.paramMap.get('policyId');
  }

  ngOnInit() {
    this.recharge = false;
    if (this.policyId) {
      this.searchPolicy(this.policyId);
      this.claimsConditionValue();
    }
  }

  searchPolicy(policyId: string) {
    this.oldPolicyId = this.policyId;
    this.policyId = policyId;
    this.loading = true;
    setTimeout(() => {
      this.appComponent.showOverlay = true;
    });

    this.policyService.getPolicyDetails(policyId).subscribe((res: any) => {
      this.policyDetail = res.data;
      console.log('DETALLE DE POLIZA: ', res);
      if (res.data) {
        if (this.recharge == true) {
          // this.router.navigateByUrl(`dashboard/consult/policy/${this.policyId}`);
          window.location.assign(`dashboard/consult/policy/${this.policyId}`);
        }
        // setTimeout(() => {
        console.log(res.data.insured[0].certificates);
        const tableData = res.data.insured;
        this.dataSource = new MatTableDataSource(tableData);
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.sort);
        console.log(this.sort);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
        this.appComponent.showOverlay = false;
        console.log(this.policyDetail.ramo);
        if (this.policyDetail.ramo.toLowerCase().includes('salud')) {
            this.claimsCondition = true;
          }
        // }, 500);
      }
      else {
        this.recharge = false;
        this.searchPolicy(this.oldPolicyId);
      }
    });

  }

  claimsConditionValue() {
    this.spinnerValue = false;
    /*this.policyService.getIdNumbers().subscribe(res =>{
      console.log(res.data);
      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < res.data.length; x++) {
        // tslint:disable-next-line: prefer-for-of
        for (let y = 0; y < res.data[x].polizas.length; y++) {
          if (res.data[x].polizas[y].no_poliza == this.policyId) {
            console.log('Si son iguales');
            if (res.data[x].polizas[y].ramo.toLowerCase().includes('salud')) {
              this.claimsCondition = true;
              console.log(res.data[x].polizas[y].ramo);
              // this.appComponent.showOverlay = false;
            }
          }
          else {
            console.log('No son iguales');
          }
          console.log(res.data[x].polizas[y]);
        }
      }
      this.spinnerValue = false;
    });*/
  }

  setRecharge() {
    this.recharge = true;
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