import { Component, OnInit } from '@angular/core';
import { ChangeService } from '../services/change.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../../../app.component';
import { FormDataFillingService } from '../../services/shared/formDataFillingService';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { FormsService } from '../../services/forms/forms.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  constructor(
    private changeService: ChangeService,
    private route: ActivatedRoute,
    private appComponent: AppComponent,
    private dataMappingFromApi: FormDataFillingService,
    private fb: FormBuilder,
    private formsService: FormsService
  ) { }

  changeForm: FormGroup;

  showContent = false;
  data: any;

  ngOnInit() {
    this.changeForm = this.fb.group({});
    this.route.data.subscribe((response: any) => {
      console.log('RESPONDE DENTRO DEL COMPONENTE CHANGE', response);
      if (response.data) {
        this.data = response.data;
        if (response.data.id) {
          this.getData(response.data);
        }
      }
    });

    this.generateCreatedForm(95, this.changeForm.get('formularioCambio'));


  }

  getData(data: any) {

    setTimeout(() => {
      this.appComponent.showOverlay = true;
    });

    this.dataMappingFromApi.iterateThroughtAllObject(data, this.changeForm);

    console.log('FORMULARIO LUEGO', this.changeForm.getRawValue());

    this.showContent = true;

    setTimeout(() => {
      this.appComponent.showOverlay = false;
    });
  }

  generateCreatedForm(id, group) {
    setTimeout(() => {
      this.appComponent.showOverlay = true;
    });
    const idForm = id;
    // group.get('form').reset();
    console.log(id, group);
    this.formsService.getDynamicForm(idForm)
      .subscribe(res => {
        this.dataMappingFromApi.iterateThroughtAllObjectForms(res.data, group);
        this.clearValidators(this.changeForm.get('formularioCambio') as FormGroup);

        setTimeout(() => {
          this.appComponent.showOverlay = false;
        });
      });
  }

  clearValidators(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key] as FormControl | FormGroup | FormArray;
      if (control instanceof FormControl) {
        if (key !== 'valueCollectedFromForm') {
          control.clearValidators();
          control.updateValueAndValidity();
        }
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.clearValidators(control);
      } else {
        console.warn('Ignorar control', control);
      }
    });
  }

  print() {
    console.log(this.changeForm);
    console.log(JSON.stringify(this.changeForm.value));
  }

}
