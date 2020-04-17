import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatFormField } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
	@Input() fills: fills;
	@Output() public childEvent = new EventEmitter();
	filterForm: FormGroup;
	test = true;

	constructor(private _fb: FormBuilder) {
	}

	sendFilterParamsToParent(filterParams: FormData) {
		let from = this.setDateFormatToYYYMMDD(this.filterForm.get('from').value);
		let to = this.setDateFormatToYYYMMDD(this.filterForm.get('to').value);

		let params = new HttpParams();
		params = params.append('name', this.filterForm.get('name').value)
		params = params.append('status', this.filterForm.get('status').value);

		if (this.fills.fillType == 'tipoSeguro') {
			params = params.append('tipoSeguro', this.filterForm.get('tipoSeguro').value);
		}
		else {
			params = params.append('nroPoliza', this.filterForm.get('nroPoliza').value);
		}

		if (from) params = params.append('from', from);
		if (to) params = params.append('to', to);

		this.childEvent.emit(params);
	}

	setDateFormatToYYYMMDD(datePickerValue) {
		let date;
		if (datePickerValue) {
			let yyyy = datePickerValue.getFullYear();
			let mm = datePickerValue.getMonth() + 1;
			let dd = datePickerValue.getDate();
			date = (`${yyyy}-${mm}-${dd}`);
		}

		return date;
	}

	ngOnInit() {
		if (this.fills.fillType == 'tipoSeguro') {
			this.filterForm = this._fb.group({
				from: [''],
				to: [''],
				name: [''],
				status: [''],
				tipoSeguro: ['']
			});
		} else {
			this.filterForm = this._fb.group({
				from: [''],
				to: [''],
				name: [''],
				status: [''],
				nroPoliza: ['']
			});
		}
	}
}

interface fills {
	status: [],
	fillType: string
}
