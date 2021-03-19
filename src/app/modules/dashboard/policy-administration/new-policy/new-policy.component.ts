import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { DiseaseService } from '../../shared/components/disease/shared/disease/disease.service';
import { PolicyAdministrationService } from '../services/policy-administration.service';

@Component({
  selector: 'app-new-policy',
  templateUrl: './new-policy.component.html',
  styleUrls: ['./new-policy.component.scss']
})
export class NewPolicyComponent implements OnInit {

  administrationPolicyGroup: FormGroup;

  idNumber2FieldVisible = false;
  searchIdNumberAccess = false;
  showContent = false;

  country = '';
  role: string;

  idNumber2Options = [];

  idNumber2Field = {
    label: 'Asegurados misma póliza',
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

  arrayPdfArchivesTitles = [];

  pdfOptions = [];

  pdfOptionsRD = [
    {
      name: 'SOLICITUD DE CAMBIO DE BENEFICIARIO',
      url: '/assets/pdfs/SOLICITUDCAMBIODEBENEFICIARIO(WWS).pdf'
    },
    {
      name: 'SOLICITUD DE CAMBIO DE CONTRATANTE',
      url: '/assets/pdfs/SOLICITUDCAMBIODECONTRATANTEPOLIZAS(WWS).pdf'
    },
    {
      name: 'SOLICITUD DE CAMBIO - PÓLIZA',
      url: '/assets/pdfs/SOLICITUDCAMBIOPOLIZA(WWS).pdf'
    },
    {
      name: 'SOLICITUD DE CAMBIO - PÓLIZA DE DISABILITY',
      url: '/assets/pdfs/SOLICITUDCAMBIOPOLIZADISABILITY(WWS).pdf'
    },
    {
      name: 'SOLICITUD DE CAMBIO - PÓLIZA DE VIDA INDIVIDUAL',
      url: '/assets/pdfs/SOLICITUDCAMBIOPOLIZAINDIVIDUAL(WWS).pdf'
    },
    {
      name: 'SOLICITUD DE CAMBIO - PÓLIZA DE SALUD',
      url: '/assets/pdfs/SOLICITUDCAMBIOPOLIZASALUDINDIVIDUAL(WWS).pdf'
    },
    {
      name: 'CANCELACIÓN DE ENDOSO DE CESIÓN DE DERECHOS',
      url: '/assets/pdfs/SOLICITUDCANCELACIONDEENDOSODECESION(WWS).pdf'
    }
  ];

  pdfOptionsPNMA = [
    {
      name: 'SOLICITUD DE CAMBIO DE BENEFICIARIO',
      url: '/assets/pdfs/SOLICITUDCAMBIODEBENEFICIARIO(WWM).pdf'
    },
    {
      name: 'SOLICITUD DE CAMBIO DE CONTRATANTE',
      url: '/assets/pdfs/SOLICITUDCAMBIODECONTRATANTEPOLIZAS(WWM).pdf'
    },
    {
      name: 'SOLICITUD DE CAMBIO - PÓLIZA',
      url: '/assets/pdfs/SOLICITUDCAMBIOPOLIZA(WWM).pdf'
    },
    {
      name: 'SOLICITUD DE CAMBIO - PÓLIZA DE DISABILITY',
      url: '/assets/pdfs/SOLICITUDCAMBIOPOLIZADISABILITY(WWM).pdf'
    },
    {
      name: 'SOLICITUD DE CAMBIO - PÓLIZA DE VIDA INDIVIDUAL',
      url: '/assets/pdfs/SOLICITUDCAMBIOPOLIZAINDIVIDUAL(WWM).pdf'
    },
    {
      name: 'SOLICITUD DE CAMBIO - PÓLIZA DE SALUD',
      url: '/assets/pdfs/SOLICITUDCAMBIOPOLIZASALUDINDIVIDUAL(WWM).pdf'
    },
    {
      name: 'CANCELACIÓN DE ENDOSO DE CESIÓN DE DERECHOS',
      url: '/assets/pdfs/SOLICITUDCANCELACIONDEENDOSODECESION(WWM).pdf'
    }
  ];

  pdfOptionsField = {
    label: 'Seleccionar PDF para descargar',
    options: this.pdfOptions
  };

  pdfFileGroup = {
    pdfFile: ['', Validators.required]
  };

  policyAdministrationFieldsNamesArray = ['idNumber', 'filterType', 'pdfSelector', 'personName'];

  constructor(
    private fb: FormBuilder,
    private appComponent: AppComponent,
    private policyAdministrationService: PolicyAdministrationService,
    private userService: UserService,
    public dialog: MatDialog,
    private dialogOption: DialogOptionService,
    public formMethods: FormArrayGeneratorService,
    public diseaseService: DiseaseService,
    private formHandler: FormHandlerService
  ) { }

  ngOnInit() {
    this.appComponent.showOverlay = true;

    console.log(this.userService.getRoles());

    if (this.userService.getRoles().includes('WWS') && this.userService.getRoles().includes('WMA')) {
      this.country = localStorage.getItem('countryCode');

      if (this.country == 'rd') {
        this.role = 'WWS';
      }
      else if (this.country == 'pn') {
        this.role = 'WMA';
      }
    }
    else {
      this.role = this.userService.getRoleCotizador();
    }

    // console.log(this.userService.getRoleCotizador());

    console.log('this.country es igual a ' + this.country);
    console.log('this.role es igual a ' + this.role);

    this.returnPdfOptions();
    // tslint:disable-next-line: align
    this.returnAutoCompleteData();
    // tslint:disable-next-line: align
    this.administrationPolicyGroup = this.fb.group({
      idNumber: ['', Validators.required],
      filterType: ['POLIZA', Validators.required],
      idNumber2: [''],
      pdfSelector: ['', Validators.required],
      ramo: ['', Validators.required],
      personName: [{ value: '', disabled: true }, Validators.required],
      pdfArchives: this.fb.group({ pdfFile: [''] }),
    });
    // tslint:disable-next-line: align
    // this.administrationPolicyGroup.get('filterType').valueChanges.subscribe(valueFilter => {

    // 		this.administrationPolicyGroup.get('idNumber').setValue('');
    // 		this.administrationPolicyGroup.get('idNumber').markAsUntouched();

    // 		this.idNumber2FieldVisible = false;
    // 		this.searchIdNumberAccess = false;
    // 		this.idNumber2Options.splice(0, this.idNumber2Options.length);
    // 		this.administrationPolicyGroup.get('idNumber2').setValue('');
    // 		this.administrationPolicyGroup.get('idNumber2').markAsUntouched();

    // 		if (valueFilter == 'NOMBRE') {
    // 			this.filteredOptions = this.administrationPolicyGroup.get('idNumber').valueChanges
    // 				.pipe(
    // 					startWith(''),
    // 					map(value => typeof value === 'string' ? value : value),
    // 					map(value => value ? this._filter(value) : this.dataAutoCompleteName.slice())
    // 				);
    // 		}
    // 		if (valueFilter == 'ID') {
    // 			this.filteredOptions = this.administrationPolicyGroup.get('idNumber').valueChanges
    // 				.pipe(
    // 					startWith(''),
    // 					map(value => typeof value === 'string' ? value : value),
    // 					map(value => value ? this._filter(value) : this.dataAutoCompleteIdNumber.slice())
    // 				);
    // 		}
    // 		if (valueFilter == 'POLIZA') {
    // 			this.filteredOptions = this.administrationPolicyGroup.get('idNumber').valueChanges
    // 				.pipe(
    // 					startWith(''),
    // 					map(value => typeof value === 'string' ? value : value),
    // 					map(value => value ? this._filter(value) : this.dataAutoCompletePolicy.slice())
    // 				);
    // 		}
    // 	});

    this.filteredOptions = this.administrationPolicyGroup.get('idNumber').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value),
        map(value => value ? this._filter(value) : this.dataAutoCompletePolicy.slice())
      );

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

