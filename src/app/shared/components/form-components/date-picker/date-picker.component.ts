import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControlName, FormGroupName } from '@angular/forms';

@Component({
	selector: 'app-date-picker',
	templateUrl: './date-picker.component.html',
	styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
	@Input() label: string;
	@Input() name: any;
	@Input() min?: any;
	@Input() max?: any;
	@Input() group: FormGroup;

	constructor() { }

	ngOnInit() { }

	deleteNullMethod() {
		if (this.group.get(this.name).value === null) {
			this.group.get(this.name).setValue('');
		}
	}
}
