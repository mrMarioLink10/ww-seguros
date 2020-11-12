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
  dynamicForms: FormGroup;
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
    this.dynamicForms = this.fb.group({
      dynamicForms: this.fb.array([this.addItem('dynamicFormUnique')])
    });
    this.generateCreatedForm(3, this.dynamicForms.get('dynamicForms').get('0'));
  }

  addItem(target: string) {
    switch (target) {
      case 'dynamicForm':
        return this.fb.group({
          idForm: ['', Validators.required],
          form: this.fb.group({})
        });

      case 'dynamicFormUnique':
        return this.fb.group({
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
        console.warn('new form unique', group.get('form'));
        setTimeout(() => {
          this.appComponent.showOverlay = false;
        });
      });
  }

  generateCreatedForm(id, group) {
    setTimeout(() => {
      this.appComponent.showOverlay = true;
    });
    console.warn('FORM:', group);
    const idForm = id;
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

  print() {
    console.log(this.generalForm);
  }

  save() {
    const form = this.generalForm.get('dynamicForms').get('0').get('form') as FormGroup;
    const json = JSON.stringify(form.getRawValue());
    console.log(this.generalForm);
    console.log(json);

    this.formsService.postDynamicForm(json)
      .subscribe(res => {
        console.log(res);
      });
  }
}
