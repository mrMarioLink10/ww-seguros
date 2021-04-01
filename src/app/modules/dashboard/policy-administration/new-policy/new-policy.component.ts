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
import { ActivatedRoute } from '@angular/router';
import { FormDataFillingService } from '../../services/shared/formDataFillingService';

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

  requestsType: FieldConfig = {
    label: 'Tipo de Solicitud',
    options: [
      {
        value: 'VIDA',
        viewValue: 'Vida'
      },
      {
        value: 'SALUD',
        viewValue: 'Salud'
      },
      {
        value: 'DISABILITY',
        viewValue: 'Disability'
      },
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

  pdfOptionsVida = [
    // {
    //   name: 'REHABILITACIÓN DE POLIZA',
    //   url: ['/assets/pdfs/REHABILITACIÓN']
    // },
    // {
    //   name: 'AUMENTO SUMA ASEGURADA',
    //   url: ['/assets/pdfs/SOLICITUDSEGURODEVIDA'] // FALTA
    // },
    {
      name: 'CAMBIO DE CONTRATANTE',
      url: ['/assets/pdfs/SOLICITUDCAMBIODECONTRATANTEPOLIZAS']
    },
    {
      name: 'CAMBIO DE BENEFICIARIO',
      url: ['/assets/pdfs/SOLICITUDCAMBIODEBENEFICIARIO']
    },
    {
      name: 'CANCELACIÓN DE ENDOSO',
      url: ['/assets/pdfs/SOLICITUDCANCELACIONDEENDOSODECESION']
    },
    // {
    //   name: 'CESIÓN DE POLIZA',
    //   url: ['/assets/pdfs/SOLICITUDCESIONDEPOLIZAENGARANTIA'] // FALTA
    // },
    {
      name: 'CAMBIO DE INFORMACIÓN',
      url: ['/assets/pdfs/SOLICITUDCAMBIOPOLIZAINDIVIDUAL']
    },
    {
      name: 'CAMBIO DE FRECUENCIA DE PAGO',
      url: ['/assets/pdfs/SOLICITUDCAMBIOPOLIZAINDIVIDUAL']
    },
    // {
    //   name: 'CAMBIO DE PAGADOR',
    //   url: ['/assets/pdfs/SOLICITUDCAMBIOPOLIZA', '/assets/pdfs/FORMULARIOKYC'] // ESTA PERO NO EN CARPETA
    // },
    {
      name: 'RECLAMO DE BENEFICIARIO SEGURO DE VIDA',
      url: ['/assets/pdfs/RECLAMODEBENEFICIARIO'] // FALTA
    },
  ];

  pdfOptionsSalud = [
    // {
    //   name: 'REHABILITACIÓN DE POLIZA',
    //   url: ['/assets/pdfs/SOLICITUDCAMBIODEBENEFICIARIO', '/assets/pdfs/SOLICITUDSUSCRIPCIONGASTOSMAYORES',
    //     '/assets/pdfs/PAGODEPRIMASMEDIANTETARJETADECREDITO'] // FALTA EL DE SOLICITUD
    // },
    {
      name: 'CAMBIO DE CONTRATANTE',
      url: ['/assets/pdfs/SOLICITUDCAMBIODECONTRATANTEPOLIZAS'] // NO ES EL MISMO QUE COMO SE LLAMA EN EL EXCEL
    },
    {
      name: 'CAMBIO DE BENEFICIARIO',
      url: ['/assets/pdfs/SOLICITUDCAMBIODEBENEFICIARIO']
    },
    {
      name: 'CAMBIO DE INFORMACIÓN',
      url: ['/assets/pdfs/SOLICITUDCAMBIOPOLIZASALUDINDIVIDUAL']
    },
    {
      name: 'CAMBIO DE FRECUENCIA DE PAGO',
      url: ['/assets/pdfs/SOLICITUDCAMBIOPOLIZASALUDINDIVIDUAL']
    },
    // {
    //   name: 'CAMBIO DE PAGADOR',
    //   url: ['/assets/pdfs/SOLICITUDCAMBIOPOLIZA', '/assets/pdfs/FORMULARIOKYC'] // ESTA PERO NO EN CARPETA
    // },
  ];

  pdfOptionsDisability = [
    // {
    //   name: 'REHABILITACIÓN DE POLIZA',
    //   url: ['/assets/pdfs/REHABILITACION'] // REVISAR SI ESTA
    // },
    {
      name: 'CAMBIO DE CONTRATANTE',
      url: ['/assets/pdfs/SOLICITUDCAMBIODECONTRATANTEPOLIZAS'] // NO ES EL MISMO QUE COMO SE LLAMA EN EL EXCEL
    },
    {
      name: 'CAMBIO DE BENEFICIARIO',
      url: ['/assets/pdfs/SOLICITUDCAMBIODEBENEFICIARIO']
    },
    {
      name: 'CAMBIO DE INFORMACIÓN',
      url: ['/assets/pdfs/SOLICITUDCAMBIOPOLIZADISABILITY']
    },
    {
      name: 'CAMBIO DE FRECUENCIA DE PAGO',
      url: ['/assets/pdfs/SOLICITUDCAMBIOPOLIZADISABILITY']
    },
    // {
    //   name: 'CAMBIO DE PAGADOR',
    //   url: ['/assets/pdfs/SOLICITUDCAMBIOPOLIZA', '/assets/pdfs/FORMULARIOKYC'] // ESTA PERO NO EN CARPETA
    // },
    {
      name: 'RECLAMO POR DISABILITY',
      url: ['/assets/pdfs/RECLAMOSDISABILITY'] // REVISAR SI ESTA
    },
  ];

  pdfOptionsField = {
    label: 'Seleccionar PDF para descargar',
    options: this.pdfOptions
  };

  pdfFileGroup = {
    pdfFile: ['', Validators.required]
  };

  policyAdministrationFieldsNamesArray = ['idNumber', 'filterType', 'pdfSelector', 'personName'];

  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private appComponent: AppComponent,
    private policyAdministrationService: PolicyAdministrationService,
    private userService: UserService,
    public dialog: MatDialog,
    private dialogOption: DialogOptionService,
    public formMethods: FormArrayGeneratorService,
    public diseaseService: DiseaseService,
    private formHandler: FormHandlerService,
    private route: ActivatedRoute,
    private dataMappingFromApi: FormDataFillingService,
  ) { }

  ngOnInit() {
    this.appComponent.showOverlay = true;

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
      ramo: ['', Validators.required],
      personName: [{ value: '', disabled: true }, Validators.required],
      pdfArchives: this.fb.array([this.createFormArray()]),
    });

    this.administrationPolicyGroup.get('idNumber').valueChanges.subscribe(res => console.log(res));

    this.filteredOptions = this.administrationPolicyGroup.get('idNumber').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value),
        map(value => value ? this._filter(value) : this.dataAutoCompletePolicy.slice())
      );

    this.administrationPolicyGroup.get('ramo').valueChanges.subscribe(value => {
      console.log(value);

      if (value !== '') {
        this.pdfOptions.length = 0;
        this.administrationPolicyGroup.get('pdfSelector').reset();
        this.administrationPolicyGroup.get('pdfSelector').setValue('');
        this.returnPdfOptions(value);
        this.administrationPolicyGroup.get('pdfSelector').enable();
      }
    });

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

  returnPdfOptions(ramo: string) {

    let pdfOptionsArray;

    if (ramo === 'VIDA') {
      pdfOptionsArray = this.pdfOptionsVida;
    } else if (ramo === 'SALUD') {
      pdfOptionsArray = this.pdfOptionsSalud;
    } else {
      pdfOptionsArray = this.pdfOptionsDisability;
    }
    console.log('antes', this.pdfOptions);


    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < pdfOptionsArray.length; x++) {
      if (pdfOptionsArray[x].name) {

        this.pdfOptions.push({
          value: pdfOptionsArray[x].name,
          viewValue: pdfOptionsArray[x].name,
          url: pdfOptionsArray[x].url
          // url: this.role === 'WWS' ? `${pdfOptionsArray[x].url}(WWS).pdf` : `${pdfOptionsArray[x].url}(WWM).pdf`
        });
      }
    }

    console.log('this.pdfOptions[0].url es igual a ' + this.pdfOptions[0].url);

    console.log('despues', this.pdfOptions);
  }

  download(pdfName) {

    let pdfObject;

    this.appComponent.showOverlay = true;

    pdfObject = this.pdfOptions.find(nombrePdf => nombrePdf.value === pdfName);

    console.log('pdfObject', pdfObject);
    console.log('pdfObject.url', pdfObject.url);

    for (const key in pdfObject.url) {
      if (Object.prototype.hasOwnProperty.call(pdfObject.url, key)) {
        const element = this.role === 'WWS' ? `${pdfObject.url[key]}(WWS).pdf` : `${pdfObject.url[key]}(WWM).pdf`;

        console.log(element);

        this.policyAdministrationService.download(element)
          .subscribe(blob => {
            const a = document.createElement('a');
            // tslint:disable-next-line: align
            const objectUrl = URL.createObjectURL(blob);
            // tslint:disable-next-line: align
            a.href = objectUrl;
            // tslint:disable-next-line: align
            a.download = `${pdfObject.url[key]}.pdf`;
            // tslint:disable-next-line: align
            a.click();
            // tslint:disable-next-line: align
            URL.revokeObjectURL(objectUrl);
            // this.administrationPolicyGroup.get('pdfSelector').setValue('');
          });
      }
    }
    this.appComponent.showOverlay = false;
  }

  arrayPdfArchivesWatcher(index: number) {
    // if (this.arrayPdfArchivesTitles) {
    //   if (this.administrationPolicyGroup.get('pdfArchives')) {
    //     // tslint:disable-next-line: max-line-length
    //     if (this.arrayPdfArchivesTitles[i] && this.administrationPolicyGroup.get('pdfArchives').get(i.toString()).value.pdfFile !== '') {
    //       return this.arrayPdfArchivesTitles[i].pdfFileUrl;
    //     }
    //   }
    // }
    if (this.administrationPolicyGroup.get('pdfArchives').get(index.toString()).value.pdfFileUrl &&
      this.administrationPolicyGroup.get('pdfArchives').get(index.toString()).value.pdfFile !== '') {
      return this.administrationPolicyGroup.get('pdfArchives').get(index.toString()).value.pdfFileUrl;
    }
  }

  onStudiesChange(event, index: number) {
    const reader = new FileReader();

    console.log(event);

    // if (name == 'studies') {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.administrationPolicyGroup.get('pdfArchives').get(index.toString()).patchValue({
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
