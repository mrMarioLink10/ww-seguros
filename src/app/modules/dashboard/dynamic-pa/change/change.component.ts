import { Component, OnInit } from '@angular/core';
import { ChangeService } from '../services/change.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../../../app.component';
import { FormDataFillingService } from '../../services/shared/formDataFillingService';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { FormsService } from '../../services/forms/forms.service';
import { FormHandlerService } from 'src/app/core/services/forms/form-handler.service';
import { PolicyService } from '../../services/consultation/policy.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    protected appComponent: AppComponent,
    private dataMappingFromApi: FormDataFillingService,
    private fb: FormBuilder,
    private formsService: FormsService,
    protected formHandler: FormHandlerService,
    private changeService: ChangeService,
    private policyService: PolicyService,
  ) { }

  changeForm: FormGroup;

  showContent = false;
  data: any;
  hideButtonsFechaSolicitud = false;
  
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

    // if (this.changeForm.get('formularioCambio')) {
    //   this.generateCreatedForm(95, this.changeForm.get('formularioCambio'));
    // }


  }

  getData(data: any) {
    setTimeout(() => {
      this.appComponent.showOverlay = true;
    });

    console.log('GET DATA:', data);
    this.dataMappingFromApi.iterateThroughtAllObject(data, this.changeForm);

    if (this.changeForm.get('apellidos')) {
      this.changeForm.get('apellidos').clearValidators();
      this.changeForm.get('apellidos').updateValueAndValidity();
    }

    if (this.changeForm.get('formularioCambio')) {

      const mantainId = data.formularioCambio.id;

      this.dataMappingFromApi.iterateThroughtAllObject(data.formularioCambioCreator, this.changeForm.get('formularioCambio'));
      this.clearValidators(this.changeForm.get('formularioCambio') as FormGroup);

      this.changeForm.get('formularioCambio').patchValue({
        id: mantainId
      });

      if (data.formularioCambio.acordeon.length > 0) {
        for(let x = 0; x < data.formularioCambio.acordeon.length; x++){
          if (this.changeForm.get('formularioCambio').get('acordeon').get(x.toString()).get('titulo').value
          === data.formularioCambio.acordeon[x].titulo) {
            for(let y = 0; y < data.formularioCambio.acordeon[x].seccion.length; y++){
              for(let z = 0; z < data.formularioCambio.acordeon[x].seccion[y].campos.length; z++){
                for(let z2 = 0; z2 < data.formularioCambio.acordeon[x].seccion[y].campos.length; z2++){
                  if (data.formularioCambio.acordeon[x].seccion[y].campos[z].label ===
                    this.changeForm.get('formularioCambio').get('acordeon').get(x.toString()).get('seccion'
                  ).get(y.toString()).get('campos').get(z2.toString()).get('label').value) {

                    this.changeForm.get('formularioCambio').get('acordeon').get(x.toString()).get('seccion'
                    ).get(y.toString()).get('campos').get(z2.toString()).get('valueCollectedFromForm'
                    ).setValue(data.formularioCambio.acordeon[x].seccion[y].campos[z].valueCollectedFromForm);

                    if (data.formularioCambio.acordeon[x].seccion[y].campos[z].type === 'ARCHIVO' &&
                    data.formularioCambio.acordeon[x].seccion[y].campos[z].valueForFormUrl && 
                    data.formularioCambio.acordeon[x].seccion[y].campos[z].valueForFormUrl !== ''
                    && data.formularioCambio.acordeon[x].seccion[y].campos[z].valueForFormUrl !== null &&
                    data.formularioCambio.acordeon[x].seccion[y].campos[z].valueForFormUrl !== undefined) {

                      (this.changeForm.get('formularioCambio').get('acordeon').get(x.toString()).get('seccion'
                      ).get(y.toString()).get('campos').get(z2.toString()) as FormGroup
                      ).addControl('valueForFormUrl', this.fb.control(data.formularioCambio.acordeon[x].seccion[y].campos[z].valueForFormUrl));
                      // this.changeForm.get('formularioCambio').get('acordeon').get(x.toString()).get('seccion'
                      // ).get(y.toString()).get('campos').get(z2.toString()).get('valueCollectedFromForm'
                      // ).setValue(data.formularioCambio.acordeon[x].seccion[y].campos[z].valueCollectedFromForm);
                    }
                  }
                }
              }
            }
          }
        }
      }

      // if (this.changeForm.get('formularioCambio').valid) {
      //   this.clearValidators(this.changeForm.get('formularioCambioCreator') as FormGroup);
      // }
    }

    if (this.changeForm.get('formularioCambioCreator')) {
      this.clearValidators(this.changeForm.get('formularioCambioCreator') as FormGroup);
      for(let x = 0; x < data.formularioCambioCreator.acordeon.length; x++){
        for(let y = 0; y < data.formularioCambioCreator.acordeon[x].seccion.length; y++){
          for(let z = 0; z < data.formularioCambioCreator.acordeon[x].seccion[y].campos.length; z++){
                this.changeForm.get('formularioCambioCreator').get('acordeon').get(x.toString()).get('seccion'
                ).get(y.toString()).get('campos').get(z.toString()).get('valueCollectedFromForm'
                ).clearValidators();
                this.changeForm.get('formularioCambioCreator').get('acordeon').get(x.toString()).get('seccion'
                ).get(y.toString()).get('campos').get(z.toString()).get('valueCollectedFromForm'
                ).updateValueAndValidity();
          }
        }
      }

      this.changeService.getQuote(data.cotizacionInfoCode, data.ramo).subscribe((response: any)=>{
        console.log(response);
  
        if (data.formularioCambioCreator.acordeon[3].seccion[0].campos[0].label == "PLAN") {
          this.changeForm.get('formularioCambio').get('acordeon').get('3').get('seccion'
          ).get('0').get('campos').get('0').get('valueCollectedFromForm'
          ).setValue(response.data.plan);
        }
  
        if (data.formularioCambioCreator.acordeon[3].seccion[0].campos[1].label == "DEDUCIBLE") {
          this.changeForm.get('formularioCambio').get('acordeon').get('3').get('seccion'
          ).get('0').get('campos').get('1').get('valueCollectedFromForm'
          ).setValue(response.data.deducible);
        }
  
        // if (data.formularioCambioCreator.acordeon[3].seccion[0].campos[2].label == "ANEXAR COTIZACION") {
        //   this.changeForm.get('formularioCambio').get('acordeon').get('3').get('seccion'
        //   ).get('0').get('campos').get('2').get('valueCollectedFromForm'
        //   ).setValue();
        // }
      });
  
      this.policyService.getPolicyDetails(data.poliza).subscribe((res: any) => {
  
        console.log(res.data);
        if (data.formularioCambioCreator.acordeon[0].seccion[0].campos[0].label == "FECHA VIGENCIA") {
          this.changeForm.get('formularioCambio').get('acordeon').get('0').get('seccion'
          ).get('0').get('campos').get('0').get('valueCollectedFromForm'
          ).setValue(new Date(res.data.endDate));
        }

        if (data.formularioCambioCreator.acordeon[0].seccion[0].campos[1].label == "FECHA SOLICITUD") {

          this.changeForm.get('formularioCambio').get('acordeon').get('0').get('seccion'
          ).get('0').get('campos').get('1').get('valueCollectedFromForm'
          ).setValue(new Date());
          //POR SI ACASO tengo que hacer alguna condicion con la fecha.
          // if (new Date() <= new Date(res.data.endDate)) {
          // }
          if (new Date() > new Date(res.data.endDate)) {
            this.hideButtonsFechaSolicitud = true;
          }
          console.log(this.hideButtonsFechaSolicitud);
        }
      });
    }

    console.log('FORMULARIO LUEGO', this.changeForm.getRawValue());
    console.log('FORMULARIO LUEGO 2', this.changeForm);
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
        console.warn(res.data, group);
        this.dataMappingFromApi.iterateThroughtAllObjectForms(res.data, group);
        this.clearValidators(this.changeForm.get('formularioCambio') as FormGroup);
        this.showContent = true;
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
