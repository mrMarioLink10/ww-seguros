import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PolicyAdministrationService } from './services/policy-administration.service';
import { AppComponent } from 'src/app/app.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import { map, first, startWith } from 'rxjs/operators';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-policy-administration',
  templateUrl: './policy-administration.component.html',
  styles: []
})
export class PolicyAdministrationComponent implements OnInit {

  administrationPolicyGroup: FormGroup;

  idNumber2FieldVisible = false;
  searchIdNumberAccess = false;
  showContent = false;

  country: string;
  role: string;

  idNumber2Options = [];

	idNumber2Field = {
		label: 'Asegurados misma póliza' ,
		options: this.idNumber2Options
	};

  filterOptions: FieldConfig = {
		label: 'Filtro',
		options: [
			{
				value: 'NOMBRE',
				viewValue: 'Nombre'
			},
			{
				value: 'ID',
				viewValue: 'ID'
			},
			{
				value: 'POLIZA',
				viewValue: 'No. de Póliza'
			}
		]
  };

  filteredOptions: Observable<any[]>;

  dataAutoCompleteIdNumber = [];
  dataAutoCompleteIdNumberObject = [];
  dataAutoCompleteName = [];
  dataAutoCompletePolicy = [];

  pdfOptions = [];
  pdfOptionsRD = [];
  pdfOptionsPNMA = [];

	pdfOptionsField = {
		label: 'Seleccionar PDF para descargar' ,
		options: this.pdfOptions
	};

  constructor(private fb: FormBuilder, private appComponent: AppComponent,
			  // tslint:disable-next-line: align
			  private policyAdministrationService: PolicyAdministrationService, private userService: UserService,
			  // tslint:disable-next-line: align
			  public dialog: MatDialog, private dialogOption: DialogOptionService) { }

  ngOnInit() {
	this.appComponent.showOverlay = true;

	if (localStorage.getItem('countryCode')) {
		this.country = localStorage.getItem('countryCode');
	  } else {
		this.country = 'rd';
		localStorage.setItem('countryCode', this.country);
	  }

	if (localStorage.getItem('countryCode')) {
		if (this.country == 'rd') {
			this.role = 'WWS';
		}
		else if (this.country == 'pm') {
			this.role = 'WMA';
		}
	  } else {
		this.role = this.userService.getRoleCotizador();
	  }

	console.log('this.role es igual a ' + this.role);

	this.returnPdfOptions();
    // tslint:disable-next-line: align
    this.returnAutoCompleteData();
	// tslint:disable-next-line: align
    this.administrationPolicyGroup = this.fb.group({
      idNumber: ['', Validators.required],
      filterType: ['', Validators.required],
	  idNumber2: ['', Validators.required],
	  pdfSelector: ['', Validators.required],
    });
	// tslint:disable-next-line: align
    this.administrationPolicyGroup.get('filterType').valueChanges.subscribe(valueFilter => {

			this.administrationPolicyGroup.get('idNumber').setValue('');
			this.administrationPolicyGroup.get('idNumber').markAsUntouched();

			this.idNumber2FieldVisible = false;
			this.searchIdNumberAccess = false;
			this.idNumber2Options.splice(0, this.idNumber2Options.length);
			this.administrationPolicyGroup.get('idNumber2').setValue('');
			this.administrationPolicyGroup.get('idNumber2').markAsUntouched();

			if (valueFilter == 'NOMBRE') {
				this.filteredOptions = this.administrationPolicyGroup.get('idNumber').valueChanges
					.pipe(
						startWith(''),
						map(value => typeof value === 'string' ? value : value),
						map(value => value ? this._filter(value) : this.dataAutoCompleteName.slice())
					);
			}
			if (valueFilter == 'ID') {
				this.filteredOptions = this.administrationPolicyGroup.get('idNumber').valueChanges
					.pipe(
						startWith(''),
						map(value => typeof value === 'string' ? value : value),
						map(value => value ? this._filter(value) : this.dataAutoCompleteIdNumber.slice())
					);
			}
			if (valueFilter == 'POLIZA') {
				this.filteredOptions = this.administrationPolicyGroup.get('idNumber').valueChanges
					.pipe(
						startWith(''),
						map(value => typeof value === 'string' ? value : value),
						map(value => value ? this._filter(value) : this.dataAutoCompletePolicy.slice())
					);
			}
		});
		  // tslint:disable-next-line: align
		  this.administrationPolicyGroup.get('idNumber').valueChanges.subscribe(valueIdNumber => {

			if (this.idNumber2Options.length > 0) {
				if (this.idNumber2Options[0].policy) {
					if (this.idNumber2Options[0].policy != valueIdNumber) {

						this.idNumber2FieldVisible = false;
						this.searchIdNumberAccess = false;
						this.idNumber2Options.splice(0, this.idNumber2Options.length);
						this.administrationPolicyGroup.get('idNumber2').setValue('');
						this.administrationPolicyGroup.get('idNumber2').markAsUntouched();
					}
				}
			}
		});
  }

