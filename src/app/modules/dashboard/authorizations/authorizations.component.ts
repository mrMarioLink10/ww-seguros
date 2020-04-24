import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { AuthorizationsService } from '../services/authorizations/authorizations.service';
import { HttpParams } from '@angular/common/http';


export interface Claims {
	no: number;
	nombre: string;
	seguro: string;
	plan: string;
	fecha: Date;
	monto: number;
	estatus: string;
}

const ELEMENT_DATA: Claims[] = [

	{
		no: 154546,
		nombre: 'Isai Vargas',
		seguro: 'Vida',
		plan: 'Nombre del Plan',
		fecha: new Date(),
		monto: 2000,
		estatus: 'Reembolsado'
	},
	{
		no: 213214,
		nombre: 'Pablo Quavo',
		seguro: 'Salud',
		plan: 'Nombre del Plan',
		fecha: new Date(),
		monto: 2000,
		estatus: 'Enviado'
	},
	{
		no: 768678,
		nombre: 'Kevin David',
		seguro: 'Salud',
		plan: 'Nombre del Plan',
		fecha: new Date(),
		monto: 2000,
		estatus: 'Enviado'
	}
];


@Component({
	selector: 'app-authorizations',
	templateUrl: './authorizations.component.html',
	styleUrls: ['./authorizations.component.scss']
})
export class AuthorizationsComponent implements OnInit {

	statusTypes = [
	  'Enviado', 
	  'Reembolsado', 
	  'Denegado'
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

	//displayedColumns: string[] = ['no', 'nombre', 'seguro', 'plan', 'fecha', 'monto', 'estatus', 'acciones'];
	displayedColumns: string[] = ['no', 'nombre', 'seguro', 'plan','condicion', 'estatus', 'acciones'];
	//dataSource = new MatTableDataSource(ELEMENT_DATA);
	dataSource;
	authorizations:any[];

	@ViewChild(MatSort, { static: true })
	sort: MatSort;
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;

	testForm: FormGroup;

	constructor(private route: Router, private _authorizationsService: AuthorizationsService) { }


	getAuthorizations(params:HttpParams = new HttpParams){
		let data;
		this._authorizationsService.getAuthoriations(params)
		.subscribe(res => {
		  data = res;
		  this.authorizations = data.data;
		  this.dataSource = new MatTableDataSource(this.authorizations);
		  this.dataSource.sort = this.sort;
		  this.dataSource.paginator = this.paginator;
		}, err => console.log(err));
	  }

	ngOnInit() {
		this.getAuthorizations();
	}

	newClaim() {
		this.newAuthorizationButtonOptions.active = true;
		this.route.navigateByUrl('/dashboard/authorizations/new-authorization');
	}
}

