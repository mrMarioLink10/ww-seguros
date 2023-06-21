import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClaimsService } from '../../services/claims/claims.service';
import { HttpParams } from '@angular/common/http';
import { ClaimService } from './../new-claim/claim-types/claim/services/claim.service';
import { CountryRolesService } from 'src/app/shared/services/country-roles.service';

@Component({
	selector: 'app-claims-list',
	templateUrl: './claims-list.component.html',
	styleUrls: ['./claims-list.component.scss']
})

export class ClaimsListComponent implements OnInit {

	displayedColumns: string[] = ['no', 'nombre', 'tipoServicio', 'autorizadoPor', 'fechaDiagnostico', 'estatus', 'acciones'];

	dataSource;
	@Input() claims: any[];

	@ViewChild(MatSort, { static: true })
	sort: MatSort;
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;

	testForm: FormGroup;

	country = this.countryRolesService.getLocalStorageCountry();

	constructor(private route: Router, private fb: FormBuilder, public claimsService: ClaimsService, public claim: ClaimService, private countryRolesService: CountryRolesService) { }

	getClaims(params: HttpParams = new HttpParams()) {
		let data;

		params = params.append('country', this.country.codigoPortal);

		this.claimsService.getClaims(params)
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
