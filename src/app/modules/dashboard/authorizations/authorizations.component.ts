import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormGroup, Validators } from '@angular/forms';
import { AuthorizationsService } from '../services/authorizations/authorizations.service';
import { HttpParams } from '@angular/common/http';
import { NewAuthorizationService } from '../../../modules/dashboard/authorizations/new-authorization/services/new-authorization.service';
import { FormHandlerService } from '../../../core/services/forms/form-handler.service';
import { AppComponent } from '../../../app.component';
import { UserService } from '../../../core/services/user/user.service';
import { environment } from 'src/environments/environment';



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

	BASE_URL: any = `${environment.fileUrl}`;
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

	displayedColumns: string[] = ['noPoliza', 'nombres', 'apellidos', 'tipoReclamo', 'procedimiento', 'nombreServicio', 'condicion', 'status', 'acciones'];

	dataSource;
	authorizations: any[];
	role: any;

	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	testForm: FormGroup;
	loading = false;
	constructor(
		private route: Router,
		public authorizationsService: AuthorizationsService,
		public newAuthorization: NewAuthorizationService,
		public formHandlerService: FormHandlerService,
		private appComponent: AppComponent,
		private userService: UserService,
		private cd: ChangeDetectorRef
	) { }

	getAuthorizations(params: HttpParams = new HttpParams()) {
		let data;
		setTimeout(() => {
			this.appComponent.showOverlay = true;
		});

		if (this.userService.getRoles().includes('WWS') && this.userService.getRoles().includes('WMA')) {
			params = params.append('country', localStorage.getItem('countryCode'));
		}

		this.authorizationsService.getAuthoriations(params)
			.subscribe(res => {
				data = res;
				this.authorizations = data.data;
				this.dataSource = new MatTableDataSource(this.authorizations);
				this.dataSource.sort = this.sort;
				this.dataSource.paginator = this.paginator;
				this.appComponent.showOverlay = false;
				console.log(this.dataSource.sort);
				console.log(this.sort);
			}, err => console.log(err));
	}

	deleteAuthorization(id: number) {
		this.formHandlerService.deleteRequest(id, 'Precertificado', 'Autorización', this.appComponent)
			.subscribe(res => {
				if (res === true) { this.getAuthorizations(); }
			});
	}

	directSendAuthorization(id: number) {
		this.formHandlerService.directSendRequest(id, 'Precertificado', 'Autorización', this.appComponent)
			.subscribe(res => {
				if (res === true) { this.getAuthorizations(); }
			});
	}

	seeRequest(id: number) {
		if (this.role === 'WWS') {
			window.open(`${this.BASE_URL}/PrecertificadoView/Index/${id}/?location=true`, '_blank');
		} else {
			window.open(`${this.BASE_URL}/PrecertificadoView/Index/${id}/?location=false`, '_blank');
		}
	}

	ngOnInit() {
		this.getAuthorizations();
		this.role = this.userService.getRoleCotizador();
	}

	newClaim() {
		this.newAuthorizationButtonOptions.active = true;
		this.route.navigateByUrl('/dashboard/authorizations/new-authorization');
	}

}

