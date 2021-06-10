import { Component, OnInit } from '@angular/core';
import { ChangeService } from '../services/change.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../../../app.component';
import { FormDataFillingService } from '../../services/shared/formDataFillingService';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    private fb: FormBuilder
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

}
