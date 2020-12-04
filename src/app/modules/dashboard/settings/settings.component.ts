import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from './services/settings.service';
import { AppComponent } from 'src/app/app.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { DialogOptionService } from 'src/app/core/services/dialog/dialog-option.service';
import { map, first } from 'rxjs/operators';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';

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
  'mailFrom', 'smtpServer', 'userName', 'password', 'port'];

  @ViewChild('form', { static: false }) form;

  constructor( private fb: FormBuilder, private settingService: SettingsService, public appComponent: AppComponent,
               public dialog: MatDialog, private dialogOption: DialogOptionService,
               public formHandler: FormHandlerService) { }

  ngOnInit() {
    this.appComponent.showOverlay = true;

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
      port: ['', Validators.required],
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

  saveChanges() {
    this.settingsGroup.markAllAsTouched();
    this.formHandler.saveFormSettings(this.settingsGroup, this.appComponent);
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
      // this.appComponent.showOverlay = true;
      console.log(data);
      if (data.data != null) {
        // tslint:disable-next-line: prefer-for-of
        for (let x = 0; x < this.settingsFieldsNamesArray.length; x++) {
          this.settingsGroup.get(this.settingsFieldsNamesArray[x]).setValue(data.data[this.settingsFieldsNamesArray[x]]);
        }
        if (data.data.id) {
          this.settingsGroup.addControl('id', this.fb.control(''));
          this.settingsGroup.get('id').setValue(data.data.id);
        }
        setTimeout(() => {
          this.appComponent.showOverlay = false;
        }, 5000);
      }
      else {
        setTimeout(() => {
          this.appComponent.showOverlay = false;
        }, 5000);
      }
    });
  }
}
