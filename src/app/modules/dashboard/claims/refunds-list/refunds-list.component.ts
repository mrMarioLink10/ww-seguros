import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClaimsService } from '../../services/claims/claims.service';
import { HttpParams } from '@angular/common/http';
import { RefundService } from './../new-claim/claim-types/refund/services/refund.service';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { AppComponent } from 'src/app/app.component';
import { UserService } from '../../../../core/services/user/user.service';


@Component({
	selector: 'app-refunds-list',
	templateUrl: './refunds-list.component.html',
	styleUrls: ['./refunds-list.component.scss']
})

export class RefundsListComponent implements OnInit {

	displayedColumns: string[] = ['noPoliza', 'nombre', 'idNumber', 'totalAmount', 'forma', 'estatus', 'acciones'];

	dataSource;
	@Input() refunds: any[];

	@ViewChild(MatSort, { static: true })
	sort: MatSort;
	role: string;
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;

	testForm: FormGroup;

	constructor(
		private route: Router,
		private fb: FormBuilder,
		public claimsService: ClaimsService,
		public refund: RefundService,
		public formHandlerService: FormHandlerService,
		private appComponent: AppComponent,
		private userService: UserService
	) { }

	getRefunds(params: HttpParams = new HttpParams()) {
    let data;
    console.log(params);
		setTimeout(() => {
			this.appComponent.showOverlay = true;
		});
		this.claimsService.getRefunds(params)
			.subscribe(res => {
				this.appComponent.showOverlay = false;
				data = res;
        this.refunds = data.data;
        console.log(data.data);
				this.dataSource = new MatTableDataSource(this.refunds);
				this.dataSource.sort = this.sort;
				this.dataSource.paginator = this.paginator;
			}, err => console.log(err));
	}

	ngOnInit() {
		if (this.appComponent.showOverlay === false) {
			this.appComponent.showOverlay = false;
		}
		this.getRefunds();
		this.role = this.userService.getRoleCotizador();
	}

	seeRequest(id: number) {
		if (this.role === 'WWS') {
			window.open(`http://wwsdevportalbackend.azurewebsites.net/ReembolsosView/Index/${id}/?location=true`, '_blank');
		} else {
			window.open(`http://wwsdevportalbackend.azurewebsites.net/ReembolsosView/Index/${id}/?location=false`, '_blank');
		}
	}

	deleteRefund(id: number) {
		this.formHandlerService.deleteRequest(id, 'Reembolsos', 'Reembolso', this.appComponent)
			.subscribe(res => {
				if (res === true) { this.getRefunds(); }
			});
	}

	directSendRefund(id: number) {
		this.formHandlerService.directSendRequest(id, 'Reembolsos', 'Reembolso', this.appComponent)
			.subscribe(res => {
				if (res === true) { this.getRefunds(); }
			});

	}
}
