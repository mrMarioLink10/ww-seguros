import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClaimsService } from '../../services/claims/claims.service';
import { HttpParams } from '@angular/common/http';
import { ClaimService } from './../new-claim/claim-types/claim/services/claim.service'



@Component({
  selector: 'app-claims-list',
  templateUrl: './claims-list.component.html',
  styleUrls: ['./claims-list.component.scss']
})

export class ClaimsListComponent implements OnInit {

	displayedColumns: string[] = ['no', 'nombre', 'tipoSeguro', 'tipoServicio', 'autorizadoPor', 'fechaDiagnostico', 'estatus', 'acciones'];

	dataSource;
	@Input() claims:any[];

	@ViewChild(MatSort, { static: true })
	sort: MatSort;
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;

	testForm: FormGroup;

  constructor(private route: Router, private fb: FormBuilder, private _claimsService: ClaimsService, private claim:ClaimService) { }
  
	getClaims(params:HttpParams = new HttpParams){
		let data;
		this._claimsService.getClaims(params)
		.subscribe(res => {
		  data = res;
		  this.claims = data.data;
		  this.dataSource = new MatTableDataSource(this.claims);
		  this.dataSource.sort = this.sort;
		  this.dataSource.paginator = this.paginator;
		}, err => console.log(err));
	} 

  ngOnInit() {
    this.getClaims();
  }

}
