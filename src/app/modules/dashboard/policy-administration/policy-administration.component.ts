import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PolicyAdministrationService } from './services/policy-administration.service';
import { AppComponent } from 'src/app/app.component';
import { Observable } from 'rxjs';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import { map, first, startWith } from 'rxjs/operators';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { UserService } from '../../../core/services/user/user.service';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { DiseaseService } from '../shared/components/disease/shared/disease/disease.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { environment } from 'src/environments/environment';
import { DisabilityService } from '../requests/new-request/disability/services/disability.service';
import { LifeService } from '../requests/new-request/life/services/life.service';
import { PaRequestsService } from '../services/pa-requests.service';

@Component({
	selector: 'app-policy-administration',
	templateUrl: './policy-administration.component.html',
	styles: []
})
export class PolicyAdministrationComponent implements OnInit {

	statusTypes = [
		{ value: 0, view: 'Incompleto' },
		{ value: 1, view: 'Completo' },
		{ value: 2, view: 'Enviado' },
		{ value: 3, view: 'Cancelado' },
		{ value: 4, view: 'Adjuntar Expediente' },
	];

	fillType = 'tipoSeguro';

	fills = {
		status: this.statusTypes,
		fillType: this.fillType
	};


	newRequestButtonOptions: MatProgressButtonOptions = {
		active: false,
		text: 'Nueva Solicitud',
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

	// tslint:disable-next-line: max-line-length
	displayedColumns: string[] = ['id', 'idNumber', 'personName', 'creationDate', 'createdBy', 'status', 'acciones'];

	dataSource;
	requests: any;
	role: any;

	loading = false;
	isWWSeguros = false;

	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(
		private router: Router,
		private paRequestsService: PaRequestsService,
		public life: LifeService,
		public disability: DisabilityService,
		private formHandlerService: FormHandlerService,
		private appComponent: AppComponent,
		private userService: UserService,
	) { }

	getRequests(params: HttpParams = new HttpParams()) {
		let data;

		if (this.userService.getRoles().includes('WWS') && this.userService.getRoles().includes('WMA')) {
			params = params.append('country', localStorage.getItem('countryCode'));
		}

		this.loading = true;

		setTimeout(() => {
			this.appComponent.showOverlay = true;
		});
		this.paRequestsService.getRequests(params)
			.subscribe(res => {
				this.appComponent.showOverlay = false;

				data = res;
				this.requests = data.data;
				this.dataSource = new MatTableDataSource(this.requests);
				this.dataSource.sort = this.sort;
				this.dataSource.paginator = this.paginator;
				this.loading = false;

			}, err => console.log(err));
	}

	ngOnInit() {
		if (this.userService.getRoles().includes('wws_intermediario_admin')) {
			this.isWWSeguros = true;
		}

		this.role = this.userService.getRoleCotizador();
		this.getRequests();
	}

	newRequest() {
		this.newRequestButtonOptions.active = true;
		this.router.navigateByUrl('/dashboard/policy-administration/new-policy');
	}
	BASE_URL: any = `${environment.fileUrl}`;

	seeRequest(id: number, type: string) {

	}

	deleteTargeting(id: number, type: string) {

	}

	directSendTargeting(id: number, type: string) {

	}

	confirmRequest(id: number) {
		this.formHandlerService.policyAdministration(id, 'confirm', this.appComponent);
	}

	rejectRequest(id: number) {
		this.formHandlerService.policyAdministration(id, 'deny', this.appComponent);
	}
}