  displayFn(user: any) {
		return user ? user : '';
  }

  private _filter(value): any[] {

		if (this.administrationPolicyGroup.get('filterType').value == 'NOMBRE') {
			const filterValue = value.toLowerCase();

			return this.dataAutoCompleteName.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
		}
		if (this.administrationPolicyGroup.get('filterType').value == 'ID') {
			const filterValueNumber = value.toString();

			return this.dataAutoCompleteIdNumber.filter(option => option.toString().indexOf(filterValueNumber) === 0);
		}
		if (this.administrationPolicyGroup.get('filterType').value == 'POLIZA') {
			const filterValue = value.toLowerCase();

			return this.dataAutoCompletePolicy.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
		}
  }

  returnAutoCompleteData() {

		this.policyAdministrationService.getIdNumbers().subscribe(data => {
			console.log(data.data);
			// tslint:disable-next-line: prefer-for-of
			for (let x = 0; x < data.data.length; x++) {
				// this.dataAutoCompleteIdNumber.push(data.data[x].asegurado.nombres_asegurado +
				// 	' ' + data.data[x].asegurado.apellidos_asegurado + ' - '
				// 	+ data.data[x].asegurado.id_asegurado);

				this.dataAutoCompleteIdNumberObject.push({
					name: data.data[x].asegurado.nombres_asegurado + ' ' + data.data[x].asegurado.apellidos_asegurado,
					// id: data.data[x].asegurado.id_asegurado,
					policy: data.data[x].asegurado.no_poliza,
					value: data.data[x].asegurado.id_asegurado
				});
				this.dataAutoCompleteName.push(data.data[x].asegurado.nombres_asegurado + ' ' + data.data[x].asegurado.apellidos_asegurado);

				this.dataAutoCompleteIdNumber.push(data.data[x].asegurado.id_asegurado);

				this.dataAutoCompletePolicy.push(data.data[x].asegurado.no_poliza);
			}
			this.appComponent.showOverlay = false;
		});
  }

  returnPdfOptions() {
	  this.pdfOptionsPNMA.push({
		value: 'pdf vida',
		viewValue: 'PDF Vida panama',
		url: 'http.com.vidaPDf'
	});
	//   this.pdfOptionsRD.push({
	// 	name: data.data[x].asegurado.nombres_asegurado + ' ' + data.data[x].asegurado.apellidos_asegurado,
	// 	// id: data.data[x].asegurado.id_asegurado,
	// 	policy: data.data[x].asegurado.no_poliza,
	// 	value: data.data[x].asegurado.id_asegurado
	// });
	  this.pdfOptions = this.pdfOptionsPNMA;
	  console.log(this.pdfOptions);
  }

