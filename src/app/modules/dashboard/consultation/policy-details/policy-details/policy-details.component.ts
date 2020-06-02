import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatSort} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {Insured, PolicyDetail} from '../../models/policy-detail';
import {PolicyService} from '../../../services/consultation/policy.service';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss']
})
export class PolicyDetailsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  policyId;

  form = this.fb.group({
    policyId: ['', Validators.required]
  });

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['insuredId', 'certificate', 'fullName', 'validityDate', 'kinship'];
  policyDetail: PolicyDetail;
  data: Insured[] = [];
  loading = false;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private policyService: PolicyService) {
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
    this.policyService.getPolicyDetails(policyId).subscribe((res: any) => {
      this.policyDetail = res.data;
      console.log('DETALLE DE POLIZA: ', res);
      this.dataSource = new MatTableDataSource(this.policyDetail.insured);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });

  }

}
