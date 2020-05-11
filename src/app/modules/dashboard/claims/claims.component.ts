import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClaimsService } from '../services/claims/claims.service';
import { HttpParams } from '@angular/common/http';
import { ClaimsListComponent } from './claims-list/claims-list.component';
import { RefundsListComponent } from './refunds-list/refunds-list.component';


export interface Claims {
	no: number;
	nombre: string;
	seguro: string;
	plan: string;
	fecha: Date;
	monto: number;
	estatus: string;
}

@Component({
	providers: [
		ClaimsListComponent,
		RefundsListComponent
	],
	selector: 'app-claims',
	templateUrl: './claims.component.html',
	styleUrls: ['./claims.component.scss']
})

export class ClaimsComponent implements OnInit {

	statusTypes = [
		{ value: 0, view: 'Incompleto' },
		{ value: 1, view: 'Completo' },
		{ value: 2, view: 'Enviado' },
		{ value: 3, view: 'Cancelado' },
		{ value: 4, view: 'Adjuntar Expediente' },
	];

	fillType = 'nroPoliza';

	fills = {
		status: this.statusTypes,
		fillType: this.fillType
	};

	newClaimButtonOptions: MatProgressButtonOptions = {
		active: false,
		text: 'Nuevo Reclamo',
		buttonColor: 'accent',
		barColor: 'primary',
		raised: true,
		stroked: false,
		mode: 'indeterminate',
		value: 0,
		disabled: false,
		fullWidth: true,
		customClass: 'dashboard-button'
	};

	displayedColumns: string[] = ['no', 'nombre', 'seguro', 'plan', 'fecha', 'monto', 'estatus', 'acciones'];

	dataSource;
	public claims: any[];

	@ViewChild(MatSort, { static: true })
	sort: MatSort;
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;

	testForm: FormGroup;

	constructor(private route: Router, private fb: FormBuilder, private _claimsService: ClaimsService, private _claimsList: ClaimsListComponent, private _refundsList: RefundsListComponent) { }

	filterData(params: HttpParams = new HttpParams) {
		this._claimsList.getClaims(params);
		this._refundsList.getRefunds(params);
	}

	getClaims(params: HttpParams = new HttpParams) {
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
		this.testForm = this.fb.group({
			arthritis: this.fb.group({})
		});
	}

	print() {
		console.log(JSON.stringify(this.testForm.value));
	}

	change(event) {
		if (event.value === 'no') {
			this.testForm.removeControl('spine');
		} else if (event.value === 'si') {
			this.testForm.addControl(
				'spine',
				this.fb.group({})
			);
		}
	}

	newClaim() {
		this.newClaimButtonOptions.active = true;
		this.route.navigateByUrl('/dashboard/claims/new-claim');
	}
}