  searchIdNumber(idNumber: string) {

		let idNumberObject;

		if (idNumber != '' && idNumber != null && idNumber != undefined) {
			console.log(idNumber);
			if (this.administrationPolicyGroup.get('filterType').value == 'NOMBRE') {
				this.searchIdNumberAccess = true;
				if (this.dataAutoCompleteIdNumberObject.find(nombre => nombre.name == idNumber)) {
					console.log('Asegurado encontrado');
					idNumberObject = this.dataAutoCompleteIdNumberObject.find(nombre =>
						nombre.name == idNumber);
					idNumber = (idNumberObject.value).toString();
				}
				else {
					console.log('Asegurado no encontrado');
				}
			}
			if (this.administrationPolicyGroup.get('filterType').value == 'ID') {
				this.searchIdNumberAccess = true;
				idNumber = (idNumber).toString();
			}
			if (this.administrationPolicyGroup.get('filterType').value == 'POLIZA' && this.idNumber2Options.length == 0) {
				this.appComponent.showOverlay = true;
				if (this.dataAutoCompleteIdNumberObject.find(nombre => nombre.policy == idNumber)) {
					console.log('Póliza encontrada');
					const idNumber2Policy = idNumber;
					// tslint:disable-next-line: prefer-for-of
					for (let x = 0; x < this.dataAutoCompleteIdNumberObject.length; x++) {
						if (idNumber2Policy == this.dataAutoCompleteIdNumberObject[x].policy) {
							this.idNumber2Options.push({
									value: this.dataAutoCompleteIdNumberObject[x].name,
									viewValue: this.dataAutoCompleteIdNumberObject[x].name,
									policy: this.dataAutoCompleteIdNumberObject[x].policy
								});
						}
					}
					if (this.idNumber2Options.length > 1) {
						this.idNumber2FieldVisible = true;
						this.searchIdNumberAccess = false;
					}
					else {
						this.idNumber2FieldVisible = false;
						this.searchIdNumberAccess = true;
						this.administrationPolicyGroup.get('idNumber2').setValue('');
						this.administrationPolicyGroup.get('idNumber2').markAsUntouched();

						idNumberObject = this.dataAutoCompleteIdNumberObject.find(nombre =>
							nombre.policy == idNumber);
						idNumber = (idNumberObject.value).toString();
						this.idNumber2Options.splice(0, this.idNumber2Options.length);
					}
				}
				else {
					console.log('Póliza no encontrada');
					this.searchIdNumberAccess = true;
				}
				// setTimeout(() => {
				this.appComponent.showOverlay = false;
				// }, 1000);
			}

			if (this.administrationPolicyGroup.get('idNumber2').value != '' && this.idNumber2FieldVisible == true) {
				this.searchIdNumberAccess = true;
				const idNumber2Value = this.administrationPolicyGroup.get('idNumber2').value;

				idNumberObject = this.dataAutoCompleteIdNumberObject.find(nombre =>
					nombre.name == idNumber2Value);
				idNumber = (idNumberObject.value).toString();
			}

			idNumberObject = this.dataAutoCompleteIdNumberObject.find(nombre =>
				nombre.name == idNumber);
			console.log(idNumberObject);

			if (this.searchIdNumberAccess == true) {

			this.appComponent.showOverlay = true;
			this.userService.getInsurancePeople(idNumber)
				.subscribe((response: any) => {
					console.log(response);
					this.appComponent.showOverlay = false;
					if (response.data !== null) {
						this.showContent = true;
						const dialogRef = this.dialog.open(BaseDialogComponent, {
							data: this.dialogOption.idNumberFound(response.data),
							minWidth: 385,
						});
						setTimeout(() => {
							dialogRef.close();
						}, 4000);

					} else {
						this.showContent = false;
						const dialogRef = this.dialog.open(BaseDialogComponent, {
							data: this.dialogOption.idNumberNotFound,
							minWidth: 385,
						});
						setTimeout(() => {
							dialogRef.close();
						}, 4000);
					}
				});
			}
		}
	}
}