    // this.getData();
  }

  displayFn(user: any) {
    return user ? user : '';
  }

  private _filter(value): any[] {

    // if (this.administrationPolicyGroup.get('filterType').value == 'NOMBRE') {
    // 	const filterValue = value.toLowerCase();

    // 	return this.dataAutoCompleteName.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    // }
    // if (this.administrationPolicyGroup.get('filterType').value == 'ID') {
    // 	const filterValueNumber = value.toString();

    // 	return this.dataAutoCompleteIdNumber.filter(option => option.toString().indexOf(filterValueNumber) === 0);
    // }
    // if (this.administrationPolicyGroup.get('filterType').value == 'POLIZA') {
    // 	const filterValue = value.toLowerCase();

    // 	return this.dataAutoCompletePolicy.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    // }

    const filterValue = value.toLowerCase();

    return this.dataAutoCompletePolicy.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  returnAutoCompleteData() {

    this.policyAdministrationService.getIdNumbers().subscribe(data => {
      console.log(data.data);
      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < data.data.length; x++) {

        this.dataAutoCompleteIdNumberObject.push({
          name: data.data[x].asegurado.nombres_asegurado + ' ' + data.data[x].asegurado.apellidos_asegurado,
          policy: data.data[x].asegurado.no_poliza,
          value: data.data[x].asegurado.id_asegurado
        });
        this.dataAutoCompleteName.push(data.data[x].asegurado.nombres_asegurado + ' ' + data.data[x].asegurado.apellidos_asegurado);

        this.dataAutoCompleteIdNumber.push(data.data[x].asegurado.id_asegurado);

        this.dataAutoCompletePolicy.push(data.data[x].asegurado.no_poliza);
      }

      // tslint:disable-next-line: align
      setTimeout(() => {
        this.administrationPolicyGroup.get('idNumber').setValue('');
        this.administrationPolicyGroup.get('idNumber').markAsUntouched();
      }, 1000);

      setTimeout(() => {
        this.appComponent.showOverlay = false;
      }, 3000);
    });
  }

  returnPdfOptions() {

    if (this.role == 'WWS') {
      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < this.pdfOptionsRD.length; x++) {
        this.pdfOptions.push({
          value: this.pdfOptionsRD[x].name,
          viewValue: this.pdfOptionsRD[x].name,
          url: this.pdfOptionsRD[x].url
        });
      }
      console.log('this.pdfOptions[0].url es igual a ' + this.pdfOptions[0].url);
    }
    else if (this.role == 'WMA') {
      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < this.pdfOptionsPNMA.length; x++) {
        this.pdfOptions.push({
          value: this.pdfOptionsPNMA[x].name,
          viewValue: this.pdfOptionsPNMA[x].name,
          url: this.pdfOptionsPNMA[x].url
        });
      }
    }
    console.log(this.pdfOptions);
  }

  download(pdfName) {

    let pdfObject;

    this.appComponent.showOverlay = true;

    pdfObject = this.pdfOptions.find(nombrePdf => nombrePdf.value == pdfName);

    console.log('hola, soy descarga');
    console.log('hola, soy pdfObject, y soy igual a ', pdfObject);
    console.log('hola, soy pdfObject.url, y soy igual a ' + pdfObject.url);

    this.policyAdministrationService.download(pdfObject.url)
      .subscribe(blob => {
        const a = document.createElement('a');
        // tslint:disable-next-line: align
        const objectUrl = URL.createObjectURL(blob);
        // tslint:disable-next-line: align
        a.href = objectUrl;
        // tslint:disable-next-line: align
        a.download = `${pdfObject.value}.pdf`;
        // tslint:disable-next-line: align
        a.click();
        // tslint:disable-next-line: align
        URL.revokeObjectURL(objectUrl);
        // this.administrationPolicyGroup.get('pdfSelector').setValue('');
        this.appComponent.showOverlay = false;
      });
  }

  arrayPdfArchivesWatcher() {
    // if (this.arrayPdfArchivesTitles) {
    //   if (this.administrationPolicyGroup.get('pdfArchives')) {
    //     // tslint:disable-next-line: max-line-length
    //     if (this.arrayPdfArchivesTitles[i] && this.administrationPolicyGroup.get('pdfArchives').get(i.toString()).value.pdfFile !== '') {
    //       return this.arrayPdfArchivesTitles[i].pdfFileUrl;
    //     }
    //   }
    // }
    if (this.administrationPolicyGroup.get('pdfArchives').value.pdfFileUrl &&
      this.administrationPolicyGroup.get('pdfArchives').value.pdfFile !== '') {
      return this.administrationPolicyGroup.get('pdfArchives').value.pdfFileUrl;
    }
  }

  onStudiesChange(event) {
    const reader = new FileReader();

    console.log(event);

    // if (name == 'studies') {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.administrationPolicyGroup.get('pdfArchives').patchValue({
          ['pdfFile']: reader.result
        });
      };
    }
    // }
  }

  addToList(list: any) {
    console.warn('list', list);
    list.push(this.createFormArray());
  }

  createFormArray() {
    return this.fb.group(this.pdfFileGroup);
  }

  saveChanges() {
    // console.log(JSON.stringify(this.administrationPolicyGroup.getRawValue()));
    this.administrationPolicyGroup.markAllAsTouched();
    // tslint:disable-next-line: align
    this.formHandler.saveFormAdministrationPolicy(this.administrationPolicyGroup, this.appComponent);
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

              // tslint:disable-next-line: max-line-length
              this.administrationPolicyGroup.get('personName').setValue(`${response.data.asegurado.nombres_asegurado} ${response.data.asegurado.apellidos_asegurado}`);
            } else {
              this.showContent = false;
              const dialogRef = this.dialog.open(BaseDialogComponent, {
                data: this.dialogOption.idNumberNotFound,
                minWidth: 385,
              });
              setTimeout(() => {
                dialogRef.close();
              }, 4000);
              this.administrationPolicyGroup.get('personName').setValue('');
            }
          });
      }
    }
  }

  getData() {
    // this.appComponent.showOverlay = true;

    // this.policyAdministrationService.returnData().subscribe(data => {

    // 	console.log(data.data);

    // 	if (data.data != null) {
    // 		// tslint:disable-next-line: prefer-for-of
    // 		for (let x = 0; x < this.policyAdministrationFieldsNamesArray.length; x++) {
    // 		  this.administrationPolicyGroup.get(this.policyAdministrationFieldsNamesArray[x]
    // 			).setValue(data.data[this.policyAdministrationFieldsNamesArray[x]]);
    // 		}
    // 		if (this.administrationPolicyGroup.get('filterType').value == 'POLIZA') {

    // 			const idNumber2Policy = this.administrationPolicyGroup.get('idNumber').value;
    // 			// tslint:disable-next-line: prefer-for-of
    // 			for (let x = 0; x < this.dataAutoCompleteIdNumberObject.length; x++) {
    // 				if (idNumber2Policy == this.dataAutoCompleteIdNumberObject[x].policy) {
    // 					this.idNumber2Options.push({
    // 							value: this.dataAutoCompleteIdNumberObject[x].name,
    // 							viewValue: this.dataAutoCompleteIdNumberObject[x].name,
    // 							policy: this.dataAutoCompleteIdNumberObject[x].policy
    // 						});
    // 				}
    // 			}
    // 			if (this.idNumber2Options.length > 1) {
    // 				this.idNumber2FieldVisible = true;
    // 				this.searchIdNumberAccess = true;
    // 				this.administrationPolicyGroup.get('idNumber2').setValue(data.data.idNumber2);
    // 			}
    // 			else {
    // 				this.idNumber2FieldVisible = false;
    // 				this.searchIdNumberAccess = true;
    // 				// this.administrationPolicyGroup.get('idNumber2').setValue('');
    // 				// this.administrationPolicyGroup.get('idNumber2').markAsUntouched();

    // 				this.idNumber2Options.splice(0, this.idNumber2Options.length);
    // 			}
    // 		}
    // 		this.administrationPolicyGroup.get('pdfArchives').get('pdfFile').setValue(data.data.pdfArchives.pdfFile);

    // 		if (data.data.pdfArchives.pdfFileUrl) {
    // 		  this.administrationPolicyGroup.get('pdfArchives').addControl('pdfFileUrl', this.fb.control(''));
    // 		  this.administrationPolicyGroup.get('pdfArchives').get('pdfFileUrl').setValue(data.data.pdfArchives.pdfFileUrl);
    // 		}

    // 		if (data.data.pdfArchives.id) {
    // 		  this.administrationPolicyGroup.get('pdfArchives').addControl('id', this.fb.control(''));
    // 		  this.administrationPolicyGroup.get('pdfArchives').get('id').setValue(data.data.pdfArchives.id);
    // 		}

    // 		if (data.data.id) {
    // 		  this.administrationPolicyGroup.addControl('id', this.fb.control(''));
    // 		  this.administrationPolicyGroup.get('id').setValue(data.data.id);
    // 		}
    // 		setTimeout(() => {
    //    this.showContent = true;
    // 		  this.appComponent.showOverlay = false;
    // 		}, 5000);
    // 	  }
    // 	  else {
    // 		setTimeout(() => {
    // 		  this.appComponent.showOverlay = false;
    // 		}, 5000);
    // 	  }
    // });
  }
}
