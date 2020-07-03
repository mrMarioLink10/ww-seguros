import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {PolicyFilter} from '../../models/policy';
import {MY_FORMATS} from '../../models/date-format';
import { PolicyFilterService } from './services/policy-filter.service';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppComponent } from '../../../../../app.component';

@Component({
  selector: 'app-policy-filter',
  templateUrl: './policy-filter.component.html',
  styleUrls: ['./policy-filter.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
    ]
})
export class PolicyFilterComponent implements OnInit {

  @Output() filters = new EventEmitter<PolicyFilter>();

  filterForm = this.fb.group({
    clientName: [''],
    policyId: [''],
    paymentState: [''],
    initialDate: [''],
    endDate: [''],
    insuranceType: ['']
  });

  autoCompleteConsultNames = [];
  filteredOptions: Observable<any[]>;
  timeAutoComplete = 0;

  constructor(private fb: FormBuilder, private policyService: PolicyFilterService, private appCompo: AppComponent) { }

  ngOnInit() {

    this.appCompo.showOverlay = true;
    this.returnConsultNames();

    // setTimeout(() => {
		// 	this.appCompo.showOverlay = true;
    // });

    // setTimeout(() => {

    //   // this.filterForm = this.fb.group({
    //   //   clientName: [''],
    //   //   policyId: [''],
    //   //   paymentState: [''],
    //   //   initialDate: [''],
    //   //   endDate: [''],
    //   //   insuranceType: ['']
    //   // });

    //   this.filteredOptions = this.filterForm.get('clientName').valueChanges
		// 		.pipe(
		// 			startWith(''),
		// 			map(value => typeof value === 'string' ? value : value),
		// 			map(value => value ? this._filter(value) : this.autoCompleteConsultNames.slice())
    //     );

    //   this.timeAutoComplete = 1;
		// 	   this.appCompo.showOverlay = false;
    // }, 15000);
    this.filteredOptions = this.filterForm.get('clientName').valueChanges
				.pipe(
					startWith(''),
					map(value => typeof value === 'string' ? value : value),
					map(value => value ? this._filter(value) : this.autoCompleteConsultNames.slice())
        );
  }

  sendFormToParent() {
    const formValue = this.filterForm.value;

    const initialDate = formValue.initialDate;
    const endDate = formValue.endDate;

    const filter: PolicyFilter = {
      id: formValue.policyId ? formValue.policyId.toString() : '',
      clientName: formValue.clientName ? formValue.clientName.toString() : '',
      paymentState: formValue.paymentState ? formValue.paymentState.toString() : '',
      insuranceType: formValue.insuranceType ? formValue.insuranceType.toString() : '',
      initialDate: initialDate ? `${initialDate._i.date}/${initialDate._i.month + 1}/${initialDate._i.year}` : '',
      endDate: endDate ? `${endDate._i.date}/${endDate._i.month + 1}/${endDate._i.year}` : ''
    };

    this.filters.emit(filter);
  }

  resetForm() {
    this.filterForm.reset();
    this.sendFormToParent();
  }

  returnConsultNames() {

    this.policyService.getClientNames().subscribe(data => {
      // console.log('Hola');
      // console.log('Hola, esto imprime la data de los nombres de consultas: ', data);
      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < data.data.length; x++) {
        this.autoCompleteConsultNames.push(data.data[x]);
      }
      // console.log('Hola, esto imprime this.autoCompleteConsultNames: ', this.autoCompleteConsultNames);
      this.timeAutoComplete = 1;
      this.appCompo.showOverlay = false;
    });
  }

  displayFn(user: any) {
		return user ? user : '';
  }

  private _filter(value: string): any[] {
		const filterValue = value.toLowerCase();

		return this.autoCompleteConsultNames.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
	}

}
