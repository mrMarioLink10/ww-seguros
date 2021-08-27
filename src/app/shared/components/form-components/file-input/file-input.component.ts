import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { RequestsService } from '../../../../modules/dashboard/services/requests/requests.service';
// import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
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

  // propertyName = 'buttonID';

  constructor(
    public requestService: RequestsService
  ) { }

  runOnFileChange(event): void {
    this.onFileChange.emit(event);
  }

  ngOnInit() {
    // console.log(this.group);
    // console.log(this.name);
    // this.customValidator(this.group);

    // if(this.group) {
    //   if(this.name) {
    //     // this.group.get(this.name).setValidators(FileValidator.maxContentSize(2097152)); //2097152 = 2MB
    //     // CONSIDERAR ARREGLAR EL ERROR, POR SI LAS MOSCAS, YA QUE TAL VEZ LO DE CUSTOMVALIDATOR NO SEA LA MEJOR FORMA DE HACERLO
    //   }
    // }
  }

  //  customValidator(control: AbstractControl): { [key: string]: any } {
  //   const controlName = (Object.keys(control.parent.controls).find(key => control.parent.controls[key] === control));
  //   console.log(controlName);

  //   if (control.parent.controls.length) {
  //     console.log('Array');

  //     const controlNameArray = (Object.keys(control.parent.parent.controls).find(key => control.parent.parent.controls[key] === control.parent));
  //     console.log(controlNameArray);

  //     if (control.parent.parent && control.parent.parent.parent && control.parent.parent.parent.parent &&
  //       control.parent.parent.parent.parent.controls.length) {
  //       console.log('Array Array');

  //       const controlNameArrayArrayReembolsos = (Object.keys(control.parent.parent.parent.parent.controls).find(key => control.parent.parent.parent.parent.controls[key] === control.parent.parent.parent));
  //       console.log(controlNameArrayArrayReembolsos);

  //       this.propertyName= `${controlNameArrayArrayReembolsos}${controlNameArray}${controlName}${this.name}`;
  //       console.log(this.propertyName);
  //     }
  //     else {
  //       this.propertyName= `${controlNameArray}${controlName}${this.name}`;
  //       console.log(this.propertyName);
  //     }
  //   }
  //   else {
  //     console.log('No array');

  //     this.propertyName= `${controlName}${this.name}`;
  //     console.log(this.propertyName);
  //   }

  //   if (control.value === 0) {
  //     return {key: {error: 'invalid'}};
  //   }
  //   // return null; 
  // }
}
