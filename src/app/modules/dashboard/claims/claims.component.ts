import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
		nombre: 'Danilo Martes',
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
		nombre: 'Luis Manuel',
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
		nombre: 'Robert Medina',
		seguro: 'Salud',
		plan: 'Nombre del Plan',
		fecha: new Date(),
		monto: 2000,
		estatus: 'Reembolsado'
	},
	{
		no: 986543,
		nombre: 'Danilo Antonio',
		seguro: 'Salud',
		plan: 'Nombre del Plan',
		fecha: new Date(),
		monto: 2000,
		estatus: 'Reembolsado'
	}
];

@Component({
	selector: 'app-claims',
	templateUrl: './claims.component.html',
	styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
	statusTypes = ['Enviado', 'Reembolsado', 'Denegado'];

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
	dataSource = new MatTableDataSource(ELEMENT_DATA);

	@ViewChild(MatSort, { static: true })
	sort: MatSort;
	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;

	testForm: FormGroup;

	constructor(private route: Router, private fb: FormBuilder) { }

	ngOnInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

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
