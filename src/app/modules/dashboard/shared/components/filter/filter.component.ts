import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatFormField } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
	@Input() fills: Fills;
	@Output() public childEvent = new EventEmitter();
	filterForm: FormGroup;
	test = true;

	searchButton: MatProgressButtonOptions = {
		active: false,
		text: 'Buscar',
		buttonIcon: {
			fontIcon: 'search'
		},
		buttonColor: 'accent',
		barColor: 'primary',
		raised: true,
		stroked: false,
		mode: 'indeterminate',
		value: 0,
		disabled: false,
		fullWidth: true,
		customClass: 'dashboard-button'
	};

	constructor(private fb: FormBuilder) {
	}

	sendFilterParamsToParent(filterParams: FormData) {
		const from = this.setDateFormatToYYYMMDD(this.filterForm.get('from').value);
		const to = this.setDateFormatToYYYMMDD(this.filterForm.get('to').value);

		let params = new HttpParams();
		params = params.append('name', this.filterForm.get('name').value);
		params = params.append('status', this.filterForm.get('status').value);

		if (this.fills.fillType === 'tipoSeguro') {
			params = params.append('tipoSeguro', this.filterForm.get('tipoSeguro').value);
		} else {
			params = params.append('nroPoliza', this.filterForm.get('nroPoliza').value);
		}

		if (from) { params = params.append('from', from); }
		if (to) { params = params.append('to', to); }

		this.childEvent.emit(params);
	}

	setDateFormatToYYYMMDD(datePickerValue) {
		let date;
		if (datePickerValue) {
			const yyyy = datePickerValue.getFullYear();
			const mm = datePickerValue.getMonth() + 1;
			const dd = datePickerValue.getDate();
			date = (`${yyyy}-${mm}-${dd}`);
		}

		return date;
	}

	ngOnInit() {
		if (this.fills.fillType === 'tipoSeguro') {
			this.filterForm = this.fb.group({
				from: [''],
				to: [''],
				name: [''],
				status: [''],
				tipoSeguro: ['']
			});
		} else {
			this.filterForm = this.fb.group({
				from: [''],
				to: [''],
				name: [''],
				status: [''],
				nroPoliza: ['']
			});
		}
	}

	isXlSize(): boolean {
		if (window.screen.width > 1280) { // 768px portrait
			return true;
		} else {
			return false;
		}
	}
}


interface Fills {
	status: [];
	fillType: string;
}
