import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormGroup, Validators } from '@angular/forms';
import { AuthorizationsService } from '../services/authorizations/authorizations.service';
import { HttpParams } from '@angular/common/http';
import { NewAuthorizationService } from '../../../modules/dashboard/authorizations/new-authorization/services/new-authorization.service';
import { FormHandlerService } from '../../../core/services/forms/form-handler.service';



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
	selector: 'app-authorizations',
	templateUrl: './authorizations.component.html',
	styleUrls: ['./authorizations.component.scss']
})
export class AuthorizationsComponent implements OnInit {

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


	newAuthorizationButtonOptions: MatProgressButtonOptions = {
		active: false,
		text: 'Nueva Autorización',
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

	displayedColumns: string[] = ['no', 'nombre', 'seguro', 'plan', 'condicion', 'estatus', 'acciones'];

	dataSource;
	authorizations: any[];

	@ViewChild(MatSort, { static: true })
	sort: MatSort;
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;

	testForm: FormGroup;

	constructor(
		private route: Router,
		public authorizationsService: AuthorizationsService,
		public newAuthorization: NewAuthorizationService,
		public formHandlerService: FormHandlerService
	) { }


	getAuthorizations(params: HttpParams = new HttpParams()) {
		let data;
		this.authorizationsService.getAuthoriations(params)
			.subscribe(res => {
				data = res;
				this.authorizations = data.data;
				this.dataSource = new MatTableDataSource(this.authorizations);
				this.dataSource.sort = this.sort;
				this.dataSource.paginator = this.paginator;
			}, err => console.log(err));
	}

	deleteAuthorization(id: number) {
		this.getAuthorizations();
		this.formHandlerService.deleteRequest(id, 'Precertificado', 'Autorización');
	}

	ngOnInit() {
		this.getAuthorizations();
	}

	newClaim() {
		this.newAuthorizationButtonOptions.active = true;
		this.route.navigateByUrl('/dashboard/authorizations/new-authorization');
	}

}

