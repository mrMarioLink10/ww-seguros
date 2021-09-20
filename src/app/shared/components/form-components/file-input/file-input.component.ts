import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { RequestsService } from '../../../../modules/dashboard/services/requests/requests.service';
import { FileValidator } from 'ngx-material-file-input';
import { MatDialog } from '@angular/material';
import { BaseDialog } from '../../base-dialog/models/base-dialog';
import { BaseDialogComponent } from '../../base-dialog/base-dialog.component';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit, DoCheck {
  @Input() label: string;
  @Input() name: string;
  @Input() value?: string;
  @Input() placeholder: string;
  @Input() disabled?: boolean;
  @Input() group: FormGroup;
  @Input() fileNameWatcher: any;
  // @Input() onFileChange: any;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onFileChange = new EventEmitter<any>();

  propertyName;
  eventProperty;
  numberEventSizeAccessProperty;
  
  fileSizeMessage: BaseDialog = {
		logo: 'warning',
		title: 'Advertencia',
		text: `Lo sentimos, pero el archivo que intento subir pesa más de, o es más grande que, 4MB, 
    por lo cual será borrado. Intente subir un archivo que sea igual o menor que 4MB, por favor.`,
		showButtons: true,
		showCancelButton: false,
		textPrincipalButton: 'Aceptar',
		// textCancelButton: 'Cancelar'
	};
  
  constructor(
    public requestService: RequestsService,
    private dialog: MatDialog,
  ) { }

  runOnFileChange(event): void {

    event.propertyName = this.propertyName;
    this.onFileChange.emit(event);
    this.eventProperty = event;
    this.numberEventSizeAccessProperty = 0;
  }

  ngOnInit() {
    console.log(this.group);
    console.log(this.name);
    this.customValidator(this.group);

    // if(this.group) {
    //   if(this.name) {
    //     // this.group.get(this.name).setValidators(FileValidator.maxContentSize(2097152)); //2097152 = 2MB
    //     // CONSIDERAR ARREGLAR EL ERROR, POR SI LAS MOSCAS, YA QUE TAL VEZ LO DE CUSTOMVALIDATOR NO SEA LA MEJOR FORMA DE HACERLO
    //   }
    // }
  }

  ngDoCheck() {

    if (this.numberEventSizeAccessProperty == 0) {
      if (this.group.get(this.name).value) {
        if (this.eventProperty.target.files[0].size > 4194304) {
          setTimeout(() => {
            const Dialog = this.dialog.open(BaseDialogComponent, {
              data: this.fileSizeMessage,
              minWidth: 385,
            });

            setTimeout(() => {  
              Dialog.close();
            }, 10000);

            document.getElementById(`${this.eventProperty.propertyName}`).click();

            setTimeout(() => {  
              if (document.getElementById(`${this.eventProperty.propertyName}`)) {
                document.getElementById(`${this.eventProperty.propertyName}`).click();
              }
            }, 1000);
            this.numberEventSizeAccessProperty = 1;
          });
        }
        else {
          this.numberEventSizeAccessProperty = 1;
        }
      }
      else {
      }
    }
  }

   customValidator(control: AbstractControl): { [key: string]: any } {
    const controlName = (Object.keys(control.parent.controls).find(key => control.parent.controls[key] === control));
    console.log(controlName);

    if (control.parent && control.parent.parent && control.parent.parent.parent &&
      control.parent.parent.parent.controls[0] && control.parent.parent.parent.controls[0].parent
      && control.parent.parent.parent.controls[0].parent.parent &&
      control.parent.parent.parent.controls[0].parent.parent.controls
      && control.parent.parent.parent.controls[0].parent.parent.controls.titulo
      && control.parent.parent.parent.controls[0].parent.parent.controls.titulo.value &&
      control.parent.parent.parent.controls[0].parent.parent.controls.titulo.value) {
      console.log('Formulario dinamico, input archivo.');

      const controlNameArray = (Object.keys(control.parent.parent.controls).find(key => control.parent.parent.controls[key] === control.parent));
      const controlNameArray2 = (Object.keys(control.parent.parent.parent.controls).find(key => control.parent.parent.parent.controls[key] === control.parent.parent));
      const controlNameArray3 = 
      ((control.parent.parent.parent.controls[0].parent.parent.controls.titulo.value as String).replace(/\s+/g, '')).toLowerCase();

      console.log(controlNameArray3);
      this.propertyName= `${controlNameArray3}${controlNameArray2}${controlNameArray}${controlName}${this.name}`;
      console.log(this.propertyName);
    }
    else if (control.parent.controls.length) {
      console.log('Array');

      const controlNameArray = (Object.keys(control.parent.parent.controls).find(key => control.parent.parent.controls[key] === control.parent));
      console.log(controlNameArray);

      if (control.parent.parent && control.parent.parent.parent && control.parent.parent.parent.parent &&
        control.parent.parent.parent.parent.controls.length) {
        console.log('Array Array');

        const controlNameArrayArrayReembolsos = (Object.keys(control.parent.parent.parent.parent.controls).find(key => control.parent.parent.parent.parent.controls[key] === control.parent.parent.parent));
        console.log(controlNameArrayArrayReembolsos);

        this.propertyName= `${controlNameArrayArrayReembolsos}${controlNameArray}${controlName}${this.name}`;
        console.log(this.propertyName);
      }
      else {
        if (control.parent.parent.parent) {
          const controlNameArray2 = (Object.keys(control.parent.parent.parent.controls).find(key => control.parent.parent.parent.controls[key] === control.parent.parent));

          this.propertyName= `${controlNameArray2}${controlNameArray}${controlName}${this.name}`;
          console.log(this.propertyName);
        }
        else {
          this.propertyName= `${controlNameArray}${controlName}${this.name}`;
          console.log(this.propertyName);
        }
      }
    }
    else {
      console.log('No array');

      if (control.parent.parent) {
        const controlName2 = (Object.keys(control.parent.parent.controls).find(key => control.parent.parent.controls[key] === control.parent));

        this.propertyName= `${controlName2}${controlName}${this.name}`;
        console.log(this.propertyName);
      }
      else {
        this.propertyName= `${controlName}${this.name}`;
        console.log(this.propertyName);
      }
    }

    if (control.value === 0) {
      return {key: {error: 'invalid'}};
    }
    // return null; 
  }
}
