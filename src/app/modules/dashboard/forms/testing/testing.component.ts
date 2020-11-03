import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormsService } from '../../services/forms/forms.service';
import { FieldConfig } from '../../../../shared/components/form-components/models/field-config';
import { AppComponent } from '../../../../app.component';
import { FormDataFillingService } from '../../services/shared/formDataFillingService';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styles: []
})

// tslint:disable: forin
export class TestingComponent implements OnInit {

  forms: any[];
  generalForm: FormGroup;
  showContent = false;
  idsOptions: any = null;

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    public appComponent: AppComponent,
    private formDataFillingService: FormDataFillingService
  ) { }

  ngOnInit() {
    this.getForms();
    this.generalForm = this.fb.group({
      dynamicForms: this.fb.array([this.addItem('dynamicForm')])
    });
  }

  addItem(target: string) {
    switch (target) {
      case 'dynamicForm':
        return this.fb.group({
          idForm: ['', Validators.required],
          form: this.fb.group({})
        });
    }
  }

  getForms() {
    setTimeout(() => {
      this.appComponent.showOverlay = true;
    });
    const params: HttpParams = new HttpParams();

    this.formsService.getData(params)
      .subscribe((res: any) => {
        console.log(res.data);

        this.forms = res.data;
        this.idsOptions = this.getFormsIds();

        setTimeout(() => {
          this.appComponent.showOverlay = false;
          this.showContent = true;
        });
      });
  }

  getFormsIds() {
    const options: FieldConfig = { options: [] };

    for (const key in this.forms) {
      const element = this.forms[key];
      options.options.push({ value: element.id, viewValue: element.formName });
    }
    return options;
  }

  generateDynamicForm($event, group) {
    setTimeout(() => {
      this.appComponent.showOverlay = true;
    });
    console.log($event);
    const idForm = $event.valor;
    group.get('form').reset();
    // group.get('form').setValue({});

    this.formsService.getDynamicForm(idForm)
      .subscribe(res => {
        console.log(res);

        this.formDataFillingService.iterateThroughtAllObject(res.data, group.get('form'));
        console.warn('new form', group.get('form'));
        setTimeout(() => {
          this.appComponent.showOverlay = false;
        });
      });

  }
}
