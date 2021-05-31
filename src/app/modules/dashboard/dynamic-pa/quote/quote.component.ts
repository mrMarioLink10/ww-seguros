import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { PolicyAdministrationService } from '../../policy-administration/services/policy-administration.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { MatDialog } from '@angular/material';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { DiseaseService } from '../../shared/components/disease/shared/disease/disease.service';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { ActivatedRoute } from '@angular/router';
import { FormDataFillingService } from '../../services/shared/formDataFillingService';
import { startWith, map } from 'rxjs/operators';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { QuoteService } from '../services/quote.service';
import { environment } from 'src/environments/environment';

// tslint:disable: max-line-length
@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  administrationPolicyGroup: FormGroup;

  idNumber2FieldVisible = false;
  searchIdNumberAccess = false;
  showContent = false;

  country = '';
  role: string;
  isRamoSalud = false;

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

  changeType: FieldConfig = {
    label: 'Tipo de Solicitud',
    options: [
      {
        value: 'CAMBIO DE PRODUCTO',
        viewValue: 'Cambio de producto'
      }
    ]
  };

  available: FieldConfig = {
    label: 'Disponibles',
    options: []
  };

  filteredOptions: Observable<any[]>;

  dataAutoCompleteIdNumber = [];
  dataAutoCompleteIdNumberObject = [];
  dataAutoCompleteName = [];
  dataAutoCompletePolicy = [];

  arrayPdfArchivesTitles = [];

  policyAdministrationFieldsNamesArray = ['idNumber', 'filterType', 'pdfSelector', 'personName'];

  isEditing = false;
  requestInfo = '';

  constructor(
    private fb: FormBuilder,
    private appComponent: AppComponent,
    private policyAdministrationService: PolicyAdministrationService,
    private userService: UserService,
    public dialog: MatDialog,
    private dialogOption: DialogOptionService,
    public formMethods: FormArrayGeneratorService,
    private formHandler: FormHandlerService,
    private route: ActivatedRoute,
    private dataMappingFromApi: FormDataFillingService,
    private quoteService: QuoteService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.appComponent.showOverlay = true;
    });

    console.log(this.userService.getRoles());

    if (this.userService.getRoles().includes('WWS') && this.userService.getRoles().includes('WMA')) {
      this.country = localStorage.getItem('countryCode');

      if (this.country === 'rd') {
        this.role = 'WWS';
      } else if (this.country === 'pn') {
        this.role = 'WMA';
      }
    } else {
      this.role = this.userService.getRoleCotizador();
    }

    // console.log(this.userService.getRoleCotizador());

    console.log('this.country es igual a ' + this.country);
    console.log('this.role es igual a ' + this.role);

    this.returnAutoCompleteData();

    this.administrationPolicyGroup = this.fb.group({
      idNumber: ['', Validators.required],
      filterType: ['POLIZA', Validators.required],
      idNumber2: [''],
      pdfSelector: [{ value: '', disabled: true }, Validators.required],
      tipoSolicitud: ['', Validators.required],
      productoTo: ['', Validators.required],
      personName: [{ value: '', disabled: true }, Validators.required],
    });

    this.administrationPolicyGroup.get('idNumber').valueChanges.subscribe(res => console.log(res));

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
          if (this.idNumber2Options[0].policy !== valueIdNumber) {

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

    this.route.data.subscribe((response: any) => {
      console.warn('Response de ruta:', response);
      if (response.data) {
        if (response.data.personName) {
          this.isEditing = true;
          this.getData(response.data);
        }
      }
    });
  }

  displayFn(user: any) {
    return user ? user : '';
  }

  private _filter(value): any[] {
    const filterValue = value.toLowerCase();

    return this.dataAutoCompletePolicy.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  selectChangeType(event) {
    this.appComponent.showOverlay = true;
    this.administrationPolicyGroup.get('productoTo').setValue('');
    this.administrationPolicyGroup.get('productoTo').reset();
    this.available.options.length = 0;

    if (event.valor === 'CAMBIO DE PRODUCTO') {
      this.quoteService.getProductChange(this.administrationPolicyGroup.value.idNumber, this.country)
        .subscribe((res: any) => {
          this.completeAvailableOptions(res.data);
          this.appComponent.showOverlay = false;
        });
    } else {
      this.quoteService.getDeductible(this.administrationPolicyGroup.value.idNumber, this.country)
        .subscribe((res: any) => {
          this.completeAvailableOptions(res.data);
          this.appComponent.showOverlay = false;
        });
    }
  }

  selectAvailable(event) {
    this.appComponent.showOverlay = true;

    if (this.administrationPolicyGroup.get('tipoSolicitud').value === 'CAMBIO DE PRODUCTO') {
      this.quoteService.getProductChangeSelected(this.administrationPolicyGroup.value.idNumber, event.valor, this.country)
        .subscribe((res: any) => {
          console.log(res);
          this.appComponent.showOverlay = false;
        });
    } else {
      this.quoteService.getDeductibleSelected(this.administrationPolicyGroup.value.idNumber, event.valor, this.country)
        .subscribe((res: any) => {
          console.log(res);
          this.appComponent.showOverlay = false;
        });
    }
  }

  completeAvailableOptions(data) {
    console.log(data);
    if (data.length > 0) {
      for (const i of data) {
        console.log(i);
        this.available.options.push({
          value: i.value,
          viewValue: i.text
        });
      }
    } else {
      const dialogRef = this.dialog.open(BaseDialogComponent, {
        data: this.dialogOption.noAvaliableChanges,
        minWidth: 385,
      });
      setTimeout(() => {
        dialogRef.close();
      }, 4000);
    }
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

        this.dataAutoCompletePolicy = this.dataAutoCompletePolicy.reduce((unique, o) => {
          if (!unique.some(obj => obj === o)) {
            unique.push(o);
          }
          return unique;
        }, []);
      }

      // tslint:disable-next-line: align
      setTimeout(() => {
        if (!this.isEditing) {
          this.administrationPolicyGroup.get('idNumber').setValue('');
          this.administrationPolicyGroup.get('idNumber').markAsUntouched();
        }
      }, 1000);

      setTimeout(() => {
        this.appComponent.showOverlay = false;
      }, 3000);
    });
  }

  saveChanges() {
    // console.log(JSON.stringify(this.administrationPolicyGroup.getRawValue()));
    this.administrationPolicyGroup.markAllAsTouched();
    // tslint:disable-next-line: align
    this.formHandler.saveDynamicQuote(this.administrationPolicyGroup, this.appComponent);
  }

  searchIdNumber(idNumber: string) {

    let idNumberObject;

    if (idNumber !== '' && idNumber != null && idNumber !== undefined) {
      console.log(idNumber);
      if (this.administrationPolicyGroup.get('filterType').value === 'NOMBRE') {
        this.searchIdNumberAccess = true;
        if (this.dataAutoCompleteIdNumberObject.find(nombre => nombre.name === idNumber)) {
          console.log('Asegurado encontrado');
          idNumberObject = this.dataAutoCompleteIdNumberObject.find(nombre =>
            nombre.name === idNumber);
          idNumber = (idNumberObject.value).toString();
        } else {
          console.log('Asegurado no encontrado');
        }
      }
      if (this.administrationPolicyGroup.get('filterType').value === 'ID') {
        this.searchIdNumberAccess = true;
        idNumber = (idNumber).toString();
      }
      if (this.administrationPolicyGroup.get('filterType').value === 'POLIZA' && this.idNumber2Options.length === 0) {
        this.appComponent.showOverlay = true;
        if (this.dataAutoCompleteIdNumberObject.find(nombre => nombre.policy === idNumber)) {
          console.log('Póliza encontrada');
          const idNumber2Policy = idNumber;
          // tslint:disable-next-line: prefer-for-of
          for (let x = 0; x < this.dataAutoCompleteIdNumberObject.length; x++) {
            if (idNumber2Policy === this.dataAutoCompleteIdNumberObject[x].policy) {
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
          } else {
            this.idNumber2FieldVisible = false;
            this.searchIdNumberAccess = true;
            this.administrationPolicyGroup.get('idNumber2').setValue('');
            this.administrationPolicyGroup.get('idNumber2').markAsUntouched();

            idNumberObject = this.dataAutoCompleteIdNumberObject.find(nombre =>
              nombre.policy === idNumber);
            idNumber = (idNumberObject.value).toString();
            this.idNumber2Options.splice(0, this.idNumber2Options.length);
          }
        } else {
          console.log('Póliza no encontrada');
          this.searchIdNumberAccess = true;
        }
        // setTimeout(() => {
        this.appComponent.showOverlay = false;
        // }, 1000);
      }

      if (this.administrationPolicyGroup.get('idNumber2').value !== '' && this.idNumber2FieldVisible === true) {
        this.searchIdNumberAccess = true;
        const idNumber2Value = this.administrationPolicyGroup.get('idNumber2').value;

        idNumberObject = this.dataAutoCompleteIdNumberObject.find(nombre =>
          nombre.name === idNumber2Value);
        idNumber = (idNumberObject.value).toString();
      }

      idNumberObject = this.dataAutoCompleteIdNumberObject.find(nombre =>
        nombre.name === idNumber);
      console.log(idNumberObject);

      if (this.searchIdNumberAccess === true) {

        this.appComponent.showOverlay = true;
        this.userService.getInsurancePeople(idNumber)
          .subscribe((response: any) => {
            console.log(response);
            console.warn('RAMO: ', response.data.polizas[0].ramo);
            this.isRamoSalud = response.data.polizas[0].ramo === 'SALUD' ? true : false;

            if (this.isRamoSalud) {
              this.changeType = {
                label: 'Tipo de Solicitud',
                options: [
                  {
                    value: 'CAMBIO DE PRODUCTO',
                    viewValue: 'Cambio de producto'
                  },
                  {
                    value: 'CAMBIO DE DEDUCIBLE',
                    viewValue: 'Cambio de deducible'
                  },
                ]
              };
            }

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

  newQuote(poliza?, isProducto?, id?) {
    this.administrationPolicyGroup.markAllAsTouched();
    this.formHandler.saveDynamicQuote(this.administrationPolicyGroup, this.appComponent);

    // if (this.userService.getRoles().includes('WWS') && this.userService.getRoles().includes('WMA')) {
    //   const country = localStorage.getItem('countryCode');
    //   country === 'rd' ? window.open(`${environment.urlCotizadores}/?cia=wws&poliza=${poliza}&producto`, '_blank') : window.open(`${environment.urlCotizadores}/?cia=wwm`, '_blank');

    // } else {
    //   if (this.userService.getRoleCotizador() === 'WWS') {
    //     window.open(`${environment.urlCotizadores}/?cia=wws`, '_blank');
    //   } else if (this.userService.getRoleCotizador() === 'WMA') {
    //     window.open(`${environment.urlCotizadores}/?cia=wwm`, '_blank');
    //   }
    // }

  }


  getData(data: any) {
    this.appComponent.showOverlay = true;

    console.log('DATA PARA EDITAR:', data);
    this.dataMappingFromApi.iterateThroughtAllObject(data, this.administrationPolicyGroup);

    console.log('FORMULARIO LUEGO', this.administrationPolicyGroup.getRawValue());

    this.administrationPolicyGroup.get('idNumber').setValue(data.idNumber);
    this.administrationPolicyGroup.get('idNumber2').setValue(data.idNumber2);
    this.administrationPolicyGroup.get('pdfSelector').setValue(data.pdfSelector);
    this.administrationPolicyGroup.removeControl('countryCode');
    this.administrationPolicyGroup.removeControl('createdBy');
    this.administrationPolicyGroup.removeControl('createdNameBy');
    this.administrationPolicyGroup.removeControl('creationDate');
    this.administrationPolicyGroup.removeControl('directorioSolicitud');
    this.administrationPolicyGroup.removeControl('lastChangeBy');
    this.administrationPolicyGroup.removeControl('status');
    this.administrationPolicyGroup.removeControl('updateDate');

    console.log('FORMULARIO LUEGO', this.administrationPolicyGroup.getRawValue());


    this.showContent = true;

  }
}
