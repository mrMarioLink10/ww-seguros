import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClaimsService } from '../../services/claims/claims.service';
import { HttpParams } from '@angular/common/http';
import { RefundService } from './../new-claim/claim-types/refund/services/refund.service'
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { AppComponent } from 'src/app/app.component';


@Component({
	selector: 'app-refunds-list',
	templateUrl: './refunds-list.component.html',
	styleUrls: ['./refunds-list.component.scss']
})

export class RefundsListComponent implements OnInit {

	displayedColumns: string[] = ['no', 'nombre', 'cedula', 'totalAmount', 'forma', 'estatus', 'acciones'];

	dataSource;
	@Input() refunds: any[];

	@ViewChild(MatSort, { static: true })
	sort: MatSort;
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;

	testForm: FormGroup;

	constructor(
		private route: Router,
		private fb: FormBuilder,
		public claimsService: ClaimsService,
		public refund: RefundService,
		public formHandlerService: FormHandlerService,
		private appComponent: AppComponent
	) { }

	getRefunds(params: HttpParams = new HttpParams()) {
		let data;
		this.claimsService.getRefunds(params)
			.subscribe(res => {
				data = res;
				this.refunds = data.data;
				this.dataSource = new MatTableDataSource(this.refunds);
				this.dataSource.sort = this.sort;
				this.dataSource.paginator = this.paginator;
			}, err => console.log(err));
	}

	ngOnInit() {
		this.getRefunds();
	}

	deleteRefund(id: number) {
		this.formHandlerService.deleteRequest(id, 'Reembolsos', 'Reembolso', this.appComponent);
		this.getRefunds();
	}

	directSendRefund(id: number) {
		this.formHandlerService.directSendRequest(id, 'Reembolsos', 'Reembolso', this.appComponent);
		this.getRefunds();
	}

}
