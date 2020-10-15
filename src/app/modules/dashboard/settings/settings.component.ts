import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from './services/settings.service';
import { AppComponent } from 'src/app/app.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements OnInit {

  settingsGroup: FormGroup;

  blocked = true;
  buttonText = 'Habilitar';
  settingsFieldsNamesArray = ['vidaNuevaSolicitudRD', 'saludNuevaSolicitudMailsRD', 'disabilityNuevaSolicitudPM',
  'vidaMailsRD', 'disabilityMailsRD', 'saludMailsRD', 'vidaMailsPN', 'disabilityMailsPN', 'saludMailsPN',
  'reembolsoNuevaSolicitudRD', 'autorizacionesNuevaSolicitudMailsRD', 'autorizacionesNuevaSolicitudPM',
  'reembolsoNuevaSolicitudPM', 'reembolsoMailsRD', 'autorizacionesMailsRD', 'reembolsoMailsPM', 'autorizacionesMailsPM',
  'mailFrom', 'smtpServer', 'userName', 'password'];

  @ViewChild('form', { static: false }) form;

  constructor( private fb: FormBuilder, private settingService: SettingsService, public appComponent: AppComponent,
               public dialog: MatDialog, private dialogOption: DialogOptionService) { }

  ngOnInit() {

    this.settingsGroup = this.fb.group({
      vidaNuevaSolicitudRD: ['', Validators.required],
      saludNuevaSolicitudMailsRD: ['', Validators.required],
      disabilityNuevaSolicitudPM: ['', Validators.required],
      vidaMailsRD: ['', Validators.required],
      disabilityMailsRD: ['', Validators.required],
      saludMailsRD: ['', Validators.required],
      vidaMailsPN: ['', Validators.required],
      disabilityMailsPN: ['', Validators.required],
      saludMailsPN: ['', Validators.required],
      reembolsoNuevaSolicitudRD: ['', Validators.required],
      autorizacionesNuevaSolicitudMailsRD: ['', Validators.required],
      autorizacionesNuevaSolicitudPM: ['', Validators.required],
      reembolsoNuevaSolicitudPM: ['', Validators.required],
      reembolsoMailsRD: ['', Validators.required],
      autorizacionesMailsRD: ['', Validators.required],
      reembolsoMailsPM: ['', Validators.required],
      autorizacionesMailsPM: ['', Validators.required],
      mailFrom: ['', Validators.required],
      smtpServer: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < this.settingsFieldsNamesArray.length; x++) {
      this.settingsGroup.get(this.settingsFieldsNamesArray[x]).disable();
    }
    this.getData();
  }

  changeBlockedValue() {
    this.blocked = !this.blocked;
    if (this.blocked == true) {
      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < this.settingsFieldsNamesArray.length; x++) {
        this.settingsGroup.get(this.settingsFieldsNamesArray[x]).disable();
      }
      this.buttonText = 'Habilitar';
      console.log('El nuevo valor de this.blocked es ' + this.blocked);
    }
    else if (this.blocked == false) {
      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < this.settingsFieldsNamesArray.length; x++) {
        this.settingsGroup.get(this.settingsFieldsNamesArray[x]).enable();
      }
      this.buttonText = 'Deshabilitar';
      console.log('El nuevo valor de this.blocked es ' + this.blocked);
    }
  }

  saveChangesUseless() {
    console.log('Esto no sirve para nada, recordatorio de que hare esta funcionalidad en el formHandler de Isai');
  }

  // canDeactivate(): Observable<boolean> | boolean {
  //   if (this.form.submitted) {
  //     return true;
  //   }

  //   if (this.settingsGroup.dirty && !this.form.submitted) {
  //     const dialogRef = this.dialog.open(BaseDialogComponent, {
  //       data: this.dialogOption.exitConfirm,
  //       minWidth: 385,
  //     });
  //     return dialogRef.componentInstance.dialogRef.afterClosed().pipe(map(result => {
  //       if (result === 'true') {
  //         return true;
  //       }
  //     }), first());
  //   }
  //   return true;
  // }

  getData() {
    this.settingService.returnData().subscribe(data => {
      console.log(data);
    });
    // this.appComponent.showOverlay = true;
  }
}
