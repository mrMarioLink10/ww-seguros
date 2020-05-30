import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatSort} from '@angular/material';
import {ActivatedRoute, Router} from "@angular/router";
import {Insured} from "../../models/policy-detail";

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
  data: Insured[] = [
    {insuredId: 4321, certificates: 13, fullName: 'Jodir Jiménez', validityDate: '15/05/2020', kinship: 'Hermano'},
    {insuredId: 5678, certificates: 24, fullName: 'Oscar López', validityDate: '17/03/2020', kinship: 'Hermano'},
    {insuredId: 9101, certificates: 36, fullName: 'Manuel Montero', validityDate: '20/04/2020', kinship: 'Hermano'},
    {insuredId: 1213, certificates: 2, fullName: 'Alam Alcántara', validityDate: '22/07/2020', kinship: 'Hermano'},
    {insuredId: 1415, certificates: 12, fullName: 'Edgar Pérez', validityDate: '12/12/2020', kinship: 'Hermano'},
  ];

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.policyId = this.activatedRoute.snapshot.paramMap.get('policyId');
  }

  ngOnInit() {
    if (this.policyId) {
      this.searchPolicy(this.policyId);
    }
  }

  searchPolicy(policyId: number) {
    this.policyId = policyId;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
