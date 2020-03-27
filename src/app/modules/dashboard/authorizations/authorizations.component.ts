import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormGroup } from '@angular/forms';


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
	// tslint:disable: max-line-length
	{
		no: 986543,
		nombre: 'Danilo Medina',
		seguro: 'Salud',
		plan: 'Nombre del Plan',
		fecha: new Date(),
		monto: 2000,
		estatus: 'Denegado'
	},

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
		nombre: 'Huncho Quavo',
		seguro: 'Salud',
		plan: 'Nombre del Plan',
		fecha: new Date(),
		monto: 2000,
		estatus: 'Enviado'
	},
	{
		no: 768678,
		nombre: 'Giannis Qwerty',
		seguro: 'Salud',
		plan: 'Nombre del Plan',
		fecha: new Date(),
		monto: 2000,
		estatus: 'Enviado'
	},
	{
		no: 986543,
		nombre: 'Danilo Medina',
		seguro: 'Salud',
		plan: 'Nombre del Plan',
		fecha: new Date(),
		monto: 2000,
		estatus: 'Reembolsado'
	},
	{
		no: 986543,
		nombre: 'Danilo Medina',
		seguro: 'Salud',
		plan: 'Nombre del Plan',
		fecha: new Date(),
		monto: 2000,
		estatus: 'Reembolsado'
	},
	{
		no: 666420,
		nombre: 'El Penco',
		seguro: 'Vida',
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

	statusTypes = ['Enviado', 'Reembolsado', 'Denegado'];

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

	displayedColumns: string[] = ['no', 'nombre', 'seguro', 'plan', 'fecha', 'monto', 'estatus', 'acciones'];
	dataSource = new MatTableDataSource(ELEMENT_DATA);

	@ViewChild(MatSort, { static: true })
	sort: MatSort;
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;

	testForm: FormGroup;

	constructor(private route: Router) { }

	ngOnInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

	}

	newClaim() {
		this.newAuthorizationButtonOptions.active = true;

		this.route.navigateByUrl('/dashboard/authorizations/new-authorization');
	}
}

